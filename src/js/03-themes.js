
/* ============ THEMES ============ */
const THEMES={
  midnight:{bg:'#0b0b0f',bg2:'#111116',card:'#16161c',card2:'#1c1c24',txt:'#f2f2f5',muted:'#8d8d9b',line:'#26262f',accent:'#d4ff3a',accent2:'#c4f028',gold:'#e8c547',green:'#3ddc84',red:'#ff5a5f',blue:'#8b9bff',chip:'#1f1f28',ring:'#2a2a34',glow1:'#1a1433',glow2:'#0d1410'},
  egg:{bg:'#fff7e9',bg2:'#fdeecd',card:'#ffffff',card2:'#fff6e2',txt:'#3f3016',muted:'#94805c',line:'#efe1c0',accent:'#e08600',accent2:'#f5b301',gold:'#c47f00',green:'#1aa56a',red:'#e5484d',blue:'#4f7cff',chip:'#fbedcf',ring:'#efe1c0',glow1:'#ffe9c2',glow2:'#fff3d6'},
  starry:{bg:'#0b1024',bg2:'#121a3a',card:'#172149',card2:'#1f2c63',txt:'#eef2ff',muted:'#a3b3e6',line:'#28356b',accent:'#6a8cff',accent2:'#46d6ff',gold:'#ffd86b',green:'#4ade80',red:'#fb7185',blue:'#60a5fa',chip:'#202c5e',ring:'#2d3b70',glow1:'#1b2a72',glow2:'#103a55'},
  pink:{bg:'#fff5fb',bg2:'#ffe6f3',card:'#ffffff',card2:'#fff5fb',txt:'#3a1f33',muted:'#a86b8c',line:'#f7d6e7',accent:'#ff4fa3',accent2:'#ff79bd',gold:'#d98a00',green:'#1aa56a',red:'#e5484d',blue:'#5b8cff',chip:'#ffe0f0',ring:'#f7d6e7',glow1:'#ffd9ec',glow2:'#ffeaf4'},
  venom:{bg:'#0a0b0f',bg2:'#13151d',card:'#181b24',card2:'#20242f',txt:'#eef2f6',muted:'#9aa3b2',line:'#272c38',accent:'#22e07a',accent2:'#9affc9',gold:'#d6e24a',green:'#22e07a',red:'#ff5d73',blue:'#6ad0ff',chip:'#1f2530',ring:'#2a313d',glow1:'#06281b',glow2:'#13161d'},
  goblin:{bg:'#0c1710',bg2:'#122418',card:'#163020',card2:'#1d4029',txt:'#eafff0',muted:'#a0cfaa',line:'#27512f',accent:'#3fbf57',accent2:'#bff04d',gold:'#e0e84a',green:'#5fe06a',red:'#ff6f6f',blue:'#5bd0a0',chip:'#1d3a26',ring:'#2a4d33',glow1:'#11401f',glow2:'#0c3a2e'},
  cloudy:{bg:'#f2f5fb',bg2:'#e9edf7',card:'#ffffff',card2:'#f7f9fe',txt:'#1b2236',muted:'#6b7390',line:'#e2e7f2',accent:'#4f7cff',accent2:'#22b8c9',gold:'#cf8a00',green:'#15a86a',red:'#e5484d',blue:'#4f7cff',chip:'#eef1fa',ring:'#e2e7f2',glow1:'#e3ecff',glow2:'#dcf4f7'},
  orange:{bg:'#fff6ec',bg2:'#ffe9d6',card:'#ffffff',card2:'#fff6ec',txt:'#3a2410',muted:'#9c7a55',line:'#f6e0c8',accent:'#ff7a1a',accent2:'#ff9a3d',gold:'#cf7a00',green:'#15a86a',red:'#e5484d',blue:'#ff9a3d',chip:'#ffe6d0',ring:'#f6e0c8',glow1:'#ffe2c2',glow2:'#fff0dc'}
};
const THEME_LIST=[['midnight','Midnight Focus','🌙'],['egg','Study Egg','🥚'],['starry','Starry Blue','🌌'],['pink','Barbie Pink','💖'],['venom','Venom Black','🕷️'],['goblin','Goblin Green','👹'],['cloudy','Cloudy White','☁️'],['orange','Orange Wonder','🍊']];
function applyTheme(id){if(!THEMES[id])id='midnight';const t=THEMES[id];for(const k in t){document.documentElement.style.setProperty('--'+k,t[k]);}document.documentElement.setAttribute('data-theme',id);try{const mc=document.querySelector('meta[name="theme-color"]');if(mc)mc.setAttribute('content',t.bg);}catch(e){}}
function buildThemeSwatches(container,current,onpick){if(!container)return;container.innerHTML='';
  const owned=S.ownedThemes||['midnight','egg','starry','cloudy','goblin'];
  THEME_LIST.filter(([id])=>owned.includes(id)).forEach(([id,name,emo])=>{const t=THEMES[id];const el=document.createElement('div');el.className='onb-theme'+(id===current?' sel':'');
    el.innerHTML='<span class="onb-sw" style="background:linear-gradient(135deg,'+t.accent+','+t.accent2+')"></span><b>'+emo+' '+name+'</b>';
    el.onclick=()=>onpick(id);container.appendChild(el);});
  const more=document.createElement('div');more.className='onb-sub';more.style.cssText='grid-column:1/-1;margin:2px 0 0';more.innerHTML='🔒 Unlock more themes in the 🛒 Shop with coins.';container.appendChild(more);}

