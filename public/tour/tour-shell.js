/* XGRC dashboard tour: shared render engine.
   Each dashboard page defines a CONFIG object and calls DashboardShell.init(CONFIG).
   All dates are relative to the day the page is viewed, so the demonstration never ages. */
(function(){

function today(){ const d = new Date(); d.setHours(9, 0, 0, 0); return d; }
function monthLabels(n){
  const out = []; const d = today(); d.setDate(1);
  for (let i = n - 1; i >= 0; i--){ const m = new Date(d.getFullYear(), d.getMonth() - i, 1); out.push(m.toLocaleDateString('en-GB', { month:'short' })); }
  return out;
}
function addDays(n){ const d = today(); d.setDate(d.getDate() + n); return d; }
const RAG_LABEL = { green:'On target', amber:'Watch', red:'Breach' };

const ragHex = { green:'#2fe88a', amber:'#ffb648', red:'#ff5470' };

function initials(owner){
  if (!owner) return '?';
  if (owner.length <= 3) return owner.toUpperCase();
  const words = owner.split(/[\s/]+/).filter(w => w && w.toLowerCase() !== 'and' && w !== '&');
  const letters = words.map(w => w[0].toUpperCase()).join('');
  return letters.slice(0,3) || owner.slice(0,3).toUpperCase();
}

function trendGlyph(delta){ if (delta.startsWith('+')) return '▲'; if (delta.startsWith('-')) return '▼'; return '·'; }
function fmtDate(d){ return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short'}); }

function seedFromId(id){ let h = 0; const s = String(id); for (let i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) >>> 0; return h || 1; }
function mulberry32(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function historyFor(kpi){
  const rnd = mulberry32(seedFromId(kpi.id));
  const bias = kpi.tone === 'good' ? 0.62 : kpi.tone === 'bad' ? 0.38 : 0.5;
  const base = kpi.rag === 'red' ? 30 : kpi.rag === 'amber' ? 55 : 78;
  let v = base - 14;
  const pts = [];
  for (let i=0;i<10;i++){ v += (rnd() - (1-bias)) * 14; v = Math.max(4, Math.min(96, v)); pts.push(Math.round(v)); }
  pts[pts.length-1] = base;
  return pts;
}

function sparklineSVG(history, rag){
  const w = 100, h = 26, max = Math.max(...history), min = Math.min(...history);
  const pts = history.map((v,i)=>{
    const x = (i/(history.length-1))*w;
    const y = h - ((v-min)/((max-min)||1)) * (h-4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const color = ragHex[rag];
  return `<svg class="kspark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" width="100%" height="26">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  </svg>`;
}

function init(CONFIG){
  const KPIS = CONFIG.kpis;
  const sysColor = {};
  CONFIG.systems.forEach(s => sysColor[s.name] = s.color);

  const TODAY = today();
  const EXC = (CONFIG.exceptions || []).map(e => {
    const k = KPIS.find(x => x.id === e.kpiId);
    const d = new Date(TODAY); d.setDate(d.getDate() - e.ageDays);
    return { ...e, kpi:k, severity:k.rag === 'red' ? 'Red' : 'Amber', raisedDate: d };
  }).sort((a,b) => (a.severity === b.severity ? b.ageDays - a.ageDays : (a.severity === 'Red' ? -1 : 1)));

  let filterSys = 'all', filterRag = 'all', filterQuery = '';

  function computeAgg(){
    const total = KPIS.length;
    const green = KPIS.filter(k=>k.rag==='green').length;
    const amber = KPIS.filter(k=>k.rag==='amber').length;
    const red = KPIS.filter(k=>k.rag==='red').length;
    const health = Math.round((green*1 + amber*0.5 + red*0) / total * 100);
    return { total, green, amber, red, health };
  }

  function animateCountups(){
    document.querySelectorAll('[data-countup]').forEach(el=>{
      const target = parseFloat(el.getAttribute('data-countup'));
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 900; const start = performance.now();
      function step(now){
        const p = Math.min(1, (now-start)/dur);
        const eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.round(target*eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  function renderExecStats(){
    const agg = computeAgg();
    const openExc = EXC.filter(e=>e.status !== 'Resolved');
    const extra = CONFIG.execStats.map(s => `
      <div class="stat-tile"><div class="lbl">${s.label}</div><div class="val ${s.tone||''}" data-countup="${s.value}" ${s.suffix?`data-suffix="${s.suffix}"`:''}>0</div><div class="sub">${s.sub}</div></div>
    `).join('');
    document.getElementById('exec-stats').innerHTML = `
      <div class="stat-tile"><div class="lbl">Open exceptions</div><div class="val red" data-countup="${openExc.length}">0</div><div class="sub">${EXC.filter(e=>e.severity==='Red').length} red · ${EXC.filter(e=>e.severity==='Amber').length} amber</div></div>
      ${extra}
    `;
    animateCountups();
  }

  function renderHealthBadge(){
    const agg = computeAgg();
    const ring = document.getElementById('health-ring');
    const pct = document.getElementById('health-pct');
    if (ring) ring.style.setProperty('--pct', agg.health);
    if (pct) pct.textContent = agg.health + '%';
  }

  function renderFocus(){
    document.getElementById('focus-count').textContent = EXC.length + ' open items';
    document.getElementById('focus-list').innerHTML = EXC.map(e=>{
      const k = e.kpi;
      return `<div class="focus-item ${e.severity.toLowerCase()}" data-open="${k.id}">
        <span class="sev-badge ${e.severity==='Red'?'sev-red':'sev-amber'}">${e.severity}</span>
        <div class="focus-main">
          <div class="fname">${k.name}</div>
          <div class="fmeta">${k.system} &middot; owner ${k.owner}</div>
        </div>
        <div class="focus-val mono">${k.valueLabel}<span class="t">target ${k.target}</span></div>
        <div class="focus-age mono">raised ${fmtDate(e.raisedDate)}<br>${e.ageDays}d open</div>
        <div class="focus-status">${e.status}</div>
      </div>`;
    }).join('');
    document.querySelectorAll('.focus-item').forEach(el=>{
      el.addEventListener('click', ()=> openModal(parseInt(el.getAttribute('data-open'))));
    });
  }

  function passesFilter(k){
    if (filterSys !== 'all' && k.system !== filterSys) return false;
    if (filterRag !== 'all' && k.rag !== filterRag) return false;
    if (filterQuery){
      const q = filterQuery.toLowerCase();
      const hay = (k.name+' '+k.module+' '+k.owner+' '+k.desc).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function kpiCard(k){
    const hist = historyFor(k);
    return `<div class="kpi-card rag-${k.rag}" data-id="${k.id}" tabindex="0" role="button" aria-label="${k.name}: ${k.valueLabel}, ${RAG_LABEL[k.rag]}">
      <div class="khead"><div class="kname">${k.name}</div><span class="krag rag-${k.rag}">${RAG_LABEL[k.rag]}</span></div>
      <div class="kval-row"><span class="kval">${k.valueLabel}</span><span class="ktarget">target ${k.target}</span></div>
      ${sparklineSVG(hist, k.rag)}
      <div class="kfoot">
        <span class="kavatar" title="${k.owner}">${initials(k.owner)}</span>
        <span class="kcadence">${k.cadence}</span>
        <span class="ktrend ${k.tone}">${trendGlyph(k.delta)} ${k.delta}</span>
      </div>
    </div>`;
  }

  function renderSections(){
    let html = '';
    let anyVisible = false;
    CONFIG.systems.forEach(sysDef=>{
      const sys = sysDef.name;
      const sysKpis = KPIS.filter(k=>k.system===sys);
      if (filterSys !== 'all' && filterSys !== sys) return;
      const modules = [...new Set(sysKpis.map(k=>k.module))];
      let sysHtml = '';
      modules.forEach(mod=>{
        const rows = sysKpis.filter(k=>k.module===mod).filter(passesFilter);
        if (!rows.length) return;
        anyVisible = true;
        sysHtml += `<div class="module-section">
          <div class="module-header">
            <span class="sys-tag" style="background:${sysColor[sys]}22;color:${sysColor[sys]};">${sys}</span>
            <h3>${mod}</h3>
          </div>
          <div class="kpi-grid">${rows.map(kpiCard).join('')}</div>
        </div>`;
      });
      html += sysHtml;
    });
    document.getElementById('module-sections').innerHTML = anyVisible ? html : `<div class="empty-state">No KPIs match the current filters.</div>`;
    document.querySelectorAll('.kpi-card').forEach(el=>{
      const open = ()=> openModal(parseInt(el.getAttribute('data-id')));
      el.addEventListener('click', open);
      el.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  let modalSparkChart;
  function openModal(id){
    const k = KPIS.find(x=>x.id===id);
    if (!k) return;
    document.getElementById('modal-module').textContent = `${k.system} · ${k.module}`;
    document.getElementById('modal-name').textContent = k.name;
    document.getElementById('modal-desc').textContent = k.desc + (k.detail ? ' ' + k.detail : '');
    document.getElementById('modal-value').textContent = k.valueLabel;
    document.getElementById('modal-target').textContent = k.target;
    document.getElementById('modal-owner').textContent = k.owner;
    document.getElementById('modal-cadence').textContent = k.cadence;
    document.getElementById('modal-calc').textContent = k.calc;
    document.getElementById('modal-frameworks').innerHTML = (k.frameworks && k.frameworks.length
      ? k.frameworks.map(f=>`<span class="mtag">${f}</span>`).join('') : '')
      + `<span class="mtag" style="background:rgba(255,255,255,0.05);color:var(--faint);">Status: ${RAG_LABEL[k.rag]}</span>`;

    const hist = historyFor(k);
    if (modalSparkChart) modalSparkChart.destroy();
    modalSparkChart = new ApexCharts(document.getElementById('chart-modal-spark'), {
      chart:{ type:'area', height:70, sparkline:{enabled:true}, background:'transparent' },
      series:[{ name:k.name, data:hist }],
      stroke:{ curve:'smooth', width:2 },
      fill:{ type:'gradient', gradient:{ shadeIntensity:1, opacityFrom:0.35, opacityTo:0, stops:[0,100] } },
      colors:[ragHex[k.rag]],
      tooltip:{ theme:'dark', y:{ formatter:v=>v } }
    });
    modalSparkChart.render();

    document.getElementById('modal-overlay').classList.add('open');
  }

  document.getElementById('modal-close').addEventListener('click', ()=> document.getElementById('modal-overlay').classList.remove('open'));
  document.getElementById('modal-overlay').addEventListener('click', (e)=>{ if (e.target.id==='modal-overlay') e.currentTarget.classList.remove('open'); });
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') document.getElementById('modal-overlay').classList.remove('open'); });

  const tabsEl = document.getElementById('sys-tabs');
  tabsEl.innerHTML = `<button class="tab active" data-sys="all">All</button>` +
    CONFIG.systems.map(s=>`<button class="tab" data-sys="${s.name}">${s.name}</button>`).join('');
  tabsEl.addEventListener('click', (e)=>{
    const btn = e.target.closest('.tab'); if (!btn) return;
    tabsEl.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    filterSys = btn.getAttribute('data-sys');
    renderSections();
  });
  document.getElementById('rag-chips').addEventListener('click', (e)=>{
    const btn = e.target.closest('.chip'); if (!btn) return;
    document.querySelectorAll('#rag-chips .chip').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    filterRag = btn.getAttribute('data-rag');
    renderSections();
  });
  document.getElementById('kpi-search').addEventListener('input', (e)=>{
    filterQuery = e.target.value.trim();
    renderSections();
  });

  function applyFilter(opts){
    opts = opts || {};
    if (opts.sys !== undefined){
      filterSys = opts.sys;
      tabsEl.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.getAttribute('data-sys')===opts.sys));
    }
    if (opts.rag !== undefined){
      filterRag = opts.rag;
      document.querySelectorAll('#rag-chips .chip').forEach(t=>t.classList.toggle('active', t.getAttribute('data-rag')===opts.rag));
    }
    if (opts.query !== undefined){
      filterQuery = opts.query;
      const input = document.getElementById('kpi-search');
      if (input) input.value = opts.query;
    }
    renderSections();
    const target = document.getElementById('module-sections');
    if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  }


  document.getElementById('btn-export').addEventListener('click', ()=>{
    if (!window.jspdf) { showToast('PDF library did not load. Check your connection and try again.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:'pt', format:'a4' });
    const agg = computeAgg();
    const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    const dateStr = TODAY.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
    let y = 64;
    function newPage(){ doc.addPage(); y = 64; }
    function need(h){ if (y + h > H - 70) newPage(); }

    doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.setTextColor(10,20,35);
    const titleLines = doc.splitTextToSize(CONFIG.pdfTitle, W - 80);
    doc.text(titleLines, 40, y); y += titleLines.length * 22 + 2;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(90,100,115);
    doc.text('Board pack, ' + dateStr + '. Demonstration data: every figure is fictitious and illustrative.', 40, y); y += 28;

    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(10,20,35);
    doc.text('Summary', 40, y); y += 18;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(40,50,65);
    [
      `Composite health score: ${agg.health}%`,
      `KPIs tracked: ${agg.total} (${agg.green} on target, ${agg.amber} watch, ${agg.red} breach)`,
      `Open exceptions: ${EXC.length} (${EXC.filter(e=>e.severity==='Red').length} red, ${EXC.filter(e=>e.severity==='Amber').length} amber)`,
    ].forEach(line=>{ doc.text(line, 40, y); y += 16; });
    y += 14;

    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(10,20,35);
    doc.text('Where leadership should focus', 40, y); y += 18;
    // jsPDF's built-in Helvetica only covers Windows-1252: swap symbols it cannot draw.
    const pdfSafe = t => String(t).replace(/≤/g,'at most ').replace(/≥/g,'at least ').replace(/−/g,'-').replace(/×/g,'x').replace(/÷/g,'/').replace(/→/g,'->').replace(/\s+/g,' ').trim();
    EXC.forEach(e=>{
      const target = e.kpi.target === 'Monitor' ? 'monitored, with no fixed target' : 'against a target of ' + e.kpi.target;
      const body = pdfSafe(`${e.kpi.name}: ${e.kpi.valueLabel}, ${target}. Owner ${e.kpi.owner}. Raised ${fmtDate(e.raisedDate)}, ${e.ageDays} days ago. Status: ${e.status.toLowerCase()}.`);
      doc.setFontSize(9.5);
      const lines = doc.splitTextToSize(body, W - 95 - 40);
      need(lines.length * 12 + 6);
      doc.setFont('helvetica','bold'); doc.setTextColor(e.severity==='Red' ? 200:150, e.severity==='Red'?30:100, 40);
      doc.text(e.severity, 40, y);
      doc.setFont('helvetica','normal'); doc.setTextColor(40,50,65);
      doc.text(lines, 95, y);
      y += lines.length * 12 + 6;
    });

    if (typeof CONFIG.pdfExtra === 'function') {
      y = CONFIG.pdfExtra(doc, y, { need, newPage, pdfSafe, W, H }) || y;
    }

    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++){
      doc.setPage(i);
      const canFade = typeof doc.GState === 'function' && typeof doc.setGState === 'function';
      if (canFade) doc.setGState(new doc.GState({ opacity: 0.045 }));
      doc.setFont('helvetica','bold'); doc.setFontSize(54); doc.setTextColor(canFade ? 10 : 236, canFade ? 20 : 239, canFade ? 35 : 243);
      doc.text('DEMONSTRATION DATA', W/2 - 10, H/2 + 150, { align:'center', angle:35 });
      if (canFade) doc.setGState(new doc.GState({ opacity: 1 }));
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(120,130,145);
      doc.text(`XGRC® demonstration dashboard. Fictitious data, not a real organisation. xgrcsoftware.com/tour  |  Page ${i} of ${pages}`, 40, H - 32);
    }
    doc.save(CONFIG.pdfFilename);
    showToast('Board pack exported (demonstration data)');
  });

  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2600);
  }

  renderExecStats();
  renderHealthBadge();
  renderFocus();
  renderSections();

  if (typeof CONFIG.afterInit === 'function') {
    CONFIG.afterInit({ KPIS, EXC, ragHex, computeAgg, applyFilter });
  }
}

window.DashboardShell = { init, today, monthLabels, addDays };
})();
