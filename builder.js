
import {initTheme} from './theme.js';
initTheme();

const qPdf = document.getElementById('qPdf');
const msPdf = document.getElementById('msPdf');
const qFrame = document.getElementById('qFrame');
const msFrame = document.getElementById('msFrame');
const qPage = document.getElementById('qPage');
const msPage = document.getElementById('msPage');
const qGo = document.getElementById('qGo');
const msGo = document.getElementById('msGo');
const msReveal = document.getElementById('msReveal');
const msOverlay = document.getElementById('msOverlay');

function setSrc(frame, file, page){
  if(!file) return;
  const url = URL.createObjectURL(file);
  frame.src = url + (page?`#page=${page}`:'');
  frame.onload = ()=>{ /* keep URL alive while loaded */ };
}

qPdf.addEventListener('change', ()=>{
  const f=qPdf.files?.[0]; if(f){ setSrc(qFrame, f, +qPage.value||1); }
});
msPdf.addEventListener('change', ()=>{
  const f=msPdf.files?.[0]; if(f){ setSrc(msFrame, f, +msPage.value||1); }
});

qGo.onclick = ()=>{ if(qFrame.src && qFrame.src.startsWith('blob:')) qFrame.src = qFrame.src.split('#')[0] + `#page=${+qPage.value||1}`; }
msGo.onclick = ()=>{ if(msFrame.src && msFrame.src.startsWith('blob:')) msFrame.src = msFrame.src.split('#')[0] + `#page=${+msPage.value||1}`; }

msReveal.onclick = ()=>{
  msFrame.classList.toggle('blur');
  msOverlay.style.display = msFrame.classList.contains('blur') ? 'grid' : 'none';
};

// ----- Quick MCQ builder -----
const cat = document.getElementById('cat');
const aim = document.getElementById('aim');
const diff = document.getElementById('diff');
const qText = document.getElementById('qText');
const hint = document.getElementById('hint');
const exp = document.getElementById('exp');
const optA = document.getElementById('optA');
const optB = document.getElementById('optB');
const optC = document.getElementById('optC');
const optD = document.getElementById('optD');
const correct = document.getElementById('correct');
const add = document.getElementById('add');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('exportJSON');
const importInput = document.getElementById('importJSON');
const countP = document.getElementById('customCount');
const startCustom = document.getElementById('startCustom');

function getCustom(){ return JSON.parse(localStorage.getItem('l3_custom')||'[]') }
function setCustom(arr){ localStorage.setItem('l3_custom', JSON.stringify(arr)); updateCount(); }
function updateCount(){ const n=getCustom().length; countP.textContent = `You have ${n} custom question${n===1?'':'s'} saved on this device.`; }
updateCount();

add.onclick = ()=>{
  const q = (qText.value||'').trim();
  const A = (optA.value||'').trim();
  const B = (optB.value||'').trim();
  const C = (optC.value||'').trim();
  const D = (optD.value||'').trim();
  if(!q || !A || !B || !C || !D){ alert('Please fill the question and all four options.'); return; }
  const item = {
    cat: cat.value,
    aim: (aim.value||undefined),
    diff: diff.value,
    hint: (hint.value||undefined),
    q, options:[A,B,C,D],
    correct: +correct.value||0,
    exp: (exp.value||undefined)
  };
  const arr = getCustom(); arr.push(item); setCustom(arr);
  // soft clear
  qText.value = ''; optA.value=''; optB.value=''; optC.value=''; optD.value=''; hint.value=''; exp.value='';
  alert('Added to your bank!');
};

clearBtn.onclick = ()=>{ qText.value = ''; optA.value=''; optB.value=''; optC.value=''; optD.value=''; };

exportBtn.onclick = ()=>{
  const data = JSON.stringify(getCustom(), null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='l3-custom-questions.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 1000);
};

importInput.onchange = ()=>{
  const f = importInput.files?.[0]; if(!f) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const arr = JSON.parse(reader.result);
      if(Array.isArray(arr)){ const cur=getCustom(); setCustom(cur.concat(arr)); alert('Imported successfully.'); }
      else alert('Invalid JSON format.');
    }catch(e){ alert('Failed to parse JSON.'); }
  };
  reader.readAsText(f);
};

// Quick test with custom-only
startCustom.href = 'quiz.html?cat=all&aim=all&diff=mix&qty=12&secs=35&title=Custom%20Questions&src=custom';