/* ============ LEVEL TAILORING ============ */
var playLevel='auto';
function studentBand(){const lv=(S.profile&&S.profile.level)||'';if(/^ss|senior/i.test(lv))return 'senior';if(/^jss|primary|junior/i.test(lv))return 'junior';return 'all';}
function effectiveBand(){return playLevel==='auto'?studentBand():playLevel;}
function cardOK(card){const b=effectiveBand();if(b==='all'||!b)return true;if(!card.band)return true;return card.band===b;}
function renderLevelSel(){const c=document.getElementById('lvlSel');if(!c)return;
  const opts=[['auto','🎯 My level'],['junior','📗 Easier'],['senior','📕 Harder'],['all','All']];
  c.innerHTML='';opts.forEach(([v,lab])=>{const b=document.createElement('button');b.className='onb-chip'+(playLevel===v?' sel':'');b.textContent=lab;
    b.onclick=()=>{playLevel=v;renderLevelSel();};c.appendChild(b);});
  const eb=effectiveBand();const cnt=pendingDeck?pendingDeck.cards.filter(cardOK).length:0;
  const lab={junior:'foundation / JSS',senior:'advanced / SS',all:'all levels'}[eb]||'your';
  const note=document.getElementById('lvlNote');if(note)note.textContent='Showing '+cnt+' question'+(cnt!==1?'s':'')+' • '+lab+'.';}

/* ============ ONBOARDING ============ */
var OB={role:'student',level:'',avatar:'🦸',theme:'midnight',editing:false,track:'waec',quiz:{areas:[]}};
const AV_LIST=['🦸','🐉','🦊','🥚','🐱','🦄','⚡','🌟','🧠','🎮','🦁','🐧','🌈','👑','🤖','🍀'];
function goStep(s){document.querySelectorAll('#onboard .onb-step').forEach(x=>x.classList.toggle('active',x.dataset.step===String(s)));const b=document.querySelector('#onboard .onb-box');if(b)b.scrollTop=0;}
const INTRO_SLIDES=[
 {e:'🎮',t:'Learning, but make it a game',x:'Answer questions to earn XP, coins, streaks and badges — revision you actually look forward to.'},
 {e:'⚔️',t:'Practice or Boss Battle',x:'Study calmly, or beat the clock in timed Boss Battles for double rewards.'},
 {e:'📚',t:'Everything in one place',x:'WAEC, JAMB, JSS, University, ICAN, CIBN, trades, languages and career skills — thousands of questions.'},
 {e:'✨',t:'Make your own quizzes',x:'Snap a photo of past questions and AI turns them into a game you can share with friends.'},
 {e:'🏆',t:'Compete & earn certificates',x:'Climb the leaderboard with friends and print certificates as you master topics.'}
];
let introIdx=0;
function renderIntro(){const s=INTRO_SLIDES[introIdx];const el=document.getElementById('introSlide');if(!el)return;
  const dots=INTRO_SLIDES.map((_,i)=>'<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 3px;background:'+(i===introIdx?'var(--accent)':'var(--line)')+'"></span>').join('');
  el.innerHTML='<div style="font-size:64px;margin-top:8px">'+s.e+'</div><h2 style="font-size:23px;margin:8px 0 6px">'+s.t+'</h2><p class="onb-sub" style="font-size:15px">'+s.x+'</p><div style="margin:14px 0">'+dots+'</div>';
  const nb=document.getElementById('introNext');if(nb)nb.textContent=introIdx>=INTRO_SLIDES.length-1?'🥚 Get started':'Next →';}
