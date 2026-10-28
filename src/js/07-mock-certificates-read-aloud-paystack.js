
/* ============ MOCK · CERTIFICATES · READ-ALOUD · PAYSTACK ============ */
const PAYSTACK_KEY = "";   /* ← paste your Paystack public key (pk_live_...) to enable for everyone */

/* ---- Read aloud (Web Speech) ---- */
function speak(txt){try{if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(txt));u.lang='en-GB';u.rate=0.95;speechSynthesis.speak(u);}catch(e){}}
function speakPattern(cat,i){const p=PATTERNS[cat].items[i];speak(p.name+'. Materials: '+p.materials.join(', ')+'. Steps: '+p.steps.join(' '));}
(function(){const b=document.getElementById('ttsBtn');if(b)b.onclick=()=>{const q=(document.getElementById('qText')||{}).textContent||'';const opts=[...document.querySelectorAll('#qOpts .opt')].map(o=>o.textContent).join('. ');speak(q+'. '+opts);};})();

/* ---- Paystack checkout ---- */
function payWithPaystack(tier,amount){
  let key='';try{key=(document.getElementById('paystackKey')||{}).value||localStorage.getItem('SQ_PAYSTACK')||PAYSTACK_KEY;}catch(e){key=PAYSTACK_KEY;}
  if(!key){toast('Add your Paystack public key first.');return;}
  try{localStorage.setItem('SQ_PAYSTACK',key);}catch(e){}
  const plan=tier||'premium';const amt=amount||250000;
  const email=(S.profile&&S.profile.email)||'student@beliyona.app';
  const go=()=>{try{const h=window.PaystackPop.setup({key:key,email:email,amount:amt,currency:'NGN',
    callback:function(){S.subscription=plan;save();toast('⭐ Payment received — '+(plan==='ultra'?'Premium Ultra':'Premium')+' unlocked!');if(window.renderSubscribe)renderSubscribe();renderDecks();},
    onClose:function(){toast('Payment cancelled.');}});h.openIframe();}catch(e){toast('Could not start payment.');}};
  if(window.PaystackPop)return go();
  const s=document.createElement('script');s.src='https://js.paystack.co/v1/inline.js';s.onload=go;s.onerror=()=>toast('Could not load Paystack (need internet).');document.head.appendChild(s);
}

