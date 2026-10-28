
/* ============ CAREER MINI-LESSONS ============ */
let lessonCat='va';
function lessonsBanner(t){const d=document.createElement('div');d.className='panel';
  d.innerHTML='<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><div style="font-size:30px">📖</div><div style="flex:1;min-width:160px"><h2 class="title" style="margin:0">Mini-lessons</h2><p class="sub" style="margin:2px 0 0">Learn the essentials first, then test yourself.</p></div><button class="btn gold" onclick="openLessons(\''+t+'\')">Open lessons</button></div>';
  return d;}
function openLessons(t){lessonCat=t;show('lessons');}
function renderLessons(){var w=document.getElementById('lessonWrap');if(!w)return;
  var course=(window.LESSONS&&LESSONS[lessonCat]);
  if(!course){w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'home\')">\u2190 Back</button><div class="empty">No lessons here yet.</div></div>';return;}
  var done=(typeof S!=='undefined'&&S.lessonsDone)||{};var total=course.items.length,doneN=0;
  var cards=course.items.map(function(l,i){var isDone=!!done[lessonCat+':'+i];if(isDone)doneN++;
    var tz=(l.intro||'');var teaser=tz.slice(0,90)+(tz.length>90?'\u2026':'');var mins=l.mins||3;
    return '<div id="blLsnCard'+i+'" class="deck'+(isDone?' lsn-card-done':'')+'" onclick="openLesson('+i+')"><div class="emoji">'+course.emoji+'</div><h3>'+esc(l.t)+'</h3><p>'+esc(teaser)+'</p><div class="meta"><span class="chip">Lesson '+(i+1)+'</span><span class="chip">\u23f1\ufe0f ~'+mins+' min</span>'+(isDone?'<span class="lsn-done-badge">\u2713 Done</span>':'')+'</div></div>';}).join('');
  var pct=total?Math.round(doneN/total*100):0;
  w.innerHTML='<div class="panel" id="blLsnHead"><button class="btn ghost sm" onclick="show(\'home\')">\u2190 Back</button>'+
    '<div class="lsn-hero" id="blLsnHero" style="margin-top:12px"><div class="em">'+course.emoji+'</div><h2>'+esc(course.name)+' \u2014 Mini-lessons</h2>'+
    '<p style="margin:2px 0 0;opacity:.92;font-size:13.5px">Short class notes you can read in a few minutes each. Read it, grab the key takeaways, try the exercise, then take the assessment for XP.</p>'+
    '<div class="meta2"><span>\ud83d\udcda '+total+' lessons</span><span>\u2705 '+doneN+' of '+total+' done</span></div>'+
    '<div class="lsn-prog" style="margin-top:12px"><i style="width:'+pct+'%"></i></div></div></div>'+
    '<div class="deckgrid" id="blLsnGrid">'+cards+'</div>';
  setTimeout(function(){if(window.blStartLessonTour)blStartLessonTour(false);},450);}
(function(){var s=document.createElement('style');s.textContent=
 '.lsn-head{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}'+
 '.lsn-intro{font-size:15.5px;line-height:1.6;color:var(--txt);background:var(--bg2);border-left:4px solid var(--accent);border-radius:10px;padding:12px 14px;margin:8px 0 4px}'+
 '.lsn-sec{margin:18px 0}'+
 '.lsn-sec h3{font-size:17px;margin:0 0 6px;color:var(--txt)}'+
 '.lsn-sec p{font-size:15px;line-height:1.68;color:var(--txt);margin:0;opacity:.92}'+
 '.lsn-eg{margin-top:9px;font-size:14px;line-height:1.55;color:var(--txt);background:var(--card2);border:1px dashed var(--line);border-radius:10px;padding:9px 12px}'+
 '.lsn-eg b{color:var(--accent);margin-right:6px;text-transform:uppercase;font-size:11px;letter-spacing:.4px}'+
 '.lsn-box{margin-top:18px;background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:12px 15px}'+
 '.lsn-box.try{border-style:dashed}'+
 '.lsn-box h4{margin:0 0 8px;font-size:15px;color:var(--txt)}'+
 '.lsn-box p{margin:0;font-size:15px;line-height:1.6;color:var(--txt);opacity:.95}'+
 '.lsn-prog{height:7px;background:var(--line);border-radius:5px;margin-top:18px;overflow:hidden}'+
 '.lsn-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2,var(--gold)));border-radius:5px}';
 document.head.appendChild(s);})();
