const fs=require('fs');
const path=require('path');
const root=process.cwd();
const out=path.join(root,'www');
const files=['index.html','kelime-agi.html','progress.html'];
const dirs=['data','audio','assets'];
function mkdir(p){fs.mkdirSync(p,{recursive:true});}
function copyFile(name){const src=path.join(root,name);if(!fs.existsSync(src))return;const dst=path.join(out,name);mkdir(path.dirname(dst));fs.copyFileSync(src,dst);}
function copyDir(name){const src=path.join(root,name);if(!fs.existsSync(src))return;fs.cpSync(src,path.join(out,name),{recursive:true});}
if(fs.existsSync(out))fs.rmSync(out,{recursive:true,force:true});
mkdir(out);
files.forEach(copyFile);
dirs.forEach(copyDir);
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({app:'Harfist',mode:'unified',entry:'index.html',time:new Date().toISOString()},null,2));
console.log('Unified web/APK build completed. APK uses the same index.html as GitHub Pages.');
