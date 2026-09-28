/* Local presentation state only. No patient records, network or HIS integration. */
window.Program = (() => {
  const key = 'utatlan-alejandro-isolated-20260928-v2';
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const initial = () => ({stage:0,patient:'Paciente A-104',service:'Cirugía ambulatoria',mode:'privado',doctor:''});
  const read = () => { try {const s=JSON.parse(localStorage.getItem(key)); if(s && Number.isInteger(s.stage) && s.stage>=0 && s.stage<=5 && ['privado','interno'].includes(s.mode) && ['Paciente A-104','Paciente A-205','Paciente A-318'].includes(s.patient) && ['Cirugía ambulatoria','Hospitalización','Procedimiento diagnóstico'].includes(s.service) && (s.mode==='interno' ? s.doctor==='' : s.stage<=1 || s.doctor==='UTM-0001')) return s;}catch{} return initial(); };
  const write = s => localStorage.setItem(key,JSON.stringify(s));
  const validDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s||'') && !isNaN(new Date(`${s}T12:00:00`)) && new Date(`${s}T12:00:00`).toISOString().slice(0,10)===s;
  const snapshot = () => {const q=new URLSearchParams(location.search),s=read(); const closed=q.get('cierre')==='1'||(s.stage===5&&s.mode==='privado');return {closed,date:validDate(q.get('fecha'))?q.get('fecha'):validDate(s.closedAt)?s.closedAt:today()};};
  const monthAfter = date => {const d=new Date(`${date}T12:00:00`),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+1);const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return d;};
  return {key,today,read,write,initial,snapshot,monthAfter};
})();
