
import {builtIn} from './bank.js';
import {el, shuffle, isBTECUnit, popToast} from './utils.js';

let pool=[], current=0, qDur=25, timerId=null, startTime=0, lockBuzz=false; let neg=false, pen=50;
let players=[], buzzKeys=['A','L','S','K','D','J','F',';'];

const category=el('category'), aimSel=el('aim'), difficulty=el('difficulty'), qty=el('qty');
const pCount=el('pCount'), qSecs=el('qSecs');
const qtext=el('qtext'), tags=el('tags'), opts=el('opts'), info=el('info'), bar=el('bar'), timeEl=el('timeLeft');

function getCustom(){ return JSON.parse(localStorage.getItem('l3_custom')||'[]') }
function pickPool(){
  const all=[...builtIn, ...getCustom()];
  const cat=category.value, diff=difficulty.value, aim=aimSel.value;
  let f=all.filter(q=> (cat==='all'||q.cat===cat));
  if(diff!=='mix') f=f.filter(q=> q.diff===diff);
  if(isBTECUnit(cat) && aim!=='all') f=f.filter(q=> (q.aim||'')===aim);
  return shuffle(f).slice(0, Math.max(5, Math.min(+qty.value||12, 50)));
}

function layoutPlayers(){
  const wrap=el('players');
  wrap.innerHTML = players.map((p,i)=>`<div class="pill"><strong>${p.name}</strong> — key <span class="kbd">${p.key}</span> — <span>${p.score} pts</span></div>`).join('');
}

function start(){
  neg = (el('neg').value==='on'); pen = Math.max(10, +el('pen').value||50);
  pool=pickPool(); current=0; qDur=Math.max(10, Math.min(+qSecs.value||25, 90));
  const n=Math.max(2, Math.min(8, +pCount.value||3));
  players=[]; for(let i=0;i<n;i++){ players.push({name:`P${i+1}`, key:buzzKeys[i], score:0, locked:false}); }
  layoutPlayers();
  el('setup').classList.add('hidden'); el('game').classList.remove('hidden');
  next();
}

function next(){
  clearInterval(timerId); info.textContent=''; lockBuzz=false; players.forEach(p=>p.locked=false);
  if(current>=pool.length){ info.textContent='Game over!'; el('nextQ').classList.add('hidden'); el('exportBuzzer').classList.remove('hidden'); return; }
  const q=pool[current];
  qtext.textContent=q.q; tags.textContent = `${q.cat}${q.aim?` • Aim ${q.aim}`:''} • ${q.diff.toUpperCase()}`;
  opts.innerHTML='';
  q.options.forEach((t,i)=>{ const b=document.createElement('button'); b.className='opt'; b.innerText=['A','B','C','D'][i]+'. '+t; b.disabled=true; b.onclick=()=>answer(i); opts.appendChild(b) });
  el('nextQ').classList.add('hidden');
  // timer
  let left=qDur; timeEl.textContent=left; bar.style.width='0%'; startTime=Date.now();
  timerId=setInterval(()=>{ left--; timeEl.textContent=left; const p = (1-(left/qDur))*100; bar.style.width=`${p}%`; if(left<=0){ clearInterval(timerId); showCorrect(false,'Time up'); el('nextQ').classList.remove('hidden'); } }, 1000);
  info.textContent = 'Press your buzz key!';
}

function answer(i){
  const q=pool[current];
  const correct=(i===q.correct);
  if(correct){
    const bonus = Math.max(0, qDur - Math.round((Date.now()-startTime)/1000));
    current++;
    showCorrect(true, `Correct! +${150 + bonus*5} pts`);
    el('nextQ').classList.remove('hidden');
  } else {
    showCorrect(false, 'Wrong! Buzzer locked; others can buzz.');
    lockBuzz=false;
  }
}

function showCorrect(ok,msg){
  info.textContent = (ok?'✅ ':'❌ ')+msg;
  [...opts.children].forEach((b,idx)=>{ b.disabled=true; const q=pool[current- (ok?0:0)]; if(!q) return; if(q.options && idx===q.correct) b.classList.add('correct'); });
}

function onBuzz(key){
  if(lockBuzz) return;
  const p = players.find(pl=>pl.key.toLowerCase()===key.toLowerCase());
  if(!p || p.locked) return;
  lockBuzz=true;
  // enable buttons only for the buzzer for 5s
  info.textContent = `🔔 ${p.name} buzzed! Choose your answer (5s)…`;
  const allowUntil = Date.now()+5000;
  [...opts.children].forEach(b=>b.disabled=false);
  const check = setInterval(()=>{
    if(Date.now()>allowUntil || lockBuzz===false){ clearInterval(check); if(lockBuzz){ // time expired without clicking
        p.locked=true; [...opts.children].forEach(b=>b.disabled=true); info.textContent='⏳ Buzzer timeout. Others can buzz.'; lockBuzz=false; 
      } 
    }
  }, 200);
  // Override answer() scoring to award to buzzer only
  const q=pool[current];
  const originalHandlers = [...opts.children].map(btn=>btn.onclick);
  [...opts.children].forEach((btn,idx)=>{
    btn.onclick = ()=>{
      clearInterval(check);
      const correct = idx===q.correct;
      if(correct){
        const bonus = Math.max(0, Math.floor((qDur - ((Date.now()-startTime)/1000))));
        const pts = 150 + bonus*5;
        p.score += pts;
        layoutPlayers();
        // show and move next
        [...opts.children].forEach((b,i)=>{ b.disabled=true; if(i===q.correct) b.classList.add('correct'); else if(i===idx) b.classList.add('wrong'); });
        info.textContent = `✅ ${p.name} correct! +${pts} pts`;
        current++; lockBuzz=true; el('nextQ').classList.remove('hidden');
       } else {
        if(neg){ p.score = Math.max(0, (p.score||0) - pen); }
        p.locked=true;
        layoutPlayers();
        [...opts.children].forEach(b=>b.disabled=true);
        info.textContent = `❌ ${p.name} wrong! Others can buzz.`;
        lockBuzz=false;
      }
    };
  });
}

window.addEventListener('keydown', (e)=>{
  const k=e.key.toUpperCase();
  if(['A','S','D','F','J','K','L',';'].includes(k)) onBuzz(k);
});

el('start').onclick=start;
el('nextQ').onclick=next;


// Export scores CSV
document.getElementById('exportBuzzer').onclick = ()=>{
  const rows = [["Player","Score","Key"]].concat(players.map(p=>[p.name, p.score, p.key]));
  import('./utils.js').then(u=>u.exportCSV('buzzer-scores.csv', rows));
};