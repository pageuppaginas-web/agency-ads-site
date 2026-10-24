document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      mainNav.classList.remove('is-open');
    });
  });
}

const leadForm = document.querySelector('#lead-form');
const formStatus = document.querySelector('#form-status');

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!leadForm.reportValidity()) return;

    const formData = new FormData(leadForm);
    const name = String(formData.get('name') || '').trim();
    const business = String(formData.get('business') || '').trim();
    const goal = String(formData.get('goal') || '').trim();
    const selectedChannels = String(formData.get('plan') || '').trim();
    const channelLabels = {
      google: 'Google Ads',
      meta: 'Meta Ads',
      integrado: 'Google Ads + Meta Ads',
    };
    const message = [
      'Olá! Vim pelo site da Agency Ads e gostaria de conversar sobre tráfego pago.',
      '',
      `Nome: ${name}`,
      `Segmento do negócio: ${business}`,
      `Meu objetivo: ${goal}`,
      `Canais que quero avaliar: ${channelLabels[selectedChannels] || 'Ainda não defini'}`,
    ].join('\n');
    const whatsappUrl = `https://wa.me/5577988180629?text=${encodeURIComponent(message)}`;

    const whatsappLink = document.createElement('a');
    whatsappLink.href = whatsappUrl;
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.hidden = true;
    document.body.append(whatsappLink);
    whatsappLink.click();
    whatsappLink.remove();

    formStatus.textContent = 'Abrimos uma mensagem com suas respostas. Revise e toque em Enviar no WhatsApp para concluir.';
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