function openLesson(i){var w=document.getElementById('lessonWrap');if(!w)return;var course=LESSONS[lessonCat];var l=course.items[i];var n=course.items.length;
  var done=(typeof S!=='undefined'&&S.lessonsDone)||{};var isDone=!!done[lessonCat+':'+i];
  var body='';
  if(l.sections&&l.sections.length){body=l.sections.map(function(sc){return '<div class="lsn-sec"><h3>'+esc(sc.h)+'</h3><p>'+esc(sc.p)+'</p>'+(sc.eg?'<div class="lsn-eg"><b>Example</b>'+esc(sc.eg)+'</div>':'')+'</div>';}).join('');}
  else if(l.points){body='<div class="lsn-secn">\ud83d\udcd8 In this lesson</div><div class="lsn-pts">'+l.points.map(function(pt,k){return '<div class="lsn-pt"><span class="n">'+(k+1)+'</span><p>'+esc(pt)+'</p></div>';}).join('')+'</div>';}
  var terms=(l.keyTerms&&l.keyTerms.length)?'<div class="lsn-secn">\ud83d\udd11 Key terms</div><div class="lsn-terms">'+l.keyTerms.map(function(t){return '<div class="lsn-term"><b>'+esc(t.t)+'</b> \u2014 '+esc(t.d)+'</div>';}).join('')+'</div>':'';
  var takeaways=(l.takeaways&&l.takeaways.length)?'<div class="lsn-box"><h4>\ud83c\udfaf Key takeaways</h4><ul class="patlist" style="margin-top:0">'+l.takeaways.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul></div>':'';
  var tryThis=l.tryThis?'<div class="lsn-box try"><h4>\u270d\ufe0f Try this</h4><p>'+esc(l.tryThis)+'</p></div>':'';
  var mins=l.mins||3;
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="renderLessons()">\u2190 All lessons</button>'+
    '<div class="lsn-hero" style="margin-top:12px"><div class="em">'+course.emoji+'</div><h2>'+esc(l.t)+'</h2>'+
    '<div class="meta2"><span>Lesson '+(i+1)+' of '+n+'</span><span>\u23f1\ufe0f ~'+mins+' min read</span><span>'+esc(course.name)+'</span>'+(isDone?'<span>\u2713 Completed</span>':'')+'</div></div>'+
    '<p class="lsn-lead">'+esc(l.intro)+'</p>'+body+terms+takeaways+tryThis+
    '<div class="row-actions" style="margin-top:18px">'+
      '<button class="btn '+(isDone?'ghost ':'gold ')+'sm" onclick="blMarkLesson(\''+lessonCat+'\','+i+')">'+(isDone?'\u2713 Completed':'\u2705 Mark as done')+'</button>'+
      '<button class="btn ghost sm" onclick="speakLesson('+i+')">\ud83d\udd0a Read aloud</button>'+
      (i>0?'<button class="btn ghost sm" onclick="openLesson('+(i-1)+')">\u2190 Previous</button>':'')+
      (i<n-1?'<button class="btn sm" onclick="openLesson('+(i+1)+')">Next lesson \u2192</button>':'')+
      '<button class="btn gold sm" onclick="lessonAssess()">\ud83d\udcdd Take the assessment</button></div>'+
    '<div class="lsn-prog"><i style="width:'+Math.round((i+1)/n*100)+'%"></i></div></div>';window.scrollTo({top:0,behavior:'smooth'});}
function speakLesson(i){const l=LESSONS[lessonCat].items[i];if(!window.speak)return;let parts=[l.t,l.intro];
  if(l.sections)l.sections.forEach(s=>{parts.push(s.h);parts.push(s.p);if(s.eg)parts.push('For example, '+s.eg);});
  else if(l.points)parts=parts.concat(l.points);
  if(l.takeaways&&l.takeaways.length){parts.push('Key takeaways.');parts=parts.concat(l.takeaways);}
  if(l.tryThis)parts.push('Try this. '+l.tryThis);
  speak(parts.join('. '));}
