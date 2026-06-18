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

const sideWallPrice = 420;
const renderRoot = 'assets/images/configurator/render';

const dimensionRules = {
  single: {
    width: { min: 2.5, max: 4.75, step: 0.25 },
  },
  double: {
    width: { min: 5, max: 8, step: 0.25 },
  },
  depth: { min: 3, max: 6, step: 0.25 },
  height: { min: 2.25, max: 3, step: 0.25 },
};

const coverRenderSlugs = {
  none: null,
  wave: 'wellplatte',
  trapezoid: 'trapezblech_anthrazitgrau',
  trapezoidBrown: 'trapezblech_rotbraun',
  sandwich: 'sandwichpaneele_anthrazitgrau',
  sandwichBrown: 'sandwichpaneele_rotbraun',
};

const claddingRenderSlugs = {
  none: [],
  faseFichte: ['fasebretter_fichte', 'faserbretter_fichte'],
  rundFichte: ['rundprofil_fichte'],
  hnfFichte: ['hnf_bretter_fichte'],
  blockFichte: ['blockhausprofil_fichte', 'blockhaus_fichte'],
  deckelLaerche: ['deckelschalung_laerche'],
  rhombusLaerche: ['rhombusleisten_laerche'],
  rhombusKeim: ['rhombusleisten_kelm', 'rhombuasleisten_kelm'],
  rhombusDuraLavagrau: ['rhombusleisten_dura_lavagrau'],
  rhombusDuraKristallgrau: ['rhombusleisten_dura_kristallgrau'],
  rhombusBlack: ['rhombus_nf', 'rhombuas_nf'],
  trapezFichte: ['trapezprofil_fichte'],
  trapezLaerche: ['trapezprofil_laerche'],
  marienhofLavagrau: ['marienhofprofil_lavagrau'],
};

const state = {
  type: 'single',
  roof: 'flat',
  width: 3.5,
  depth: 5,
  height: 2.5,
  cover: 'none',
  sides: {
    left: false,
    right: false,
    back: false,
  },
  cladding: 'none',
};

const presets = {
  weather: {
    type: 'single',
    roof: 'flat',
    width: 2.5,
    depth: 3,
    height: 2.5,
    cover: 'sandwich',
    sides: { left: true, right: true, back: true },
    cladding: 'hnfFichte',
  },
  family: {
    type: 'double',
    roof: 'gable',
    width: 5,
    depth: 3,
    height: 2.75,
    cover: 'trapezoid',
    sides: { left: true, right: true, back: true },
    cladding: 'rundFichte',
  },
  budget: {
    type: 'single',
    roof: 'flat',
    width: 3,
    depth: 3,
    height: 2.25,
    cover: 'wave',
    sides: { left: false, right: false, back: false },
    cladding: 'none',
  },
};

const formatPrice = (value) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
}).format(value);

const snapToStep = (value, rule) => {
  const stepped = Math.round((value - rule.min) / rule.step) * rule.step + rule.min;
  return Number(stepped.toFixed(2));
};

const clampDimension = (value, rule) => {
  const numericValue = Number.isFinite(value) ? value : rule.min;
  const clamped = Math.min(rule.max, Math.max(rule.min, numericValue));
  return snapToStep(clamped, rule);
};

const normalizeDimensions = () => {
  state.width = clampDimension(state.width, dimensionRules[state.type].width);
  state.depth = clampDimension(state.depth, dimensionRules.depth);
  state.height = clampDimension(state.height, dimensionRules.height);
};

const calculateUnitPrice = () => {
  const area = state.width * state.depth;
  const activeSides = Object.values(state.sides).filter(Boolean).length;
  const sizeSurcharge = Math.max(0, area - 15) * 95;
  const heightSurcharge = Math.max(0, state.height - dimensionRules.height.min) * 480;
  const coverSurcharge = area * coverPricePerSquareMeter[state.cover];
  const claddingSurcharge = claddingSurcharges[state.cladding];

  return basePrices[state.type]
    + roofSurcharges[state.roof]
    + sizeSurcharge
    + heightSurcharge
    + coverSurcharge
    + activeSides * sideWallPrice
    + claddingSurcharge;
};

const getTotalPrice = () => calculateUnitPrice();

const getSelectionText = () => {
  const sideText = [
    `Links: ${state.sides.left ? 'Ja' : 'Nein'}`,
    `Rechts: ${state.sides.right ? 'Ja' : 'Nein'}`,
    `Hinten: ${state.sides.back ? 'Ja' : 'Nein'}`,
  ].join('  >  ');

  return `${labels.type[state.type]}  >  ${labels.roof[state.roof]}  >  ${state.width} × ${state.depth} × ${state.height} m  >  ${labels.cover[state.cover]}  >  ${sideText}  >  ${labels.cladding[state.cladding]}`;
};

const getActiveSidesText = () => {
  const activeSides = Object.entries(state.sides)
    .filter(([, enabled]) => enabled)
    .map(([side]) => ({ left: 'links', right: 'rechts', back: 'hinten' }[side]));

  return activeSides.length > 0 ? activeSides.join(', ') : 'keine';
};

const getCartImage = () => `${getRenderBasePath()}/${state.type}_${state.roof}_structure.jpg`;

const getCartItem = () => {
  const unitPrice = calculateUnitPrice();
  const configuration = JSON.parse(JSON.stringify(state));

  return {
    title: `${labels.type[state.type]} ${labels.roof[state.roof]}`,
    summary: `${state.width} × ${state.depth} × ${state.height} m, ${labels.cover[state.cover]}, Seiten: ${getActiveSidesText()}`,
    image: getCartImage(),
    previewLayers: getPreviewLayers(),
    unitPrice,
    configuration,
    signature: JSON.stringify(configuration),
    details: [
      { label: 'Carport-Art', value: labels.type[state.type] },
      { label: 'Dachform', value: labels.roof[state.roof] },
      { label: 'Maße', value: `${state.width} × ${state.depth} × ${state.height} m` },
      { label: 'Dacheindeckung', value: labels.cover[state.cover] },
      { label: 'Seitenverkleidung', value: `${labels.cladding[state.cladding]} (${getActiveSidesText()})` },
    ],
  };
};