function introNext(){if(introIdx>=INTRO_SLIDES.length-1)goStep(0);else{introIdx++;renderIntro();}}
(function(){const n=document.getElementById('introNext');if(n)n.onclick=introNext;const sk=document.getElementById('introSkip');if(sk)sk.onclick=()=>goStep(0);})();
function showOnboard(){document.getElementById('onboard').classList.remove('hidden');introIdx=0;if(window.renderIntro){renderIntro();goStep('intro');}else goStep(0);}
function hideOnboard(){document.getElementById('onboard').classList.add('hidden');}
function obErr(id,msg){const e=document.getElementById(id);if(e)e.textContent=msg;}
function levelOptions(){if(OB.role==='teacher')return ['Junior (JSS)','Senior (SS)','Both'];return ['Primary','JSS1','JSS2','JSS3','SS1','SS2','SS3'];}
function buildLevels(){const q=document.getElementById('lvlQ');const c=document.getElementById('lvlChips');if(!q||!c)return;c.innerHTML='';
  if(OB.role==='parent'){q.textContent='Add your child / children';OB.children=OB.children||[];
    const list=document.createElement('div');list.style.cssText='width:100%;display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px';
    list.innerHTML=OB.children.length?OB.children.map(k=>'<span class="chip">🧒 '+esc(k.name)+(k.klass?' • '+esc(k.klass):'')+'</span>').join(''):'<span class="onb-sub">No child added yet.</span>';c.appendChild(list);
    const wrap=document.createElement('div');wrap.style.cssText='width:100%';
    wrap.innerHTML='<input id="obChildN" placeholder="Child\'s name"><input id="obChildC" placeholder="Class e.g. JSS2" style="margin-top:6px"><button class="btn sm gold" style="margin-top:8px" id="obAddChild">+ Add child</button><button class="btn block" style="margin-top:10px" id="obKidsNext">Continue →</button>';c.appendChild(wrap);
    document.getElementById('obAddChild').onclick=()=>{const n=(document.getElementById('obChildN').value||'').trim();const k=(document.getElementById('obChildC').value||'').trim();if(!n){toast('Enter a name.');return;}OB.children.push({name:n,klass:k,report:null});buildLevels();};
    document.getElementById('obKidsNext').onclick=()=>{if(!OB.children.length){toast('Add at least one child.');return;}OB.level=OB.children[0].klass||'';buildDetails();goStep(3);};
  } else if(OB.role==='teacher'){q.textContent='Name your first class';
    const wrap=document.createElement('div');wrap.style.cssText='width:100%';
    wrap.innerHTML='<input id="obClassName" placeholder="e.g. SS2 Science A" value="'+esc(OB.className||'')+'"><button class="btn block" style="margin-top:10px" id="obClassNext">Continue →</button>';c.appendChild(wrap);
    document.getElementById('obClassNext').onclick=()=>{OB.className=(document.getElementById('obClassName').value||'').trim()||'My Class';buildDetails();goStep(3);};
  } else if(OB.role==='teacher'){q.textContent='Which levels do you teach?';
    levelOptions().forEach(function(l){var b=document.createElement('button');b.className='onb-chip'+(OB.level===l?' sel':'');b.textContent=l;b.onclick=function(){OB.level=l;startQuiz();};c.appendChild(b);});
  } else {q.textContent='Where are you in your learning journey?';
    var BL_G=[{h:'📘 Secondary school',items:[{l:'Primary',tk:'waec',bd:'junior'},{l:'JSS1',tk:'waec',bd:'junior'},{l:'JSS2',tk:'waec',bd:'junior'},{l:'JSS3',tk:'waec',bd:'junior'},{l:'SS1',tk:'waec',bd:'senior'},{l:'SS2',tk:'waec',bd:'senior'},{l:'SS3',tk:'waec',bd:'senior'},{l:'JAMB / UTME',tk:'jamb',bd:'senior'}]},{h:'🎓 Higher & professional',items:[{l:'University',tk:'uni'},{l:'ICAN',tk:'ican'},{l:'CIBN',tk:'cibn'}]},{h:'🛠️ Skills & vocational',items:[{l:'Vocational & Trades',tk:'voc'},{l:'Virtual Assistant',tk:'va'},{l:'Product Management',tk:'pm'},{l:'Content Creation',tk:'cc'},{l:'Nigerian Languages',tk:'lang'}]}];
    BL_G.forEach(function(g){var h=document.createElement('div');h.textContent=g.h;h.style.cssText='width:100%;font-size:12px;font-weight:800;color:var(--accent2);margin:12px 0 2px';c.appendChild(h);g.items.forEach(function(o){var b=document.createElement('button');b.className='onb-chip'+(OB.level===o.l?' sel':'');b.textContent=o.l;b.onclick=function(){OB.level=o.l;OB.track=o.tk;OB.band=o.bd||'';if(OB.guest){enterAsGuest();return;}startQuiz();};c.appendChild(b);});});
  }}
