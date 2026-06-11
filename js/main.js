const setupTabs = () => {
  const tabButtons = document.querySelectorAll('[data-tab]');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tab;

      tabButtons.forEach((tabButton) => tabButton.classList.remove('is-active'));
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('is-active'));

      button.classList.add('is-active');
      document.getElementById(targetId)?.classList.add('is-active');
    });
  });
};

const setupFaq = () => {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      button.querySelector('span').textContent = isOpen ? '⌃' : '⌄';
    });
  });
};

const setupPlzCheck = () => {
  const form = document.querySelector('[data-plz-form]');
  if (!form) return;

  const input = form.querySelector('input');
  const result = document.querySelector('[data-plz-result]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const plz = input.value.trim();

    if (!/^\d{5}$/.test(plz)) {
      result.textContent = 'Bitte geben Sie eine fünfstellige Postleitzahl ein.';
      return;
    }

    const firstDigit = Number(plz[0]);
    if (firstDigit >= 6 && firstDigit <= 9) {
      result.textContent = 'Ihre Adresse liegt voraussichtlich in Liefergebiet 1.';
    } else {
      result.textContent = 'Ihre Adresse liegt voraussichtlich in Liefergebiet 2 oder wird per Spedition geprüft.';
    }
  });
};

const setupScrollButtons = () => {
  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
};

setupTabs();
setupFaq();
setupPlzCheck();
setupScrollButtons();
