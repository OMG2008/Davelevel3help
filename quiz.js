
import {builtIn} from './bank.js';
import './bank_extra.js';
import {presets, applyPresetTo} from './presets.js';
import {el, shuffle, isBTECUnit, popToast} from './utils.js';

let pool=[], current=0, secsEach=30, timerId=null, timeLeft=0;
let playType='single', players=[], me=null;
let score=0, streak=0; // single-player
let sessionLog=[];

const category=el('category'), aimSel=el('aim'), difficulty=el('difficulty'), secs=el('secs'), qty=el('qty');
const playTypeSel=el('playType'), localCount=el('localCount'), localNames=el('localNames');

const bar=el('bar'), qtext=el('qtext'), options=el('options'), meta=el('meta'), explain=el('explain');
const timeEl=el('timeLeft'), streakEl=el('streak'), scoreEl=el('score'), qpos=el('qpos');
const hintBtn=el('hintBtn'), fiftyBtn=el('fiftyBtn'), skipBtn=el('skipBtn');
const turnTag=el('turnTag'), scorePanel=el('scorePanel'), scoreRows=el('scoreRows');

function getCustom(){ return JSON.parse(localStorage.getItem('l3_custom')||'[]') }
function setProgress(){ bar.style.width = `${(current)/(pool.length)*100}%` }
function setTimer(){ timeEl.textContent=timeLeft }

function pickPool(){
  const params = new URLSearchParams(location.search);
  const src = params.get('src')||'';

  const all = (src==='custom') ? [...getCustom()] : [...builtIn, ...getCustom()];
  const cat=category.value, diff=difficulty.value, aim=aimSel.value;
  let f=all.filter(q=> (cat==='all'||q.cat===cat));
  if(diff!=='mix') f=f.filter(q=> q.diff===diff);
  if(isBTECUnit(cat) && aim!=='all') f=f.filter(q=> (q.aim||'')===aim);
  const lim=Math.max(5, Math.min(+qty.value||12, 50)); const arr=(window.__paperOrder? f : shuffle(f)); return arr.slice(0, lim);
}

playTypeSel.addEventListener('change',()=>{
  playType=playTypeSel.value;
  document.getElementById('localSetup').classList.toggle('hidden', playType!=='local');
  scorePanel.classList.toggle('hidden', playType==='single');
});

function buildLocalNameInputs(){
  const n=Math.max(2, Math.min(6, +(localCount?.value||2)));
  localNames.innerHTML='';
  for(let i=0;i<n;i++){
    const wrap=document.createElement('div');
    wrap.innerHTML=`<label>Player ${i+1} name<input type="text" id="pname_${i}" placeholder="Player ${i+1}"/></label>`;
    localNames.appendChild(wrap);
  }
}
localCount?.addEventListener('input', buildLocalNameInputs); buildLocalNameInputs();

category.addEventListener('change',()=>{
  const enable=isBTECUnit(category.value); aimSel.disabled=!enable; aimSel.parentElement.style.opacity=enable?1:.6;
});
category.dispatchEvent(new Event('change'));

// URL param prefill
(function(){
  const p = new URLSearchParams(location.search);
  if(p.has('cat')) category.value = p.get('cat');
  if(p.has('aim')) aimSel.value = p.get('aim');
  if(p.has('diff')) difficulty.value = p.get('diff');
  if(p.has('qty')) qty.value = +p.get('qty') || qty.value;
  if(p.has('secs')) secs.value = +p.get('secs') || secs.value;
  const title = p.get('title'); if(title){ const h = document.querySelector('header h1'); if(h) h.textContent = 'Quiz — '+title; }
  const shuf = p.get('shuffle'); if(shuf==='0'){ window.__paperOrder=true; }
  category.dispatchEvent(new Event('change'));
})();


