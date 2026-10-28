
/* ============ STUDY EGG — MIDNIGHT FOCUS ADD-ONS ============ */
(function(){
  /* One-time switch to Midnight Focus for users on the old default looks. They can switch back in Profile. */
  try{
    if(!localStorage.getItem('se_midnight_v1')){
      localStorage.setItem('se_midnight_v1','1');
      if(typeof S!=='undefined'&&S){
        if(!Array.isArray(S.ownedThemes))S.ownedThemes=[];
        if(S.ownedThemes.indexOf('midnight')<0)S.ownedThemes.unshift('midnight');
        if(S.profile&&(!S.profile.theme||S.profile.theme==='starry'||S.profile.theme==='egg'))S.profile.theme='midnight';
        if(typeof save==='function')save();
      }
    }
    if(typeof S!=='undefined'&&S&&Array.isArray(S.ownedThemes)&&S.ownedThemes.indexOf('midnight')<0)S.ownedThemes.unshift('midnight');
    applyTheme((typeof S!=='undefined'&&S&&S.profile&&S.profile.theme)||(typeof OB!=='undefined'&&OB.theme)||'midnight');
  }catch(e){}

  /* "More" sheet for the phone tab bar */
  var MORE_VIEWS=['teacher','create','install'];
  var sheet=document.createElement('div');sheet.id='seMore';
  sheet.innerHTML='<div class="scrim"></div><div class="sheet" role="dialog" aria-label="More"><div class="grab"></div><div id="seMoreList"></div></div>';
  document.body.appendChild(sheet);
  function closeMore(){sheet.classList.remove('show');}
  function openMore(){
    var list=document.getElementById('seMoreList');if(!list)return;list.innerHTML='';
    MORE_VIEWS.forEach(function(v){
      if(v==='teacher'&&!(typeof isEducator==='function'&&isEducator()))return;
      var src=document.querySelector('.nav button[data-view="'+v+'"]');if(!src)return;
      var b=document.createElement('button');b.innerHTML=src.innerHTML;
      b.onclick=function(){closeMore();show(v);};list.appendChild(b);
    });
    sheet.classList.add('show');
  }
  var scrim=sheet.querySelector('.scrim');if(scrim)scrim.onclick=closeMore;
  var mb=document.getElementById('navMore');
  if(mb){mb.onclick=openMore;mb.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openMore();}};}

  /* Keep "More" highlighted when one of its screens is open */
  var baseShow=show;
  show=function(v){baseShow(v);var m=document.getElementById('navMore');if(m)m.classList.toggle('active',MORE_VIEWS.indexOf(v)>=0);};

  /* FIX: teachers and parents land on the Dashboard before its code has loaded, leaving a blank page.
     Now that every script has loaded, redraw whichever screen is open. */
  try{
    var open=document.querySelector('.view:not(.hidden)');
    var v=open&&open.id?open.id.replace('view-',''):'';
    if(v==='teacher'&&typeof renderTeacher==='function')renderTeacher();
    if(v==='home'&&typeof renderHero==='function')renderHero();
    var m=document.getElementById('navMore');if(m)m.classList.toggle('active',MORE_VIEWS.indexOf(v)>=0);
  }catch(e){}
})();