function buildDetails(){const ap=document.getElementById('avatarPick');
  if(ap&&!ap.dataset.built){AV_LIST.forEach(a=>{const b=document.createElement('div');b.className='onb-av'+(a===OB.avatar?' sel':'');b.textContent=a;
    b.onclick=()=>{OB.avatar=a;[...ap.children].forEach(c=>c.classList.toggle('sel',c.textContent===a));};ap.appendChild(b);});ap.dataset.built='1';}
  const fav=document.getElementById('pFav');
  if(fav&&!fav.dataset.built){let names=['Not sure yet'];CATS.forEach(c=>c.decks.forEach(d=>names.push(d.name)));
    fav.innerHTML=names.map(n=>'<option>'+n+'</option>').join('');fav.dataset.built='1';}
  const R=OB.role,g=id=>document.getElementById(id),sh=(el,on)=>{if(el)el.style.display=on?'':'none';};
  const title=g('pTitle'),sub=g('pSubtitle'),nickLbl=g('pNickLbl'),nick=g('pNick'),row=g('pStudentRow'),schoolF=g('pSchoolField'),schoolLbl=g('pSchoolLbl'),school=g('pSchool');
  if(R==='parent'){
    if(title)title.textContent='Create your parent account';
    if(sub)sub.textContent='This is your own login — the child(ren) you added will show on your dashboard.';
    if(nickLbl)nickLbl.textContent='Your name';if(nick)nick.placeholder='e.g. Mrs. Okoro';
    sh(row,false);sh(schoolF,false);
  }else if(R==='teacher'){
    if(title)title.textContent='Create your teacher account';
    if(sub)sub.textContent='This is your own login — your class “'+(OB.className||'My Class')+'” is already set up.';
    if(nickLbl)nickLbl.textContent='Your name';if(nick)nick.placeholder='e.g. Mr. Bello';
    sh(row,false);sh(schoolF,true);if(schoolLbl)schoolLbl.textContent='School / institution (optional)';if(school)school.placeholder='Your school or centre';
  }else{
    if(title)title.textContent='Create your profile';
    if(sub)sub.textContent='Pick an avatar and tell us a little about you.';
    if(nickLbl)nickLbl.textContent='Nickname';if(nick)nick.placeholder='e.g. Maths Ninja';
    sh(row,true);sh(schoolF,true);if(schoolLbl)schoolLbl.textContent='School (optional)';if(school)school.placeholder='Your school';
  }
  const bk=g('pBack');if(bk)bk.onclick=()=>goStep(R==='student'?'interest':2);}