function lessonAssess(){const decks=(PRO_DECKS[lessonCat]||[]);if(decks.length&&window.openMode)openMode(decks[0]);else show('home');}

/* ================= Study Egg upgrade module ================= */
/* ---- Guest mode entry ---- */
function enterAsGuest(){
  try{
    if(S.referralCount==null)S.referralCount=0;
    var av=(typeof AV_LIST!=='undefined'&&AV_LIST.length)?AV_LIST[0]:'\U0001F393';
    var theme=(typeof OB!=='undefined'&&OB.theme)||'midnight';
    S.profile={role:'student',level:(typeof OB!=='undefined'&&OB.level)||'SS1',avatar:av,nickname:'Guest',classNo:'',fav:'',school:'',email:'',password:'',theme:theme,code:genCode('Guest'),interests:[],learnStyle:'mix',guest:true};
    S.guest=true; S.name='Guest';
    S.track=(typeof OB!=='undefined'&&OB.track)||'waec';
    applyTheme(theme); save();
    touchStreak(); hideOnboard(); renderHUD(); renderDecks(); applyRoleUI(); show('home');
    toast('\U0001F3AE Playing as guest — create a free account anytime to save your progress.');
    blRefreshGuestBanner();
    setTimeout(function(){blStartHomeTour(true);},700);
  }catch(e){ hideOnboard(); show('home'); }
}
(function(){var g=document.getElementById('obGuest'); if(g){g.onclick=function(){OB={role:'student',guest:true}; buildLevels(); goStep(2);};}})();

/* ---- Guest banner in Profile ---- */
function blRefreshGuestBanner(){
  var host=document.getElementById('view-stats'); if(!host)return;
  var b=document.getElementById('blGuestBanner');
  if(S&&S.guest){
    if(!b){
      b=document.createElement('div'); b.id='blGuestBanner'; b.className='bl-guest';
      var txt=document.createElement('div'); txt.style.cssText='flex:1;min-width:180px';
      txt.innerHTML='<b>\U0001F3AE You are playing as a guest</b><p class="sub">Your progress saves on this device. Create a free account to keep it safe and sync across phones.</p>';
      var btn=document.createElement('button'); btn.className='btn sm gold'; btn.textContent='Create free account';
      btn.onclick=function(){var e=document.getElementById('editProf'); if(e)e.click();};
      b.appendChild(txt); b.appendChild(btn); host.insertBefore(b,host.firstChild);
    }
    b.style.display='';
  } else if(b){ b.style.display='none'; }
}
(function(){document.querySelectorAll('.nav button[data-view="stats"]').forEach(function(btn){btn.addEventListener('click',function(){setTimeout(blRefreshGuestBanner,60);});});})();

/* ---- Accessibility: aria-labels on icon-only controls ---- */
(function(){
  var MAP={muteBtn:'Toggle sound',ttsBtn:'Read question aloud',backParentBtn:'Switch to parent',installBtn:'Install app',copyCode:'Copy my referral code',quitQuiz:'Exit quiz',obGuest:'Play as guest without signing up'};
  function pass(){
    document.querySelectorAll('button,[role="button"]').forEach(function(el){
      if(el.getAttribute('aria-label'))return;
      if(el.id&&MAP[el.id]){el.setAttribute('aria-label',MAP[el.id]);return;}
      if(el.classList&&el.classList.contains('del')){el.setAttribute('aria-label','Delete');return;}
      var t=(el.getAttribute('title')||'').trim();
      if(t){el.setAttribute('aria-label',t);}
    });
  }
  pass();
  var to; var mo=new MutationObserver(function(){clearTimeout(to);to=setTimeout(pass,300);});
  try{mo.observe(document.body,{childList:true,subtree:true});}catch(e){}
})();

