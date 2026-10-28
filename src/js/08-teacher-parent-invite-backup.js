
/* ============ TEACHER/PARENT · INVITE · BACKUP ============ */
let tAssign=[];
const ASSIGN_SUBJECTS=['eng','math','bio','chem','phy','gov','eco','commerce','acct','geo','lit','jss_math','jss_eng','jss_sci'];
function inviteFriend(via){if(window.unlock)unlock('inviter');const code=(S.profile&&S.profile.code)||'';const me=(S.profile&&S.profile.nickname)||'A friend';
  const msg=me+' invited you to Study Egg — a fun app to ace WAEC, JAMB and more, with games and rewards! Use my friend code '+code+' when you sign up so we both get bonus points. Open the app and create your profile.';
  if(via==='wa')window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
  else window.location.href='mailto:?subject='+encodeURIComponent('Join me on Study Egg')+'&body='+encodeURIComponent(msg);}
function exportData(){try{const data=localStorage.getItem(KEY)||'{}';const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='beliyona-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('💾 Backup downloaded!');if(window.unlock)unlock('backup');}catch(e){toast('Could not back up.');}}
function importData(file){const r=new FileReader();r.onload=()=>{try{JSON.parse(r.result);localStorage.setItem(KEY,r.result);toast('✅ Restored! Reloading…');setTimeout(()=>location.reload(),700);}catch(e){toast('That file is not a valid backup.');}};r.readAsText(file);}
function encAssign(o){try{return 'SQA-'+btoa(unescape(encodeURIComponent(JSON.stringify(o))));}catch(e){return '';}}
function decAssign(code){try{return JSON.parse(decodeURIComponent(escape(atob(String(code).replace('SQA-','').trim()))));}catch(e){return null;}}
function tToggle(id){if(tAssign.includes(id))tAssign=tAssign.filter(x=>x!==id);else tAssign.push(id);renderTeacher();}
function shareAssignment(){if(!tAssign.length){toast('Pick at least one subject.');return;}
  const note=(document.getElementById('tNote')||{}).value||'';const o={n:(S.profile&&S.profile.nickname)||'Teacher',d:tAssign.slice(),note:note};const code=encAssign(o);
  const msg='Study Egg assignment from '+o.n+': open Study Egg, go to Profile, then Teacher/Parent, then paste this assignment code:\n\n'+code+(note?'\n\nNote: '+note:'');
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');}
function loadAssignment(){const c=(document.getElementById('tCode')||{}).value||'';const o=decAssign(c);if(!o||!o.d){toast('That code is not valid.');return;}
  S.assignments=S.assignments||[];S.assignments.unshift({n:o.n,d:o.d,note:o.note||''});save();toast('✅ Assignment loaded!');renderTeacher();}
function renderTeacher(){const w=document.getElementById('teacherWrap');if(!w)return;
  if(((S.profile&&S.profile.role)||'')==='parent'){return renderParent();}
  const role=(S.profile&&S.profile.role)||'teacher';const who='your students';const ttl='👩‍🏫 Teacher Dashboard';
  const subj=ASSIGN_SUBJECTS.map(id=>{const d=deckById(id);if(!d)return '';return '<button class="onb-chip'+(tAssign.includes(id)?' sel':'')+'" onclick="tToggle(\''+id+'\')">'+esc(d.name)+'</button>';}).join('');
  const acc=S.totalAns?Math.round(S.totalCorrect/S.totalAns*100):0;
  const assigned=(S.assignments||[]).map(a=>'<div class="deck" style="cursor:default"><h3>From '+esc(a.n)+'</h3><p>'+a.d.length+' exercise(s)'+(a.note?' • '+esc(a.note):'')+'</p><div class="row-actions">'+a.d.map(id=>{const d=deckById(id);return d?'<button class="btn ghost sm" onclick="openMode(deckById(\''+id+'\'))">▶ '+esc(d.name)+'</button>':'';}).join('')+'</div></div>').join('')||'<div class="empty">No assignments yet — enter a code from your teacher or parent.</div>';
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'stats\')">← Profile</button><h2 class="title" style="margin-top:10px">'+ttl+'</h2><p class="sub">This is your dashboard — assign practice to '+who+' and track progress. You don\'t take the quizzes yourself.'+((S.profile&&S.profile.className)?' <span class="chip">🏫 '+esc(S.profile.className)+'</span>':'')+'</p></div>'+
    '<div class="panel"><h2 class="title">📋 Create an assignment</h2><p class="sub">Pick subjects, add a note, then share the code on WhatsApp. The student pastes it below to load it.</p><div class="onb-chips">'+subj+'</div>'+
    '<div class="field" style="margin-top:10px"><label>Note (optional)</label><input id="tNote" placeholder="e.g. Finish before Friday"></div>'+
    '<button class="btn gold block" onclick="shareAssignment()">📲 Create & share on WhatsApp</button></div>'+
    '<div class="panel"><h2 class="title">📈 Progress on this device</h2><div class="deckgrid"><div class="deck"><div class="emoji">⭐</div><h3>Level '+S.level+'</h3><p>'+esc(S.name||'Learner')+'</p></div><div class="deck"><div class="emoji">🎯</div><h3>'+acc+'%</h3><p>Accuracy</p></div><div class="deck"><div class="emoji">📚</div><h3>'+S.totalAns+'</h3><p>Answered</p></div><div class="deck"><div class="emoji">🔥</div><h3>'+S.streak+'</h3><p>Day streak</p></div></div>'+
    '<p class="sub" style="margin-top:8px">For a full class roster across devices, connect the cloud account (Profile → Data & Backup).</p></div>'+
    '<div class="panel"><h2 class="title">🎒 Student: load an assignment</h2><div class="typebox"><input id="tCode" placeholder="Paste assignment code (SQA-…)"><button class="btn" onclick="loadAssignment()">Load</button></div><div style="margin-top:12px" class="deckgrid">'+assigned+'</div></div>';}
/* ---- Parent dashboard: children, completed courses, assign ---- */
function allDecksFlat(){let arr=[];CATS.forEach(c=>c.decks.forEach(d=>arr.push(d)));Object.keys(PRO_DECKS).forEach(k=>PRO_DECKS[k].forEach(d=>arr.push(d)));(S.customDecks||[]).forEach(d=>arr.push(d));return arr;}
function shareProgress(){const completed=allDecksFlat().filter(deckMastered).map(d=>d.name);
  const acc=S.totalAns?Math.round(S.totalCorrect/S.totalAns*100):0;
  const r={name:(S.profile&&S.profile.nickname)||S.name||'Student',level:S.level,xp:S.totalXP,acc:acc,total:S.totalAns,completed:completed};
  let code='';try{code='SQP-'+btoa(unescape(encodeURIComponent(JSON.stringify(r))));}catch(e){}
  const msg='My Study Egg progress: Level '+S.level+', '+acc+'% accuracy, '+completed.length+' course(s) completed. Parent/teacher code:\n\n'+code;
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');}
function decodeProgress(code){try{return JSON.parse(decodeURIComponent(escape(atob(String(code).replace('SQP-','').trim()))));}catch(e){return null;}}
function addChild(){const n=((document.getElementById('chName')||{}).value||'').trim();const k=((document.getElementById('chClass')||{}).value||'').trim();
  if(!n){toast('Enter your child\'s name.');return;}S.children=S.children||[];S.children.push({name:n,klass:k,report:null});save();toast('🧒 Child added!');renderParent();}
function removeChild(i){if(!confirm('Remove this child?'))return;S.children.splice(i,1);save();renderParent();}
function updateChild(i){const v=(document.getElementById('pc'+i)||{}).value||'';const r=decodeProgress(v);if(!r){toast('That progress code is not valid.');return;}
  S.children[i].report=r;if(r.name)S.children[i].name=S.children[i].name||r.name;save();toast('✅ Progress updated!');renderParent();}
function parentAssign(){const sel=document.getElementById('asgChild');const idx=sel?sel.value:'';
  if(idx===''||!S.children[idx]){toast('Add and select a child first.');return;}
  if(!tAssign.length){toast('Pick at least one subject.');return;}
  const child=S.children[idx];const note=((document.getElementById('tNote')||{}).value||'');
  const o={n:(S.profile&&S.profile.nickname)||'Parent',d:tAssign.slice(),note:note,forName:child.name};const code=encAssign(o);
  const msg='Hi '+child.name+'! Study Egg assignment from '+o.n+'. Open Study Egg, go to Profile then Teacher/Parent, and paste this code under "Student: load an assignment":\n\n'+code+(note?'\n\nNote: '+note:'');
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');}
function getAccounts(){try{return JSON.parse(localStorage.getItem('br_accounts')||'[]');}catch(e){return [];}}
function readChildState(id){try{return JSON.parse(localStorage.getItem('br_state_'+id)||'null');}catch(e){return null;}}
function childCompleted(srs){srs=srs||{};let names=[];allDecksFlat().forEach(d=>{if(!d.cards.length)return;const learned=d.cards.every((_,i)=>{const r=srs[d.id+'#'+i];return r&&r.box>=4;});if(learned)names.push(d.name);});return names;}
function createChildAccount(name,klass,theme){const id='kid'+Date.now();const reg=getAccounts();reg.push({id:id,name:name,klass:klass});try{localStorage.setItem('br_accounts',JSON.stringify(reg));}catch(e){}
  const st={xp:0,level:1,coins:0,totalAns:0,totalCorrect:0,totalXP:0,streak:0,bestStreak:0,bestCombo:0,bossWins:0,lastDay:null,name:name,srs:{},unlocked:[],customDecks:[],classmates:[],muted:false,referralCount:0,profile:{role:'student',level:klass||'',avatar:'🦸',nickname:name,classNo:'',fav:'Not sure yet',school:'',email:'',password:'',theme:theme||'midnight',code:((name||'BR').slice(0,3).toUpperCase())+'-KID'},subscription:'free',track:'waec'};
  try{localStorage.setItem('br_state_'+id,JSON.stringify(st));}catch(e){}return id;}
function switchAccountTo(id){try{localStorage.setItem('br_active',id);}catch(e){}location.reload();}
function switchToParent(){const pin=localStorage.getItem('br_pin');if(pin){const e=prompt('Enter parent PIN to switch back:');if(e!==pin){toast('Wrong PIN.');return;}}switchAccountTo('main');}
function playAsChild(i){const c=S.children[i];if(!c)return;if(!c.acct){c.acct=createChildAccount(c.name,c.klass,(S.profile&&S.profile.theme));save();}switchAccountTo(c.acct);}
function setParentPin(){const v=(document.getElementById('parentPin')||{}).value||'';if(v&&!/^\d{4}$/.test(v)){toast('PIN must be 4 digits.');return;}try{if(v)localStorage.setItem('br_pin',v);else localStorage.removeItem('br_pin');}catch(e){}toast(v?'🔒 Parent PIN set.':'PIN cleared.');}
function renderParent(){const w=document.getElementById('teacherWrap');if(!w)return;S.children=S.children||[];
  const childOpts=S.children.length?S.children.map((c,i)=>'<option value="'+i+'">'+esc(c.name)+'</option>').join(''):'<option value="">— add a child first —</option>';
  const subj=ASSIGN_SUBJECTS.map(id=>{const d=deckById(id);if(!d)return '';return '<button class="onb-chip'+(tAssign.includes(id)?' sel':'')+'" onclick="tToggle(\''+id+'\')">'+esc(d.name)+'</button>';}).join('');
  const kids=S.children.length?S.children.map((c,i)=>{let r=c.report;
    if(c.acct){const st=readChildState(c.acct);if(st){const acc=st.totalAns?Math.round(st.totalCorrect/st.totalAns*100):0;r={level:st.level,acc:acc,total:st.totalAns,completed:childCompleted(st.srs)};}}
    const prog=r?('Level '+r.level+' • '+r.acc+'% accuracy • '+r.total+' answered'):'No progress yet';
    const done=(r&&r.completed&&r.completed.length)?('<div class="sub" style="margin-top:6px;color:var(--green)">✅ Completed ('+r.completed.length+'): '+r.completed.map(esc).join(', ')+'</div>'):'<div class="sub" style="margin-top:6px">No completed courses yet.</div>';
    return '<div class="deck" style="cursor:default"><h3>🧒 '+esc(c.name)+'</h3><p>'+esc(c.klass||'')+(c.acct?' • plays on this phone':'')+'</p><div class="sub" style="margin-top:6px">'+prog+'</div>'+done+
      '<div class="row-actions" style="margin-top:8px"><button class="btn gold sm" onclick="playAsChild('+i+')">▶ '+(c.acct?'Play as '+esc(c.name):'Set up on this phone')+'</button><button class="btn ghost sm" onclick="removeChild('+i+')">Remove</button></div>'+
      (c.acct?'':'<div class="typebox" style="margin-top:8px"><input id="pc'+i+'" placeholder="Or paste progress code (SQP-…)"><button class="btn sm" onclick="updateChild('+i+')">Update</button></div>')+
      '</div>';}).join(''):'<div class="empty">No children added yet — add your child below.</div>';
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'stats\')">← Profile</button><h2 class="title" style="margin-top:10px">👨‍👩‍👧 Parent Dashboard</h2><p class="sub">See your children, the courses they have completed, and assign new ones. You don\'t take the quizzes yourself.</p></div>'+
    '<div class="panel"><h2 class="title">🧒 My Children</h2><div class="deckgrid">'+kids+'</div>'+
    '<hr style="border-color:var(--line);margin:14px 0"><label>Add a child</label><div class="typebox"><input id="chName" placeholder="Child\'s name"><input id="chClass" placeholder="Class e.g. JSS2" style="max-width:130px"><button class="btn sm gold" onclick="addChild()">Add</button></div>'+
    '<hr style="border-color:var(--line);margin:14px 0"><label>Parent PIN (protects switching back from a child)</label><div class="typebox"><input id="parentPin" type="password" inputmode="numeric" placeholder="4-digit PIN" style="max-width:150px"><button class="btn sm" onclick="setParentPin()">Save PIN</button></div></div>'+
    '<div class="panel"><h2 class="title">📚 Assign courses</h2><p class="sub">Choose a child, pick subjects, then share the code on WhatsApp for them to load.</p>'+
    '<div class="field"><label>Child</label><select id="asgChild">'+childOpts+'</select></div><div class="onb-chips">'+subj+'</div>'+
    '<div class="field" style="margin-top:10px"><label>Note (optional)</label><input id="tNote" placeholder="e.g. Finish before Sunday"></div>'+
    '<button class="btn gold block" onclick="parentAssign()">📲 Create & share on WhatsApp</button></div>'+
    '<div class="panel"><h2 class="title">📥 How to see their progress</h2><p class="sub">Ask your child to open Study Egg → Profile → <b>📤 Share my progress</b> and send you the code. Paste it on their card above to see completed courses. (With cloud sign-in, this updates automatically.)</p></div>';}
(function(){const ex=document.getElementById('exportData');if(ex)ex.onclick=exportData;const im=document.getElementById('importData');if(im)im.onchange=e=>{if(e.target.files&&e.target.files[0])importData(e.target.files[0]);};})();
