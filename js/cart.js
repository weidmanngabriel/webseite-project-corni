const CART_KEY = 'scsCart';
const ORDER_KEY = 'scsLastOrder';

const deliveryRegions = {
  zone1: {
    label: 'SCS Liefergebiet 1',
    description: 'Eigener Fuhrpark, voraussichtlich 5-8 Werktage',
    price: 149,
  },
  zone2: {
    label: 'SCS Liefergebiet 2',
    description: 'Eigener Fuhrpark oder Tourenplanung, voraussichtlich 10-15 Werktage',
    price: 249,
  },
  forwarding: {
    label: 'Speditionsprüfung',
    description: 'Lieferung wird nach Adresse und Länge individuell geprüft',
    price: 349,
  },
};

const money = (value) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
}).format(value);

const parseStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
};

const getCart = () => parseStorage(CART_KEY, []);

const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCartCount();
  window.dispatchEvent(new CustomEvent('scs-cart-change'));
};

const createId = () => `scs-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const addItem = (item) => {
  const signature = item.signature || JSON.stringify(item.configuration || {});

  // Der MVP verwaltet bewusst genau einen konfigurierten Carport im Warenkorb.
  saveCart([{
    id: createId(),
    signature,
    ...item,
  }]);
};

const removeItem = (id) => {
  saveCart(getCart().filter((item) => item.id !== id));
};

const clearCart = () => saveCart([]);

const getDeliveryRegion = (postalCode = '') => {
  // Lokale Demo-Regel als Ersatz für eine produktive Liefergebiets-API.
  const normalized = postalCode.trim();
  if (!/^\d{5}$/.test(normalized)) return deliveryRegions.forwarding;

  const firstDigit = Number(normalized[0]);
  if (firstDigit >= 6 && firstDigit <= 9) return deliveryRegions.zone1;
  if (firstDigit >= 3 && firstDigit <= 5) return deliveryRegions.zone2;
  return deliveryRegions.forwarding;
};

const getCartTotals = (postalCode = '', discountCode = '') => {
  const items = getCart();
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice, 0);
  const delivery = items.length > 0 ? getDeliveryRegion(postalCode) : { ...deliveryRegions.zone1, price: 0 };
  const discount = discountCode.trim().toUpperCase() === 'SCS10' ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discount + delivery.price);

  return {
    items,
    subtotal,
    discount,
    delivery,
    total,
    taxIncluded: total * 0.19 / 1.19,
  };
};

const getItemDetailsHtml = (item) => `
  <ul class="cart-item-details">
    ${(item.details || []).map((detail) => `<li><strong>${detail.label}:</strong> ${detail.value}</li>`).join('')}
  </ul>
`;

const escapeAttribute = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const getPreviewHtml = (item, modifier = '') => {
  const layers = item.previewLayers || [
    { name: 'structure', sources: [item.image] },
  ];

  return `
    <div class="configured-preview ${modifier}" aria-hidden="true">
      ${layers.map((layer) => {
        const sources = (layer.sources || []).filter(Boolean);
        if (sources.length === 0) return '';

        return `<img class="preview-layer preview-layer-${layer.name}" src="${escapeAttribute(sources[0])}" data-preview-sources="${escapeAttribute(JSON.stringify(sources))}" alt="">`;
      }).join('')}
    </div>
  `;
};

const getEmptyCartHtml = () => `
  <section class="empty-state">
    <h2>Ihr Warenkorb ist leer</h2>
    <p>Starten Sie mit einer Carport-Konfiguration und legen Sie den Bausatz in den Warenkorb.</p>
    <a class="button button-yellow" href="konfigurator.html">Carport konfigurieren</a>
  </section>