/* ---- Lesson content enrichment (merged into LESSONS at load) ---- */
(function(){
  if(!window.LESSONS)return;
  var E={
    va:[
      {mins:3,takeaways:['A VA does admin, technical, or creative work remotely for busy clients.','You can start with no degree; reliability and clear communication matter most.','Decide early whether to be a generalist or to specialise in one niche.'],tryThis:'List five tasks you could handle for a client today, then name one niche you would enjoy specialising in, such as real estate or social media.',keyTerms:[{t:'Generalist',d:'A VA who offers a broad mix of services.'},{t:'Niche',d:'A focused specialty, for example a social-media VA.'}]},
      {mins:3,takeaways:['Master a few everyday tools well rather than many poorly.','Email, calendar, Google Workspace or Microsoft 365, and a scheduler are the core.','Use AI to draft faster, but always check the output before sending.'],tryThis:'Set up a free Calendly link and share a 30-minute booking slot with a friend to practise.',keyTerms:[{t:'Google Workspace',d:'Docs, Sheets, Drive and Gmail used to run a small business.'},{t:'Scheduler',d:'A tool like Calendly that lets clients book time automatically.'}]},
      {mins:3,takeaways:['Clear, reliable communication often beats perfect skills.','Confirm tasks, state deadlines plainly, and give proactive updates.','Protect client privacy and own mistakes with a fix, not excuses.'],tryThis:'Rewrite a long message you sent recently into three short lines: the key point, the deadline, and your next step.'},
      {mins:3,takeaways:['Plan tomorrow the night before so you start with clear priorities.','Batch similar tasks and block focus time to avoid constant switching.','Track your hours so you can bill accurately and plan realistic deadlines.'],tryThis:'Tonight, write your top three priorities for tomorrow before you close your laptop.',keyTerms:[{t:'Batching',d:'Grouping similar tasks, such as all emails, into one time block.'},{t:'Time tracking',d:'Logging hours with a tool like Toggl to bill and plan accurately.'}]},
      {mins:4,takeaways:['Build proof on platforms like Upwork and Fiverr, and reach out on LinkedIn.','Sell the result you deliver, not just your job title.','Always agree scope, rate, and payment terms in writing before you start.'],tryThis:'Draft a two-line profile headline that names your service and the result you give clients.',keyTerms:[{t:'Retainer',d:'A fixed monthly fee for an agreed set of ongoing work.'},{t:'Invoice',d:'A written request for payment stating the amount and due date.'}]}
    ],
    pm:[
      {mins:3,takeaways:['A PM decides what to build and why, then aligns the team to deliver it.','You own the problem and the vision; you do not usually code or design.','Saying no protects focus so you ship value, not half-features.'],tryThis:'Pick an app you use daily and write one sentence naming the user, their problem, and the outcome it delivers.',keyTerms:[{t:'Roadmap',d:'The plan of what to build and in what order.'},{t:'Stakeholder',d:'Anyone with an interest in the product, such as leadership or sales.'}]},
      {mins:3,takeaways:['Start from a real, well-understood problem, not a favourite solution.','Ask about past behaviour, because it is more honest than predictions.','Combine what users say with what the data shows before building.'],tryThis:'Interview one person for five minutes about how they solve a problem today, asking what they did last time rather than whether they would use your idea.',keyTerms:[{t:'Persona',d:'A short profile of a typical user and their goals.'},{t:'User journey',d:'The steps a user takes, showing where they get stuck.'}]},
      {mins:3,takeaways:['An MVP is the smallest release that solves the core problem and helps you learn.','MoSCoW sorts work into Must, Should, Could, and Will-not-have for now.','Do not mark everything a Must have; revisit priorities as you learn.'],tryThis:'Take a feature idea and split its parts into Must, Should, Could, and Will-not-have for a first release.',keyTerms:[{t:'MVP',d:'Minimum viable product, the smallest useful version you can ship.'},{t:'MoSCoW',d:'A Must, Should, Could, Will-not-have way to prioritise.'},{t:'Scope creep',d:'Uncontrolled growth of features beyond the plan.'}]},
      {mins:3,takeaways:['Agile means building in small increments and adapting to feedback.','Scrum works in short sprints, usually one to two weeks, from a prioritised backlog.','Stand-ups, reviews, and retrospectives keep the team aligned.'],tryThis:'Write a mini backlog of five tasks for a personal project and pick the top two for a one-week sprint.',keyTerms:[{t:'Sprint',d:'A short, fixed work cycle, often one to two weeks.'},{t:'Backlog',d:'The prioritised list of everything you might build.'},{t:'Retrospective',d:'A team review of how to work better next time.'}]},
      {mins:3,takeaways:['Pick a few meaningful KPIs instead of tracking everything.','Retention usually matters more than a one-time spike in sign-ups.','Beware vanity metrics that look good but do not reflect real value.'],tryThis:'For a product you like, name one KPI that would prove it is succeeding and one vanity metric to ignore.',keyTerms:[{t:'KPI',d:'Key performance indicator, a number that shows if you are hitting a goal.'},{t:'Retention',d:'The share of users who keep coming back.'},{t:'Churn',d:'The rate at which users stop using the product.'}]}
    ],
    cc:[
      {mins:3,takeaways:['Pick a niche where your interest, your skill, and audience demand overlap.','A focused niche grows faster than a general account.','Start on one or two platforms, then repurpose to others.'],tryThis:'Write your niche in one line: I make a chosen format about a chosen topic for a chosen audience.',keyTerms:[{t:'Niche',d:'A focused topic that tells viewers what to expect.'},{t:'Repurpose',d:'Reshaping one piece of content to fit other platforms.'}]},
      {mins:3,takeaways:['The first three seconds decide whether people keep watching.','Keep one core idea per piece and write the way you talk.','End with a clear call to action.'],tryThis:'Write three different opening hooks for the same video idea, then pick the strongest.',keyTerms:[{t:'Hook',d:'The opening line that stops the scroll.'},{t:'Call to action',d:'A clear instruction like follow, comment, or watch next.'}]},
      {mins:3,takeaways:['Your phone is enough; good light and clear sound beat fancy gear.','Face the light, record in a quiet space, and keep the shot steady.','Add captions, because many people watch with the sound off.'],tryThis:'Film a 20-second clip facing a window, then add captions in a free app like CapCut.',keyTerms:[{t:'Short-form',d:'Vertical clips for TikTok, Reels, or Shorts.'},{t:'Captions',d:'On-screen text that boosts retention for silent viewers.'}]},
      {mins:3,takeaways:['A schedule you can keep beats a burst that burns you out.','Batch-create and schedule so busy days do not break your streak.','Use clear titles, keywords, and early replies to get discovered.'],tryThis:'Batch and schedule three posts this week, then reply to every comment in the first hour.',keyTerms:[{t:'Batching',d:'Creating several pieces of content in one session.'},{t:'Algorithm',d:'The system that decides who sees your content.'}]},
      {mins:4,takeaways:['Combine several income streams so one change cannot wipe you out.','Even a small, engaged audience can earn through sponsorships and affiliates.','Only use media you are licensed for, and always disclose paid promotions.'],tryThis:'List three ways your content could earn money, and draft a one-line media-kit stat about your audience.',keyTerms:[{t:'Affiliate marketing',d:'Earning commission by promoting products for other businesses.'},{t:'Media kit',d:'A short document showing your audience and engagement to pitch brands.'}]}
    ]
  };
  Object.keys(E).forEach(function(k){var c=window.LESSONS[k];if(!c||!c.items)return;
    E[k].forEach(function(ex,i){var it=c.items[i];if(!it)return;
      if(ex.mins&&!it.mins)it.mins=ex.mins;
      if(ex.takeaways&&!it.takeaways)it.takeaways=ex.takeaways;
      if(ex.tryThis&&!it.tryThis)it.tryThis=ex.tryThis;
      if(ex.keyTerms&&!it.keyTerms)it.keyTerms=ex.keyTerms;});});
})();

