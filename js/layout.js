const benefitItems = [
  {
    label: 'Zertifizierter Shop',
    icon: '<path d="M12 21s7-3.4 7-9V5.8L12 3 5 5.8V12c0 5.6 7 9 7 9Z"/><path d="m9.5 12 1.7 1.7 3.6-4"/>',
  },
  {
    label: 'Schnelle Lieferung',
    icon: '<path d="M3 7h11v9H3z"/><path d="M14 10h3.5l2.5 3v3h-6z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  },
  {
    label: '180 Jahre Erfahrung',
    icon: '<circle cx="12" cy="9" r="4"/><path d="m9.6 12.3-.9 7 3.3-2 3.3 2-.9-7"/>',
  },
  {
    label: 'Kostenlose Fachberatung',
    icon: '<path d="M7 12.5 10 15c.8.7 1.9.7 2.7 0l4.8-4.2"/><path d="M2.5 15V8.5h3.2l3.1 2.1"/><path d="M21.5 15V8.5h-3.2l-2.2 1.4"/><path d="M9 10.6 11.8 8h2.6l2.8 2.8"/>',
  },
  {
    label: 'Hohe Verfügbarkeit',
    icon: '<path d="M5 5h14v4H5z"/><path d="M5 10h14v4H5z"/><path d="M5 15h14v4H5z"/><path d="M8 7h.1M12 12h.1M16 17h.1"/>',
  },
];

const navItems = [
  { href: 'index.html#holzbau', label: 'Holzbau', key: 'holzbau' },
  { href: 'index.html#fassade', label: 'Fassade', key: 'fassade' },
  { href: 'index.html#terrasse', label: 'Terrasse', key: 'terrasse' },
  { href: 'konfigurator.html', label: 'Carport', key: 'carport' },
  { href: 'index.html#sale', label: 'Sale %', key: 'sale' },
];

const iconButton = (label, title, icon, href = '') => href ? `
  <a class="header-icon" href="${href}" aria-label="${label}" title="${title}">
    <svg aria-hidden="true" viewBox="0 0 24 24">${icon}</svg>
    ${label === 'Warenkorb' ? '<span class="cart-badge" data-cart-count hidden>0</span>' : ''}
  </a>
` : `
  <button class="header-icon" type="button" aria-label="${label}" title="${title}">
    <svg aria-hidden="true" viewBox="0 0 24 24">${icon}</svg>
  </button>
`;

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';
    const variant = this.getAttribute('variant') || '';
    const headerClass = variant === 'hero' ? 'site-header site-header-hero' : 'site-header';

    this.innerHTML = `
      <div class="benefit-bar" aria-label="Shop-Vorteile">
        <ul class="container benefit-list">
          ${benefitItems.map((item) => `
            <li><span class="benefit-icon-circle" aria-hidden="true"><svg viewBox="0 0 24 24">${item.icon}</svg></span>${item.label}</li>
          `).join('')}
        </ul>
      </div>

      <header class="${headerClass}">
        <div class="container header-grid">
          <nav class="main-nav" aria-label="Hauptnavigation">
            ${navItems.map((item) => `<a href="${item.href}"${current === item.key ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
          </nav>
          <a class="logo" href="index.html" aria-label="SCS Holzwerke Startseite">
            <img src="assets/logos/scs-logo-black.svg" alt="SCS Holzwerke">
          </a>
          <div class="header-actions" aria-label="Schnellzugriff">
            <input class="search" type="search" aria-label="Artikelsuche" placeholder="Artikelsuche">
            ${iconButton('Kundenkonto', 'Kundenkonto', '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>')}
            ${iconButton('Merkliste', 'Merkliste', '<path d="M12 21s-7-4.4-9.2-8.5C.9 9 .9 4.8 4.4 3.4 7.2 2.3 10 4 12 6.5 14 4 16.8 2.3 19.6 3.4c3.5 1.4 3.5 5.6 1.6 9.1C19 16.6 12 21 12 21z"/>')}
            ${iconButton('Warenkorb', 'Warenkorb', '<path d="M6 6h15l-1.6 8.2H8L6 3H3"/><circle cx="9" cy="20" r="1.7"/><circle cx="18" cy="20" r="1.7"/>', 'warenkorb.html')}
          </div>
        </div>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="logo footer-logo" href="index.html"><img src="assets/logos/scs-logo-black.svg" alt="SCS Holzwerke"></a>
            <div class="footer-socials" aria-label="Social Media">
              <a href="#" aria-label="Instagram"><img src="assets/icons/instagram.svg" alt=""></a>
              <a href="#" aria-label="Facebook"><img src="assets/icons/facebook.svg" alt=""></a>
              <a href="#" aria-label="LinkedIn"><img src="assets/icons/linkedin.svg" alt=""></a>
              <a href="#" aria-label="YouTube"><img src="assets/icons/youtube.svg" alt=""></a>
            </div>
          </div>
          <div class="footer-col"><h3>Hilfe & Kontakt</h3><ul><li><a href="konfigurator.html#kontakt">Kontakt</a></li><li><a href="konfigurator.html#liefergebiet">Versand</a></li><li>Rückgabe & Widerruf</li><li>AGB</li><li>Datenschutz</li><li>Impressum</li><li>Zahlungsarten</li></ul></div>
          <div class="footer-col"><h3>Über SCS</h3><ul><li>Unternehmen</li><li>Nachhaltigkeit</li><li>Standorte</li><li>Unsere Fachmärkte</li></ul></div>
          <div class="footer-col"><h3>Service</h3><ul><li>Ratgeber</li><li>Kundenreferenzen</li><li><a href="konfigurator.html#faq">FAQ</a></li></ul></div>
          <div class="footer-section footer-payments"><h3>Zahlungsarten</h3><div class="payment-grid" aria-label="Zahlungsarten"><img src="assets/images/payment/mastercard.webp" alt="Mastercard"><img src="assets/images/payment/visa.webp" alt="Visa"><img src="assets/images/payment/paypal.webp" alt="PayPal"><img src="assets/images/payment/klarna.webp" alt="Klarna"><img src="assets/images/payment/apple-pay.webp" alt="Apple Pay"><img src="assets/images/payment/sepa.webp" alt="SEPA"></div></div>
          <div class="footer-section footer-rating"><h3>Kundenbewertungen</h3><img src="assets/trust/trusted-shops-logo.svg" alt="Trusted Shops"></div>
          <div class="footer-section footer-certificates"><h3>Unsere Auszeichnungen & Zertifikate</h3><div class="certificate-grid"><img src="assets/trust/trusted-shop-mobile.webp" alt="Trusted Shops Zertifikat"><img src="assets/trust/pefc.svg" alt="PEFC zertifiziert"><img src="assets/trust/ral.svg" alt="RAL Gütezeichen"></div></div>
        </div>
        <p class="copyright">Studienprojekt, kein offizieller SCS-Shop.</p>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
