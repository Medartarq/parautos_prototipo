/* Generador de la hoja "CHECKLIST DE SERVICIO" (constancia de recepcion).
   Reproduce el modelo CHECKLISTV2 en HTML/CSS para imprimir con el motor
   del navegador. Las coordenadas estan en mm sobre una hoja A4 de 210x297. */
const SH_MM = v => v + 'mm';

const SH_TERMS = 'En caso EL CLIENTE no cumpla con retirar su vehículo dentro del plazo de tres (3) días, computados a partir de la fecha de haber recibido el aviso sobre la culminación del trabajo, LA EMPRESA cobrará la suma de S/. 50.00 diarios por el espacio que ocupa el vehículo. En los casos que así lo considere por conveniente. LA EMPRESA se compromete a efectuar la reparación, mantenimiento u otro similar en el plazo señalado, salvo caso fortuito, fuerza mayor, actos de terceros ajenos a nuestro personal, actos u omisiones del cliente. Si por alguna circunstancia fuera necesaria alguna reparación, mantenimiento u otro similar de mayor volumen o un mayor plazo, LA EMPRESA comunicará a EL CLIENTE en el más breve término posible, fijándose un plazo extraordinario para completar el trabajo encomendado. En ningún caso, y bajo ninguna circunstancia, EL CLIENTE tendrá facultad para reclamar el pago de una indemnización por daños y perjuicios, lucro cesante, entre otros, al no haber podido disponer de su vehículo en la fecha señalada. Se considerará como vehículo entregado cuando EL CLIENTE firme el documento de conformidad de salida. Cuando EL CLIENTE no cumpla con pagar la obligación asumida por la reparación, mantenimiento u otro similar, LA EMPRESA queda plenamente autorizada para ejercer derecho de retención sobre el vehículo, hasta que el importe total de la deuda sea íntegramente cancelado.';

/* Proporcion real de cada silueta, para que la celda case con la imagen
   y los trazos normalizados no se deformen. */
const SH_RATIO = {
  'V1-01': 682 / 585, 'V1-02': 1556 / 612, 'V1-03': 477 / 576, 'V1-04': 1371 / 598, 'V1-05': 1377 / 605,
  'V2-01': 755 / 562, 'V2-02': 1530 / 640, 'V2-03': 758 / 555, 'V2-04': 1553 / 523, 'V2-05': 1560 / 528,
  'V3-01': 731 / 651, 'V3-02': 1481 / 676, 'V3-03': 692 / 560, 'V3-04': 1491 / 497, 'V3-05': 1429 / 504,
  'V4-01': 710 / 635, 'V4-02': 1491 / 667, 'V4-03': 715 / 623, 'V4-04': 1472 / 613, 'V4-05': 1472 / 602,
};

/* Las 5 celdas del modelo, en el orden y la posicion del recuadro original. */
const SH_VIEWS = [
  { key: '03', slot: 'rear',   label: 'Posterior' },
  { key: '02', slot: 'top',    label: 'Superior' },
  { key: '01', slot: 'front',  label: 'Frontal' },
  { key: '04', slot: 'left',   label: 'Lateral izquierda' },
  { key: '05', slot: 'right',  label: 'Lateral derecha' },
];

const SH_FUEL = ['Vacío', '1/4', '1/2', '3/4', 'Lleno'];

/* Presupuesto del campo OBSERVACIONES: la caja mide 13.1mm y a 8pt caben
   unas 4 lineas de ~116 caracteres. */
const SH_OBS_CHARS = 440;

