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
    wave: 'Wellplatte',
    trapezoid: 'Trapezblech anthrazit',
    trapezoidBrown: 'Trapezblech rotbraun',
    sandwich: 'Sandwichpaneele anthrazit',
    sandwichBrown: 'Sandwichpaneele rotbraun',
  },
  cladding: {
    none: 'Ohne Seitenverkleidung',
    faseFichte: 'Fasebretter Fichte',
    rundFichte: 'Rundprofil Fichte',
    hnfFichte: 'HNF Bretter Fichte',
    blockFichte: 'Blockhausprofil Fichte',
    deckelLaerche: 'Boden-/Deckelschalung Lärche',
    rhombusLaerche: 'Rhombusleisten Lärche',
    rhombusKeim: 'Rhombusleisten Keim 4870',
    rhombusDuraLavagrau: 'Rhombusleisten Dura Lavagrau',
    rhombusDuraKristallgrau: 'Rhombusleisten Dura Kristallgrau',
    rhombusBlack: 'Rhombus NF mit schwarzer Sichtfuge',
    trapezFichte: 'Trapezprofil Fichte',
    trapezLaerche: 'Trapezprofil Lärche',
    marienhofLavagrau: 'Marienhofprofil Lavagrau',
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
  trapezoidBrown: 52,
  sandwich: 82,
  sandwichBrown: 82,
};

const claddingSurcharges = {
  none: 0,
  faseFichte: 420,
  rundFichte: 440,
  hnfFichte: 480,
  blockFichte: 520,
  deckelLaerche: 560,
  rhombusLaerche: 610,
  rhombusKeim: 640,
  rhombusDuraLavagrau: 660,
  rhombusDuraKristallgrau: 660,
  rhombusBlack: 690,
  trapezFichte: 450,
  trapezLaerche: 580,
  marienhofLavagrau: 620,
};

const state = {
  type: 'single',
  roof: 'flat',
  width: 5,
  depth: 5,
  cover: 'none',
  cladding: 'none',
  quantity: 1,
};

const presets = {
  weather: {
    type: 'single',
    roof: 'flat',
    width: 2.5,
    depth: 3,
    cover: 'sandwich',
    cladding: 'hnfFichte',
    quantity: 1,
  },
  family: {
    type: 'double',
    roof: 'gable',
    width: 5,
    depth: 3,
    cover: 'trapezoid',
    cladding: 'rundFichte',
    quantity: 1,
  },
  budget: {
    type: 'single',
    roof: 'flat',
    width: 3,
    depth: 3,
    cover: 'wave',
    cladding: 'none',
    quantity: 1,
  },
};

const formatPrice = (value) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
}).format(value);

const calculateUnitPrice = () => {
  const area = state.width * state.depth;
  const sizeSurcharge = Math.max(0, area - 15) * 95;
  const coverSurcharge = area * coverPricePerSquareMeter[state.cover];
  const claddingSurcharge = claddingSurcharges[state.cladding];

  return basePrices[state.type]
    + roofSurcharges[state.roof]
    + sizeSurcharge
    + coverSurcharge
    + claddingSurcharge;
};

const getTotalPrice = () => calculateUnitPrice() * state.quantity;

const getSelectionText = () => {
  return `${labels.type[state.type]}  >  ${labels.roof[state.roof]}  >  ${state.width} × ${state.depth} m  >  ${labels.cover[state.cover]}  >  ${labels.cladding[state.cladding]}`;
};

const updateActiveButtons = () => {
  document.querySelectorAll('[data-option]').forEach((button) => {
    button.classList.toggle('is-active', state[button.dataset.option] === button.dataset.value);
  });
};

const updateInputs = () => {
  document.getElementById('width-input').value = state.width;
  document.getElementById('depth-input').value = state.depth;

};

const render = () => {
  updateActiveButtons();
  updateInputs();
  document.getElementById('quantity-label').textContent = `${state.quantity} Stück`;
  document.getElementById('price-output').textContent = formatPrice(getTotalPrice());
  document.getElementById('selection-output').textContent = getSelectionText();
};

const setState = (nextState) => {
  Object.assign(state, nextState);

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

  widthInput.addEventListener('input', () => setState({ width: Number(widthInput.value) || 3 }));
  depthInput.addEventListener('input', () => setState({ depth: Number(depthInput.value) || 3 }));
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
setupPresets();
setupSummaryModal();
render();
