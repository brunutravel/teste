/* Brunu Travel — Component Injector (V2 - Interação UX Premium) */

const AppComponents = {
  header: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Brunu Travel home">
          <div class="logo-wrap"><img src="assets/images/logo.jpg" alt="Brunu Travel logo"></div>
          <div class="brand-lines">
            <div class="brand-name">Brunu Travel</div>
            <div class="brand-tag">Viagens de grupo</div>
          </div>
        </a>
        <nav class="nav" aria-label="Primary">
          <a href="quem-somos.html">Quem somos</a>
          <a href="viagens.html">Viagens de grupo</a>
          <a href="guias-e-dicas.html">Guias e Dicas</a>
        </nav>
        <div class="header-actions">
          <button class="pill" id="phoneBtn" type="button" aria-label="Contact phone">
            🇵🇹 <span class="mini">(+351)</span> 963 623 430
          </button>
          <button class="icon-btn" id="themeToggle" type="button" aria-label="Toggle theme">
            <i class="fa-solid fa-moon"></i>
          </button>
          <button class="icon-btn" id="burgerBtn" type="button" aria-label="Open menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </header>

    <div class="overlay" id="menuOverlay" role="dialog" aria-modal="true">
      <div class="modal menu-modal">
        <header>
          <strong>Menu</strong>
          <button id="menuClose" style="background:none; border:none; color:var(--text); cursor:pointer; font-size:20px;">✕</button>
        </header>
        <nav class="menu-nav">
          <a href="index.html">Início</a>
          <a href="quem-somos.html">Quem somos</a>
          <a href="viagens.html">Viagens de grupo</a>
          <a href="guias-e-dicas.html">Guias e Dicas</a>
        </nav>
      </div>
    </div>
  `,

footer: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid-minimal">
          <div class="footer-col">
            <div class="footer-title">Navegação</div>
            <div class="footer-links-vert">
              <a href="quem-somos.html">Quem somos</a>
              <a href="viagens.html">Próximas viagens</a>
              <a href="guias-e-dicas.html">Guias e Dicas</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-title">Contactos</div>
            <div class="footer-links-vert">
              <a href="https://wa.me/351963623430" target="_blank" rel="noreferrer">WhatsApp (+351) 963 623 430</a>
              <a href="mailto:info@brunutravel.pt">info@brunutravel.pt</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-title">Redes sociais</div>
            <div class="footer-links-vert">
              <span>@brunutravel</span>
              <div class="footer-socials">
                <a href="https://instagram.com/brunutravel" target="_blank" rel="noreferrer"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61586558676697" target="_blank" rel="noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.youtube.com/@brunu_uncut_travel" target="_blank" rel="noreferrer"><i class="fa-brands fa-youtube"></i></a>
                <a href="https://www.tiktok.com/@brunu_uncut_travel" target="_blank" rel="noreferrer"><i class="fa-brands fa-tiktok"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom-minimal">
          <div class="copyright">© 2026 Brunu Travel</div>
          <div class="legal-links">
            <button id="termosLink" class="text-btn">Termos e Condições</button>
            <span class="dot-sep">•</span>
            <button id="privacidadeLink" class="text-btn">Privacidade e Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  `,

  modals: `
  <div class="overlay" id="phoneOverlay" role="dialog" aria-modal="true">
      <div class="modal" style="background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid var(--cardBorder); padding: 0; width: min(420px, 100%);">
        <header style="border-bottom: none; padding: 24px 24px 16px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 20px; font-family: var(--font-display); color: #0c1220; margin: 0;">Fala com a equipa</strong>
          <button id="phoneClose" style="background:transparent; border:none; color: #64748b; cursor:pointer; font-size:20px; transition: color 0.2s; padding: 0; line-height: 1;">✕</button>
        </header>
        <div class="modal-body" style="background: #ffffff; padding: 0;"></div>
      </div>
    </div>

    <div class="overlay" id="tripDetailsOverlay" role="dialog" aria-modal="true">
      <div class="modal" style="background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid var(--cardBorder); padding: 0; width: min(460px, 100%);">
        <header style="border-bottom: none; padding: 24px 24px 16px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
          <strong id="tripModalTitle" style="font-size: 20px; font-family: var(--font-display); color: #0c1220; margin: 0;">Detalhes</strong>
          <button id="tripDetailsClose" style="background:transparent; border:none; color: #64748b; cursor:pointer; font-size:20px; transition: color 0.2s; padding: 0; line-height: 1;">✕</button>
        </header>
        <div class="modal-body" id="tripModalBody" style="background: #ffffff; padding: 0;">
          </div>
      </div>
    </div>

<div class="overlay" id="guideDetailsOverlay" role="dialog" aria-modal="true">
      <div class="modal" style="background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid var(--cardBorder); padding: 0; width: min(460px, 100%);">
        <header style="border-bottom: none; padding: 24px 24px 16px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 20px; font-family: var(--font-display); color: #0c1220; margin: 0;">Guia de Viagem</strong>
          <button id="guideDetailsClose" style="background:transparent; border:none; color: #64748b; cursor:pointer; font-size:20px; transition: color 0.2s; padding: 0; line-height: 1;">✕</button>
        </header>
        <div class="modal-body" id="guideModalBody" style="background: #ffffff; padding: 0;">
          </div>
      </div>
    </div>

    <div class="overlay" id="termosOverlay" role="dialog" aria-modal="true">
      <div class="modal">
        <header><strong>Termos e Condições</strong><button id="termosClose" style="background:transparent; border:none; color:var(--text); cursor:pointer; font-size:16px;">✕</button></header>
        <div class="modal-body" style="font-size: 14px; line-height: 1.6; color: var(--muted); padding: 24px;">
          <p>A Brunu Travel atua como organizadora de viagens de grupo. A reserva de um lugar implica o pagamento de um sinal não reembolsável (salvo indicação expressa em contrário).</p>
        </div>
      </div>
    </div>
    
    <div class="overlay" id="privacidadeOverlay" role="dialog" aria-modal="true">
      <div class="modal">
        <header><strong>Privacidade e Cookies</strong><button id="privacidadeClose" style="background:transparent; border:none; color:var(--text); cursor:pointer; font-size:16px;">✕</button></header>
        <div class="modal-body" style="font-size: 14px; line-height: 1.6; color: var(--muted); padding: 24px;">
          <p>A Brunu Travel respeita a tua privacidade de acordo com o RGPD. Os dados recolhidos destinam-se exclusivamente ao planeamento das viagens e comunicação direta contigo.</p>
        </div>
      </div>
    </div>
  `
};

function loadGlobalComponents() {
  const headerAnchor = document.getElementById('app-header');
  const footerAnchor = document.getElementById('app-footer');
  const modalsAnchor = document.getElementById('app-modals');

  if (headerAnchor) headerAnchor.innerHTML = AppComponents.header;
  if (footerAnchor) footerAnchor.innerHTML = AppComponents.footer;
  if (modalsAnchor) modalsAnchor.innerHTML = AppComponents.modals;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGlobalComponents);
} else {
  loadGlobalComponents();
}