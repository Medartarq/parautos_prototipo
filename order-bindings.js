function wireApiDetail(o){
 const writeQuote=()=>Api.command(o,'quote',{labor:o.labor,quoteParts:o.quoteParts,noParts:!!o.noParts,fullQuote:!!o.fullQuote});
 $('#fullQuote')?.addEventListener('change',e=>{o.fullQuote=e.target.checked;writeQuote()});
 $('#noParts')?.addEventListener('change',e=>{o.noParts=e.target.checked;writeQuote()});
  $$('.quote-table').forEach(t=>{
    const key=t.dataset.key;
    const cells=[...t.querySelectorAll('tbody tr')].map(row=>[...row.querySelectorAll('input')]);
    const move=(input,rowDelta,columnDelta)=>{
      const row=cells.findIndex(items=>items.includes(input));
      const column=row<0?-1:cells[row].indexOf(input);
      const next=cells[row+rowDelta]?.[column+columnDelta];
      if(!next)return;
      next.focus();next.select?.();
    };
    t.querySelectorAll('input').forEach(inp=>{
    const change=()=>{const i=+inp.dataset.i;if(!o[key][i])o[key][i]={d:'',q:1,p:'',clientKey:crypto.randomUUID()};o[key][i][inp.dataset.col]=inp.dataset.col==='d'?inp.value:+inp.value;return writeQuote()};
    inp.onchange=change;
    if(inp.dataset.col==='d')inp.oninput=()=>{inp.value=inp.value.toUpperCase()};
    inp.onkeydown=async e=>{
      if(e.key==='Tab'&&key==='labor'&&!e.shiftKey){
        const parts=document.querySelector('table[data-key="quoteParts"] input[data-col="d"]');
        if(parts){e.preventDefault();parts.focus();parts.select?.();return;}
      }
      if(e.key==='Tab'&&key==='quoteParts'&&e.shiftKey){
        const labor=document.querySelector('table[data-key="labor"] tbody tr:last-child input[data-col="p"]');
        if(labor){e.preventDefault();labor.focus();labor.select?.();return;}
      }
      if(e.key==='Enter'&&e.ctrlKey){
        const quotePdf=document.querySelector('#quotePdf');
        if(quotePdf&&!quotePdf.disabled){e.preventDefault();quotePdf.click();return;}
      }
      const direction={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[e.key];
      if(direction){e.preventDefault();move(inp,...direction);return;}
      if(e.key==='Enter'&&inp.dataset.col==='d'){e.preventDefault();const next=+inp.dataset.i+1;await change();setTimeout(()=>$(`table[data-key="${key}"] input[data-i="${next}"][data-col="d"]`)?.focus(),0)}
    };
  });
  t.querySelectorAll('[data-del-item]').forEach(b=>b.onclick=()=>{o[key].splice(+b.dataset.delItem,1);writeQuote()});
 });
  $('#markSent')?.addEventListener('click',()=>{
    const date=$('#sentDate'),today=new Date().toISOString().slice(0,10);
    if(date&&!date.value)date.value=today;
    Api.command(o,'quote-sent',{date:date?.value||today});
  });
  $('#markApproved')?.addEventListener('click',()=>{
    const date=$('#approvedDate'),today=new Date().toISOString().slice(0,10);
    if(date&&!date.value)date.value=today;
    Api.command(o,'quote-approved',{date:date?.value||today});
  });
 $$('[data-part-check]').forEach((e,i)=>e.onchange=()=>{const p=o.parts[i];Api.command(o,'parts',{items:[{id:p.id,clientKey:p.clientKey,received:e.checked}]})});
  $$('[data-labor-ok]').forEach(e=>e.onchange=()=>{const index=+e.dataset.laborOk,x=o.labor[index];if(!x)return;Api.command(o,'checks',{items:[{index,id:x.id,clientKey:x.clientKey,ok:e.checked}]})});
  $('#markAllFinal')?.addEventListener('change',e=>Api.command(o,'checks',{items:o.labor.map((x,index)=>({x,index})).filter(({x})=>String(x.d||'').trim()).map(({x,index})=>({index,id:x.id,clientKey:x.clientKey,ok:e.target.checked}))}));
 const m=$('#markAllFinal');if(m){const r=controlRows(o),n=r.filter(x=>x.ok).length;m.indeterminate=n>0&&n<r.length}
  $('#finishControl')?.addEventListener('click',()=>{
    if (controlRows(o).some(line => !line.ok)) { toast('Verifica todos los conceptos antes de registrar el control final'); return; }
    Api.command(o,'control',{});
  });
  $('#serviceConformity')?.addEventListener('click',()=>openServiceConformity(o));
 $('#quotePdf')?.addEventListener('click',()=>documentPreview(o,'Cotización formal',true));
 $('#workPdf')?.addEventListener('click',()=>documentPreview(o,'Orden de servicio',false));
 $('#receptionPdf')?.addEventListener('click',async()=>{const r=await Api.reception(o);if(r)openReceptionSheet(o)});
 $('#statusSelect').onchange=e=>{if(confirm(`Cambiar a ${STAT[e.target.value]}?`))Api.command(o,'status',{status:e.target.value});else detail()};
}
