/* Brunu Travel — App JS (Lógica Mestre Consolidada V2) */
(function() {
    const $ = (q, root = document) => root.querySelector(q);
    const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

    const root = document.documentElement;
    const savedTheme = localStorage.getItem('bt_theme') || 'dark';
    if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

    function updateThemeIcon() {
        const isLight = root.getAttribute('data-theme') === 'light';
        const icon = $('#themeToggle i');
        if (icon) icon.className = isLight ? 'fa-regular fa-sun' : 'fa-solid fa-moon';
    }

function injectPhoneContent() {
        const modalBody = $('#phoneOverlay .modal-body');
        if (!modalBody || modalBody.dataset.injected) return;
        
        modalBody.innerHTML = `
            <div style="padding: 0 24px 24px; text-align: left;">
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
                    <img src="assets/images/bruno-profile.jpg" alt="Bruno Oliveira" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                    <div style="font-size: 13px; color: #475569;">Contacto com: <strong style="color: #0c1220;">Bruno Oliveira</strong> <span style="opacity: 0.8;">(Líder de viagem)</span></div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 0 auto;">
                    
                    <a href="https://wa.me/351963623430" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #6b9a71; color: #ffffff; border:none; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: transform 0.2s; gap: 8px;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> 
                        <span style="font-weight: 600; font-size: 14.5px;">WhatsApp • Resposta mais rápida</span>
                    </a>

                    <a href="mailto:info@brunutravel.pt" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #ffffff; color: #0c1220; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: background 0.2s; gap: 8px;">
                        <i class="fa-regular fa-envelope" style="font-size: 18px; color: #64748b;"></i> 
                        <span style="font-weight: 600; font-size: 14.5px;">Enviar Email</span>
                    </a>

                    <a href="tel:+351963623430" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #ffffff; color: #0c1220; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: background 0.2s; gap: 8px;">
                        <i class="fa-solid fa-phone" style="font-size: 16px; color: #64748b;"></i> 
                        <span style="font-weight: 600; font-size: 14.5px;">Chamada Telefónica</span>
                    </a>
                </div>

                <p style="font-size: 11.5px; color: #64748b; margin-top: 24px; margin-bottom: 0; white-space: nowrap; letter-spacing: -0.2px; text-align: center;">
                    Respondemos normalmente em menos de 24h - incluindo fins de semana.
                </p>
            </div>
        `;
        modalBody.dataset.injected = "true";
    }

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('#themeToggle')) {
            const isLight = root.getAttribute('data-theme') === 'light';
            isLight ? root.removeAttribute('data-theme') : root.setAttribute('data-theme', 'light');
            localStorage.setItem('bt_theme', isLight ? 'dark' : 'light');
            updateThemeIcon();
        }

        // Todos os botões "Falar connosco" / "WhatsApp"
// Todos os botões "Falar connosco" / "WhatsApp"
if (target.closest('#phoneBtn') || target.closest('#chatBtn') || target.closest('#aboutContactBtn')) {
    e.preventDefault();
    injectPhoneContent();
    $('#phoneOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
}
        if (target.closest('#burgerBtn')) $('#menuOverlay')?.classList.add('open');

        if (target.closest('[id$="Close"]') || target.classList.contains('overlay')) {
            $$('.overlay').forEach(ov => ov.classList.remove('open'));
            document.body.style.overflow = '';
        }

// ---------------------------------------------------------
        // LÓGICA MODAL DE VIAGENS E COLEÇÕES
        // ---------------------------------------------------------
        const tripCard = target.closest('.trip-card:not(.category-card):not(:has(.guide-title))');
        const collCard = target.closest('.category-card, .collection-card');
        
        if (tripCard || collCard) {
            e.preventDefault();
            const overlay = $('#tripDetailsOverlay');
            if (!overlay) return;
            const source = tripCard || collCard;
            
            const isTrip = !!tripCard;
            
            const imgEl = source.querySelector('img');
            const titleEl = source.querySelector('h3, .trip-title, .coll-title');
            const badgeEl = source.querySelector('.badge');
            const destEl = source.querySelector('.trip-dest, .coll-desc');
            const infoEl = source.querySelector('.trip-info-row');
            
            const imgSrc = imgEl ? imgEl.src : '';
            const title = titleEl ? titleEl.innerText : 'Detalhes';
            const badgeText = badgeEl ? badgeEl.innerText : '';
            const destText = destEl ? destEl.innerText : '';
            const infoText = infoEl ? infoEl.innerText : '';
            
            const imgRatio = isTrip ? '9/16' : '16/9';
            const imgMaxHeight = isTrip ? '400px' : '200px'; 

            $('#tripModalTitle').innerText = title;
            
            const badgeHTML = badgeText ? `<div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.95); color: #0c1220; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">${badgeText}</div>` : '';
            
            let html = `
                <div style="padding: 0 24px 24px; text-align: left;">
                    <div style="position: relative; width: 100%; border-radius: 16px; overflow: hidden; margin-bottom: 16px; border: 1px solid #f1f5f9;">
                        <img src="${imgSrc}" style="width: 100%; max-height: ${imgMaxHeight}; aspect-ratio: ${imgRatio}; object-fit: cover; display: block;">
                        ${badgeHTML}
                    </div>
            `;
            
            if (isTrip) {
                html += `
                    <h3 style="font-family: var(--font-display); font-size: 18px; color: #0c1220; margin: 0 0 4px 0;">${destText}</h3>
                    <p style="font-size: 13.5px; color: #475569; margin: 0 0 20px 0;">${infoText}</p>
                `;
            } else {
                html += `
                    <h3 style="font-family: var(--font-display); font-size: 18px; color: #0c1220; margin: 0 0 20px 0;">${destText}</h3>
                `;
            }

            html += `
                    <h4 style="font-family: var(--font-display); font-size: 17px; color: #0c1220; margin: 0 0 4px 0;">Queres saber mais sobre esta viagem?</h4>
                    <p style="font-size: 13.5px; color: #475569; margin: 0 0 16px 0;">Também fazemos viagens privadas com líder.</p>

                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                        <img src="assets/images/bruno-profile.jpg" alt="Bruno Oliveira" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                        <div style="font-size: 13px; color: #475569;">Contacto com: <strong style="color: #0c1220;">Bruno Oliveira</strong> <span style="opacity: 0.8;">(Líder de viagem)</span></div>
                    </div>

                    <a href="https://wa.me/351963623430" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #6b9a71; color: #ffffff; border:none; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: transform 0.2s; gap: 8px; max-width: 360px; margin: 0 auto;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> 
                        <span style="font-weight: 600; font-size: 15px;">WhatsApp</span>
                    </a>
                    
					<p style="font-size: 11.5px; color: #64748b; margin-top: 16px; margin-bottom: 0; white-space: nowrap; letter-spacing: -0.2px; text-align: center;">
  					  Respondemos normalmente em menos de 24h - incluindo fins de semana.
					</p>
                </div>
            `;
            
            $('#tripModalBody').innerHTML = html;
            
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        // ---------------------------------------------------------
        // LÓGICA MODAL DE GUIAS
        // ---------------------------------------------------------
        const guideCard = target.closest('.trip-card:has(.guide-title)');
        if (guideCard && !target.closest('.guide-premium-btn')) {
            e.preventDefault();
            e.stopPropagation();

            const overlay = $('#guideDetailsOverlay');
            if (!overlay) return;
            
            const imgEl = guideCard.querySelector('img');
            const titleEl = guideCard.querySelector('.guide-title');
            const subEl = guideCard.querySelector('.guide-sub');
            
            const imgSrc = imgEl ? imgEl.src : '';
            const title = titleEl ? titleEl.innerText : 'Guia de Viagem';
            const sub = subEl ? subEl.innerText : '';
            
            const isAvailable = !sub.toLowerCase().includes('em breve');
            let badgeText = title.replace(/Guia de /i, '').replace(/·/g, '•').toUpperCase();
            
            let socialLinksHtml = '';
            const socialsSource = guideCard.querySelector('.guide-social');
            if (socialsSource && isAvailable) {
                // Ícones ligeiramente mais pequenos para caberem bem ao lado do texto
                const links = Array.from(socialsSource.querySelectorAll('a')).map(a => {
                    const cloned = a.cloneNode(true);
                    cloned.style.cssText = 'width: 34px; height: 34px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 50%; display: grid; place-items: center; color: #475569; font-size: 15px; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02);';
                    return cloned.outerHTML;
                }).join('');
                socialLinksHtml = links;
            }
            
            let html = `
                <div style="padding: 0 24px 24px; text-align: left;">
                    
                    <div style="position: relative; width: 100%; border-radius: 16px; overflow: hidden; margin-bottom: 16px; border: 1px solid #f1f5f9;">
                        <img src="${imgSrc}" style="width: 100%; max-height: 220px; aspect-ratio: 4/3; object-fit: cover; display: block;">
                        <div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.95); color: #0c1220; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-transform: uppercase; letter-spacing: 0.05em;">${badgeText}</div>
                    </div>
                    
                    <h3 style="font-family: var(--font-display); font-size: 22px; color: #0c1220; margin: 0 0 4px 0;">${title}</h3>
                    <p style="font-size: 13.5px; color: #64748b; margin: 0 0 24px 0;">Guia Essencial</p>
            `;
            
            if (isAvailable) {
                html += `
                    <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
                        <div style="font-size: 13px; font-weight: 600; color: #0c1220;">Disponível nas redes</div>
                        <div style="display: flex; gap: 8px;">
                            ${socialLinksHtml}
                        </div>
                    </div>

                    <div style="background: #edf2f0; border: 1px solid #e2e8e4; border-radius: 16px; padding: 16px; margin-bottom: 24px; position: relative; overflow: hidden;">
                        <h4 style="font-family: var(--font-display); font-size: 16px; color: #0c1220; margin: 0 0 4px 0;">Queres a versão Premium?</h4>
                        <p style="font-size: 11.5px; color: #475569; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; position: relative; z-index: 2;">Mais completa, com recomendações e extras úteis para a viagem.</p>
                        <i class="fa-solid fa-map-location-dot" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 40px; color: #6b9a71; opacity: 0.15; z-index: 1;"></i>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                        <img src="assets/images/bruno-profile.jpg" alt="Bruno Oliveira" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                        <div style="font-size: 13px; color: #475569;">Contacto com: <strong style="color: #0c1220;">Bruno Oliveira</strong> <span style="opacity: 0.8;">(Líder de viagem)</span></div>
                    </div>

                    <a href="https://wa.me/351963623430?text=${encodeURIComponent('Olá Bruno, queria saber mais sobre a versão Premium do Guia de ' + badgeText)}" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #6b9a71; color: #ffffff; border:none; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: transform 0.2s; gap: 8px; max-width: 360px; margin: 0 auto;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> 
                        <span style="font-weight: 600; font-size: 14.5px;">WhatsApp • Saber mais sobre o Premium</span>
                    </a>
                `;
            } else {
                html += `
                    <div style="background: #fff8eb; border: 1px solid #fde68a; border-radius: 12px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 24px;">
                        <div style="background: #f59e0b; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; font-size: 12px;"><i class="fa-regular fa-clock"></i></div>
                        <div>
                            <div style="font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 2px;">Em breve</div>
                            <div style="font-size: 13px; color: #b45309; line-height: 1.4;">Estamos a preparar o guia essencial.</div>
                        </div>
                    </div>

                    <h4 style="font-family: var(--font-display); font-size: 18px; color: #0c1220; margin: 0 0 6px 0;">Queres ser informado quando estiver pronto?</h4>
                    <p style="font-size: 13.5px; color: #475569; margin: 0 0 20px 0;">Fala connosco e avisamos-te assim que sair.</p>

                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                        <img src="assets/images/bruno-profile.jpg" alt="Bruno Oliveira" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                        <div style="font-size: 13px; color: #475569;">Contacto com: <strong style="color: #0c1220;">Bruno Oliveira</strong> <span style="opacity: 0.8;">(Líder de viagem)</span></div>
                    </div>

                    <a href="https://wa.me/351963623430?text=${encodeURIComponent('Olá Bruno, queria ser informado quando o Guia de ' + badgeText + ' estiver disponível!')}" class="chat-action-btn" style="text-decoration: none; padding: 14px; background: #6b9a71; color: #ffffff; border:none; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: transform 0.2s; gap: 8px; max-width: 360px; margin: 0 auto;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> 
                        <span style="font-weight: 600; font-size: 14.5px;">WhatsApp • Quero ser informado</span>
                    </a>
                `;
            }

            html += `
				<p style="font-size: 11.5px; color: #64748b; margin-top: 16px; margin-bottom: 0; white-space: nowrap; letter-spacing: -0.2px; text-align: center;">
 				   Respondemos normalmente em menos de 24h - incluindo fins de semana.
				</p>
                </div>
            `;
            
            $('#guideModalBody').innerHTML = html;
            
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    function initCarousels() {
        $$('.trips-carousel, .slider-track').forEach(carousel => {
            const section = carousel.closest('section');
            if (!section) return;

            const linesContainer = section.querySelector('.pagination-lines');
            const cards = $$('.trip-card', carousel);
            
            if (!linesContainer || cards.length === 0) return;

            linesContainer.innerHTML = '';
            cards.forEach((card) => {
                const line = document.createElement('div');
                line.className = 'page-line';
                line.onclick = () => carousel.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
                linesContainer.appendChild(line);
            });

            const updateUI = () => {
                const lines = $$('.page-line', linesContainer);
                cards.forEach((card, i) => {
                    const rect = card.getBoundingClientRect();
                    const track = carousel.getBoundingClientRect();
                    const isVisible = (rect.left >= track.left - 50 && rect.right <= track.right + 50);
                    if (isVisible && lines[i]) lines[i].classList.add('active');
                    else if (lines[i]) lines[i].classList.remove('active');
                });
            };

            carousel.addEventListener('scroll', updateUI);
            
            const next = section.querySelector('.next-btn, .floating-right, #nextTrip, #nextBtn');
            const prev = section.querySelector('.prev-btn, .floating-left, #prevTrip, #prevBtn');
            
            if (next) next.onclick = () => carousel.scrollBy({ left: 300, behavior: 'smooth' });
            if (prev) prev.onclick = () => carousel.scrollBy({ left: -300, behavior: 'smooth' });
            
            updateUI();
        });
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            initCarousels();
            updateThemeIcon();
        }, 300);
    });
})();