/* ---- Certificates ---- */
function nowDate(){try{return new Date().toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'});}catch(e){return '';}}
function earnedCerts(){const list=[];
  function scan(d){if(deckMastered(d))list.push({title:'Mastered: '+d.name,sub:'Topic completed to mastery'});}
  CATS.forEach(c=>c.decks.forEach(scan));Object.keys(PRO_DECKS).forEach(k=>PRO_DECKS[k].forEach(scan));(S.customDecks||[]).forEach(scan);
  if((S.bestStreak||0)>=7)list.push({title:'7-Day Study Streak',sub:'Studied 7 days in a row'});
  if((S.bestStreak||0)>=30)list.push({title:'30-Day Study Streak',sub:'A full month of daily study'});
  if((S.bossWins||0)>=1)list.push({title:'Boss Slayer',sub:'Defeated a Boss Battle'});
  if(S.mockDone)list.push({title:'Completed a JAMB Mock',sub:'Finished a full timed mock exam'});
  return list;}
function renderCertList(){const w=document.getElementById('certWrap');if(!w)return;const certs=earnedCerts();
  const cards=certs.length?certs.map((c,i)=>'<div class="deck" onclick="showCert('+i+')"><div class="emoji">🎓</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.sub)+'</p><div class="meta"><span class="chip mastered">Earned ✓</span></div></div>').join(''):'<div class="empty">No certificates yet — master a topic or keep a 7-day streak to earn your first one!</div>';
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'stats\')">← Back</button><h2 class="title" style="margin-top:10px">🎓 My Certificates</h2><p class="sub">Tap a certificate to view, then print or save it as a PDF.</p></div><div class="deckgrid">'+cards+'</div>';}
function showCert(i){const w=document.getElementById('certWrap');if(!w)return;const c=earnedCerts()[i];if(!c)return;const name=(S.profile&&S.profile.nickname)||S.name||'Student';
  w.innerHTML='<div class="panel"><div class="row-actions"><button class="btn ghost sm" onclick="renderCertList()">← Back</button><button class="btn gold sm" onclick="window.print()">🖨️ Print / Save PDF</button></div>'+
    '<div id="certPrint" class="cert"><div class="cert-in"><div class="cert-top">🥚 BELIYONA LEARN</div><div class="cert-h">Certificate of Achievement</div>'+
    '<div class="cert-sub">This certifies that</div><div class="cert-name">'+esc(name)+'</div><div class="cert-sub">has successfully achieved</div>'+
    '<div class="cert-ach">'+esc(c.title)+'</div><div class="cert-desc">'+esc(c.sub)+'</div>'+
    '<div class="cert-foot"><span>'+nowDate()+'</span><span>Study Egg</span></div></div></div></div>';}

/* ---- JAMB CBT Mock ---- */
const MOCK_SUBJECTS=[
 {k:'eng',name:'English',id:'eng',req:true},{k:'math',name:'Mathematics',id:'math'},
 {k:'phy',name:'Physics',id:'phy'},{k:'chem',name:'Chemistry',id:'chem'},{k:'bio',name:'Biology',id:'bio'},
 {k:'gov',name:'Government',id:'gov'},{k:'eco',name:'Economics',id:'eco'},{k:'lit',name:'Literature',id:'lit'},
 {k:'commerce',name:'Commerce',id:'commerce'},{k:'acct',name:'Accounting',id:'acct'},{k:'geo',name:'Geography',id:'geo'}
];
const MOCK_QPS=10, MOCK_SECONDS=60*60;
let MK=null, mkTimer=null, mkSel=['eng'];
function mockBanner(){const d=document.createElement('div');d.className='panel';
  d.innerHTML='<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><div style="font-size:30px">⏱️</div><div style="flex:1;min-width:160px"><h2 class="title" style="margin:0">JAMB CBT Mock</h2><p class="sub" style="margin:2px 0 0">Pick 4 subjects, beat the clock, get a scored result.</p></div><button class="btn gold" onclick="show(\'mock\')">Start mock</button></div>';
  return d;}
function renderMock(){const w=document.getElementById('mockWrap');if(!w)return;clearInterval(mkTimer);
  const chips=MOCK_SUBJECTS.map(s=>'<button class="onb-chip'+(mkSel.includes(s.k)?' sel':'')+'"'+(s.req?' disabled':'')+' onclick="mockToggle(\''+s.k+'\')">'+(s.req?'📌 ':'')+s.name+'</button>').join('');
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'home\')">← Back</button>'+
    '<h2 class="title" style="margin-top:10px">⏱️ JAMB CBT Mock</h2><p class="sub">English is compulsory. Pick <b>3 more</b> subjects — '+MOCK_QPS+' questions each, 60-minute timer.</p>'+
    '<div class="onb-chips">'+chips+'</div><p class="sub" style="margin-top:10px">Selected: <b>'+mkSel.length+'/4</b></p>'+
    '<button class="btn gold block" '+(mkSel.length===4?'':'disabled')+' onclick="startMock()">🥚 Start mock exam</button></div>';}
function mockToggle(k){const s=MOCK_SUBJECTS.find(x=>x.k===k);if(!s||s.req)return;
  if(mkSel.includes(k))mkSel=mkSel.filter(x=>x!==k);else{if(mkSel.length>=4){toast('Pick exactly 4 subjects.');return;}mkSel.push(k);}renderMock();}
function startMock(){if(mkSel.length!==4)return;if(window.ac)ac();
  const queue=[];mkSel.forEach(k=>{const s=MOCK_SUBJECTS.find(x=>x.k===k);const d=deckById(s.id);if(!d)return;
    shuffle(d.cards).slice(0,MOCK_QPS).forEach(card=>queue.push({k:k,name:s.name,card:card}));});
  MK={queue:queue,idx:0,correct:0,per:{},timeLeft:MOCK_SECONDS};mkSel.forEach(k=>MK.per[k]={c:0,t:0});queue.forEach(q=>MK.per[q.k].t++);
  clearInterval(mkTimer);mkTimer=setInterval(()=>{MK.timeLeft--;mkClock();if(MK.timeLeft<=0)finishMock();},1000);
  show('mock');mockQ();}
function mkClock(){const e=document.getElementById('mkTime');if(e&&MK){const m=Math.floor(MK.timeLeft/60),s=MK.timeLeft%60;e.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;}}
function mockQ(){const w=document.getElementById('mockWrap');if(!w||!MK)return;
  if(MK.idx>=MK.queue.length)return finishMock();
  const it=MK.queue[MK.idx],card=it.card,type=card.t||'mc';
  w.innerHTML='<div class="panel"><div class="quizhead"><button class="btn ghost sm" id="mkEnd">✕ End</button><div class="qprogress"><div class="bar"><i style="width:'+Math.round(MK.idx/MK.queue.length*100)+'%"></i></div></div><div class="combo show" style="color:var(--gold)">⏱️ <span id="mkTime">--:--</span></div></div>'+
    '<div class="qcard"><div><div class="tag">'+esc(it.name)+' • Q'+(MK.idx+1)+'/'+MK.queue.length+'</div><div class="qtxt">'+esc(card.q)+'</div></div></div><div class="opts" id="mkOpts"></div></div>';
  document.getElementById('mkEnd').onclick=quitMock;const box=document.getElementById('mkOpts');
  if(type==='type'){const wr=document.createElement('div');wr.className='typebox';wr.innerHTML='<input id="mkIn" placeholder="Type your answer…"><button class="btn" id="mkGo">Go</button>';box.appendChild(wr);
    document.getElementById('mkGo').onclick=mockType;const ti=document.getElementById('mkIn');if(ti)ti.onkeydown=e=>{if(e.key==='Enter')mockType();};}
  else{const arr=type==='tf'?['True','False']:shuffle([card.a,...((card.w||[]).slice(0,3))]);
    arr.forEach(o=>{const b=document.createElement('button');b.className='opt';b.textContent=o;b.onclick=()=>mockAns(b,o);box.appendChild(b);});}
  mkClock();}
function mockRecord(ok){const it=MK.queue[MK.idx];if(ok){MK.correct++;MK.per[it.k].c++;}MK.idx++;setTimeout(mockQ,180);}
function mockAns(btn,chosen){const it=MK.queue[MK.idx];const ok=chosen===it.card.a;[...document.querySelectorAll('#mkOpts .opt')].forEach(o=>o.classList.add('disabled'));btn.classList.add(ok?'correct':'wrong');mockRecord(ok);}
function mockType(){const i=document.getElementById('mkIn');if(!i||!MK)return;const it=MK.queue[MK.idx];const acc=[it.card.a,...(it.card.accepts||[])].map(norm);mockRecord(acc.includes(norm(i.value)));}
function quitMock(){if(confirm('End the mock now?'))finishMock();}
function finishMock(){clearInterval(mkTimer);const w=document.getElementById('mockWrap');if(!w||!MK)return;
  const total=MK.queue.length||1,correct=MK.correct,score400=Math.round(correct/total*400);
  S.mockDone=true;unlock("mock1");if(correct/total>=0.7)unlock("mockAce");addXP(correct*4);addCoins(40);save();
  const rows=mkSel.map(k=>{const p=MK.per[k],n=MOCK_SUBJECTS.find(x=>x.k===k).name;return '<div class="lbrow"><div class="lbname">'+n+'</div><div class="lbxp">'+p.c+'/'+p.t+'</div></div>';}).join('');
  w.innerHTML='<div class="panel" style="text-align:center"><div style="font-size:50px">🎯</div><h2 class="title">Mock complete!</h2><p class="sub">You scored <b style="color:var(--gold);font-size:20px">'+correct+'/'+total+'</b></p><div style="font-size:30px;font-weight:900;color:var(--accent2)">≈ '+score400+'/400</div><p class="sub">estimated JAMB score</p></div>'+
    '<div class="panel"><h2 class="title">By subject</h2><div class="lb">'+rows+'</div></div>'+
    '<div class="panel"><div class="row-actions"><button class="btn" onclick="renderMock()">🔁 New mock</button><button class="btn ghost" onclick="show(\'cert\')">🎓 Certificate</button><button class="btn ghost" onclick="show(\'home\')">🏠 Home</button></div></div>';
  MK=null;if(window.confetti)confetti();}
