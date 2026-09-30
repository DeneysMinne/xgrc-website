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

// ---- Generic PPTX board pack builder, shared by every tour dashboard ----
const PX_NAVY='1B2A4A', PX_NAVY_DEEP='13203A', PX_ICE='D6E4F0', PX_ICE_SOFT='EFF5FA', PX_WHITE='FFFFFF',
      PX_SLATE='44506B', PX_FAINT='8592A8', PX_RED='C0392B', PX_RED_TINT='FBEAE8', PX_AMBER='C87A1E',
      PX_AMBER_TINT='FBF0E1', PX_GREEN='1E8F63', PX_GREEN_TINT='E7F5EE';
const PX_FONT_HEAD='Cambria', PX_FONT_BODY='Calibri';

function pxSectionHeader(P, slide, title, kicker){
  slide.addShape(P.ShapeType.ellipse, { x:0.5, y:0.42, w:0.22, h:0.22, fill:{color:PX_NAVY}, line:{type:'none'} });
  slide.addText(title, { x:0.86, y:0.28, w:10.8, h:0.5, fontFace:PX_FONT_HEAD, fontSize:24, bold:true, color:PX_NAVY, isTextBox:true, margin:0 });
  slide.addText(kicker || '', { x:0.86, y:0.72, w:11.2, h:0.3, fontFace:PX_FONT_BODY, fontSize:11, color:PX_FAINT, isTextBox:true, margin:0 });
  slide.addShape(P.ShapeType.line, { x:0.5, y:1.12, w:12.33, h:0, line:{color:PX_ICE, width:1} });
}
function pxFooter(slide, footerLine){
  slide.addText(footerLine, { x:0.5, y:7.14, w:11.33, h:0.28, fontFace:PX_FONT_BODY, fontSize:8.5, color:PX_FAINT, isTextBox:true, margin:0 });
}
function pxStatCard(P, slide, x, y, w, h, value, label, tone){
  const fillMap = { neutral:PX_ICE_SOFT, red:PX_RED_TINT, amber:PX_AMBER_TINT, green:PX_GREEN_TINT };
  const valColorMap = { neutral:PX_NAVY, red:PX_RED, amber:PX_AMBER, green:PX_GREEN };
  slide.addShape(P.ShapeType.roundRect, { x, y, w, h, rectRadius:0.08, fill:{color:fillMap[tone]||PX_ICE_SOFT}, line:{type:'none'} });
  slide.addText(String(value), { x:x+0.18, y:y+0.12, w:w-0.36, h:h*0.56, fontFace:PX_FONT_HEAD, fontSize:28, bold:true, color:valColorMap[tone]||PX_NAVY, isTextBox:true, margin:0, valign:'bottom' });
  slide.addText(label, { x:x+0.18, y:y+h*0.62, w:w-0.36, h:h*0.36, fontFace:PX_FONT_BODY, fontSize:10, color:PX_SLATE, isTextBox:true, margin:0, valign:'top' });
}
function pxRagPillText(rag){ return rag==='red' ? 'BREACH' : rag==='amber' ? 'WATCH' : 'ON TARGET'; }
function pxRagColors(rag){ return rag==='red' ? [PX_RED,PX_RED_TINT] : rag==='amber' ? [PX_AMBER,PX_AMBER_TINT] : [PX_GREEN,PX_GREEN_TINT]; }

