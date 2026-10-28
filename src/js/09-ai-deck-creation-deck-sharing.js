
/* ============ AI DECK CREATION + DECK SHARING ============ */
let aiCards=[], aiImgData=null, aiImgMime=null;
function encodeDeck(d){try{return 'SQD-'+btoa(unescape(encodeURIComponent(JSON.stringify({name:d.name,emoji:d.emoji,cards:d.cards}))));}catch(e){return '';}}
function decodeDeck(c){try{return JSON.parse(decodeURIComponent(escape(atob(String(c).replace('SQD-','').trim()))));}catch(e){return null;}}
function shareDeck(d){const code=encodeDeck(d);if(!code){toast('Could not create a share code.');return;}
  const msg='Play my Study Egg deck "'+d.name+'"! Open Study Egg, go to Create, and paste this deck code:\n\n'+code;
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');}
function importDeck(){const c=(document.getElementById('impCode')||{}).value||'';const o=decodeDeck(c);
  if(!o||!Array.isArray(o.cards)){toast('That deck code is not valid.');return;}
  S.customDecks=S.customDecks||[];S.customDecks.push({id:'u'+Date.now(),name:o.name||'Shared deck',emoji:o.emoji||'📥',cards:o.cards,public:true});
  save();toast('✅ Deck imported — find it under your decks!');renderDecks();}
function aiStatus(m){const e=document.getElementById('aiStatus');if(e)e.textContent=m;}
async function aiGenerate(){
  const u=document.getElementById('aiUrl');const url=(u&&u.value.trim())||localStorage.getItem('SQ_AIURL')||'';
  if(!url){aiStatus('Paste your AI function URL first (see AI-SETUP).');return;}
  try{localStorage.setItem('SQ_AIURL',url);}catch(e){}
  const text=((document.getElementById('aiText')||{}).value||'').trim();
  const count=Math.min(Math.max(parseInt((document.getElementById('aiCount')||{}).value,10)||10,3),20);
  if(!aiImgData&&!text){aiStatus('Add a photo or paste some text first.');return;}
  aiStatus('✨ Generating… this can take a few seconds.');
  try{
    const payload={count:count};if(aiImgData){payload.image=aiImgData;payload.mime=aiImgMime;}if(text){payload.text=text;}
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const j=await r.json();const qs=j.questions||(Array.isArray(j)?j:[]);
    aiCards=qs.map(x=>({t:'mc',q:String(x.q||'').trim(),a:String(x.a||'').trim(),w:(x.w||[]).slice(0,3).map(String),e:String(x.e||'').trim()})).filter(c=>c.q&&c.a&&c.w.length===3);
    if(!aiCards.length){aiStatus('No questions came back — try a clearer photo or more text.');return;}
    aiStatus('✅ Got '+aiCards.length+' questions. Review and save below.');renderAiPreview();
  }catch(e){aiStatus('Could not reach the AI function. Check the URL is correct and deployed.');}
}
function renderAiPreview(){const w=document.getElementById('aiPreview');if(!w)return;
  const list=aiCards.map(c=>'<div class="flash"><div><div class="q">'+esc(c.q)+'</div><div class="a">✓ '+esc(c.a)+' • '+c.w.map(esc).join(', ')+'</div></div></div>').join('');
  w.innerHTML='<div class="flashlist" style="margin-top:10px">'+list+'</div>'+
    '<div class="field" style="margin-top:10px"><label>Deck name</label><input id="aiName" placeholder="e.g. Chemistry — 2023 Past Qs"></div>'+
    '<div class="field"><label>Visibility</label><select id="aiPublic"><option value="private">Private (only me)</option><option value="public">Public (share by code)</option></select></div>'+
    '<button class="btn gold block" onclick="saveAiDeck()">💾 Save as deck</button>';}
function saveAiDeck(){const name=((document.getElementById('aiName')||{}).value||'').trim()||'AI deck';
  const pub=(document.getElementById('aiPublic')||{}).value==='public';
  const deck={id:'u'+Date.now(),name:name,emoji:'✨',cards:aiCards.slice(),public:pub};
  S.customDecks=S.customDecks||[];S.customDecks.push(deck);if(window.unlock){unlock('create');unlock('aimaker');}save();
  aiCards=[];aiImgData=null;aiImgMime=null;const pv=document.getElementById('aiPreview');if(pv)pv.innerHTML='';aiStatus('💾 Saved!');
  toast('💾 Deck saved!');if(pub)shareDeck(deck);else{renderDecks();show('home');}}
(function(){
  const go=document.getElementById('aiGo');if(go)go.onclick=aiGenerate;
  const imp=document.getElementById('impGo');if(imp)imp.onclick=importDeck;
  const img=document.getElementById('aiImg');if(img)img.onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;
    const nm=document.getElementById('aiImgName');if(nm)nm.textContent=f.name;
    const rd=new FileReader();rd.onload=()=>{const d=String(rd.result);const i=d.indexOf(',');aiImgData=i>=0?d.slice(i+1):d;aiImgMime=f.type||'image/jpeg';};rd.readAsDataURL(f);};
  const au=document.getElementById('aiUrl');if(au){try{au.value=localStorage.getItem('SQ_AIURL')||'';}catch(e){}}
})();
