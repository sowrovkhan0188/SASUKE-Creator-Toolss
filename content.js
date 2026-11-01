(() => {
  if (document.getElementById('sasuke-tools-panel')) return;
  const CONTROL_URL = globalThis.SASUKE_CONFIG?.controlUrl;
  function notice(message) {
    let n = document.getElementById('sasuke-control-message');
    if (!n) { n=document.createElement('div'); n.id='sasuke-control-message';
      n.style.cssText='position:fixed;z-index:2147483647;right:14px;bottom:14px;padding:14px;background:#11131b;color:white;border:1px solid #ff426f;border-radius:12px;font:13px system-ui';
      document.documentElement.appendChild(n); }
    n.textContent=message;
  }
  async function remoteEnabled() {
    if (!CONTROL_URL || CONTROL_URL.includes('YOUR-WORKER')) { notice('SASUKE control server is not configured.'); return false; }
    try {
      const r=await fetch(CONTROL_URL+'/status',{cache:'no-store'});
      if (!r.ok) throw new Error('status');
      const data=await r.json();
      if (data.enabled !== true) { notice(data.message || 'SASUKE is disabled by its administrator.'); return false; }
      document.getElementById('sasuke-control-message')?.remove();
      return true;
    } catch { notice('SASUKE tools paused: control server cannot be reached.'); return false; }
  }
  if (!await remoteEnabled()) { setInterval(async()=>{ if(await remoteEnabled()) location.reload(); },300000); return; }
  setInterval(async()=>{ if(!(await remoteEnabled())) document.getElementById('sasuke-tools-panel')?.remove(); },300000);
  const panel = document.createElement('aside');
  panel.id = 'sasuke-tools-panel';
  panel.innerHTML = `
    <header class="sk-head"><div class="sk-brand"><span class="sk-mark">S</span><div><small>CREATOR TOOLS</small><strong>SASUKE</strong></div></div><button class="sk-close" type="button" aria-label="Close">×</button></header>
    <p class="sk-intro">Local video checks and caption tools for your creator workflow.</p>
    <section class="sk-card"><h2>Video quality checker</h2><p>Select a file to inspect its source dimensions. The file stays on your device.</p><label class="sk-pick" for="sk-file">CHOOSE VIDEO</label><input id="sk-file" type="file" accept="video/*"><div id="sk-result" class="sk-result">No video selected.</div></section>
    <section class="sk-card"><h2>Caption watermark helper</h2><p>Make a caption suffix and copy it into your post if you want.</p><input id="sk-watermark" class="sk-input" maxlength="80" value="SASUKE" aria-label="Watermark text"><button id="sk-copy" class="sk-button" type="button">COPY WATERMARK TEXT</button><div id="sk-copy-status" class="sk-small" aria-live="polite"></div></section>
    <a class="sk-upload" href="https://www.tiktok.com/tiktokstudio/upload?from=webapp" target="_blank" rel="noopener">OPEN TIKTOK STUDIO ↗</a>
    <p class="sk-foot">Source metadata only. This tool cannot force 4K or control TikTok's final processing.</p>`;
  document.documentElement.appendChild(panel);
  const $ = s => panel.querySelector(s);
  $('.sk-close').addEventListener('click', () => panel.remove());
  $('#sk-file').addEventListener('change', () => {
    const file = $('#sk-file').files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file); const video = document.createElement('video'); video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const w = video.videoWidth, h = video.videoHeight;
      const duration = Number.isFinite(video.duration) ? `${Math.floor(video.duration/60)}:${String(Math.floor(video.duration%60)).padStart(2,'0')}` : 'Unknown';
      const size = file.size >= 1024**3 ? `${(file.size/1024**3).toFixed(2)} GB` : `${(file.size/1024**2).toFixed(1)} MB`;
      const fourK = Math.max(w,h) >= 3840;
      $('#sk-result').innerHTML = `<strong>${esc(file.name)}</strong><div class="sk-stats"><span>RESOLUTION<b>${w} × ${h}</b></span><span>DURATION<b>${duration}</b></span><span>SIZE<b>${size}</b></span></div><div class="sk-status ${fourK?'sk-good':'sk-warn'}">${fourK?'4K-sized source detected':'Source dimensions below 4K'}</div><p class="sk-small">This describes the original file, not the quality TikTok serves after processing.</p>`;
      URL.revokeObjectURL(url);
    };
    video.onerror = () => { $('#sk-result').textContent = 'Could not read this file’s metadata in this browser.'; URL.revokeObjectURL(url); };
    video.src = url;
  });
  $('#sk-copy').addEventListener('click', async () => {
    const value = ($('#sk-watermark').value || 'SASUKE').trim();
    try { await navigator.clipboard.writeText(value); $('#sk-copy-status').textContent = 'Copied. Paste it into your caption when posting.'; }
    catch { $('#sk-copy-status').textContent = `Copy manually: ${value}`; }
  });
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
})();