`;

const getSummaryHtml = (totals, options = {}) => `
  <div class="summary-card">
    <h2>${options.title || 'Zusammenfassung'}</h2>
    <dl class="summary-list">
      <div><dt>Zwischensumme</dt><dd>${money(totals.subtotal)}</dd></div>
      <div><dt>Versand</dt><dd>${money(totals.delivery.price)}</dd></div>
      ${totals.discount > 0 ? `<div><dt>Rabatt</dt><dd>-${money(totals.discount)}</dd></div>` : ''}
      <div class="summary-total"><dt>Gesamt</dt><dd>${money(totals.total)}</dd></div>
    </dl>
    <p class="summary-note">${totals.delivery.label}: ${totals.delivery.description}</p>
    <p class="summary-note">Alle Preise inkl. gesetzlicher MwSt.; enthaltener Steueranteil ca. ${money(totals.taxIncluded)}.</p>
    ${options.action || ''}
  </div>
`;

const renderCartCount = () => {
  const count = getCart().length;

  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  });
};

const renderCartPage = () => {
  const root = document.querySelector('[data-cart-page]');
  if (!root) return;

  const items = getCart();
  const discountInput = document.querySelector('[data-discount-code]');
  const discountCode = discountInput?.value || '';
  const totals = getCartTotals('', discountCode);

  if (items.length === 0) {
    root.innerHTML = getEmptyCartHtml();
    document.querySelector('[data-cart-summary]')?.replaceChildren();
    return;
  }

  root.innerHTML = items.map((item) => `
    <article class="cart-item">
      ${getPreviewHtml(item)}
      <div class="cart-item-body">
        <div class="cart-item-title">
          <div>
            <p class="eyebrow">Konfigurierter Artikel</p>
            <h2>${item.title}</h2>
          </div>
          <strong>${money(item.unitPrice)}</strong>
        </div>
        ${getItemDetailsHtml(item)}
        <div class="cart-item-actions">
          <a class="button button-gray" href="konfigurator.html">Konfiguration ändern</a>
          <button class="button button-ghost" type="button" data-cart-remove="${item.id}">Entfernen</button>
        </div>
      </div>
    </article>
  `).join('');

  const summary = document.querySelector('[data-cart-summary]');
  if (summary) {
    summary.innerHTML = getSummaryHtml(totals, {
      title: 'Warenkorb',
      action: '<a class="button button-yellow summary-action" href="checkout.html">Zur Kasse</a>',
    });
  }
};

const renderCheckoutPage = () => {
  const itemsRoot = document.querySelector('[data-checkout-items]');
  const summaryRoot = document.querySelector('[data-checkout-summary]');
  if (!itemsRoot || !summaryRoot) return;

  const items = getCart();
  if (items.length === 0) {
    itemsRoot.innerHTML = getEmptyCartHtml();
    summaryRoot.replaceChildren();
    return;
  }

  const postalCode = document.querySelector('[name="postalCode"]')?.value || '';
  const discountCode = document.querySelector('[data-discount-code]')?.value || '';
  const totals = getCartTotals(postalCode, discountCode);

  itemsRoot.innerHTML = items.map((item) => `
    <article class="checkout-line">
      ${getPreviewHtml(item, 'configured-preview-small')}
      <div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <small>1 Stück</small>
      </div>
      <strong>${money(item.unitPrice)}</strong>
    </article>
  `).join('');

  summaryRoot.innerHTML = getSummaryHtml(totals, {
    title: 'Bestellübersicht',
  });

  const deliveryResult = document.querySelector('[data-delivery-result]');
  if (deliveryResult) {
    deliveryResult.textContent = postalCode.trim()
      ? `${totals.delivery.label}: ${totals.delivery.description}`
      : 'Die Lieferkosten werden nach Eingabe der PLZ aktualisiert.';
  }
};

const setupCartPage = () => {
  if (!document.querySelector('[data-cart-page]')) return;

  document.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-cart-remove]');
    if (!removeButton) return;
    removeItem(removeButton.dataset.cartRemove);
    renderCartPage();
  });

  document.querySelector('[data-apply-discount]')?.addEventListener('click', renderCartPage);
  renderCartPage();
};

const setupCheckoutPage = () => {
  const form = document.querySelector('[data-checkout-form]');
  if (!form) return;

  form.addEventListener('input', (event) => {
    if (event.target.matches('[name="postalCode"], [data-discount-code]')) {
      renderCheckoutPage();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const items = getCart();
    if (items.length === 0) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const totals = getCartTotals(data.postalCode || '', data.discountCode || '');
    const order = {
      id: `SCS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: data,
      items,
      totals,
    };

    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    clearCart();
    window.location.href = 'bestellung.html';
  });

  renderCheckoutPage();
};

