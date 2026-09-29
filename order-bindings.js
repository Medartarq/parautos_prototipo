function wireApiDetail(o){
 const writeQuote=()=>Api.command(o,'quote',{labor:o.labor,quoteParts:o.quoteParts,noParts:!!o.noParts,fullQuote:!!o.fullQuote});
 $('#fullQuote')?.addEventListener('change',e=>{o.fullQuote=e.target.checked;writeQuote()});
 $('#noParts')?.addEventListener('change',e=>{o.noParts=e.target.checked;writeQuote()});
 $$('.quote-table').forEach(t=>{
  const key=t.dataset.key;
  t.querySelectorAll('input').forEach(inp=>{
   const change=()=>{const i=+inp.dataset.i;if(!o[key][i])o[key][i]={d:'',q:1,p:'',clientKey:crypto.randomUUID()};o[key][i][inp.dataset.col]=inp.dataset.col==='d'?inp.value:+inp.value;return writeQuote()};
   inp.onchange=change;
   inp.onkeydown=async e=>{if(e.key==='Enter'&&inp.dataset.col==='d'){e.preventDefault();const next=+inp.dataset.i+1;await change();setTimeout(()=>$(`table[data-key="${key}"] input[data-i="${next}"][data-col="d"]`)?.focus(),0)}};
  });
  t.querySelectorAll('[data-del-item]').forEach(b=>b.onclick=()=>{o[key].splice(+b.dataset.delItem,1);writeQuote()});
 });
 $('#markSent')?.addEventListener('click',()=>Api.command(o,'quote-sent',{date:$('#sentDate')?.value||''}));
 $('#markApproved')?.addEventListener('click',()=>Api.command(o,'quote-approved',{date:$('#approvedDate')?.value||''}));
 $$('[data-part-check]').forEach((e,i)=>e.onchange=()=>{const p=o.parts[i];Api.command(o,'parts',{items:[{id:p.id,clientKey:p.clientKey,received:e.checked}]})});
 $$('[data-labor-ok]').forEach(e=>e.onchange=()=>{const x=o.labor[+e.dataset.laborOk];Api.command(o,'checks',{items:[{id:x.id,clientKey:x.clientKey,ok:e.checked}]})});
 $('#markAllFinal')?.addEventListener('change',e=>Api.command(o,'checks',{items:controlRows(o).map(x=>({id:x.id,clientKey:x.clientKey,ok:e.target.checked}))}));
 const m=$('#markAllFinal');if(m){const r=controlRows(o),n=r.filter(x=>x.ok).length;m.indeterminate=n>0&&n<r.length}
 $('#finishControl')?.addEventListener('click',()=>Api.command(o,'control',{}));
 $('#quotePdf')?.addEventListener('click',()=>documentPreview(o,'Cotización formal',true));
 $('#workPdf')?.addEventListener('click',()=>documentPreview(o,'Orden de servicio',false));
 $('#receptionPdf')?.addEventListener('click',async()=>{const r=await Api.reception(o);if(r)openReceptionSheet(o)});
 $('#statusSelect').onchange=e=>{if(confirm(`Cambiar a ${STAT[e.target.value]}?`))Api.command(o,'status',{status:e.target.value});else detail()};
}
