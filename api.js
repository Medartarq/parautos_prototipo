/* Static APF2 adapter: reproduces the app's client contract without a server. */
const Api = (() => {
  const KEY = 'parautos-apf2-static-v1';
  const clone = value => structuredClone(value);
  const user = { id: 2, nombres: 'Christian Cavero', nombreUsuario: 'crcavero', correo: 'ccavero@parautos.pe', activo: true };

  function save() {
    localStorage.setItem(KEY, JSON.stringify({ state: clone(state) }));
    syncLabel();
    return Promise.resolve();
  }

  function syncLabel() {
    const el = document.querySelector('#syncState');
    if (!el) return;
    el.textContent = '● Datos de demostracion guardados en este navegador';
    el.classList.remove('offline');
  }

  function refreshView() {
    save();
    if (typeof render === 'function') render();
  }

  function copyReception(d) {
    return {
      ...clone(d),
      date: new Date().toISOString().slice(0, 10),
      hour: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      advisor: user.nombres
    };
  }

  function apply(o, resource, body) {
    if (resource === 'quote') {
      o.labor = clone(body.labor || []);
      o.quoteParts = clone(body.quoteParts || []);
      o.noParts = !!body.noParts;
      o.fullQuote = !!body.fullQuote;
      o.parts = o.noParts ? [] : o.quoteParts.filter(line => String(line.d || '').trim()).map((line, index) => {
        const old = o.parts?.find(part => part.clientKey === line.clientKey || part.quotePartId === line.id);
        return { id: old?.id || index + 1, quotePartId: line.id, clientKey: line.clientKey, name: line.d, qty: line.q, status: old?.status || 'PENDIENTE_SOLICITAR', updated: old?.updated || '' };
      });
    }
    if (resource === 'parts') (body.items || []).forEach(item => {
      const part = o.parts.find(p => p.id === item.id || p.clientKey === item.clientKey);
      if (part) { part.status = item.received ? 'RECIBIDO' : 'PENDIENTE_SOLICITAR'; part.updated = new Date().toLocaleDateString('es-PE'); }
    });
    if (resource === 'checks') (body.items || []).forEach(item => {
      const line = o.labor.find(l => l.id === item.id || l.clientKey === item.clientKey);
      if (line) line.ok = !!item.ok;
    });
    if (resource === 'quote-sent') { o.quote = 'ENVIADA'; o.sentDate = body.date || new Date().toISOString().slice(0, 10); o.status = 'ESPERA_APROBACION'; }
    if (resource === 'quote-approved') { o.quote = 'APROBADA'; o.approvedDate = body.date || new Date().toISOString().slice(0, 10); o.status = o.parts?.some(p => p.status !== 'RECIBIDO') ? 'ESPERA_REPUESTOS' : 'EN_REPARACION'; }
    if (resource === 'status') o.status = body.status;
    if (resource === 'control') { o.controlDone = true; o.controlAt = new Date().toISOString(); o.status = 'LISTA_PARA_ENTREGA'; }
    o.version = (+o.version || 0) + 1;
    state.audit.unshift({ when: new Date().toLocaleString('es-PE'), event: `${o.number}: ${resource}`, user: user.nombres });
  }

  async function command(o, resource, body = {}) {
    apply(o, resource, body);
    refreshView();
    return o;
  }

  async function create() {
    capture();
    const d = clone(state.draft);
    const id = Math.max(0, ...state.orders.map(order => +order.id || 0)) + 1;
    const code = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase();
    const created = {
      id, version: 0, number: `OS-2026-${String(150 + id).padStart(5, '0')}`, code,
      client: d.client, doc: d.doc, phone: d.phone, email: d.email, plate: d.plate,
      brand: d.brand, model: d.model, color: d.color, body: d.body, mode: d.mode,
      claim: d.claim, advisor: user.nombres, status: 'COTIZACION_PENDIENTE', quote: 'PENDIENTE',
      labor: [], quoteParts: [], parts: [], controlDone: false, reception: copyReception(d)
    };
    state.orders.unshift(created);
    state.audit.unshift({ when: new Date().toLocaleString('es-PE'), event: `${created.number}: orden creada`, user: user.nombres });
    state.draft = freshDraft(); state.step = 1; state.selected = id; state.tab = 'summary'; state.route = 'detail';
    refreshView();
    toast('Orden creada en modo demostracion.');
    return created;
  }

  async function init() {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved?.state) state = normalizeState(saved.state);
    else { state = normalizeState({ orders: clone(seed), draft: freshDraft(), step: 1, route: 'dashboard', selected: 1, tab: 'summary', audit: [] }); await save(); }
    state.currentUser = user;
    render();
  }

  function receiptPayload(data) { return clone(data); }
  async function reception(o) { return o.reception || {}; }
  async function refresh() { syncLabel(); }
  async function flush() {}
  async function request() { throw new Error('El prototipo estatico no usa servidor.'); }
  async function getCurrentUser() { return user; }
  function showQueue() { toast('Prototipo estatico: todos los cambios se guardan localmente.'); }

  return { init, persist: save, command, create, refresh, flush, syncLabel, reception, request, receiptPayload, showQueue, getCurrentUser };
})();