const renderOrderPage = () => {
  const root = document.querySelector('[data-order-page]');
  if (!root) return;

  const order = parseStorage(ORDER_KEY, null);
  if (!order) {
    root.innerHTML = `
      <section class="empty-state">
        <h1>Keine Bestellung gefunden</h1>
        <p>Die Bestellbestätigung wird angezeigt, nachdem der Checkout abgeschlossen wurde.</p>
        <a class="button button-yellow" href="konfigurator.html">Carport konfigurieren</a>
      </section>
    `;
    return;
  }

  const date = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(order.createdAt));

  root.innerHTML = `
    <section class="order-confirmation">
      <p class="eyebrow">Bestellung erfolgreich simuliert</p>
      <h1>Vielen Dank für Ihre Anfrage.</h1>
      <p class="lead">Ihre Bestellnummer lautet <strong>${order.id}</strong>. Eine echte Zahlung wurde nicht ausgeführt; der Prototyp speichert diese Bestätigung nur lokal im Browser.</p>
      <div class="order-grid">
        <article class="summary-card">
          <h2>Nächste Schritte</h2>
          <ol class="checkout-steps-list">
            <li>Fachberatung prüft Konfiguration und Lieferadresse.</li>
            <li>Sie erhalten ein verbindliches Angebot per E-Mail.</li>
            <li>Nach Freigabe wird die Fertigung und Lieferung geplant.</li>
          </ol>
        </article>
        <article class="summary-card">
          <h2>Bestelldaten</h2>
          <dl class="summary-list">
            <div><dt>Datum</dt><dd>${date}</dd></div>
            <div><dt>Name</dt><dd>${escapeHtml(order.customer.firstName)} ${escapeHtml(order.customer.lastName)}</dd></div>
            <div><dt>E-Mail</dt><dd>${escapeHtml(order.customer.email)}</dd></div>
            <div><dt>Zahlungsart</dt><dd>${escapeHtml(order.customer.payment)}</dd></div>
            <div class="summary-total"><dt>Gesamt</dt><dd>${money(order.totals.total)}</dd></div>
          </dl>
        </article>
      </div>
      <div class="checkout-review">
        ${order.items.map((item) => `
          <article class="checkout-line">
            ${getPreviewHtml(item, 'configured-preview-small')}
            <div>
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
              <small>1 Stück</small>
            </div>
            <strong>${money(item.unitPrice)}</strong>
          </article>
        `).join('')}
      </div>
      <div class="confirmation-actions">
        <button class="button button-gray" type="button" onclick="window.print()">Bestätigung drucken</button>
        <a class="button button-yellow" href="home.html">Zur Startseite</a>
      </div>
    </section>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  setupCartPage();
  setupCheckoutPage();
  renderOrderPage();
});

window.SCSCart = {
  addItem,
  clearCart,
  getCart,
  getCartTotals,
  money,
  renderCartCount,
};

document.addEventListener('error', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.matches('[data-preview-sources]')) return;

  const sources = JSON.parse(image.dataset.previewSources || '[]');
  const nextIndex = Number(image.dataset.previewIndex || '0') + 1;

  if (nextIndex < sources.length) {
    image.dataset.previewIndex = String(nextIndex);
    image.src = sources[nextIndex];
    return;
  }

  image.hidden = true;
}, true);
