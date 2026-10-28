// Test helper: loads the app's scripts in a lightweight stand-in for a browser.
// Runs every inline script of the app inside a stub browser, then exercises screens.
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(process.argv[2],'utf8');
const blocks=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const store={};const errors=[];
function el(id){const o={id,_html:'',children:[],style:{setProperty(){}},dataset:{},classList:{_s:new Set(),add(...c){c.forEach(x=>this._s.add(x))},remove(...c){c.forEach(x=>this._s.delete(x))},toggle(c,f){const on=f===undefined?!this._s.has(c):f;on?this._s.add(c):this._s.delete(c);return on},contains(c){return this._s.has(c)}},
 get innerHTML(){return this._html},set innerHTML(v){this._html=String(v);for(const m of this._html.matchAll(/id="([^"]+)"/g))ids.add(m[1])},textContent:'',value:'',appendChild(c){this.children.push(c);return c},prepend(c){this.children.unshift(c)},insertBefore(c){this.children.push(c);return c},insertAdjacentHTML(p,h){this._html+=h},insertAdjacentElement(){},remove(){},setAttribute(k,v){this['attr_'+k]=v},getAttribute(k){return this['attr_'+k]||null},removeAttribute(){},addEventListener(){},removeEventListener(){},querySelector(){return el('q')},querySelectorAll(){return []},closest(){return null},focus(){},blur(){},click(){},scrollIntoView(){},getBoundingClientRect(){return{left:0,top:0,right:10,bottom:10,width:10,height:10}},getContext(){return new Proxy({},{get:()=>()=>{}})},offsetParent:{},parentNode:null,options:[],files:[],checked:false};return o;}
const cache={};
const document={getElementById(id){if(!ids.has(id)&&!cache[id])return null;return cache[id]||(cache[id]=el(id))},querySelector(s){const m=s.match(/^#([\w-]+)$/);if(m)return document.getElementById(m[1]);if(s==='.view:not(.hidden)'){return [...ids].filter(i=>i.startsWith('view-')).map(i=>document.getElementById(i)).find(e=>!e.classList.contains('hidden'))||null}const nv=s.match(/data-view="(\w+)"/);if(nv)return navBtns.find(b=>b.dataset.view===nv[1])||null;if(s.startsWith('meta'))return metaEl;return el('q')},querySelectorAll(s){if(s==='.view')return [...ids].filter(i=>i.startsWith('view-')).map(i=>document.getElementById(i));if(s.startsWith('.nav button'))return navBtns;return []},createElement(t){const e=el('new-'+t);return e},addEventListener(){},body:el('body'),documentElement:el('html'),head:el('head'),readyState:'complete',fonts:{ready:Promise.resolve()}};
document.body.appendChild=c=>{if(c.id){cache[c.id]=c;ids.add(c.id)}for(const m of (c._html||'').matchAll(/id="([^"]+)"/g))ids.add(m[1]);return c};
const metaEl=el('meta');const navBtns=[...html.matchAll(/<button[^>]*data-view="(\w+)"[^>]*>/g)].map(m=>{const b=el('nav');b.dataset.view=m[1];b._html='<svg></svg><span>'+m[1]+'</span>';return b});
const win={document,MutationObserver:function(){return{observe(){},disconnect(){}}},localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}},navigator:{userAgent:'x',clipboard:null,serviceWorker:null},location:{href:'http://x/',search:'',hash:'',reload(){}},history:{replaceState(){}},
 matchMedia:()=>({matches:false,addEventListener(){},addListener(){}}),innerWidth:390,innerHeight:844,scrollTo(){},addEventListener(){},removeEventListener(){},setTimeout:(f)=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>0,alert(){},confirm:()=>true,prompt:()=>null,
 speechSynthesis:{cancel(){},speak(){},getVoices:()=>[]},SpeechSynthesisUtterance:function(){},Audio:function(){return{play(){return Promise.resolve()}}},AudioContext:function(){return new Proxy({},{get:()=>()=>new Proxy({},{get:()=>()=>{}})})},
 fetch:()=>Promise.reject(new Error('offline')),console,Math,Date,JSON,Promise,Object,Array,String,Number,Boolean,RegExp,Error,Set,Map,parseInt,parseFloat,isNaN,encodeURIComponent,decodeURIComponent,btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),URL,Blob:function(){},FileReader:function(){},Image:function(){}};
win.window=win;win.self=win;win.globalThis=win;
const ctx=vm.createContext(win);
blocks.forEach((b,i)=>{try{vm.runInContext(b,ctx,{filename:'block'+(i+1)+'.js'})}catch(e){errors.push('LOAD block'+(i+1)+': '+e.message)}});
module.exports={ctx,errors,cache,store,metaEl,document};
if(require.main===module){
 const run=(label,code)=>{try{vm.runInContext(code,ctx)}catch(e){errors.push(label+': '+e.message)}};
 // simulate a parent and a teacher opening the Dashboard
 run('parent dashboard',"S.profile=S.profile||{};S.profile.role='parent';show('teacher')");
 console.log('parent html length',(cache.teacherWrap||{_html:''})._html.length);
 run('teacher dashboard',"S.profile.role='teacher';show('teacher')");
 console.log('teacher html length',(cache.teacherWrap||{_html:''})._html.length);
 console.log(errors.length?errors.join('\n'):'NO ERRORS');
}
