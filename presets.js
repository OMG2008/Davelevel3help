
export const presets = {
  "Mixed Mock (30Q, 30s)": {category:"all", aim:"all", difficulty:"mix", qty:30, secs:30},
  "U1 Past Paper (A+B+C, 15Q)": {category:"U1: Principles of CS", aim:"all", difficulty:"mix", qty:15, secs:40},
  "U2 CPU & Logic (12Q)": {category:"U2: Computer Systems", aim:"all", difficulty:"mix", qty:12, secs:35},
  "U3 Project Mgmt (10Q)": {category:"U3: Project Mgmt", aim:"all", difficulty:"mix", qty:10, secs:30},
  "U4 Dev & Testing (12Q)": {category:"U4: Software Dev Project", aim:"all", difficulty:"mix", qty:12, secs:35},
  "U6 Web Dev Mixed (12Q)": {category:"U6: Web Dev", aim:"all", difficulty:"mix", qty:12, secs:30},
  "U11 Security (12Q)": {category:"U11: Cyber Security", aim:"all", difficulty:"mix", qty:12, secs:35},
  "U13 Databases (12Q)": {category:"U13: Databases", aim:"all", difficulty:"mix", qty:12, secs:35},
  "U13 Aim B Focus (10Q)": {category:"U13: Databases", aim:"B", difficulty:"mix", qty:10, secs:35}

  ,"Hard Mix (20Q, 25s)": {category:"all", aim:"all", difficulty:"hard", qty:20, secs:25}
  ,"Easy Warmup (10Q, 40s)": {category:"all", aim:"all", difficulty:"easy", qty:10, secs:40}
  ,"U1 Aim A Focus (12Q)": {category:"U1: Principles of CS", aim:"A", difficulty:"mix", qty:12, secs:35}
  ,"U2 Aim B CPU Focus (12Q)": {category:"U2: Computer Systems", aim:"B", difficulty:"mix", qty:12, secs:35}
  ,"U3 Quality & Risk (10Q)": {category:"U3: Project Mgmt", aim:"C", difficulty:"mix", qty:10, secs:35}
  ,"U4 UML & Testing (15Q)": {category:"U4: Software Dev Project", aim:"A", difficulty:"mix", qty:15, secs:35}
  ,"U6 Accessibility (10Q)": {category:"U6: Web Dev", aim:"A", difficulty:"mix", qty:10, secs:35}
  ,"U11 Legal & Ethical (12Q)": {category:"U11: Cyber Security", aim:"A", difficulty:"mix", qty:12, secs:35}
  ,"U13 Normalisation (Aim A, 12Q)": {category:"U13: Databases", aim:"A", difficulty:"mix", qty:12, secs:35}

};
export function applyPresetTo(form, preset){
  if(!preset) return;
  const set = (id,val)=>{ const e=document.getElementById(id); if(e){ if(e.tagName==='SELECT' || e.type==='number' || e.type==='text'){ e.value = val; e.dispatchEvent(new Event('change')) } } 
  ,"Hard Mix (20Q, 25s)": {category:"all", aim:"all", difficulty:"hard", qty:20, secs:25}
  ,"Easy Warmup (10Q, 40s)": {category:"all", aim:"all", difficulty:"easy", qty:10, secs:40}
  ,"U1 Aim A Focus (12Q)": {category:"U1: Principles of CS", aim:"A", difficulty:"mix", qty:12, secs:35}
  ,"U2 Aim B CPU Focus (12Q)": {category:"U2: Computer Systems", aim:"B", difficulty:"mix", qty:12, secs:35}
  ,"U3 Quality & Risk (10Q)": {category:"U3: Project Mgmt", aim:"C", difficulty:"mix", qty:10, secs:35}
  ,"U4 UML & Testing (15Q)": {category:"U4: Software Dev Project", aim:"A", difficulty:"mix", qty:15, secs:35}
  ,"U6 Accessibility (10Q)": {category:"U6: Web Dev", aim:"A", difficulty:"mix", qty:10, secs:35}
  ,"U11 Legal & Ethical (12Q)": {category:"U11: Cyber Security", aim:"A", difficulty:"mix", qty:12, secs:35}
  ,"U13 Normalisation (Aim A, 12Q)": {category:"U13: Databases", aim:"A", difficulty:"mix", qty:12, secs:35}

};
  if('category' in preset) set('category', preset.category);
  if('aim' in preset) set('aim', preset.aim);
  if('difficulty' in preset) set('difficulty', preset.difficulty);
  if('qty' in preset) set('qty', preset.qty);
  if('secs' in preset) set('secs', preset.secs);
}