const getRenderBasePath = () => `${renderRoot}/${state.type}/${state.roof}`;

const withImageExtensions = (pathWithoutExtension) => {
  return [`${pathWithoutExtension}.png`, `${pathWithoutExtension}.jpg`];
};

const setPreviewLayer = (image, sources) => {
  if (!image) return;

  const nextSources = sources.filter(Boolean);

  if (nextSources.length === 0) {
    image.hidden = true;
    image.removeAttribute('src');
    image.onerror = null;
    image.onload = null;
    return;
  }

  let index = 0;

  image.hidden = false;
  image.onload = () => {
    image.hidden = false;
  };
  image.onerror = () => {
    index += 1;

    if (index < nextSources.length) {
      image.src = nextSources[index];
      return;
    }

    image.hidden = true;
    image.removeAttribute('src');
    image.onerror = null;
    image.onload = null;
  };

  image.src = nextSources[index];
};

const getCladdingSources = (side) => {
  if (!state.sides[side] || state.cladding === 'none') return [];

  const basePath = `${getRenderBasePath()}/cladding/${side}`;
  const slugs = claddingRenderSlugs[state.cladding] || [];

  return slugs.flatMap((slug) => withImageExtensions(`${basePath}/${slug}`));
};

const getPreviewLayers = () => {
  const basePath = getRenderBasePath();
  const roofSlug = coverRenderSlugs[state.cover];

  return [
    {
      name: 'structure',
      sources: [
        `${basePath}/${state.type}_${state.roof}_structure.jpg`,
        `${basePath}/${state.type}_${state.roof}_structure.png`,
      ],
    },
    { name: 'back', sources: getCladdingSources('back') },
    { name: 'left', sources: getCladdingSources('left') },
    { name: 'right', sources: getCladdingSources('right') },
    { name: 'roof', sources: roofSlug ? withImageExtensions(`${basePath}/roof/${roofSlug}`) : [] },
  ];
};

const updatePreviewLayers = () => {
  const basePath = getRenderBasePath();
  const structure = document.getElementById('preview-structure');
  const back = document.getElementById('preview-cladding-back');
  const left = document.getElementById('preview-cladding-left');
  const right = document.getElementById('preview-cladding-right');
  const roof = document.getElementById('preview-roof');
  const roofSlug = coverRenderSlugs[state.cover];

  setPreviewLayer(structure, [
    `${basePath}/${state.type}_${state.roof}_structure.jpg`,
    `${basePath}/${state.type}_${state.roof}_structure.png`,
  ]);
  setPreviewLayer(back, getCladdingSources('back'));
  setPreviewLayer(left, getCladdingSources('left'));
  setPreviewLayer(right, getCladdingSources('right'));
  setPreviewLayer(roof, roofSlug ? withImageExtensions(`${basePath}/roof/${roofSlug}`) : []);
};

const updateActiveButtons = () => {
  document.querySelectorAll('[data-option]').forEach((button) => {
    button.classList.toggle('is-active', state[button.dataset.option] === button.dataset.value);
  });
};

const updateInputs = () => {
  const widthInput = document.getElementById('width-input');
  const depthInput = document.getElementById('depth-input');
  const heightInput = document.getElementById('height-input');
  const widthRule = dimensionRules[state.type].width;

  widthInput.min = widthRule.min;
  widthInput.max = widthRule.max;
  widthInput.step = widthRule.step;
  widthInput.value = state.width;

  depthInput.min = dimensionRules.depth.min;
  depthInput.max = dimensionRules.depth.max;
  depthInput.step = dimensionRules.depth.step;
  depthInput.value = state.depth;

  heightInput.min = dimensionRules.height.min;
  heightInput.max = dimensionRules.height.max;
  heightInput.step = dimensionRules.height.step;
  heightInput.value = state.height;

  document.querySelectorAll('[data-side]').forEach((checkbox) => {
    checkbox.checked = state.sides[checkbox.dataset.side];
  });
};

const render = () => {
  updatePreviewLayers();
  updateActiveButtons();
  updateInputs();
  document.getElementById('price-output').textContent = formatPrice(getTotalPrice());
  document.getElementById('selection-output').textContent = getSelectionText();
};

const setState = (nextState) => {
  const previousSides = { ...state.sides };
  Object.assign(state, nextState);

  if (nextState.sides) {
    state.sides = { ...previousSides, ...nextState.sides };
  }

  normalizeDimensions();
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
  const heightInput = document.getElementById('height-input');

  widthInput.addEventListener('change', () => setState({ width: Number(widthInput.value) }));
  depthInput.addEventListener('change', () => setState({ depth: Number(depthInput.value) }));
  heightInput.addEventListener('change', () => setState({ height: Number(heightInput.value) }));
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
    if (!window.SCSCart) {
      modalSummary.innerHTML = '<p>Der Warenkorb konnte nicht geladen werden. Bitte laden Sie die Seite erneut.</p>';

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      }
      return;
    }

    window.SCSCart.addItem(getCartItem());

    modalSummary.innerHTML = `
      <ul>
        <li><strong>Auswahl:</strong> ${getSelectionText()}</li>
        <li><strong>Preis:</strong> ${formatPrice(getTotalPrice())} inkl. MwSt. zzgl. Versand</li>
      </ul>
      <p>Die Konfiguration wurde dem Warenkorb hinzugefügt.</p>
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
