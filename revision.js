
import {builtIn} from './bank.js';
import {el, shuffle, isBTECUnit} from './utils.js';

let deck=[], fcIdx=0, leitner=JSON.parse(localStorage.getItem('l3_leitner')||'{}');

const category=el('category'), aimSel=el('aim');
const fcFront=el('fcFront'), fcBack=el('fcBack'), fcTags=el('fcTags');
const fcProg=el('fcProg');

function getCustom(){ return JSON.parse(localStorage.getItem('l3_custom')||'[]') }
function key(q){ return `${q.cat}|${q.aim||''}|${q.q}` }
function getBox(q){ return (leitner[key(q)]?.box)||1 }
function setBox(q,box){ leitner[key(q)]={box, last:Date.now()}; localStorage.setItem('l3_leitner', JSON.stringify(leitner)); updateBadge(); }
function updateBadge(){ const counts=[1,2,3,4,5].map(b=> deck.filter(q=>getBox(q)===b).length); el('leitnerCounts').textContent = `1:${counts[0]} • 2:${counts[1]} • 3:${counts[2]} • 4:${counts[3]} • 5:${counts[4]}` }

category.addEventListener('change',()=>{ const enable=isBTECUnit(category.value); aimSel.disabled=!enable; aimSel.parentElement.style.opacity=enable?1:.6; });
category.dispatchEvent(new Event('change'));

function buildDeck(){
  const all=[...builtIn, ...getCustom()].filter(q=> (category.value==='all'||q.cat===category.value));
  const aim=aimSel.value;
  deck = all.filter(q=> (!isBTECUnit(category.value) || aim==='all' || (q.aim||'')===aim)).sort((a,b)=> getBox(a)-getBox(b));
}

function start(){ buildDeck(); fcIdx=0; document.getElementById('setup').classList.add('hidden'); document.getElementById('rev').classList.remove('hidden'); updateBadge(); showCard(); }

function showCard(){
  if(deck.length===0){ fcFront.textContent='No cards yet for this selection.'; fcBack.classList.add('hidden'); fcBack.textContent=''; el('fcEasy').disabled=true; el('fcHard').disabled=true; fcTags.innerHTML=''; fcProg.textContent='0/0'; return; }
  const q=deck[fcIdx%deck.length];
  fcTags.innerHTML = `<span class="pill">${q.cat}${q.aim?` • Aim ${q.aim}`:''}</span> <span class="muted">${q.diff.toUpperCase()}</span>`;
  fcFront.textContent = q.q;
  fcBack.textContent = `Answer: ${q.options[q.correct]}\nWhy: ${q.exp||''}`;
  fcBack.classList.add('hidden'); el('fcEasy').disabled=true; el('fcHard').disabled=true;
  fcProg.textContent = `${(fcIdx%deck.length)+1}/${deck.length}`;
}

el('start').onclick=start;
el('fcShow').onclick=()=>{ fcBack.classList.remove('hidden'); el('fcEasy').disabled=false; el('fcHard').disabled=false; };
el('fcEasy').onclick=()=>{ const q=deck[fcIdx%deck.length]; setBox(q, Math.min(5, getBox(q)+1)); fcIdx++; showCard(); };
el('fcHard').onclick=()=>{ const q=deck[fcIdx%deck.length]; setBox(q, Math.max(1, getBox(q)-1)); fcIdx++; showCard(); };