function pickThemeOnb(id){OB.theme=id;applyTheme(id);buildThemeSwatches(document.getElementById('themePick'),id,pickThemeOnb);}
function buildThemeStep(){buildThemeSwatches(document.getElementById('themePick'),OB.theme,pickThemeOnb);}
function genCode(nick){const base=((nick||'SQ').replace(/[^a-zA-Z]/g,'').slice(0,3).toUpperCase())||'SQ';const r=Math.random().toString(36).slice(2,6).toUpperCase();return base+'-'+r;}
function roleWelcome(){return {student:"Let's make studying a game. Pick a deck to start your quest!",parent:"Your child's learning, gamified. Explore the decks together!",teacher:"A ready revision tool for your class — share your code to build a leaderboard!"}[OB.role]||"Let's go!";}
/* ---- interest mini-quiz (students only) ---- */
const QUIZ_Q=[
 {k:'goal',multi:false,q:'What are you studying for right now?',opts:[
   {e:'📘',t:'Secondary exams',s:'WAEC / NECO',v:'waec'},
   {e:'🎯',t:'JAMB / UTME',s:'University entrance',v:'jamb'},
   {e:'🎓',t:'University courses',s:'Degree level',v:'uni'},
   {e:'🧮',t:'Professional exams',s:'ICAN / CIBN',v:'ican'},
   {e:'🛠️',t:'A trade or skill',s:'Hands-on & vocational',v:'voc'},
   {e:'🗣️',t:'A Nigerian language',s:'Igbo · Yoruba · Hausa',v:'lang'}
 ]},
 {k:'areas',multi:true,q:'Which areas excite you most?',hint:'Tap as many as you like.',opts:[
   {e:'🔬',t:'Sciences',v:'science'},{e:'📖',t:'Arts & Humanities',v:'arts'},
   {e:'💼',t:'Business & Commerce',v:'commerce'},{e:'🗣️',t:'Languages',v:'languages'},
   {e:'💻',t:'Tech & Digital',v:'tech'},{e:'🎬',t:'Creative & Media',v:'media'},
   {e:'🛠️',t:'Trades & Crafts',v:'trades'},{e:'💪',t:'Life & Money skills',v:'life'}
 ]},
 {k:'style',multi:false,q:'How do you like to learn?',opts:[
   {e:'🧘',t:'Calm practice',s:'Learn at my own pace',v:'practice'},
   {e:'⚔️',t:'Boss battles',s:'Beat the clock for rewards',v:'boss'},
   {e:'🎛️',t:'A mix of both',s:'Switch it up',v:'mix'}
 ]}
];
let quizIdx=0;
function startQuiz(){quizIdx=0;OB.quiz={areas:[]};OB.track='waec';renderQuiz();goStep('interest');}
function renderQuiz(){const w=document.getElementById('quizWrap');if(!w)return;const Q=QUIZ_Q[quizIdx];
  const sub=document.getElementById('quizSub');if(sub)sub.textContent='Question '+(quizIdx+1)+' of '+QUIZ_Q.length+' — quick taps to personalise your app.';
  const dots=QUIZ_Q.map((_,i)=>'<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 3px;background:'+(i<=quizIdx?'var(--accent)':'var(--line)')+'"></span>').join('');
  let opts;
  if(Q.multi){opts='<div class="onb-chips">'+Q.opts.map(o=>{const on=OB.quiz.areas.indexOf(o.v)>-1;return '<button class="onb-chip quiz-opt'+(on?' sel':'')+'" data-v="'+o.v+'">'+o.e+' '+o.t+'</button>';}).join('')+'</div>';}
  else{const chosen=OB.quiz[Q.k];opts='<div class="onb-cards">'+Q.opts.map(o=>{const on=chosen===o.v;return '<button class="onb-card quiz-opt" data-v="'+o.v+'" style="'+(on?'border-color:var(--accent);box-shadow:inset 0 0 0 2px var(--accent)':'')+'"><span>'+o.e+'</span><div><b>'+o.t+'</b>'+(o.s?'<i>'+o.s+'</i>':'')+'</div></button>';}).join('')+'</div>';}
  w.innerHTML='<div style="text-align:center;margin:2px 0 12px">'+dots+'</div><h3 style="margin:0 0 4px;font-size:19px">'+Q.q+'</h3>'+(Q.hint?'<p class="onb-sub" style="margin:0 0 10px">'+Q.hint+'</p>':'<div style="height:6px"></div>')+opts+
    '<div class="onb-nav"><button class="onb-link" id="quizBack">← Back</button>'+(Q.multi?'<button class="btn" id="quizNext">Next →</button>':'')+'</div>';
  w.querySelectorAll('.quiz-opt').forEach(b=>b.onclick=()=>{const v=b.dataset.v;
    if(Q.multi){const a=OB.quiz.areas,i=a.indexOf(v);if(i>-1)a.splice(i,1);else a.push(v);renderQuiz();}
    else{OB.quiz[Q.k]=v;if(Q.k==='goal')OB.track=v;quizAdvance();}});
  const nx=document.getElementById('quizNext');if(nx)nx.onclick=quizAdvance;
  const bk=document.getElementById('quizBack');if(bk)bk.onclick=()=>{if(quizIdx===0)goStep(2);else{quizIdx--;renderQuiz();}};}