function buildBoardPack(ctx){
  const KPIS = ctx.KPIS, EXC = ctx.EXC, agg = ctx.computeAgg(), showToast = ctx.showToast, TODAY = ctx.TODAY, CONFIG = ctx.CONFIG;

  function run(){
    const P = new window.PptxGenJS();
    P.layout = 'LAYOUT_WIDE';
    P.author = 'XGRC Software';
    P.title = CONFIG.pdfTitle || 'Board Pack';

    const titleParts = String(CONFIG.pdfTitle || 'XGRC · Board Pack').split(/\s*·\s*/);
    const eyebrow = (titleParts[0] || 'XGRC').toUpperCase();
    const mainTitle = titleParts.length > 1 ? titleParts[1] : titleParts[0];
    const footerLine = titleParts.join('  ·  ') + '  ·  Fictitious data, illustrative only';

    // ---------------------------------------------------------------- Slide: Title
    {
      const s = P.addSlide();
      s.background = { color: PX_NAVY_DEEP };
      s.addShape(P.ShapeType.ellipse, { x:10.6, y:4.6, w:4.2, h:4.2, fill:{color:PX_NAVY, transparency:40}, line:{type:'none'} });
      s.addShape(P.ShapeType.ellipse, { x:11.6, y:5.9, w:2.6, h:2.6, fill:{color:PX_ICE, transparency:85}, line:{type:'none'} });
      s.addText(eyebrow, { x:0.9, y:2.15, w:10.5, h:0.4, fontFace:PX_FONT_BODY, fontSize:13, color:PX_ICE, charSpacing:2, isTextBox:true, margin:0 });
      s.addText(mainTitle, { x:0.85, y:2.6, w:10.8, h:1.7, fontFace:PX_FONT_HEAD, fontSize:34, bold:true, color:PX_WHITE, isTextBox:true, margin:0, valign:'top' });
      s.addText('Board pack · Reporting period ended ' + TODAY.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}), { x:0.9, y:4.55, w:10, h:0.4, fontFace:PX_FONT_BODY, fontSize:13, color:'9FB3D6', isTextBox:true, margin:0 });
      s.addShape(P.ShapeType.line, { x:0.9, y:6.55, w:3.2, h:0, line:{color:PX_ICE, width:1, transparency:40} });
      s.addText('Prepared from the XGRC live tour dashboard. All figures, names and organisations on this page are fictitious and illustrative.', { x:0.9, y:6.68, w:10.5, h:0.5, fontFace:PX_FONT_BODY, fontSize:10, color:'7C8FB0', isTextBox:true, margin:0 });
    }

    // ---------------------------------------------------------------- Slide: Executive Summary
    {
      const s = P.addSlide();
      s.background = { color: PX_WHITE };
      pxSectionHeader(P, s, 'Executive Summary', 'Headline metrics and exception summary for the current cycle');

      const redKpis = KPIS.filter(k => k.rag === 'red');
      const amberKpis = KPIS.filter(k => k.rag === 'amber');
      const redExc = EXC.filter(e => e.severity === 'Red').length;
      const amberExc = EXC.filter(e => e.severity === 'Amber').length;
      const sysCount = (CONFIG.systems || []).length;
      const healthTone = agg.health >= 80 ? 'green' : agg.health >= 60 ? 'amber' : 'red';

      const row1Y = 1.45, row2Y = 3.35, cw = 3.85, ch = 1.55, gap = 0.28, startX = 0.5;
      pxStatCard(P, s, startX+0*(cw+gap), row1Y, cw, ch, agg.health + '%', 'Composite health score', healthTone);
      pxStatCard(P, s, startX+1*(cw+gap), row1Y, cw, ch, redKpis.length, 'KPIs in breach (red)', redKpis.length > 0 ? 'red' : 'green');
      pxStatCard(P, s, startX+2*(cw+gap), row1Y, cw, ch, EXC.length, 'Open exceptions', EXC.length > 0 ? (redExc > 0 ? 'red' : 'amber') : 'green');

      const execStats = CONFIG.execStats || [];
      const ecw = execStats.length ? (12.33 / execStats.length) - 0.28 * (execStats.length - 1) / execStats.length : cw;
      execStats.forEach((st, i) => {
        pxStatCard(P, s, startX + i * (ecw + 0.28), row2Y, ecw, ch, String(st.value) + (st.suffix || ''), st.label, 'neutral');
      });

      const narrative = 'the estate is operating at a composite health score of ' + agg.health + '%. Of ' + KPIS.length + ' KPIs tracked across ' + sysCount + ' system' + (sysCount===1?'':'s') + ', ' + redKpis.length + ' ' + (redKpis.length===1?'is':'are') + ' in breach and ' + amberKpis.length + ' ' + (amberKpis.length===1?'is':'are') + ' on watch. ' + EXC.length + ' exception' + (EXC.length===1?'':'s') + ' ' + (EXC.length===1?'is':'are') + ' currently open (' + redExc + ' red, ' + amberExc + ' amber).';

      s.addShape(P.ShapeType.roundRect, { x:0.5, y:5.25, w:12.33, h:1.35, rectRadius:0.08, fill:{color:PX_ICE_SOFT}, line:{type:'none'} });
      s.addText([
        { text:'Overall assessment: ', options:{ bold:true, color:PX_NAVY } },
        { text: narrative, options:{ color:PX_SLATE } },
      ], { x:0.75, y:5.42, w:11.83, h:1.05, fontFace:PX_FONT_BODY, fontSize:12.5, isTextBox:true, margin:0, valign:'top', lineSpacingMultiple:1.15 });

      pxFooter(s, footerLine);
    }

    // ---------------------------------------------------------------- Slide: KPI Health by System (chart)
    {
      const s = P.addSlide();
      s.background = { color: PX_WHITE };
      pxSectionHeader(P, s, 'KPI Health by System', 'Count of on-target, watch and breach KPIs per system');

      // Only systems that actually have KPIs - an empty declared system renders as a bare
      // zero-width row and, worse, its "0" data label collides with its real neighbour's label.
      const sysNames = (CONFIG.systems || []).map(sy => sy.name).filter(sn => KPIS.some(k => k.system === sn));
      const sysGreen = sysNames.map(sn => KPIS.filter(k => k.system === sn && k.rag === 'green').length);
      const sysAmber = sysNames.map(sn => KPIS.filter(k => k.system === sn && k.rag === 'amber').length);
      const sysRed = sysNames.map(sn => KPIS.filter(k => k.system === sn && k.rag === 'red').length);
      const maxTotal = Math.max.apply(null, sysNames.map((sn, i) => sysGreen[i] + sysAmber[i] + sysRed[i])) || 1;

      s.addChart(P.ChartType.bar, [
        { name:'On target', labels:sysNames, values:sysGreen },
        { name:'Watch', labels:sysNames, values:sysAmber },
        { name:'Breach', labels:sysNames, values:sysRed },
      ], {
        x:0.7, y:1.35, w:11.9, h:5.55, barDir:'bar', barGrouping:'stacked',
        chartColors:[PX_GREEN, PX_AMBER, PX_RED], showTitle:false,
        // No per-segment value labels: a 0-count segment has no width to anchor a label to,
        // so it renders as a stray "0" colliding with its neighbour - exact counts are in the
        // KPI Scorecard table right after this slide.
        showValue:false,
        catAxisLabelColor:PX_SLATE, catAxisLabelFontSize:11, catAxisLabelFontFace:PX_FONT_BODY,
        valAxisLabelColor:PX_SLATE, valAxisLabelFontSize:10, valAxisLabelFontFace:PX_FONT_BODY,
        valAxisMaxVal: maxTotal, valAxisMinVal:0, valGridLine:{color:PX_ICE, size:0.75}, catGridLine:{style:'none'}, barGapWidthPct:35,
        showLegend:true, legendPos:'b', legendColor:PX_SLATE, legendFontSize:11, legendFontFace:PX_FONT_BODY,
      });

      pxFooter(s, footerLine);
    }

    // ---------------------------------------------------------------- Slide(s): KPI Scorecard (table, manually paginated)
    {
      // pptxgenjs's built-in table autoPage is unreliable on real-world row content
      // (throws internally on some row shapes), so pages are chunked by hand here -
      // the same fixed row budget already proven to fit one slide cleanly.
      const CHUNK_ROWS = 12;
      const order = { green:0, amber:1, red:2 };
      const sorted = KPIS.slice().sort((a,b) => order[a.rag] - order[b.rag]);
      const headerRow = ['Metric','Actual','Target','Status','Owner'].map(t => ({
        text:t, options:{ bold:true, color:PX_WHITE, fill:{color:PX_NAVY}, fontFace:PX_FONT_BODY, fontSize:11 },
      }));

      for (let start = 0; start < sorted.length; start += CHUNK_ROWS) {
        const chunk = sorted.slice(start, start + CHUNK_ROWS);
        const s = P.addSlide();
        s.background = { color: PX_WHITE };
        const title = 'KPI Scorecard' + (start > 0 ? ' (continued)' : '');
        pxSectionHeader(P, s, title, KPIS.length + ' KPIs tracked at Group level this reporting cycle');

        const rows = [headerRow];
        chunk.forEach((k, i) => {
          const rc = pxRagColors(k.rag);
          const zebra = i % 2 === 1 ? PX_ICE_SOFT : PX_WHITE;
          rows.push([
            { text:k.name, options:{ color:PX_NAVY, fill:{color:zebra}, fontFace:PX_FONT_BODY, fontSize:10.5, bold:true } },
            { text:k.valueLabel, options:{ color:PX_SLATE, fill:{color:zebra}, fontFace:PX_FONT_BODY, fontSize:10.5, align:'center' } },
            { text:k.target, options:{ color:PX_FAINT, fill:{color:zebra}, fontFace:PX_FONT_BODY, fontSize:10.5, align:'center' } },
            { text:pxRagPillText(k.rag), options:{ color:rc[0], fill:{color:rc[1]}, fontFace:PX_FONT_BODY, fontSize:9.5, bold:true, align:'center' } },
            { text:k.owner, options:{ color:PX_SLATE, fill:{color:zebra}, fontFace:PX_FONT_BODY, fontSize:10 } },
          ]);
        });

        s.addTable(rows, {
          x:0.5, y:1.3, w:12.33, h:5.7, colW:[4.9,1.5,1.5,1.6,2.83],
          border:{type:'solid', color:PX_ICE, pt:0.5}, valign:'middle', margin:[3,6,3,6], autoPage:false,
        });

        pxFooter(s, footerLine);
      }
    }

    // ---------------------------------------------------------------- Slide(s): Where Leadership Should Focus (paginated)
    {
      const CHUNK = 6;
      const chunks = [];
      for (let i = 0; i < EXC.length; i += CHUNK) chunks.push(EXC.slice(i, i + CHUNK));
      if (!chunks.length) chunks.push([]);

      chunks.forEach((chunk, ci) => {
        const s = P.addSlide();
        s.background = { color: PX_WHITE };
        const title = 'Where Leadership Should Focus' + (ci > 0 ? ' (continued)' : '');
        pxSectionHeader(P, s, title, EXC.length + ' open KPI exception' + (EXC.length===1?'':'s') + ' this cycle');

        if (!chunk.length){
          s.addText('No open exceptions this cycle — all ' + KPIS.length + ' KPIs are within target.', { x:0.5, y:1.6, w:11.3, h:0.5, fontFace:PX_FONT_BODY, fontSize:14, color:PX_SLATE, isTextBox:true, margin:0 });
        }

        const colW = 5.95, gapX = 0.43, cardH = 1.68, gapY = 0.22;
        chunk.forEach((e, i) => {
          const sevLower = e.severity.toLowerCase();
          const tint = sevLower === 'red' ? PX_RED_TINT : PX_AMBER_TINT;
          const badge = sevLower === 'red' ? PX_RED : PX_AMBER;
          const col = i % 2, r = Math.floor(i / 2);
          const x = 0.5 + col * (colW + gapX);
          const y = 1.35 + r * (cardH + gapY);
          const targetTxt = e.kpi.target === 'Monitor' ? 'monitored, with no fixed target' : 'against a target of ' + e.kpi.target;
          const detail = e.kpi.valueLabel + ' ' + targetTxt;
          const age = e.status === 'Acknowledged' ? (e.ageDays + ' days · acknowledged') : (e.ageDays + ' days open');

          s.addShape(P.ShapeType.roundRect, { x, y, w:colW, h:cardH, rectRadius:0.07, fill:{color:tint}, line:{type:'none'} });
          s.addShape(P.ShapeType.ellipse, { x:x+0.22, y:y+0.22, w:0.36, h:0.36, fill:{color:badge}, line:{type:'none'} });
          s.addText(sevLower === 'red' ? 'R' : 'A', { x:x+0.22, y:y+0.22, w:0.36, h:0.36, fontFace:PX_FONT_HEAD, fontSize:13, bold:true, color:PX_WHITE, align:'center', valign:'middle', isTextBox:true, margin:0 });
          s.addText(e.kpi.name, { x:x+0.74, y:y+0.14, w:colW-1.0, h:0.4, fontFace:PX_FONT_BODY, fontSize:13, bold:true, color:PX_NAVY, isTextBox:true, margin:0 });
          s.addText(detail, { x:x+0.74, y:y+0.55, w:colW-1.0, h:0.35, fontFace:PX_FONT_BODY, fontSize:11, color:PX_SLATE, isTextBox:true, margin:0 });
          s.addText(e.kpi.owner, { x:x+0.74, y:y+0.95, w:colW-1.0, h:0.3, fontFace:PX_FONT_BODY, fontSize:10, color:PX_SLATE, isTextBox:true, margin:0 });
          s.addText(age, { x:x+0.74, y:y+1.24, w:colW-1.0, h:0.3, fontFace:PX_FONT_BODY, fontSize:9.5, italic:true, color:PX_FAINT, isTextBox:true, margin:0 });
        });

        pxFooter(s, footerLine);
      });
    }

    // ---------------------------------------------------------------- Dashboard-specific extra slides (optional)
    let handledClosing = false;
    if (typeof CONFIG.pptxExtra === 'function') {
      const helpers = { sectionHeader:(slide,title,kicker)=>pxSectionHeader(P,slide,title,kicker), footer:(slide)=>pxFooter(slide, footerLine),
        statCard:(slide,x,y,w,h,value,label,tone)=>pxStatCard(P,slide,x,y,w,h,value,label,tone), ragPillText:pxRagPillText, ragColors:pxRagColors,
        NAVY:PX_NAVY, NAVY_DEEP:PX_NAVY_DEEP, ICE:PX_ICE, ICE_SOFT:PX_ICE_SOFT, WHITE:PX_WHITE, SLATE:PX_SLATE, FAINT:PX_FAINT,
        RED:PX_RED, RED_TINT:PX_RED_TINT, AMBER:PX_AMBER, AMBER_TINT:PX_AMBER_TINT, GREEN:PX_GREEN, GREEN_TINT:PX_GREEN_TINT,
        FONT_HEAD:PX_FONT_HEAD, FONT_BODY:PX_FONT_BODY };
      const result = CONFIG.pptxExtra(P, { KPIS, EXC, agg, TODAY, footerLine }, helpers);
      handledClosing = !!(result && result.handledClosing);
    }

    // ---------------------------------------------------------------- Slide: Closing (generic, unless a dashboard supplied its own)
    if (!handledClosing) {
      const s = P.addSlide();
      s.background = { color: PX_NAVY_DEEP };
      s.addShape(P.ShapeType.ellipse, { x:-1.4, y:-1.4, w:3.6, h:3.6, fill:{color:PX_NAVY, transparency:40}, line:{type:'none'} });
      s.addShape(P.ShapeType.ellipse, { x:0.5, y:0.5, w:0.24, h:0.24, fill:{color:PX_ICE}, line:{type:'none'} });
      s.addText('Summary & Next Steps', { x:0.88, y:0.36, w:10.5, h:0.5, fontFace:PX_FONT_HEAD, fontSize:26, bold:true, color:PX_WHITE, isTextBox:true, margin:0 });

      const redExcList = EXC.filter(e => e.severity === 'Red').slice(0, 4);
      const amberExcList = EXC.filter(e => e.severity === 'Amber');
      const items = [];
      redExcList.forEach(e => {
        items.push(['Resolve', e.kpi.name + ' — currently ' + e.kpi.valueLabel + ' against a target of ' + e.kpi.target + '. Owner: ' + e.kpi.owner + '.']);
      });
      if (amberExcList.length){
        items.push(['Monitor', amberExcList.length + ' amber KPI' + (amberExcList.length===1?'':'s') + ' this cycle: ' + amberExcList.map(e => e.kpi.name).join(', ') + '.']);
      }
      if (!items.length){
        items.push(['Note', 'No open exceptions this cycle — all ' + KPIS.length + ' KPIs are within target.']);
      }

      items.slice(0, 4).forEach((a, i) => {
        const y = 1.5 + i * 1.2;
        s.addShape(P.ShapeType.roundRect, { x:0.6, y, w:0.62, h:0.62, rectRadius:0.31, fill:{color:PX_NAVY}, line:{color:PX_ICE, width:1} });
        s.addText(String(i + 1), { x:0.6, y, w:0.62, h:0.62, fontFace:PX_FONT_HEAD, fontSize:20, bold:true, color:PX_ICE, align:'center', valign:'middle', isTextBox:true, margin:0 });
        s.addText([
          { text:a[0] + '  ', options:{ bold:true, color:PX_WHITE } },
          { text:a[1], options:{ color:'9FB3D6' } },
        ], { x:1.45, y:y+0.02, w:11.1, h:0.95, fontFace:PX_FONT_BODY, fontSize:14, isTextBox:true, margin:0, valign:'middle', lineSpacingMultiple:1.12 });
      });

      s.addShape(P.ShapeType.line, { x:0.6, y:6.55, w:12.13, h:0, line:{color:PX_NAVY, width:1} });
      s.addText('Full drill-down detail for every metric in this pack is available in the live dashboard.', { x:0.6, y:6.68, w:8, h:0.35, fontFace:PX_FONT_BODY, fontSize:11, color:PX_ICE, isTextBox:true, margin:0 });
      s.addText('Demonstration data — fictitious and illustrative', { x:8.6, y:6.68, w:4.13, h:0.35, fontFace:PX_FONT_BODY, fontSize:9.5, italic:true, color:'7C8FB0', align:'right', isTextBox:true, margin:0 });
    }

    const fileName = (CONFIG.pdfFilename || 'XGRC-Board-Pack-Demo.pdf').replace(/\.pdf$/i, '.pptx');
    P.writeFile({ fileName }).then(() => {
      if (showToast) showToast('Board pack exported (demonstration data)');
    }).catch((err) => {
      if (window.console) console.error(err);
      if (showToast) showToast('Board pack export failed. Check your connection and try again.');
    });
  }

  if (window.PptxGenJS) { run(); return; }
  const scriptEl = document.createElement('script');
  scriptEl.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@4.0.1/dist/pptxgen.bundle.js';
  scriptEl.onload = run;
  scriptEl.onerror = function(){ if (showToast) showToast('Could not load the export library. Check your connection and try again.'); };
  document.head.appendChild(scriptEl);
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
    buildBoardPack({ KPIS, EXC, computeAgg, TODAY, showToast, CONFIG });
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
