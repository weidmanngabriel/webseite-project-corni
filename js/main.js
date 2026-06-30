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
      const wasOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach((faqItem) => {
        faqItem.classList.remove('is-open');
        faqItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (wasOpen) return;

      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
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

const setupConfigPanelToggle = () => {
  const panel = document.querySelector('.config-panel');
  const button = document.querySelector('.collapse-pill');
  if (!panel || !button) return;

  button.addEventListener('click', () => {
    const isCollapsed = panel.classList.toggle('is-collapsed');

    button.textContent = isCollapsed ? '»' : '«';
    button.setAttribute('aria-expanded', String(!isCollapsed));
    button.setAttribute('aria-label', isCollapsed ? 'Panel öffnen' : 'Panel einklappen');
  });
};

const setupConfigSteps = () => {
  const steps = Array.from(document.querySelectorAll('[data-config-step]'));
  if (steps.length === 0) return;

  let activeIndex = Math.max(0, steps.findIndex((step) => step.classList.contains('is-active')));

  const renderSteps = () => {
    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === activeIndex);
    });
  };

  document.querySelectorAll('[data-step-next]').forEach((button) => {
    button.addEventListener('click', () => {
      activeIndex = Math.min(steps.length - 1, activeIndex + 1);
      renderSteps();
      steps[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.querySelectorAll('[data-step-prev]').forEach((button) => {
    button.addEventListener('click', () => {
      activeIndex = Math.max(0, activeIndex - 1);
      renderSteps();
      steps[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  renderSteps();
};

const setupReviewCarousel = () => {
  const carousel = document.querySelector('[data-review-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-review-track]');
  const reviews = Array.from(track?.children || []);
  const previousButton = carousel.querySelector('[data-review-prev]');
  const nextButton = carousel.querySelector('[data-review-next]');
  if (!track || reviews.length === 0 || !previousButton || !nextButton) return;

  let currentIndex = 0;

  const getVisibleCount = () => {
    if (window.matchMedia('(max-width: 640px)').matches) return 1;
    if (window.matchMedia('(max-width: 980px)').matches) return 2;
    return 3;
  };

  const renderCarousel = () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, reviews.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);

    reviews.forEach((review) => {
      review.style.flexBasis = `${100 / visibleCount}%`;
    });

    track.style.transform = `translateX(-${currentIndex * (100 / visibleCount)}%)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
  };

  previousButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    renderCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex += 1;
    renderCarousel();
  });

  window.addEventListener('resize', renderCarousel);
  renderCarousel();
};

setupTabs();
setupFaq();
setupPlzCheck();
setupScrollButtons();
setupConfigPanelToggle();
setupConfigSteps();
setupReviewCarousel();