function shEscape(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shData(o) {
  const r = o.reception || {};
  const d = {
    mode: o.mode || r.mode || '',
    advisor: o.advisor || r.advisor || '',
    date: r.date || new Date().toISOString().slice(0, 10),
    claim: o.claim && o.claim !== '—' ? o.claim : (r.claim || ''),
    plate: o.plate || r.plate || '',
    brand: o.brand || r.brand || '',
    model: o.model || r.model || '',
    color: o.color || r.color || '',
    year: r.year || '',
    vin: r.vin || '',
    km: r.km || '',
    fuel: r.fuel || '',
    doc: o.doc || r.doc || '',
    client: o.client || r.client || '',
    cell: r.phone || '',
    email: r.email || '',
    body: o.body || r.body || 'V3',
    check: r.check || {},
    notes: r.notes || {},
    flags: Array.isArray(r.flags) ? r.flags : [],
    drawings: r.drawings || {},
    signature: r.signature || '',
  };
  const p = d.date.split('-');
  d.day = p[2] || ''; d.month = p[1] || ''; d.yearShort = p[0] || ''; d.hour = r.hour || '';
  return d;
}

function shField(label, value, left, top, width) {
  return `<div class="sh-f" style="left:${SH_MM(left)};top:${SH_MM(top)};width:${SH_MM(width)}">` +
    `<span class="sh-lab">${shEscape(label)}</span><span class="sh-val">${shEscape(value)}</span></div>`;
}

function shRow(left, top, width, label, value) {
  return shField(label, value, left, top, width);
}

function shInventory(d) {
  const cats = Object.keys(CHECK);
  const head = cats.map(() =>
    '<div class="sh-hg"><i></i><i>SI</i><i>NO</i></div>').join('');
  const body = cats.map(cat =>
    '<div class="sh-cg">' + CHECK[cat].map(item => {
      const v = d.check[item];
      const si = v === 'SI' ? ' sh-on' : '';
      const no = v === 'NO' ? ' sh-on' : '';
      return `<i class="sh-ci">${shEscape(item)}</i><i class="sh-cell${si}"></i><i class="sh-cell${no}"></i>`;
    }).join('') + '</div>').join('');
  return `<div class="sh-inv"><div class="sh-inv-head">${head}</div><div class="sh-inv-body">${body}</div></div>`;
}

function shObsText(flags) {
  const all = (Array.isArray(flags) ? flags : []).map(f => f + '.');
  const total = all.length;
  if (!total) return { text: '', shown: 0, total: 0, extra: 0 };
  const full = all.join(' ');
  if (full.length <= SH_OBS_CHARS) return { text: full, shown: total, total, extra: 0 };
  let shown = 1;
  for (let n = 2; n <= total; n++) {
    if (all.slice(0, n).join(' ').length + shObsSuffix(total - n).length > SH_OBS_CHARS) break;
    shown = n;
  }
  return { text: all.slice(0, shown).join(' '), shown, total, extra: total - shown };
}
function shObsSuffix(extra) {
  return extra ? ' (+' + extra + ' mas)' : '';
}
function shObsLines(d) {
  const r = shObsText(d.flags);
  return r.text + shObsSuffix(r.extra);
}

function shKmCells(km) {
  const digits = String(km || '').replace(/\D/g, '').slice(-8).padStart(8, ' ');
  return digits.split('').map(c => `<i class="sh-km${c === ' ' ? '' : ' sh-km-v'}">${c === ' ' ? '' : shEscape(c)}</i>`).join('');
}

function shViews(d) {
  const body = d.body;
  return SH_VIEWS.map(v => {
    const strokes = d.drawings[`${body}-${v.key}`] || [];
    const ratio = SH_RATIO[`${body}-${v.key}`] || 1.2;
    const polys = strokes.filter(s => s && s.length > 1).map(s =>
      '<polyline points="' + s.map(p => (p.u * 100).toFixed(2) + ',' + (p.v * 100).toFixed(2)).join(' ') + '"/>').join('');
    return `<div class="sh-view sh-view-${v.slot}" style="aspect-ratio:${ratio}">` +
      `<img src="assets/${body}-${v.key}.png" alt="${v.label}">` +
      (polys.length ? `<svg viewBox="0 0 100 100" preserveAspectRatio="none">${polys}</svg>` : '') +
      `</div>`;
  }).join('');
}

function shFuel(d) {
  const idx = SH_FUEL.indexOf(d.fuel);
  const ticks = SH_FUEL.map((_, i) =>
    `<i class="sh-tick${i === idx ? ' sh-tick-on' : ''}"></i>`).join('');
  return `<div class="sh-fuel-ticks">${ticks}</div>` +
    `<span class="sh-fuel-e">E</span><span class="sh-fuel-f">F</span>`;
}

function receptionSheet(o) {
  const d = shData(o);
  const cats = Object.keys(CHECK);
  const marks = cats.reduce((n, c) => n + CHECK[c].filter(x => d.check[x]).length, 0);
  const bodyName = (BODIES.find(b => b.id === d.body) || {}).name || '';

  return `<div class="modal-backdrop"><div class="modal sh-modal"><div class="modal-head">` +
    `<strong>Checklist de Ingreso · una hoja A4</strong><div>` +
    `<button class="btn" id="printDoc">Imprimir / guardar PDF</button> ` +
    `<button class="btn" id="closeModal">Cerrar</button></div></div>` +
    `<div class="modal-body sh-preview"><article class="sheet" id="shSheet">` +

    `<img class="sh-logo" src="assets/logo_parautos.svg" alt="PARAUTOS">` +
    `<h1 class="sh-title">CHECKLIST DE SERVICIO</h1>` +
    `<div class="sh-rule"></div>` +

    shRow(28.3, 30.75, 62, 'MODALIDAD:', d.mode) +
    shRow(104.1, 30.75, 62, 'ASESOR:', d.advisor) +
    `<div class="sh-f" style="left:${SH_MM(28.3)};top:${SH_MM(35.55)};width:${SH_MM(62)}">` +
    `<span class="sh-lab">FECHA/ HORA:</span>` +
    `<span class="sh-d"><b>${shEscape(d.day)}</b></span><span class="sh-sl">/</span>` +
    `<span class="sh-d"><b>${shEscape(d.month)}</b></span><span class="sh-sl">/</span>` +
    `<span class="sh-d"><b>${shEscape(d.yearShort)}</b></span>` +
    `<span class="sh-sl">:</span><span class="sh-d"><b>${shEscape(d.hour)}</b></span></div>` +
    shRow(104.1, 35.55, 62, 'NRO. SINIESTRO:', d.claim) +

    `<div class="sh-bar sh-bar-1"><span class="sh-bt">DATOS DEL VEHÍCULO</span><span class="sh-bt">DATOS DEL CLIENTE</span></div>` +

    shRow(28.3, 52.15, 62, 'PLACA:', d.plate) +
    shRow(104.1, 52.15, 62, 'DNI:', d.doc) +
    shRow(28.3, 56.95, 62, 'MARCA:', d.brand) +
    shRow(104.1, 56.95, 62, 'CLIENTE:', d.client) +
    shRow(28.3, 61.75, 62, 'MODELO:', d.model) +
    shRow(104.1, 61.75, 62, 'TELÉFONO:', '') +
    shRow(28.3, 66.55, 62, 'AÑO:', d.year) +
    shRow(104.1, 66.55, 62, 'CELULAR:', d.cell) +
    shRow(28.3, 71.35, 62, 'VIN:', d.vin) +
    shRow(104.1, 71.35, 62, 'E-MAIL:', d.email) +

    `<div class="sh-obs" style="top:77.37mm">OBSERVACIONES:</div>` +
    `<div class="sh-obs-body">${shEscape(shObsLines(d)) || '&nbsp;'}</div>` +

    `<div class="sh-bar sh-bar-2"><span class="sh-bt">INVENTARIO DEL VEHÍCULO</span></div>` +
    shInventory(d) +

    `<div class="sh-bar sh-bar-3"><span class="sh-bt">CARROCERÍA DEL VEHÍCULO</span></div>` +
    `<div class="sh-body">${shViews(d)}</div>` +
    `<div class="sh-side">` +
      `<div class="sh-box sh-box-fuel"><span class="sh-box-t">COMBUSTIBLE</span>${shFuel(d)}</div>` +
      `<div class="sh-box sh-box-km"><span class="sh-box-t">KILOMETRAJE</span><div class="sh-km-row">${shKmCells(d.km)}</div></div>` +
      `<div class="sh-box sh-box-sign"><span class="sh-sign-cap">FIRMA DE AUTORIZACIÓN PARA LA REALIZACIÓN DE TRABAJOS Y CONFORMIDAD DE INVENTARIO Y CONDICIONES DEL SERVICIO</span>` +
      `${d.signature ? `<img class="sh-sign-img" src="${d.signature}" alt="Firma del cliente">` : ''}` +
      `<span class="sh-sign-lb">FIRMA DEL CLIENTE</span></div>` +
    `</div>` +

    `<div class="sh-bar sh-bar-4"><span class="sh-bt">CONDICIONES DEL SERVICIO</span></div>` +
    `<p class="sh-terms">${shEscape(SH_TERMS)}</p>` +

    `<div class="sh-bar sh-bar-5"><span class="sh-foot-i">&#9742;</span> 044-533665 - 952394849` +
    `<span class="sh-foot-sp"></span><span class="sh-foot-i">&#9679;</span> Avenida América Norte #2404. Urbanización Primavera.</div>` +
    `<img class="sh-brands" src="assets/modelo/marcas.png" alt="Marcas">` +

    `</article></div></div></div>`;
}

function openReceptionSheet(o) {
  $('#modalRoot').innerHTML = receptionSheet(o);
  $('#closeModal').onclick = () => { $('#modalRoot').innerHTML = ''; };
  $('#printDoc').onclick = () => print();
}

function conformityDate(value) {
  const parts = String(value || new Date().toISOString()).slice(0, 10).split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : new Date().toLocaleDateString('es-PE');
}

function serviceConformitySheet(o) {
  const reception = o.reception || {};
  const services = (Array.isArray(o.labor) ? o.labor : []).filter(item => String(item.d || '').trim() && item.ok);
  const controlDate = o.controlAt ? new Date(o.controlAt).toLocaleString('es-PE') : new Date().toLocaleString('es-PE');
  const advisor = o.advisor || state.currentUser?.nombres || '';
  const client = o.client || reception.client || '';
  const phone = o.phone || reception.phone || '';
  const mode = o.mode || reception.mode || 'Particular';

  return `<div class="modal-backdrop"><div class="modal conformity-modal"><div class="modal-head"><strong>Acta de conformidad · una hoja A4</strong><div><button class="btn" id="printConformity">Imprimir / guardar PDF</button> <button class="btn" id="closeConformity">Cerrar</button></div></div><div class="modal-body conformity-preview"><article class="conformity-sheet"><header class="conformity-header"><img src="assets/logo_parautos.svg" alt="PARAUTOS"><div><h1>ACTA DE CONFORMIDAD DE SERVICIOS</h1><p>Orden de servicio: <strong>${shEscape(o.number)}</strong></p></div></header><div class="conformity-date">Trujillo, ${conformityDate(o.controlAt)}</div><p class="conformity-text">Mediante el presente documento, se deja constancia que se ha recibido a mi satisfacción los servicios brindados por PARAUTOS, servicios que corresponden al 100% del monto total de la orden de servicio suscrita. Por lo cual, procedo al retiro de mi unidad de las instalaciones de la empresa en mención.</p><section class="conformity-details"><div><b>NOMBRES Y APELLIDOS:</b> ${shEscape(client)}</div><div><b>DNI:</b> ${shEscape(o.doc || reception.doc || '')}</div><div><b>TELÉFONO:</b> ${shEscape(phone)}</div><div><b>TIPO DE SEGURO:</b> ${shEscape(mode)}</div><div><b>PLACA:</b> ${shEscape(o.plate)}</div><div><b>MARCA:</b> ${shEscape(o.brand)}</div><div><b>MODELO:</b> ${shEscape(o.model)}</div><div><b>COLOR:</b> ${shEscape(o.color)}</div></section><section class="conformity-control"><h2>CONTROL FINAL REGISTRADO</h2><p><b>Fecha y hora:</b> ${shEscape(controlDate)}<br><b>Asesor responsable:</b> ${shEscape(advisor)}</p><h3>Servicios verificados</h3><ul>${services.map(item => `<li>${shEscape(item.d)}</li>`).join('')}</ul></section><p class="conformity-text conformity-accept">Con mi firma acepto recibir mi vehículo con las reparaciones concluidas.</p><footer class="conformity-signature"><div><span></span><b>FIRMA DE CONFORMIDAD</b><small>Cliente</small></div><div><span></span><b>FIRMA DEL ASESOR</b><small>${shEscape(advisor)}</small></div></footer></article></div></div></div>`;
}

function openServiceConformity(o) {
  $('#modalRoot').innerHTML = serviceConformitySheet(o);
  $('#closeConformity').onclick = () => { $('#modalRoot').innerHTML = ''; };
  $('#printConformity').onclick = () => print();
}
