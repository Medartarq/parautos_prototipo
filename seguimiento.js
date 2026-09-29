const STAT={COTIZACION_PENDIENTE:'En taller',ESPERA_APROBACION:'En taller',ESPERA_REPUESTOS:'Espera de repuestos',EN_REPARACION:'En reparación',LISTA_PARA_ENTREGA:'Listo para entregar',ENTREGADA:'Servicio finalizado',CANCELADA:'Seguimiento finalizado'};
const P={COTIZACION_PENDIENTE:25,ESPERA_APROBACION:25,ESPERA_REPUESTOS:50,EN_REPARACION:75,LISTA_PARA_ENTREGA:100,ENTREGADA:100,CANCELADA:0};
const stages=['En taller','Espera de repuestos','En reparación','Listo para entregar'];

function renderOrder(o,r){
 if(o.status==='ENTREGADA'||o.status==='CANCELADA'){
  r.innerHTML=`<div class="result"><h2>${STAT[o.status]}</h2><div class="terminal">${o.status==='ENTREGADA'?'El vehículo fue entregado y este seguimiento ha concluido. Gracias por confiar en PARAUTOS.':'La atención fue cancelada. Para cualquier consulta, comunícate con tu asesor de servicio.'}</div></div>`;
  return;
 }
 const pct=P[o.status]??0;
 r.innerHTML=`<div class="result"><small>ORDEN ${o.number}</small><h2>${o.brand} ${o.model} · ${o.plate}</h2><p>Última actualización del asesor: <strong>${STAT[o.status]||o.status}</strong></p><div class="progress"><div class="fill" style="width:${pct*.8}%"></div><div class="car" style="left:${10+pct*.8}%">🚗</div>${stages.map((s,i)=>`<div class="stage ${pct>=(i+1)*25?'done':''}"><i>${pct>=(i+1)*25?'✓':i+1}</i><span>${s}</span></div>`).join('')}</div><div class="terminal">Tu vehículo está siendo atendido. Esta barra representa la etapa alcanzada, no el porcentaje físico exacto de reparación.</div></div>`;
}

function searchOrder(){
 const plate=document.querySelector('#plate').value.replace(/[^0-9A-Za-z]/g,'').toUpperCase();
 const code=document.querySelector('#code').value.trim().toUpperCase();
 const r=document.querySelector('#result');
 if(!plate||!code){r.innerHTML='<div class="result error">Ingresa la placa y el código de consulta.</div>';return}
  const workspace=JSON.parse(localStorage.getItem('parautos-apf2-static-v1')||'{"state":{"orders":[]}}');
  const o=workspace.state?.orders?.find(x=>String(x.plate||'').replace(/[^0-9A-Za-z]/g,'').toUpperCase()===plate&&String(x.code||'').toUpperCase()===code);
  if(o)renderOrder(o,r);else r.innerHTML='<div class="result error">No encontramos una orden con esos datos. Prueba con ABC-240 y P4R148AX.</div>';
}

document.querySelector('#search').onclick=searchOrder;
document.querySelector('#code').addEventListener('keydown',e=>{if(e.key==='Enter')searchOrder()});
document.querySelector('#plate').addEventListener('keydown',e=>{if(e.key==='Enter')searchOrder()});
