
import {builtIn} from './bank.js';
import './bank_extra.js';
import {presets, applyPresetTo} from './presets.js';
import {el, shuffle, isBTECUnit, popToast} from './utils.js';

let db=null, roomRef=null, unsub=null;
let me={id:null,name:'Player'}; let players=[]; let pool=[]; let current=0; let onlineLog=[];

const firebaseConfig = null; // <-- paste your Firebase web config object here
function initFirebase(){
  try{
    if(firebaseConfig && !db){
      const app = firebase.initializeApp(firebaseConfig);
      db = firebase.firestore(app);
      popToast('Online ready');
    }
  }catch(e){ console.warn(e); popToast('Firebase init failed'); }
}
initFirebase();

// UI refs
const category=el('category'), aimSel=el('aim'), difficulty=el('difficulty'), qty=el('qty');
const qtext=el('qtext'), meta=el('meta'), options=el('options'), qpos=el('qpos'), explain=el('explain'), bar=el('bar');

function getCustom(){ return JSON.parse(localStorage.getItem('l3_custom')||'[]') }
function pickPool(){
  const all=[...builtIn, ...getCustom()];
  const cat=category.value, diff=difficulty.value, aim=aimSel.value;
  let f=all.filter(q=> (cat==='all'||q.cat===cat));
  if(diff!=='mix') f=f.filter(q=> q.diff===diff);
  if(isBTECUnit(cat) && aim!=='all') f=f.filter(q=> (q.aim||'')===aim);
  return shuffle(f).slice(0, Math.max(5, Math.min(+qty.value||10, 50)));
}

function show(cur){ const q=pool[cur.idx]; if(!q) return;
  qtext.textContent=q.q;
  meta.innerHTML=`<span class="pill">${q.cat}${q.aim?` • Aim ${q.aim}`:''}</span> <span class="muted">${q.diff.toUpperCase()}</span>`;
  options.innerHTML='';
  q.options.forEach((t,i)=>{ const b=document.createElement('button'); b.className='opt'; b.innerText=['A','B','C','D'][i]+'. '+t; b.onclick=()=>answer(i); options.appendChild(b) });
  qpos.textContent=`${cur.idx+1}/${pool.length}`;
  // time-left display
  const start = cur.start||Date.now(), dur = cur.dur||25;
  const tl = document.createElement('div'); tl.className='pill'; tl.id='tl'; tl.textContent=`⏱️ ${dur}s`; meta.after(tl);
  let left=dur; const iid=setInterval(()=>{ left = Math.max(0, dur - Math.floor((Date.now()-start)/1000)); tl.textContent = `⏱️ ${left}s`; if(left<=0) clearInterval(iid); }, 1000);

  bar.style.width = `${(cur.idx)/(pool.length)*100}%`;
  explain.textContent='';
  document.getElementById('game').classList.remove('hidden');
}

async function createRoom(){ if(!db){ popToast('Add Firebase config first'); return } const code=(el('roomCode').value||('L3-'+Math.random().toString(36).slice(2,6))).toUpperCase(); el('roomCode').value=code; me={id:crypto.randomUUID(), name:(el('nick').value.trim()||'Host')}; players=[{id:me.id,name:me.name,score:0}]; roomRef=db.collection('l3_rooms').doc(code); await roomRef.set({code,created:Date.now(),state:'lobby',host:me.id,players}); subscribe(); popToast('Room created') }
async function joinRoom(){ if(!db){ popToast('Add Firebase config first'); return } const code=(el('roomCode').value||'').toUpperCase(); if(!code){ popToast('Enter room code'); return } me={id:crypto.randomUUID(), name:(el('nick').value.trim()||'Player')}; roomRef=db.collection('l3_rooms').doc(code); const snap=await roomRef.get(); if(!snap.exists){ popToast('Room not found'); return } const data=snap.data(); const exists=(data.players||[]).some(p=>p.name===me.name); if(!exists){ await roomRef.update({ players: firebase.firestore.FieldValue.arrayUnion({id:me.id,name:me.name,score:0}) }); } subscribe(); popToast('Joined room') }

function subscribe(){ if(unsub) unsub(); unsub=roomRef.onSnapshot(s=>{ const d=s.data(); if(!d) return; players=d.players||[]; el('onlinePlayers').textContent=players.length; el('playersList').textContent=players.map(p=>p.name).join(', '); if(d.state==='playing'){ pool=d.pool||[]; current=d.current?.idx||0; show(d.current); } if(d.state==='finished'){ el('game').classList.add('hidden'); popToast('Game finished'); } }); }

async function hostStart(){ if(!db||!roomRef){ popToast('Create a room first'); return } pool=pickPool(); await roomRef.update({ state:'playing', pool, current:{idx:0, start: Date.now(), dur: 25}, settings:{neg:(el('oneg').value==='on'), pen: Math.max(10, +el('open').value||50)} })); document.getElementById('game').classList.remove('hidden'); }
async function hostNext(){ const nextIdx=current+1; if(nextIdx>=pool.length){ await roomRef.update({ state:'finished' }); return } await roomRef.update({ current:{idx:nextIdx, start: Date.now(), dur: 25} }); }

async function answer(i){ const q=pool[current]; const correct=(i===q.correct);
  onlineLog.push({q:q.q, cat:q.cat, aim:q.aim||'', chosen:i, correctIdx:q.correct, correct});
  [...options.children].forEach((b,idx)=>{ b.disabled=true; if(idx===q.correct) b.classList.add('correct'); if(idx===i && !correct) b.classList.add('wrong'); });
  if(correct){
  const cur = (await roomRef.get()).data().current || {start: Date.now(), dur: 25};
  const elapsed = Math.floor((Date.now() - cur.start)/1000);
  const left = Math.max(0, (cur.dur||25) - elapsed);
  const base=100, pts = base + left*10; // time-weighted
  const data=(await roomRef.get()).data(); const arr=data.players||[]; const meRec=arr.find(p=>p.name===me.name);
  if(meRec){ meRec.score=(meRec.score||0)+pts; await roomRef.update({ players: arr }); }
}); } }
}

document.getElementById('createRoom').onclick=createRoom;
document.getElementById('joinRoom').onclick=joinRoom;
document.getElementById('hostStart').onclick=hostStart;
document.getElementById('hostNext').onclick=hostNext;

category.addEventListener('change',()=>{ const enable=isBTECUnit(category.value); el('aim').disabled=!enable; el('aim').parentElement.style.opacity=enable?1:.6; });
category.dispatchEvent(new Event('change'));
const presetSel = el('preset'); const applyBtn = el('applyPreset');
function populatePresets(){ if(!presetSel) return; presetSel.innerHTML = Object.keys(presets).map(k=>`<option value="${k}">${k}</option>`).join(''); }
populatePresets();
applyBtn.onclick = ()=>{ const key=presetSel.value; applyPresetTo(null, presets[key]); };


document.getElementById('exportOnline').onclick = ()=>{
  const rows = [["Question","Category","Aim","Chosen","CorrectIdx","Correct?"]].concat(
    onlineLog.map(r=>[r.q, r.cat, r.aim||'', String.fromCharCode(65+(r.chosen??-1)), r.correctIdx, r.correct])
  );
  import('./utils.js').then(u=>u.exportCSV('online-my-answers.csv', rows));
};