function quizAdvance(){if(quizIdx>=QUIZ_Q.length-1){buildDetails();goStep(3);}else{quizIdx++;renderQuiz();}}

document.getElementById('obStart').onclick=()=>goStep(1);
document.getElementById('obSignin').onclick=()=>goStep('signin');
document.querySelectorAll('#onboard [data-go]').forEach(b=>b.onclick=()=>goStep(b.dataset.go));
document.querySelectorAll('#onboard [data-role]').forEach(b=>b.onclick=()=>{OB.role=b.dataset.role;OB.level='';OB.children=[];OB.className='';buildLevels();goStep(2);});
document.getElementById('obToTheme').onclick=()=>{
  const nick=document.getElementById('pNick').value.trim(),email=document.getElementById('pEmail').value.trim(),pass=document.getElementById('pPass').value;
  if(!nick)return obErr('pErr',OB.role==='student'?'Please enter a nickname.':'Please enter your name.');
  if(!/^\S+@\S+\.\S+$/.test(email))return obErr('pErr','Enter a valid email address.');
  if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pass))return obErr('pErr','Password needs 8+ characters with a capital letter, a number and a special character.');
  obErr('pErr','');OB.nick=nick;OB.email=email;OB.pass=pass;
  OB.classNo=document.getElementById('pClass').value.trim();OB.fav=document.getElementById('pFav').value;OB.school=document.getElementById('pSchool').value.trim();
  buildThemeStep();goStep(4);};
document.getElementById('obToRef').onclick=()=>goStep(5);
document.getElementById('obFinish').onclick=()=>{
  const ref=document.getElementById('pRef').value.trim();
  if(OB.editing&&S.profile){Object.assign(S.profile,{role:OB.role,level:OB.level,avatar:OB.avatar,nickname:OB.nick,classNo:OB.classNo,fav:OB.fav,school:OB.school,email:OB.email,password:OB.pass,theme:OB.theme});
    S.name=OB.nick;applyTheme(OB.theme);save();hideOnboard();renderHUD();show('stats');toast('Profile updated!');OB.editing=false;return;}
  if(S.referralCount==null)S.referralCount=0;
  S.profile={role:OB.role,level:OB.level,avatar:OB.avatar,nickname:OB.nick,classNo:OB.classNo,fav:OB.fav,school:OB.school,email:OB.email,password:OB.pass,theme:OB.theme,code:genCode(OB.nick)};
  S.profile.interests=(OB.quiz&&OB.quiz.areas)||[];S.profile.learnStyle=(OB.quiz&&OB.quiz.style)||'mix';
  if(OB.role==='student'){const _t=TRACKS.find(x=>x.id===OB.track);S.track=OB.track||'waec';}
  if(OB.role==='parent')S.children=OB.children||[];
  if(OB.role==='teacher')S.profile.className=OB.className||'My Class';
  S.name=OB.nick;applyTheme(OB.theme);save();
  if(window.CLOUD&&CLOUD.online)CLOUD.signup(S.profile,OB.pass,ref);
  addXP(50);addCoins(30);
  if(ref){addXP(100);addCoins(50);toast('🎁 Friend code applied! +100 XP, +50 🪙');}
  const _cc=(document.getElementById('pClassCode')||{}).value||'';if(_cc&&window.decAssign){const _o=decAssign(_cc);if(_o&&_o.d){S.assignments=S.assignments||[];S.assignments.unshift({n:_o.n,d:_o.d,note:_o.note||''});}}
  touchStreak();hideOnboard();confetti();renderHUD();renderDecks();applyRoleUI();show(isEducator()?'teacher':'home');
  let wmsg=roleWelcome();if(OB.role==='student'){const tn=((TRACKS.find(x=>x.id===S.track)||{}).name)||'WAEC / NECO';wmsg="We've set you up on "+tn+" to match your goal — tap the bar at the top anytime to explore other areas. "+wmsg;}
  setTimeout(()=>showPopup('🎉','Welcome, '+OB.nick+'!',wmsg),600);};
