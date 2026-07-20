const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const buyBar = document.querySelector('[data-buy-bar]');

const updateChrome = () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
  buyBar?.classList.toggle('visible', window.scrollY > 520);
};

updateChrome();
window.addEventListener('scroll', updateChrome, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('[data-accordion] button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');
    const willOpen = button.getAttribute('aria-expanded') !== 'true';

    document.querySelectorAll('[data-accordion] button').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      const otherAnswer = other.closest('.faq-item')?.querySelector('.faq-answer');
      if (otherAnswer) otherAnswer.hidden = true;
    });

    button.setAttribute('aria-expanded', String(willOpen));
    if (answer) answer.hidden = !willOpen;
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
