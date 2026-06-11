const labels = {
  type: {
    single: 'Einzelcarport',
    double: 'Doppelcarport',
  },
  roof: {
    flat: 'Flachdach',
    gable: 'Satteldach',
  },
  cover: {
    none: 'Ohne Dacheindeckung',
    wave: 'Wellplatten',
    trapezoid: 'Trapezblech',
    sandwich: 'Sandwichpaneele',
  },
};

const basePrices = {
  single: 3200,
  double: 5450,
};

const roofSurcharges = {
  flat: 0,
  gable: 950,
};

const coverPricePerSquareMeter = {
  none: 0,
  wave: 36,
  trapezoid: 52,
  sandwich: 82,
};

const sideWallPrice = 420;

const state = {
  type: 'single',
  roof: 'flat',
  width: 5,
  depth: 5,
  cover: 'none',
  sides: {
    left: false,
    right: false,
    back: false,
  },
  quantity: 1,
};

const presets = {
  weather: {
    type: 'single',
    roof: 'flat',
    width: 2.5,
    depth: 3,
    cover: 'sandwich',
    sides: { left: true, right: true, back: true },
    quantity: 1,
  },
  family: {
    type: 'double',
    roof: 'gable',
    width: 5,
    depth: 3,
    cover: 'trapezoid',
    sides: { left: true, right: true, back: true },
    quantity: 1,
  },
  budget: {
    type: 'single',
    roof: 'flat',
    width: 3,
    depth: 3,
    cover: 'wave',
    sides: { left: false, right: false, back: false },
    quantity: 1,
  },
};

const formatPrice = (value) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
}).format(value);

const calculateUnitPrice = () => {
  const area = state.width * state.depth;
  const activeSides = Object.values(state.sides).filter(Boolean).length;
  const sizeSurcharge = Math.max(0, area - 15) * 95;
  const coverSurcharge = area * coverPricePerSquareMeter[state.cover];

  return basePrices[state.type]
    + roofSurcharges[state.roof]
    + sizeSurcharge
    + coverSurcharge
    + activeSides * sideWallPrice;
};

const getTotalPrice = () => calculateUnitPrice() * state.quantity;

const getSelectionText = () => {
  const sideText = [
    `Links: ${state.sides.left ? 'Mit Verkleidung' : 'Ohne'}`,
    `Rechts: ${state.sides.right ? 'Mit Verkleidung' : 'Ohne'}`,
    `Hinten: ${state.sides.back ? 'Mit Verkleidung' : 'Ohne'}`,
  ].join('  >  ');

  return `${labels.type[state.type]}  >  ${labels.roof[state.roof]}  >  ${state.width} × ${state.depth} m  >  ${labels.cover[state.cover]}  >  ${sideText}`;
};

const updateActiveButtons = () => {
  document.querySelectorAll('[data-option]').forEach((button) => {
    button.classList.toggle('is-active', state[button.dataset.option] === button.dataset.value);
  });
};

const updateInputs = () => {
  document.getElementById('width-input').value = state.width;
  document.getElementById('depth-input').value = state.depth;
  document.getElementById('quantity-input').value = state.quantity;

  document.querySelectorAll('[data-side]').forEach((checkbox) => {
    checkbox.checked = state.sides[checkbox.dataset.side];
  });
};

const render = () => {
  updateActiveButtons();
  updateInputs();
  document.getElementById('quantity-label').textContent = `${state.quantity} Stück`;
  document.getElementById('price-output').textContent = formatPrice(getTotalPrice());
  document.getElementById('selection-output').textContent = getSelectionText();
};

const setState = (nextState) => {
  const previousSides = { ...state.sides };
  Object.assign(state, nextState);

  if (nextState.sides) {
    state.sides = { ...previousSides, ...nextState.sides };
  }

  render();
};

const setupOptionButtons = () => {
  document.querySelectorAll('[data-option]').forEach((button) => {
    button.addEventListener('click', () => {
      setState({ [button.dataset.option]: button.dataset.value });
    });
  });
};

const setupNumberInputs = () => {
  const widthInput = document.getElementById('width-input');
  const depthInput = document.getElementById('depth-input');
  const quantityInput = document.getElementById('quantity-input');

  widthInput.addEventListener('input', () => setState({ width: Number(widthInput.value) || 3 }));
  depthInput.addEventListener('input', () => setState({ depth: Number(depthInput.value) || 3 }));
  quantityInput.addEventListener('input', () => setState({ quantity: Math.max(1, Number(quantityInput.value) || 1) }));
};

const setupSideSwitches = () => {
  document.querySelectorAll('[data-side]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      setState({ sides: { [checkbox.dataset.side]: checkbox.checked } });
    });
  });
};

const setupPresets = () => {
  document.querySelectorAll('[data-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      setState(presets[button.dataset.preset]);
      document.querySelector('.config-shell')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
};

const setupSummaryModal = () => {
  const modal = document.getElementById('summary-modal');
  const modalSummary = document.getElementById('modal-summary');
  const openButton = document.getElementById('summary-button');
  const closeButton = document.getElementById('close-modal');
  const printButton = document.getElementById('print-summary');

  openButton.addEventListener('click', () => {
    modalSummary.innerHTML = `
      <ul>
        <li><strong>Auswahl:</strong> ${getSelectionText()}</li>
        <li><strong>Menge:</strong> ${state.quantity}</li>
        <li><strong>Preis:</strong> ${formatPrice(getTotalPrice())} inkl. MwSt. zzgl. Versand</li>
      </ul>
    `;

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      alert(modalSummary.textContent);
    }
  });

  closeButton.addEventListener('click', () => modal.close());
  printButton.addEventListener('click', () => window.print());
};

setupOptionButtons();
setupNumberInputs();
setupSideSwitches();
setupPresets();
setupSummaryModal();
render();