document.getElementById('siGo').onclick=async()=>{
  const em=document.getElementById('siEmail').value.trim().toLowerCase(),pw=document.getElementById('siPass').value;
  if(window.CLOUD&&CLOUD.online){const ok=await CLOUD.signin(em,pw);if(ok){hideOnboard();renderHUD();show('home');toast('Welcome back!');return;}}
  if(S.profile&&em===String(S.profile.email).toLowerCase()&&pw===S.profile.password){
    applyTheme(S.profile.theme||'midnight');hideOnboard();renderHUD();show('home');toast('Welcome back, '+S.profile.nickname+'!');}
  else obErr('siErr',(window.CLOUD&&CLOUD.online)?'Email or password is incorrect.':(S.profile?'Email or password is incorrect.':'No profile found on this device yet — tap Get started.'));};
{const g=document.getElementById('siGoogle');if(g)g.onclick=()=>{if(window.CLOUD&&CLOUD.googleSignIn)CLOUD.googleSignIn();else obErr('siErr','Connect cloud first (Profile → Data & Backup).');};}
{const os=document.getElementById('siOtpSend');if(os)os.onclick=async()=>{const em=(document.getElementById('siEmail').value||'').trim();if(!/^\S+@\S+\.\S+$/.test(em)){obErr('siErr','Type your email above first.');return;}if(window.CLOUD&&CLOUD.online){const ok=await CLOUD.sendOtp(em);if(ok)document.getElementById('siOtpBox').classList.remove('hidden');}else obErr('siErr','Connect cloud first (Profile → Data & Backup).');};}
{const ov=document.getElementById('siOtpVerify');if(ov)ov.onclick=async()=>{const em=(document.getElementById('siEmail').value||'').trim();const code=(document.getElementById('siOtpCode').value||'').trim();if(window.CLOUD&&CLOUD.online){const ok=await CLOUD.verifyOtp(em,code);if(ok){hideOnboard();renderHUD();show('home');toast('Welcome!');}else obErr('siErr','Code incorrect or expired.');}};}

/* ============ PROFILE VIEW ============ */
function profPickTheme(id){if(S.profile){S.profile.theme=id;save();}applyTheme(id);buildThemeSwatches(document.getElementById('profThemes'),id,profPickTheme);}
function renderProfile(){renderStats();const p=S.profile||{};
  document.getElementById('pvAvatar').textContent=p.avatar||'🎓';
  document.getElementById('pvNick').textContent=p.nickname||S.name||'Player';
  const roleN={student:'🎓 Student',parent:'👨‍👩‍👧 Parent',teacher:'🧑‍🏫 Teacher'}[p.role]||'🎓 Student';
  let chips=[roleN];if(p.level)chips.push('📚 '+p.level);if(p.classNo)chips.push('🔖 '+p.classNo);if(p.fav&&p.fav!=='Not sure yet')chips.push('⭐ '+p.fav);if(p.school)chips.push('🏫 '+p.school);
  document.getElementById('pvChips').innerHTML=chips.map(c=>'<span class="chip">'+esc(c)+'</span>').join('');
  document.getElementById('profCode').textContent=p.code||'—';
  document.getElementById('stRef').textContent=S.referralCount||0;
  buildThemeSwatches(document.getElementById('profThemes'),p.theme||'midnight',profPickTheme);}