/* ---- Lesson redesign styles ---- */
(function(){var st=document.createElement('style');st.textContent=
  '.lsn-hero{background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:18px;padding:18px;color:#fff;box-shadow:var(--shadow)}'+
  '.lsn-hero .em{font-size:34px;line-height:1}'+
  '.lsn-hero h2{margin:6px 0 2px;font-size:22px;color:#fff}'+
  '.lsn-hero .meta2{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}'+
  '.lsn-hero .meta2 span{background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.35);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px}'+
  '.lsn-lead{font-size:15.5px;line-height:1.6;color:var(--txt);background:var(--bg2);border-left:4px solid var(--gold);border-radius:10px;padding:13px 15px;margin:14px 0 6px}'+
  '.lsn-secn{margin:16px 0 8px;font-size:12px;font-weight:800;color:var(--accent2);text-transform:uppercase;letter-spacing:.5px}'+
  '.lsn-pts{display:grid;gap:10px;margin:6px 0}'+
  '.lsn-pt{display:flex;gap:12px;align-items:flex-start;background:var(--card2);border:1px solid var(--line);border-radius:13px;padding:12px 14px;transition:.15s}'+
  '.lsn-pt:hover{border-color:var(--accent);transform:translateX(2px)}'+
  '.lsn-pt .n{flex:none;width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:800;font-size:13px;display:grid;place-items:center}'+
  '.lsn-pt p{margin:0;font-size:14.5px;line-height:1.55;color:var(--txt)}'+
  '.lsn-terms{display:grid;gap:8px;margin:6px 0}'+
  '.lsn-term{background:var(--bg2);border:1px solid var(--line);border-radius:11px;padding:10px 13px;font-size:14px;line-height:1.5}'+
  '.lsn-term b{color:var(--accent2)}'+
  '.lsn-done-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(74,222,128,.16);color:var(--green);border:1px solid var(--green);border-radius:99px;padding:2px 9px;font-size:11px;font-weight:800}'+
  '.lsn-card-done{border-color:var(--green)!important}';
  document.head.appendChild(st);})();

