
export const el = (id)=>document.getElementById(id);
export const shuffle = (a)=>{ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
export const isBTECUnit = (cat)=>/^U\d+/.test(cat);
export function popToast(msg){
  let t = document.getElementById('toastHost');
  if(!t){ t=document.createElement('div'); t.id='toastHost'; t.style.position='fixed'; t.style.bottom='20px'; t.style.left='50%'; t.style.transform='translateX(-50%)'; t.style.zIndex=9999; document.body.appendChild(t) }
  const d=document.createElement('div'); d.textContent=msg; d.style.marginTop='8px'; d.style.padding='10px 14px'; d.style.background='#0f1626'; d.style.border='1px solid #2b3b63'; d.style.borderRadius='10px';
  t.appendChild(d); setTimeout(()=>{d.style.transition='opacity .5s'; d.style.opacity='0'; setTimeout(()=>d.remove(),500)},1200);
}
