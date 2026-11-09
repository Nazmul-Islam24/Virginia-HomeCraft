import { useEffect } from 'react';
// Light scroll-reveal: cards slide in from the outside edges toward the centre, headings rise. Respects reduced motion.
export function useScrollReveal(path: string) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement; el.classList.add('in'); io.unobserve(el);
      setTimeout(() => { el.removeAttribute('data-r'); el.classList.remove('in'); el.style.removeProperty('--d'); }, 1200);
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    const tag = (el: Element, dir: string, i = 0) => { const h = el as HTMLElement; h.setAttribute('data-r', dir); h.style.setProperty('--d', `${Math.min(i, 5) * 90}ms`); io.observe(h); };
    const t = setTimeout(() => {
      document.querySelectorAll('#page section').forEach((s, si) => {
        if (si === 0) return;
        Array.from(s.firstElementChild?.children ?? []).forEach((c) => {
          if (c.classList.contains('grid') || c.querySelector(':scope > .grid')) {
            const g = c.classList.contains('grid') ? c : c.querySelector(':scope > .grid')!;
            if (g !== c) tag(c, 'up');
            const n = g.children.length; Array.from(g.children).forEach((k, i) => tag(k, n > 1 && i === 0 ? 'left' : n > 1 && i === n - 1 && n < 4 ? 'right' : i % 2 ? 'zoom' : 'up', i));
          } else tag(c, 'up');
        });
      });
    }, 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [path]);
}
