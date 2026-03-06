/* BRUNU TRAVEL — MASTER JS 
   V3.0: Modais Legais + Carrossel de Visibilidade Inteligente
*/

(function() {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

  // --- 1. TEMA (DARK / LIGHT) ---
  const themeBtn = $('#themeToggle');
  const root = document.documentElement;
  
  // Carregar preferência guardada
  const savedTheme = localStorage.getItem('bt_theme') || 'dark';
  if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

  if (themeBtn) {
    themeBtn.onclick = () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('bt_theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('bt_theme', 'light');
      }
    };
  }

  // --- 2. GESTÃO DE MODAIS (OVERLAYS) ---
  function setupOverlay(btnId, overlayId, closeId) {
    const btn = $(btnId), ov = $(overlayId), cl = $(closeId);
    if (!btn || !ov) return;

    const open = (e) => {
      e.preventDefault();
      ov.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      ov.classList.remove('open');
      document.body.style.overflow = '';
    };

    btn.addEventListener('click', open);
    if (cl) cl.addEventListener('click', close);
    
    // Fechar ao clicar fora ou ESC
    ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ov.classList.contains('open')) close();
    });
  }

  // Inicializar todos os modais do projeto
  setupOverlay('#burgerBtn', '#menuOverlay', '#menuClose');
  setupOverlay('#phoneBtn', '#phoneOverlay', '#phoneClose');
  setupOverlay('#chatBtn', '#chatOverlay', '#chatClose');
  setupOverlay('#termosBtn', '#termosOverlay', '#termosClose');
  setupOverlay('#privacidadeBtn', '#privacidadeOverlay', '#privacidadeClose');

  // --- 3. CARROSSEL INTELIGENTE (9:16) ---
  const track = $('#tripsCarousel');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const pagLines = $('#paginationLines');

  if (track) {
    const cards = $$('.trip-card', track);
    const numCards = cards.length;

    // Criar traços de paginação dinamicamente
    if (pagLines) {
      pagLines.innerHTML = '';
      cards.forEach((_, i) => {
        const line = document.createElement('div');
        line.className = 'page-line';
        // Ao clicar no traço, faz scroll para essa imagem
        line.onclick = () => {
          track.scrollTo({
            left: cards[i].offsetLeft - track.offsetLeft,
            behavior: 'smooth'
          });
        };
        pagLines.appendChild(line);
      });
    }

    const lines = $$('.page-line', pagLines);

    // Função que deteta quais os cards estão visíveis
    const updateCarouselUI = () => {
      const trackRect = track.getBoundingClientRect();
      const scrollLeft = track.scrollLeft;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        
        // Critério: se pelo menos 60% da largura do card estiver visível no container
        const isVisible = (
          cardRect.left >= trackRect.left - 50 && 
          cardRect.right <= trackRect.right + 50
        );

        if (isVisible) {
          lines[i]?.classList.add('active');
        } else {
          lines[i]?.classList.remove('active');
        }
      });

      // Mostrar/Esconder setas conforme o limite do scroll
      if (prevBtn) prevBtn.style.display = scrollLeft > 10 ? 'grid' : 'none';
      if (nextBtn) {
        const atEnd = scrollLeft >= (track.scrollWidth - track.clientWidth - 10);
        nextBtn.style.display = atEnd ? 'none' : 'grid';
      }
    };

    // Navegação pelas setas
    if (nextBtn) nextBtn.onclick = () => track.scrollBy({ left: 240, behavior: 'smooth' });
    if (prevBtn) prevBtn.onclick = () => track.scrollBy({ left: -240, behavior: 'smooth' });

    // Ouvintes de evento
    track.addEventListener('scroll', updateCarouselUI);
    window.addEventListener('resize', updateCarouselUI);
    
    // Execução inicial
    updateCarouselUI();
  }

})();