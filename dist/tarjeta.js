const {closed}=Program.snapshot();
const portal=new URL('https://medicos-utatlan-alejandro-demo.onrender.com/portal.html');
document.querySelector('#portal-top').href=portal.href;
document.querySelector('#portal-link').href=portal.href;
document.querySelector('header .brand').href=portal.href;
document.querySelector('#level').textContent=closed?'SILVER':'BRONCE';
window.portalQrTarget=portal.href;
window.addEventListener('storage',e=>{if(e.key===Program.key)location.reload();});
