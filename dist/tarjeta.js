const {closed,date}=Program.snapshot();
const suffix=closed?`?cierre=1${date?`&fecha=${date}`:''}`:'';
const portal=new URL(`portal.html${suffix}`,location.href);
document.querySelector('#portal-top').href=portal.href;
document.querySelector('#portal-link').href=portal.href;
document.querySelector('#level').textContent=closed?'SILVER':'BRONCE';
const code=qrcode(0,'M');code.addData(portal.href);code.make();
document.querySelector('#qr').innerHTML=code.createSvgTag({cellSize:5,margin:15,scalable:true,alt:'Abrir portal médico'});
window.portalQrTarget=portal.href;

document.querySelector('header .brand').href=portal.href;
window.addEventListener('storage',e=>{if(e.key===Program.key)location.reload();});
