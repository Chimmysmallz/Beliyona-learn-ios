
/* ============ CLOUD BACKEND (Supabase) — optional, graceful fallback ============ */
/* Developers: paste your project URL + anon public key here to auto-enable cloud
   for everyone. Leave blank to let users connect from Profile → Cloud Sync.
   Full setup steps are in BACKEND-SETUP.md. */
const SQ_CONFIG = { url: "", anonKey: "" };

const CLOUD = { online:false, sb:null, user:null };

function cloudCfg(){
  try{ const c=JSON.parse(localStorage.getItem('SQ_CLOUD')||'null'); if(c&&c.url&&c.anonKey) return c; }catch(e){}
  if(SQ_CONFIG.url && SQ_CONFIG.anonKey) return SQ_CONFIG;
  return null;
}
function cloudStatus(m){ const e=document.getElementById('cloudStatus'); if(e) e.textContent=m; }
function loadSupabase(){
  return new Promise((res,rej)=>{
    if(window.supabase&&window.supabase.createClient) return res();
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('Could not load the cloud library (need internet).'));
    document.head.appendChild(s);
  });
}
async function cloudInit(){
  const cfg=cloudCfg(); if(!cfg) return false;
  try{
    await loadSupabase();
    CLOUD.sb=window.supabase.createClient(cfg.url,cfg.anonKey);
    const { data } = await CLOUD.sb.auth.getSession();
    CLOUD.user = (data && data.session) ? data.session.user : null;
    CLOUD.online=true;
    cloudStatus('☁️ Connected'+(CLOUD.user?' • signed in as '+(S.name||'you'):' • sign in or create a profile to sync'));
    if(CLOUD.user) cloudPullProfile();
    renderLeaderboard();
    return true;
  }catch(e){ CLOUD.online=false; cloudStatus('Could not connect: '+(e.message||e)); return false; }
}
async function cloudUpsertProfile(){
  if(!CLOUD.online||!CLOUD.user) return;
  const p=S.profile||{};
  const row={ id:CLOUD.user.id, nickname:p.nickname, role:p.role, level:p.level, class_no:p.classNo,
    avatar:p.avatar, fav_subject:p.fav, school:p.school, theme:p.theme, referral_code:p.code,
    total_xp:S.totalXP, level_num:S.level, coins:S.coins, streak:S.streak, best_streak:S.bestStreak,
    boss_wins:S.bossWins, referral_count:S.referralCount, updated_at:new Date().toISOString() };
  try{ await CLOUD.sb.from('profiles').upsert(row); }catch(e){}
}
let _syncT=null;
function cloudSyncSoon(){ if(!CLOUD.online||!CLOUD.user) return; clearTimeout(_syncT); _syncT=setTimeout(cloudUpsertProfile,2500); }
async function cloudPullProfile(){
  if(!CLOUD.online||!CLOUD.user) return;
  try{
    const { data } = await CLOUD.sb.from('profiles').select('*').eq('id',CLOUD.user.id).single();
    if(data){
      S.profile=Object.assign(S.profile||{},{ nickname:data.nickname, role:data.role, level:data.level,
        classNo:data.class_no, avatar:data.avatar, fav:data.fav_subject, school:data.school,
        theme:data.theme, email:CLOUD.user.email, code:data.referral_code });
      S.name=data.nickname||S.name;
      S.totalXP=Math.max(S.totalXP||0,data.total_xp||0);
      S.level=Math.max(S.level||1,data.level_num||1);
      S.coins=Math.max(S.coins||0,data.coins||0);
      S.streak=data.streak||S.streak; S.bestStreak=Math.max(S.bestStreak||0,data.best_streak||0);
      S.bossWins=Math.max(S.bossWins||0,data.boss_wins||0);
      S.referralCount=Math.max(S.referralCount||0,data.referral_count||0);
      applyTheme(S.profile.theme||'midnight'); save(); renderHUD();
    }
  }catch(e){}
}
CLOUD.signup=async function(profile,password,refCode){
  if(!CLOUD.online) return;
  try{
    const { data, error } = await CLOUD.sb.auth.signUp({ email:profile.email, password });
    if(error) throw error;
    if(!(data&&data.session)){ try{ await CLOUD.sb.auth.signInWithPassword({ email:profile.email, password }); }catch(_){ } }
    const u=await CLOUD.sb.auth.getUser(); CLOUD.user=(u&&u.data&&u.data.user)||CLOUD.user;
    if(!CLOUD.user){ cloudStatus('Account created — please confirm your email, then sign in.'); return; }
    await cloudUpsertProfile();
    if(refCode){ try{ await CLOUD.sb.rpc('redeem_referral',{ p_code:refCode }); }catch(_){ } }
    cloudStatus('☁️ Account created & syncing'); renderLeaderboard();
  }catch(e){ cloudStatus('Sign-up issue: '+(e.message||e)); }
};
CLOUD.signin=async function(email,password){
  if(!CLOUD.online) return false;
  try{
    const { data, error } = await CLOUD.sb.auth.signInWithPassword({ email, password });
    if(error) throw error;
    CLOUD.user=data.user; await cloudPullProfile(); cloudStatus('☁️ Signed in & syncing'); renderLeaderboard(); return true;
  }catch(e){ return false; }
};
CLOUD.signout=async function(){ try{ if(CLOUD.sb) await CLOUD.sb.auth.signOut(); }catch(e){} CLOUD.user=null; };
CLOUD.googleSignIn=async function(){ if(!CLOUD.online){toast('Connect cloud first (Profile → Data & Backup).');return;} try{ await CLOUD.sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.href.split('#')[0]}}); }catch(e){ toast('Google sign-in not enabled in your Supabase project yet.'); } };
CLOUD.sendOtp=async function(email){ if(!CLOUD.online){toast('Connect cloud first (Profile → Data & Backup).');return false;} try{ const r=await CLOUD.sb.auth.signInWithOtp({email:email}); if(r.error)throw r.error; toast('📧 Code sent — check your email.'); return true; }catch(e){ toast('Could not send code: '+(e.message||e)); return false; } };
CLOUD.verifyOtp=async function(email,token){ if(!CLOUD.online)return false; try{ const r=await CLOUD.sb.auth.verifyOtp({email:email,token:token,type:'email'}); if(r.error)throw r.error; CLOUD.user=r.data.user; await cloudPullProfile(); return true; }catch(e){ return false; } };