// Presets
const presetSel = el('preset'); const applyBtn = el('applyPreset');
function populatePresets(){ if(!presetSel) return; presetSel.innerHTML = Object.keys(presets).map(k=>`<option value="${k}">${k}</option>`).join(''); }
populatePresets();
applyBtn.onclick = ()=>{ const key=presetSel.value; applyPresetTo(null, presets[key]); };


function updateTurnTag(){
  if(playType==='local'){
    const idx = current % players.length; me = players[idx];
    turnTag.textContent = `Turn: ${me.name}`;
  } else {
    turnTag.textContent='';
  }
}

function renderScorePanel(){
  if(playType==='single'){ scorePanel.classList.add('hidden'); return; }
  scorePanel.classList.remove('hidden');
  scoreRows.innerHTML = players.map(p=>`<div class="pill" style="display:flex;justify-content:space-between"><span>${p.name}</span><strong>${p.score||0} pts</strong></div>`).join('');
}

function updateLifelines(disable=false){
  hintBtn.disabled = disable || hintBtn.disabled;
  fiftyBtn.disabled = disable || fiftyBtn.disabled;
  skipBtn.disabled = disable || skipBtn.disabled;
}

function start(){
  sessionLog=[];
  pool=pickPool(); current=0; secsEach=Math.max(10, Math.min(+secs.value||30, 120));
  if(playType==='single'){ players=[{id:'p1',name:'You',score:0,streak:0}]; me=players[0]; score=0; streak=0; scoreEl.textContent=0; streakEl.textContent='🔥 0'; }
  if(playType==='local'){
    const n=Math.max(2, Math.min(6, +(localCount?.value||2)));
    players=[]; for(let i=0;i<n;i++){ const nm=(document.getElementById('pname_'+i)?.value.trim())||`Player ${i+1}`; players.push({id:'p'+(i+1), name:nm, score:0, streak:0}); }
    me=players[0];
  }
  renderScorePanel();
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  next();
}

function next(){
  clearInterval(timerId); explain.textContent=''; explain.classList.add('hidden');
  if(current>=pool.length){ return endGame(); }
  const q=pool[current];
  qtext.textContent=q.q;
  meta.innerHTML = `<span class="pill">${q.cat}${q.aim?` • Aim ${q.aim}`:''}</span> <span class="muted">${q.diff.toUpperCase()}</span>`;
  options.innerHTML='';
  q.options.forEach((t,i)=>{ const b=document.createElement('button'); b.className='opt'; b.innerText=['A','B','C','D'][i]+'. '+t; b.onclick=()=>choose(i); options.appendChild(b) });
  setProgress(); qpos.textContent=`${current+1}/${pool.length}`; timeLeft=secsEach; setTimer();
  timerId=setInterval(()=>{ timeLeft--; setTimer(); if(timeLeft<=0){ clearInterval(timerId); lockOptions(); reveal(false,true) } },1000);
  updateTurnTag();
  // reset lifelines each Q
  hintBtn.disabled=false; fiftyBtn.disabled=false; skipBtn.disabled=false;
}

