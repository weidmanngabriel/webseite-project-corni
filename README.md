# SCS Carport Configurator Study Project

Study project website for the UX redesign of the SCS carport configurator. The focus is on an easy-to-understand configurator page with selection logic, a price overview, a shopping cart, and a simulated checkout process.

## Target Audience and Problem Statement

The primary target audience consists of private builders, homeowners, and DIY enthusiasts who are planning a carport kit and want reliable guidance before placing an order. They are interested in building it themselves but are not necessarily familiar with every construction detail, material, or delivery condition. They therefore need clear selection guidance, an immediately visible preview, cost transparency, and easily accessible expert advice.

The redesign addresses three main problems in the original user experience: the entry point into the configuration should be easier to recognize through a clear primary selection window in the configurator, the extensive options should be easier to compare within a modern and consistent interface, and the current configuration status should remain transparent at all times through a live preview, selection summary, and price.

## Approach and Conceptual Foundation

Thorough planning was a central part of the project. Before implementation, the information hierarchy, page structure, user guidance, visual states, and the path from initial orientation to checkout were defined. This provided a consistent foundation for the subsequent implementation in HTML, CSS, and JavaScript. The Figma prototype and the underlying UX decisions were developed by the project team itself.

This planning resulted in a two-stage entry point: `home.html` represents the broader SCS shop context, while `index.html` guides people interested in carports to the configurator through benefits, presets, delivery information, references, and consultation options.

## Live URL

The website is published with password protection via GitHub Pages at the following URL:

```text
https://weidmanngabriel.github.io/webseite-project-corni/home.html
```

The source code remains maintainable and unencrypted in the repository. During deployment, a GitHub Actions workflow encrypts all HTML pages with StatiCrypt and publishes only the protected artifact. The password is stored as the GitHub Actions secret `STATICRYPT_PASSWORD` and is not included in either the code or the commit history. CSS, JavaScript, and image files remain static assets; page content is decrypted in the browser only after the correct password has been entered.

## Project Structure

```text
/
├── home.html               # Redesigned homepage styled after the general SCS timber shop
├── index.html              # Carport landing page, accessible via “Carports”
├── konfigurator.html       # Main page containing the carport configurator
├── warenkorb.html          # Shopping cart with configuration preview
├── checkout.html           # Simulated checkout with address, shipping, payment, and review
├── bestellung.html         # Local order confirmation after checkout completion
├── css/
│   └── styles.css          # Shared styling
├── js/
│   ├── cart.js             # LocalStorage cart, checkout logic, and order confirmation
│   ├── layout.js           # Reusable header and footer
│   ├── main.js             # Tabs, FAQ, postal-code check, and scroll buttons
│   └── configurator.js     # Selection state, price calculation, presets, and cart transfer
├── scripts/
│   └── build-protected-site.sh # Generates the encrypted deployment artifact
├── .github/workflows/
│   └── deploy-protected-pages.yml # Automated GitHub Pages deployment
├── package.json             # Pinned build dependencies for StatiCrypt
├── package-lock.json        # Reproducible deployment build versions
├── assets/
│   ├── icons/              # Local service, contact, and social icons
│   ├── images/             # Local product, hero, payment, and delivery-zone images
│   ├── logos/              # SCS logos
│   └── trust/              # Trust and certification logos
└── README.md               # Submission and setup documentation
```

## Features

### Homepage

- `home.html` is the central entry point and the destination of the logo, breadcrumbs, and back links.
- `index.html` is the project's carport entry page and is accessible via “Carports.”
- SCS-inspired benefits bar and header structure.
- Header and footer are implemented as reusable Web Components.
- Hero section matching the configurator page, with direct access to the configurator.
- SCS-inspired category, preset, review, delivery area, FAQ, and contact sections.
- Dummy postal-code check and popular carport configurations as clear conversion entry points.
- Service and trust elements, plus a shared footer.
- The shopping cart badge in the header displays items stored locally in the browser.

### Configurator Page

- Selection of carport type, roof shape, dimensions, and image-based variants for roofing and side cladding.
- Dimension logic with different width ranges for single and double carports, as well as depth and height in 0.25 m increments.
- Live preview using aligned rendering layers for the structure, roof covering, and side cladding.
- Guided stepper mode for tablets and mobile devices so that extensive selection groups are not displayed simultaneously.
- Dynamic price calculation based on simplified, fictional logic.
- Live summary of the current selection.
- Preset cards for popular configurations.
- Transfer to the shopping cart with the saved configuration, unit price, product details, and visual layer preview.
- Product description, technical specifications, data sheets/scope of delivery, and video placeholder presented in tabs.
- Customer testimonials, dummy delivery-area check, FAQ accordion, and contact section.

### Shopping Cart and Checkout

- `warenkorb.html` displays the current carport configuration, product details, actual layer preview, removal function, dummy voucher code `SCS10`, and access to checkout.
- The shopping cart is intentionally designed for one carport kit; a new configuration replaces the previous cart selection.
- `checkout.html` contains contact details, delivery address, dynamic postal-code/shipping-cost logic, payment method selection, an optional message, and final confirmation.
- After completion, `bestellung.html` displays a local order confirmation with order number, customer details, items, and the next consultation/quotation step.
- The entire flow uses `localStorage`, keeping it static, compatible with GitHub Pages, and functional without a backend.

## Technology Decision