/* ---- Mark a lesson complete (awards XP once) ---- */
function blMarkLesson(cat,i){
  if(typeof S==='undefined')return;
  if(!S.lessonsDone)S.lessonsDone={};
  var key=cat+':'+i;
  if(!S.lessonsDone[key]){S.lessonsDone[key]=1;
    if(window.addXP)addXP(15); if(window.addCoins)addCoins(5);
    if(window.toast)toast('✓ Lesson complete! +15 XP');
    if(window.renderHUD)renderHUD(); if(window.save)save();}
  openLesson(i);
}

/* ---- Guided tours (home + lessons) ---- */
var BL_HOME_KEY='beliyona_tour_done_v1';
var BL_LESSON_KEY='beliyona_lessontour_done_v1';
var BL_HOME_STEPS=[
  {sel:['#sStreak','#sCoins','#sLevel'],title:'Your progress',body:'🔥 streak, 🪙 coins and ⭐ level live up here. Study every day to keep your streak alive.'},
  {sel:['.levelbar'],title:'Level up',body:'Earn XP to fill this bar. Each level moves you up the ranks, from Rookie to Elite.'},
  {sel:['.nav'],title:'Find your way around',body:'Switch between your Decks, Friends, Shop, Badges, Create and Profile from here.'},
  {sel:['#trackBar'],title:'Pick your path',body:'Choose your track — WAEC/NECO, JAMB, University, Vocational, Virtual Assistant, CIBN and more. Tap to switch anytime.'},
  {sel:['#view-home .panel'],title:'Start a quest',body:'Tap any topic to begin. Questions are tailored to your level, and every answer comes with a quick explanation.'},
  {sel:null,title:'Practice or ⚔️ Boss Battle',body:'When you tap a topic you will pick a mode: calm Practice, or a timed Boss Battle for double XP and 3 lives. Ready to play?',cta:'🥚 Start playing'}
];
var BL_LESSON_STEPS=[
  {sel:['#blLsnHero','#blLsnHead'],title:'Welcome to Mini-lessons',body:'These are short class notes for your track. Read one in a few minutes to learn the essentials before you practise.'},
  {sel:['#blLsnGrid .deck','.deckgrid .deck'],title:'Pick a lesson',body:'Tap any lesson card to open it. Each shows how long it takes, and a green tick once you have finished it.'},
  {sel:null,title:'How each lesson works',body:'Inside you get the key points, a Key terms box, Key takeaways, and a Try this exercise. Mark it done to earn XP, then take the assessment. Enjoy!',cta:'Got it'}
];
var blSteps=[],blCurKey='',blIdx=0;
function blQ(sels){var r=[];(sels||[]).forEach(function(s){try{document.querySelectorAll(s).forEach(function(e){if(e&&e.offsetParent!==null)r.push(e);});}catch(x){}});return r;}
function blUnion(els){var x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;els.forEach(function(e){var r=e.getBoundingClientRect();x1=Math.min(x1,r.left);y1=Math.min(y1,r.top);x2=Math.max(x2,r.right);y2=Math.max(y2,r.bottom);});return {left:x1,top:y1,right:x2,bottom:y2,width:x2-x1,height:y2-y1};}
function blRun(steps,key,force){
  if(!force && localStorage.getItem(key))return;
  if(document.getElementById('bl-tour-dim'))return;
  if(document.querySelector('.modal.show'))return;
  blSteps=steps;blCurKey=key;blIdx=0;blBuildDom();blShow();
}
function blStartHomeTour(force){
  var ob=document.getElementById('onboard'); if(ob&&!ob.classList.contains('hidden')&&ob.offsetParent!==null)return;
  var home=document.getElementById('view-home'); if(home&&home.classList.contains('hidden'))return;
  blRun(BL_HOME_STEPS,BL_HOME_KEY,force);
}
function blStartLessonTour(force){
  var v=document.getElementById('view-lessons'); if(v&&v.classList.contains('hidden'))return;
  blRun(BL_LESSON_STEPS,BL_LESSON_KEY,force);
}
function blBuildDom(){
  ['bl-tour-dim','bl-tour-spot','bl-tour-arrow','bl-tour-pop'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove();});
  var dim=document.createElement('div');dim.className='bl-tour-dim';dim.id='bl-tour-dim';
  var spot=document.createElement('div');spot.className='bl-tour-spot';spot.id='bl-tour-spot';
  var arrow=document.createElement('div');arrow.className='bl-tour-arrow';arrow.id='bl-tour-arrow';
  var pop=document.createElement('div');pop.className='bl-tour-pop';pop.id='bl-tour-pop';pop.setAttribute('role','dialog');pop.setAttribute('aria-live','polite');
  document.body.appendChild(dim);document.body.appendChild(spot);document.body.appendChild(arrow);document.body.appendChild(pop);
  window.addEventListener('resize',blPlace);window.addEventListener('scroll',blPlace,{passive:true});
  document.addEventListener('keydown',blKeydown);
}
function blKeydown(e){if(!document.getElementById('bl-tour-pop'))return;if(e.key==='Escape')blEnd(true);else if(e.key==='ArrowRight'||e.key==='Enter')blNext();else if(e.key==='ArrowLeft')blPrev();}
function blShow(){
  var step=blSteps[blIdx];
  if(step.sel){var els=blQ(step.sel);var ok=els.length&&(function(){var r=blUnion(els);return r.width>8||r.height>8;})();
    if(!ok){if(blIdx<blSteps.length-1){blIdx++;return blShow();}}}
  var pop=document.getElementById('bl-tour-pop');if(!pop)return;
  var last=blIdx===blSteps.length-1;
  var dots=blSteps.map(function(_,i){return '<i class="'+(i===blIdx?'on':'')+'"></i>';}).join('');
  pop.innerHTML='<h4>'+step.title+'</h4><p>'+step.body+'</p>'+
    '<div class="bl-tour-nav"><button class="bl-tour-skip" id="bl-tour-skip">'+(last?'':'Skip')+'</button>'+
    '<div class="bl-tour-dots">'+dots+'</div><div style="display:flex;gap:8px">'+
    (blIdx>0?'<button class="btn ghost sm" id="bl-tour-prev">Back</button>':'')+
    '<button class="btn sm" id="bl-tour-next">'+(last?(step.cta||'Done'):'Next →')+'</button></div></div>';
  document.getElementById('bl-tour-next').onclick=blNext;
  var pv=document.getElementById('bl-tour-prev');if(pv)pv.onclick=blPrev;
  var sk=document.getElementById('bl-tour-skip');if(sk)sk.onclick=function(){blEnd(true);};
  if(step.sel){var e2=blQ(step.sel);if(e2.length)e2[0].scrollIntoView({block:'center'});}
  requestAnimationFrame(blPlace);
}
function blPlace(){
  var pop=document.getElementById('bl-tour-pop'),spot=document.getElementById('bl-tour-spot'),arrow=document.getElementById('bl-tour-arrow');
  if(!pop||!spot)return;
  var step=blSteps[blIdx],vw=window.innerWidth,vh=window.innerHeight,pad=8;
  var els=step.sel?blQ(step.sel):[];
  if(!els.length){spot.style.opacity='0';spot.style.width='0';spot.style.height='0';spot.style.left=(vw/2)+'px';spot.style.top=(vh/2)+'px';arrow.style.display='none';
    pop.style.left=Math.max(16,(vw-pop.offsetWidth)/2)+'px';pop.style.top=Math.max(16,(vh-pop.offsetHeight)/2)+'px';return;}
  spot.style.opacity='1';var r=blUnion(els);
  spot.style.left=(r.left-pad)+'px';spot.style.top=(r.top-pad)+'px';spot.style.width=(r.width+pad*2)+'px';spot.style.height=(r.height+pad*2)+'px';
  var pw=pop.offsetWidth||280,ph=pop.offsetHeight||140;
  var below=(r.bottom+16+ph+12<vh);
  var top=below?(r.bottom+16):(r.top-ph-16);
  var left=Math.min(Math.max(12,r.left+r.width/2-pw/2),vw-pw-12);
  pop.style.left=left+'px';pop.style.top=Math.max(12,top)+'px';
  arrow.style.display='block';var ax=Math.min(Math.max(left+14,r.left+r.width/2-9),left+pw-24);
  arrow.style.borderLeft='9px solid transparent';arrow.style.borderRight='9px solid transparent';
  if(below){arrow.style.borderTop='0';arrow.style.borderBottom='11px solid var(--card)';arrow.style.left=ax+'px';arrow.style.top=(r.bottom+5)+'px';}
  else{arrow.style.borderBottom='0';arrow.style.borderTop='11px solid var(--card)';arrow.style.left=ax+'px';arrow.style.top=(r.top-16)+'px';}
}
function blNext(){if(blIdx>=blSteps.length-1){blEnd(true);return;}blIdx++;blShow();}
function blPrev(){if(blIdx<=0)return;blIdx--;blShow();}
function blEnd(done){
  ['bl-tour-dim','bl-tour-spot','bl-tour-arrow','bl-tour-pop'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove();});
  window.removeEventListener('resize',blPlace);window.removeEventListener('scroll',blPlace);document.removeEventListener('keydown',blKeydown);
  if(done&&blCurKey){try{localStorage.setItem(blCurKey,'1');}catch(e){}}
}
(function(){var tries=0;var iv=setInterval(function(){tries++;
  if(localStorage.getItem(BL_HOME_KEY)||document.getElementById('bl-tour-dim')){clearInterval(iv);return;}
  var ob=document.getElementById('onboard');var obVis=ob&&!ob.classList.contains('hidden')&&ob.offsetParent!==null;
  var home=document.getElementById('view-home');var homeVis=home&&!home.classList.contains('hidden');
  if(!obVis&&homeVis&&!document.querySelector('.modal.show')){blStartHomeTour(false);if(document.getElementById('bl-tour-dim'))clearInterval(iv);}
  if(tries>80)clearInterval(iv);},500);})();
(function(){var reset=document.getElementById('resetBtn');if(reset&&reset.parentNode){
  var b=document.createElement('button');b.className='btn ghost sm';b.id='blReplayTour';b.textContent='↻ Replay tour';
  b.onclick=function(){show('home');setTimeout(function(){blEnd(false);blStartHomeTour(true);},250);};
  reset.parentNode.insertBefore(b,reset);}})();

/* default new users to the egg light theme */
(function(){try{var t=(typeof S!=='undefined'&&S.profile)?S.profile.theme:null;if(!t&&typeof applyTheme==='function')applyTheme('midnight');}catch(e){}})();
/* =============== end Study Egg upgrade module =============== */
