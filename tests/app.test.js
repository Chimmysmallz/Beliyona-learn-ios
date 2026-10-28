// Run:  node tests/app.test.js   (tests the built index.html)
// Scenario tests for the Midnight build. Each scenario loads the app fresh with a given saved state.
const fs=require('fs'),vm=require('vm'),Module=require('module');
const FILE=process.argv[2]||require('path').join(__dirname,'..','index.html');const base=fs.readFileSync(__dirname+'/harness.js','utf8');
function load(pre){global.__pre=pre||{};const src=base.replace("const store={};","const store=Object.assign({},global.__pre);");
  const m=new Module('h'+Math.random());m.paths=module.paths;const argv=process.argv;process.argv=[argv[0],'x',FILE];m._compile(src,'h.js');process.argv=argv;return m.exports;}
let pass=0,fail=0;const ok=(c,msg)=>{if(c){pass++;console.log('  PASS',msg)}else{fail++;console.log('  FAIL',msg)}};
const R=(x,c)=>vm.runInContext(c,x.ctx);
const st=o=>JSON.stringify(Object.assign({level:4,xp:70,streak:1,coins:230,srs:{},totalAns:0,totalCorrect:0},o));

console.log('1. Brand-new visitor');
let a=load();ok(a.errors.length===0,'loads with no errors '+a.errors.join('|'));
ok(a.document.documentElement.attr_data_theme==='midnight' || a.document.documentElement['attr_data-theme']==='midnight','Midnight Focus is applied');
ok(a.metaEl['attr_content']==='#0b0b0f','phone status bar colour is near-black');
ok(R(a,"THEME_LIST[0][0]")==='midnight','Midnight is first in the theme picker');

console.log('2. Teacher opening the app (the blank Dashboard bug)');
let b=load({studyquest_v2:st({profile:{role:'teacher',nickname:'Mrs A',theme:'starry'}}),br_active:'main'});
ok(!b.cache['view-teacher'].classList.contains('hidden'),'opens on the Dashboard');
ok((b.cache.teacherWrap||{_html:''})._html.includes('Teacher Dashboard'),'Dashboard is drawn on startup (was blank)');
ok(b.cache.navMore&&b.cache.navMore.classList.contains('active'),'"More" tab is highlighted for the Dashboard');

console.log('3. Parent opening the app');
let c=load({studyquest_v2:st({profile:{role:'parent',nickname:'Mr B',theme:'egg'}}),br_active:'main'});
ok((c.cache.teacherWrap||{_html:''})._html.includes('Parent Dashboard'),'Parent Dashboard is drawn on startup');

console.log('4. Existing student on the old dark-blue theme');
let d=load({studyquest_v2:st({profile:{role:'student',nickname:'Ada',theme:'starry'},ownedThemes:['egg','starry','cloudy','goblin']}),br_active:'main'});
ok(R(d,"S.profile.theme")==='midnight','moved to Midnight Focus once');
ok(R(d,"S.ownedThemes.includes('midnight')"),'Midnight is unlocked for them');
ok(d.store.se_midnight_v1==='1','switch is remembered so it only happens once');

console.log('5. Student who later picks another theme keeps it');
let e=load({studyquest_v2:st({profile:{role:'student',nickname:'Ada',theme:'pink'},ownedThemes:['midnight','pink']}),br_active:'main',se_midnight_v1:'1'});
ok(R(e,"S.profile.theme")==='pink','their chosen theme is not overwritten');

console.log('6. Ranks instead of cartoon buddy');
ok(R(a,"[1,3,5,7,10,14].map(l=>avatarFor(l).n).join(',')")==='Rookie,Bronze,Silver,Gold,Platinum,Elite','rank tiers Rookie → Elite');
ok(!R(a,"JSON.stringify(BOSSES)").match(/Demon|Ghost|Spider/),'boss names are grown-up');

console.log('7. Phone navigation');
R(a,"show('create')");ok(a.cache.navMore.classList.contains('active'),'More highlights for Create');
R(a,"show('home')");ok(!a.cache.navMore.classList.contains('active'),'More clears on Home');
R(a,"document.getElementById('navMore').onclick()");ok(a.cache.seMore.classList.contains('show'),'More sheet opens');
const items=(a.cache.seMoreList||{children:[]}).children.length;ok(items===2,'student sees Create + Install in More ('+items+')');
R(b,"document.getElementById('navMore').onclick()");ok((b.cache.seMoreList||{children:[]}).children.length===3,'teacher also sees Dashboard in More');
R(a,"document.getElementById('seMoreList').children[0].onclick()");ok(!a.cache.seMore.classList.contains('show')&&!a.cache['view-create'].classList.contains('hidden'),'tapping an item closes the sheet and opens the screen');

console.log('8. Other screens still work');
for(const v of ['home','leaderboard','shop','achievements','stats','install','lessons','teacher']){const before=a.errors.length;try{R(a,"show('"+v+"')");ok(a.errors.length===before,'opens '+v)}catch(x){ok(false,'opens '+v+': '+x.message)}}
ok(R(a,"typeof blStartHomeTour")==='function'&&R(a,"typeof blStartLessonTour")==='function','guided tours still present');

console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