- **HTML** for the static page structure.
- **CSS** for layout, responsive design, and SCS-inspired styling.
- **Vanilla JavaScript** for interactions and configurator logic.
- **Web Components** for the shared header and footer so recurring layout elements can be maintained centrally.
- **No framework, no backend, and no build process**, because the project scope does not require complex runtime infrastructure and the website therefore works both locally from the ZIP archive and on GitHub Pages without installation.
- **Local assets and `localStorage`** enable a self-contained demonstration of the preview, shopping cart, and order confirmation without an external product or order API.

## Reusable Header and Footer

New pages include the header and footer through `js/layout.js`:

```html
<site-header current="carport"></site-header>
...
<site-footer></site-footer>

<script src="js/layout.js"></script>
```

## UX and Conversion Rate Decisions

- The clear primary CTA leads directly to the configurator and makes the most important conversion path visible early.
- Active options are highlighted visually; hover and focus states provide additional interaction feedback.
- The live preview, selection summary, and price reduce uncertainty during configuration.
- Popular configurations provide quick entry points for users without a precise technical preselection.
- The preset cards on `index.html` open the configurator with the selected variant; type, roof shape, dimensions, covering, and side cladding are transferred directly through a URL parameter.
- FAQ, delivery area, customer references, and the contact section reduce typical purchasing barriers for a complex, high-priced product.
- The available selections are intentionally somewhat limited; for example, a different cladding material cannot be selected for each side. This keeps the MVP easy to use.
- A dedicated CTA for custom requests covers requirements outside the standard selection.
- The homepage adopts central configurator patterns so that the entry point and product page feel like one coherent flow.
- Shopping cart and checkout reproduce familiar shop steps and make the complete conversion path tangible in the prototype.

The central conversion goals are starting the configurator, completing a variant selection, transferring it to the shopping cart, completing the simulated checkout, and—where requirements remain open or individual—contacting the expert consultation team.

## Concept and Deviations

- The configurator structure is based on the previously developed Figma/PNG prototype and typical SCS shop elements.
- The core information architecture and planned functionality were implemented. Individual UI details, such as more prominent selection, hover, and state indicators, were refined during implementation to make interactions clearer.
- `index.html` serves as a focused carport landing page, providing people with a specific interest in carports with a clearer funnel.
- All product, service, payment, and delivery-zone images are loaded locally from `assets/` so the ZIP submission works without external image sources. External links lead only to additional SCS and social media pages.
- The prototype uses fictional price rules that are traceable in the code.
- The preview combines cut-out, aligned PNG layers for the structure, roof, and sides.
- Delivery checks, shopping cart, checkout, and order confirmation are simulated locally.

## Limitations

- No production checkout with backend integration.
- No real payment; payment methods are selectable prototype options only.
- Customer data is not transmitted and is stored only locally in the browser for the demo confirmation.
- No backend or CMS integration.
- No real stock or delivery-time checks.
- No real server-side price calculation.
- The delivery-area map displays the available local delivery-zone graphic statically; the postal-code check remains a dummy function.

## Future Work

- Connect production product, pricing, availability, and delivery-area APIs.
- Add a backend, real payment, order transmission, and an optional customer account.
- Allow different cladding materials for each side of the carport.
- Permanently save, share, export, and reload configurations.
- Make content and product data manageable through a CMS.
- Add automated end-to-end tests and a complete accessibility audit.
- Optionally integrate analytics with consent management and events for configurator starts, preset selection, shopping cart, and checkout.

## Project Team and Contributions

Tasks were divided by area of responsibility. “Lead” indicates primary responsibility, “Input” indicates a supporting contribution, and “Joint” indicates shared implementation.

| Area | Cornelius Weidmann | Peter Hollmann |
| --- | --- | --- |
| Landing page and funnel | Input | Lead |
| Architecture and technology stack | Input | Lead |
| Visual UI implementation | Lead | Input |
| Testing and documentation | Lead | Input |
| Configurator and checkout | Joint | Joint |
| Figma concept and UI rationale | Joint | Joint |

Peter Hollmann took the lead on the overall page architecture, selection of the technology approach, and implementation of the focused carport landing page and its conversion funnel. Cornelius Weidmann was primarily responsible for visually translating the concept into the website, quality assurance, and project documentation.

The configurator page and checkout process were implemented jointly. Cornelius focused on the functional development of the configurator, particularly its selection and pricing logic and the PNG layer preview. Peter focused on implementing the supplementary page areas and the shopping cart and ordering flow. The Figma prototype, central UI decisions, and their UX rationale were also developed collaboratively.

## AI Use Declaration

During the project, **OpenAI Codex** and **Anthropic Claude Code** were used selectively to support development and documentation. Typical use cases included troubleshooting, reviewing code, improving accessibility, and refining individual passages of text.

AI was also used to generate parts of the code, including initial drafts for HTML structures, CSS rules, and JavaScript functions. These drafts helped with recurring interface elements, responsive behavior, and selected configurator and shopping cart interactions. The generated code was not integrated directly. It was reviewed and adjusted to the existing architecture and design.

The project concept, UX strategy, Figma prototype, visual design, feature scope, and technical decisions were developed by the project team. AI suggestions were treated as optional input: they were evaluated, adapted, tested, and only included when they matched the intended solution. The team remained responsible for the implementation and final quality assurance.
