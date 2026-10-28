
/* ============ COIN SHOP ============ */
const FREEZE_COST=100;
const BUDDY_SKINS={
  default:{name:'Classic',cost:0,faces:['🥚','🥉','🥈','🥇','💎','🏆']},
  cat:{name:'Cat Line',cost:300,faces:['🥚','🐱','😺','😸','🦁','🐯']},
  robo:{name:'Robo Line',cost:400,faces:['🔋','🤖','🦾','🛸','👾','🦿']},
  cosmic:{name:'Cosmic',cost:600,faces:['✨','⭐','🌟','💫','☄️','🌌']}
};
const PREMIUM_THEME_COST={pink:250,venom:250,orange:250};
const FRAMES={
  none:{name:'No frame',cost:0},
  gold:{name:'Gold Glow',cost:300,cls:'fr-gold'},
  neon:{name:'Neon Edge',cost:400,cls:'fr-neon'},
  crown:{name:'Royal Crown',cost:500,cls:'fr-gold',badge:' 👑'}
};
function frameClass(){const f=FRAMES[S.frame];return f&&f.cls?f.cls:'';}
function frameBadge(){const f=FRAMES[S.frame];return f&&f.badge?f.badge:'';}
function spend(cost){if((S.coins||0)<cost){toast('Not enough coins — keep studying! 🪙');return false;}S.coins-=cost;if(window.unlock)unlock("shopper");save();renderHUD();return true;}
function buyFreeze(){if(spend(FREEZE_COST)){S.freezes=(S.freezes||0)+1;save();toast('🧊 Streak Freeze added!');renderShop();}}
function chooseSkin(id){const sk=BUDDY_SKINS[id];if(!sk)return;
  if(!S.ownedSkins.includes(id)){if(!spend(sk.cost))return;S.ownedSkins.push(id);toast('🎉 Unlocked '+sk.name+'!');}
  S.skin=id;save();renderHUD();if(window.renderStats)renderStats();renderShop();}
function shopChooseTheme(id){
  if(!(S.ownedThemes||[]).includes(id)){const cost=PREMIUM_THEME_COST[id]||0;if(!spend(cost))return;S.ownedThemes.push(id);toast('🎨 Theme unlocked!');}
  applyTheme(id);if(S.profile)S.profile.theme=id;save();renderShop();}
function chooseFrame(id){const fr=FRAMES[id];if(!fr)return;
  if(!S.ownedFrames.includes(id)){if(!spend(fr.cost))return;S.ownedFrames.push(id);toast('✨ '+fr.name+' unlocked!');}
  S.frame=id;save();renderLeaderboard();renderShop();}
function renderShop(){const w=document.getElementById('shopWrap');if(!w)return;let h='';
  h+='<div class="panel"><h2 class="title">🛒 Coin Shop</h2><p class="sub">Spend the coins you earn from studying. You have <b style="color:var(--gold)">'+(S.coins||0)+' 🪙</b>.</p></div>';
  h+='<div class="panel"><h2 class="title">🧊 Streak Freeze</h2><p class="sub">Miss a day and a freeze is used automatically to save your streak. You own <b>'+(S.freezes||0)+'</b>.</p><button class="btn gold" onclick="buyFreeze()">Buy 1 — '+FREEZE_COST+' 🪙</button></div>';
  h+='<div class="panel"><h2 class="title">🎖️ Rank badge styles</h2><p class="sub">Restyle the badge shown with your rank (it upgrades through 6 tiers).</p><div class="deckgrid">';
  Object.keys(BUDDY_SKINS).forEach(id=>{const sk=BUDDY_SKINS[id],owned=S.ownedSkins.includes(id),sel=S.skin===id;
    h+='<div class="deck" style="cursor:default"><div style="font-size:22px;letter-spacing:3px">'+sk.faces.join('')+'</div><h3>'+sk.name+'</h3>'+
      '<button class="btn sm '+(sel?'':'ghost')+'"'+(sel?' disabled':'')+' onclick="chooseSkin(\''+id+'\')">'+(sel?'✓ Equipped':(owned?'Equip':'Unlock — '+sk.cost+' 🪙'))+'</button></div>';});
  h+='</div></div>';
  h+='<div class="panel"><h2 class="title">🎨 Themes</h2><p class="sub">Unlock more vibes, then tap to equip (also switchable in Profile).</p><div class="onb-themes">';
  THEME_LIST.forEach(([id,name,emo])=>{const t=THEMES[id],owned=(S.ownedThemes||[]).includes(id),cur=(S.profile&&S.profile.theme)===id,cost=PREMIUM_THEME_COST[id]||0;
    h+='<div class="onb-theme'+(cur?' sel':'')+'" onclick="shopChooseTheme(\''+id+'\')"><span class="onb-sw" style="background:linear-gradient(135deg,'+t.accent+','+t.accent2+')"></span><b>'+emo+' '+name+'<br><span style="color:var(--muted);font-weight:600;font-size:11px">'+(owned?(cur?'Equipped':'Owned — tap to equip'):cost+' 🪙')+'</span></b></div>';});
  h+='</div></div>';
  h+='<div class="panel"><h2 class="title">🏅 Leaderboard Name-Frame</h2><p class="sub">Make your name pop on the leaderboard.</p><div class="deckgrid">';
  Object.keys(FRAMES).forEach(id=>{const fr=FRAMES[id],owned=S.ownedFrames.includes(id),sel=S.frame===id;
    h+='<div class="deck" style="cursor:default"><div class="lbrow '+(fr.cls||'')+'" style="pointer-events:none;margin-bottom:8px"><div class="lbface">'+avatarFor(S.level).f+'</div><div class="lbname" style="flex:1">'+esc(S.name||'You')+(fr.badge||'')+'</div></div>'+
      '<h3>'+fr.name+'</h3><button class="btn sm '+(sel?'':'ghost')+'"'+(sel?' disabled':'')+' onclick="chooseFrame(\''+id+'\')">'+(sel?'✓ Equipped':(owned?'Equip':'Unlock — '+fr.cost+' 🪙'))+'</button></div>';});
  h+='</div></div>';
  w.innerHTML=h;}
(function shopInit(){
  if(S.freezes==null)S.freezes=0;
  if(!Array.isArray(S.ownedThemes))S.ownedThemes=['midnight','egg','starry','cloudy','goblin'];
  if(S.profile&&S.profile.theme&&!S.ownedThemes.includes(S.profile.theme))S.ownedThemes.push(S.profile.theme);
  if(!S.skin)S.skin='default'; if(!Array.isArray(S.ownedSkins))S.ownedSkins=['default'];
  if(!S.frame)S.frame='none'; if(!Array.isArray(S.ownedFrames))S.ownedFrames=['none'];
  save();renderHUD();renderLeaderboard();
})();
