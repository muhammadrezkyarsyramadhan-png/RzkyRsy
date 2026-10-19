/* Tema terang/gelap — dimuat di <head> agar tidak berkedip saat halaman dibuka */
(() => {
  const KEY = 'rzky-theme';
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem(KEY, next); } catch (e) {}
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = next === 'dark' ? '#0e1219' : '#2563eb';
      });
    });
  });
})();