/* Wrap the leaderboard so it shows the live global board when online */
const _renderLeaderboardLocal = renderLeaderboard;
renderLeaderboard = function(){
  _renderLeaderboardLocal();
  if(CLOUD.online && CLOUD.user) cloudFetchLeaderboard();
};
async function cloudFetchLeaderboard(){
  try{
    const { data } = await CLOUD.sb.from('leaderboard').select('*').order('total_xp',{ascending:false}).limit(50);
    if(!data||!data.length) return;
    const list=document.getElementById('lbList'); if(!list) return;
    const meId=CLOUD.user&&CLOUD.user.id; const medals=['🥇','🥈','🥉'];
    list.innerHTML='';
    data.forEach((p,i)=>{ const me=meId&&p.id===meId; const el=document.createElement('div'); el.className='lbrow'+(me?' me':'');
      if(me&&window.frameClass){const fc=frameClass();if(fc)el.className+=' '+fc;}
      const fb=(me&&window.frameBadge)?frameBadge():'';
      el.innerHTML='<div class="lbrank">'+(medals[i]||('#'+(i+1)))+'</div><div class="lbface">'+(p.avatar||'🧑‍🎓')+'</div>'+
        '<div class="lbname">'+esc(p.nickname||'Player')+fb+'<small>'+(me?'You':esc(p.class_no||'Classmate'))+'</small></div>'+
        '<div class="lbxp">'+(p.total_xp||0).toLocaleString()+' XP</div>';
      list.appendChild(el); });
  }catch(e){}
}

document.getElementById('cloudConnect').onclick=async()=>{
  const url=document.getElementById('cloudUrl').value.trim(), key=document.getElementById('cloudKey').value.trim();
  if(!url||!key){ cloudStatus('Enter both the Project URL and the anon key.'); return; }
  localStorage.setItem('SQ_CLOUD',JSON.stringify({url,anonKey:key}));
  cloudStatus('Connecting…'); await cloudInit();
};
document.getElementById('cloudDisconnect').onclick=async()=>{
  await CLOUD.signout(); localStorage.removeItem('SQ_CLOUD'); CLOUD.online=false; CLOUD.sb=null;
  cloudStatus('Disconnected — playing offline (saved on this device).'); renderLeaderboard();
};

/* Auto-connect if configured */
(function(){
  const cfg=cloudCfg();
  if(cfg){ const u=document.getElementById('cloudUrl'),k=document.getElementById('cloudKey');
    if(u)u.value=cfg.url; if(k)k.value=cfg.anonKey; cloudInit(); }
})();
