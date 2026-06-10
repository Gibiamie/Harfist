const fs=require('fs');
const path=require('path');
const root=process.cwd();
const out=path.join(root,'www');
function dir(p){fs.mkdirSync(p,{recursive:true});}
function copy(a,b){b=b||a;const s=path.join(root,a);const d=path.join(out,b);if(!fs.existsSync(s))throw new Error('Missing '+a);dir(path.dirname(d));fs.copyFileSync(s,d);}
function copyIf(a,b){b=b||a;const s=path.join(root,a);if(!fs.existsSync(s))return;const d=path.join(out,b);dir(path.dirname(d));fs.copyFileSync(s,d);}
function copyDir(a){const s=path.join(root,a);if(fs.existsSync(s))fs.cpSync(s,path.join(out,a),{recursive:true});}
if(fs.existsSync(out))fs.rmSync(out,{recursive:true,force:true});
dir(out);
copy('index.html','classic.html');
copy('kelime-agi.html');
copy('progress.html');
copyIf('app.html','index.html');
copyIf('app.html');
copyDir('data');copyDir('audio');copyDir('assets');
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({app:'Harfist',entry:'app.html',time:new Date().toISOString()},null,2));
console.log('www build completed');