document.getElementById('copyCode').onclick=()=>{const c=(S.profile&&S.profile.code)||'';if(navigator.clipboard)navigator.clipboard.writeText(c).catch(()=>{});toast('📋 Code copied: '+c);};
document.getElementById('editProf').onclick=()=>{const p=S.profile||{};OB={role:p.role||'student',level:p.level||'',avatar:p.avatar||'🦸',theme:p.theme||'midnight',editing:true};
  buildDetails();document.getElementById('pNick').value=p.nickname||'';document.getElementById('pClass').value=p.classNo||'';document.getElementById('pSchool').value=p.school||'';
  document.getElementById('pEmail').value=p.email||'';document.getElementById('pPass').value=p.password||'';
  const fav=document.getElementById('pFav');if(fav)fav.value=p.fav||'Not sure yet';
  [...document.getElementById('avatarPick').children].forEach(c=>c.classList.toggle('sel',c.textContent===(p.avatar||'🦸')));
  document.getElementById('onboard').classList.remove('hidden');goStep(3);};
document.getElementById('signOut').onclick=()=>{showOnboard();};

/* ============ HOME HERO + REACTIONS ============ */
const DAILY_GOAL=100;
function ensureDaily(){ const t=todayStr(); if(S.dailyDate!==t){ S.dailyDate=t; S.dailyXP=0; } }
function findDeckById(id){ let r=null; CATS.forEach(c=>c.decks.forEach(d=>{ if(d.id===id) r=d; })); (S.customDecks||[]).forEach(d=>{ if(d.id===id) r=d; }); return r; }
function renderHero(){
  const h=document.getElementById('heroWrap'); if(!h) return;
  ensureDaily();
  const name=(S.profile&&S.profile.nickname)||(S.name&&S.name!=='You'?S.name:'')||'there';
  const pct=Math.min(100,Math.round((S.dailyXP||0)/DAILY_GOAL*100));
  const done=(S.dailyXP||0)>=DAILY_GOAL;
  const last=S.lastDeckId?findDeckById(S.lastDeckId):null;
  const sub=done?'Daily goal smashed! 🎉 Keep the combo going.':(S.streak>0?('🔥 '+S.streak+'-day streak — ready for a quick quest?'):'Ready for a quick quest?');
  h.innerHTML='<div class="hero"><div class="hero-l">'+
      '<div class="hi">Hi, '+esc(name)+' <span class="wave">👋</span></div>'+
      '<div class="hsub">'+sub+'</div>'+
      (last?'<button class="btn sm hero-cta" id="heroContinue">▶ Continue '+esc(last.name)+'</button>':'')+
    '</div>'+
    '<div class="goalring" style="--g:'+pct+'%"><div class="goalmid"><b>'+(S.dailyXP||0)+'</b><span>/ '+DAILY_GOAL+' XP</span></div></div>'+
  '</div>';
  const c=document.getElementById('heroContinue'); if(c&&last) c.onclick=()=>openMode(last);
}
function floatXP(txt){ const e=document.createElement('div'); e.className='xpfloat'; e.textContent=txt; document.body.appendChild(e); setTimeout(()=>e.remove(),1000); }
function buddyReact(ok){ const b=document.querySelector('.buddy'); if(!b) return; b.classList.remove('bump','shake'); void b.offsetWidth; b.classList.add(ok?'bump':'shake'); setTimeout(()=>b.classList.remove('bump','shake'),600); }

/* ============ ROLE ============ */
function isEducator(){return S.profile&&(S.profile.role==='teacher'||S.profile.role==='parent');}
function applyRoleUI(){const d=document.getElementById('navDash');if(d)d.classList.toggle('hidden',!isEducator());}

/* ============ INIT ============ */
(function init(){
  if(S.referralCount==null)S.referralCount=0;
  buildDetails();
  if(S.profile){applyTheme(S.profile.theme||'midnight');S.name=S.profile.nickname||S.name;renderHUD();renderLeaderboard();}
  else{applyTheme('midnight');showOnboard();}
  renderHero();applyRoleUI();
  {const bp=document.getElementById('backParentBtn');if(bp){bp.classList.toggle('hidden',activeSlot()==='main');bp.onclick=()=>{if(window.switchToParent)switchToParent();};}}
  if(S.profile&&isEducator())show('teacher');
})();