function lockOptions(){ [...options.children].forEach(b=>b.disabled=true); }
function choose(i){
  const startAt = Date.now();

  clearInterval(timerId); lockOptions();
  const q=pool[current]; const correct=(i===q.correct);
  [...options.children].forEach((b,idx)=>{ if(idx===q.correct) b.classList.add('correct'); if(idx===i && !correct) b.classList.add('wrong'); });
  if(playType==='single'){
    if(correct){ const gained=Math.round(100+(timeLeft*2)+Math.min(streak*10,100)); score+=gained; streak++; scoreEl.textContent=score; streakEl.textContent=`🔥 ${streak}`; popToast(`+${gained} pts`); }
    else { streak=0; }
  } else {
    if(correct){ me.streak=(me.streak||0)+1; const gained=Math.round(100+(timeLeft*2)+Math.min((me.streak||0)*10,100)); me.score=(me.score||0)+gained; renderScorePanel(); popToast(`+${gained} pts for ${me.name}`); }
    else { me.streak=0; }
  }
  // log
  sessionLog.push({q:pool[current].q, cat:pool[current].cat, aim:pool[current].aim||'', diff:pool[current].diff, chosen:i, correctIdx:pool[current].correct, correct: (i===pool[current].correct)});
  reveal(correct,false);
}
function reveal(correct,timeout){
  const q=pool[current];
  explain.textContent=(correct?'✅ Correct. ':(timeout?'⏰ Time\'s up. ':'❌ Not quite. '))+(q.exp||'');
  explain.classList.remove('hidden');
  setTimeout(()=>{ current++; next(); }, 1000);
}
// lifelines
hintBtn.onclick=()=>{ const q=pool[current]; explain.textContent='💡 Hint: '+(q.hint||'Think fundamentals.'); explain.classList.remove('hidden'); hintBtn.disabled=true; };
fiftyBtn.onclick=()=>{ const q=pool[current]; const wrong=[0,1,2,3].filter(i=>i!==q.correct); shuffle(wrong).slice(0,2).forEach(i=>{ options.children[i].disabled=true; options.children[i].style.opacity=.55 }); fiftyBtn.disabled=true; };
skipBtn.onclick=()=>{ skipBtn.disabled=true; clearInterval(timerId); current++; next(); };

// leaderboard (per device)
const boardBody=document.querySelector('#board tbody');
function loadBoard(){ const data=JSON.parse(localStorage.getItem('l3_board')||'[]'); boardBody.innerHTML=data.map((r,i)=>`<tr><td>${i+1}</td><td>${r.name}</td><td>${r.score}</td><td>${new Date(r.when).toLocaleString()}</td></tr>`).join('') }
function saveBoard(name,score){ const data=JSON.parse(localStorage.getItem('l3_board')||'[]'); data.push({name,score,when:Date.now()}); data.sort((a,b)=>b.score-a.score); localStorage.setItem('l3_board',JSON.stringify(data.slice(0,20))); loadBoard() }
loadBoard();
document.getElementById('resetBoard').onclick=()=>{ localStorage.removeItem('l3_board'); loadBoard() };

function endGame(){
  document.getElementById('game').classList.add('hidden');
  const end = document.getElementById('end'); end.classList.remove('hidden');
  const best = (playType==='single'? score : Math.max(...players.map(p=>p.score||0)));
  el('final').innerHTML = (playType==='single') ? `You scored <strong>${score}</strong> points!` : `Winner: <strong>${players.slice().sort((a,b)=>b.score-a.score)[0].name}</strong> with ${best} pts.`;
  document.getElementById('saveScore').onclick=()=>{ const name=el('playerName').value.trim()||'Anonymous'; saveBoard(name,best); popToast('Saved ✔'); };
}

el('start').onclick=start;
window.addEventListener('keydown', (e)=>{
  if(document.getElementById('game').classList.contains('hidden')) return;
  if(['1','2','3','4'].includes(e.key)){ const idx=+e.key-1; const btn=options.children[idx]; if(btn && !btn.disabled) btn.click(); }
  if(e.key.toLowerCase()==='h' && !hintBtn.disabled) hintBtn.click();
  if(e.key.toLowerCase()==='f' && !fiftyBtn.disabled) fiftyBtn.click();
  if(e.key.toLowerCase()==='s' && !skipBtn.disabled) skipBtn.click();
});


// Export CSV
const exportBtn = document.getElementById('exportCSV');
if(exportBtn){
  exportBtn.onclick = ()=>{
    const rows = [["Question","Category","Aim","Diff","Chosen","CorrectIdx","Correct?"]].concat(
      sessionLog.map(r=>[r.q, r.cat, r.aim, r.diff, String.fromCharCode(65+(r.chosen??-1)), r.correctIdx, r.correct])
    );
    import('./utils.js').then(u=>u.exportCSV('quiz-session.csv', rows));
  };
}
