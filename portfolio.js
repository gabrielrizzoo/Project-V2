/**
 * Portfolio.js - Gerenciamento do Portfólio e Lightbox
 * Funcionalidades: renderização de itens, filtros, modal de visualização
 */

// ================================
// DADOS DO PORTFÓLIO
// ================================

const PORTFOLIO_DATA = typeof window !== 'undefined' && Array.isArray(window.PORTFOLIO_DATA)
  ? window.PORTFOLIO_DATA
  : [];

let portfolioViewItems = [];
let isPortfolioInitialized = false;

// ================================
// FUNÇÃO AUXILIAR
// ================================

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPortfolioPresentation(item) {
  const type = item.tipo || 'video';
  let presentation;

  switch (type) {
    case 'projetos':
      presentation = {
        filterType: 'projetos',
        typeLabel: 'Projeto',
        contextLabel: 'Projeto cultural',
        actionLabel: 'Abrir projeto',
        kicker: 'Ver detalhes'
      };
      break;
    case 'longa':
      presentation = {
        filterType: 'trailer',
        typeLabel: 'Trailer',
        contextLabel: 'Longa-metragem',
        actionLabel: 'Abrir trailer',
        kicker: 'Assistir trailer'
      };
      break;
    case 'ellen':
      presentation = {
        filterType: 'video',
        typeLabel: 'Vídeo',
        contextLabel: 'Ellen Jabour',
        actionLabel: 'Abrir vídeo',
        kicker: 'Assistir conteúdo'
      };
      break;
    case 'ellen-mundo':
      presentation = {
        filterType: 'video',
        typeLabel: 'Série',
        contextLabel: 'Descobrindo o Mundo',
        actionLabel: 'Abrir episódio',
        kicker: 'Assistir episódio'
      };
      break;
    default:
      presentation = {
        filterType: 'video',
        typeLabel: 'Vídeo',
        contextLabel: 'Audiovisual',
        actionLabel: 'Abrir vídeo',
        kicker: 'Assistir conteúdo'
      };
      break;
  }

  return {
    ...presentation,
    filterType: item.filterType || presentation.filterType,
    typeLabel: item.typeLabel || presentation.typeLabel,
    contextLabel: item.contextLabel || presentation.contextLabel,
    actionLabel: item.actionLabel || presentation.actionLabel,
    kicker: item.kicker || presentation.kicker
  };
}

function getPortfolioExcerpt(text) {
  if (!text) return '';

  const normalized = String(text).replace(/\s+/g, ' ').trim();
  if (normalized.length <= 120) return normalized;

  const sentenceMatch = normalized.match(/^(.{48,150}?[.!?])(\s|$)/);
  if (sentenceMatch) return sentenceMatch[1];

  return `${normalized.slice(0, 117).trimEnd()}...`;
}

function buildModalLinks(site, instagram) {
  return [
    site ? `<a href="${site}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-solid fa-globe"></i> Site Oficial</a>` : '',
    instagram ? `<a href="${instagram}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-brands fa-instagram"></i> Instagram</a>` : ''
  ].filter(Boolean).join('');
}

function isYouTubeThumbnail(imageUrl) {
  return typeof imageUrl === 'string' && /(?:img\.youtube\.com|i\.ytimg\.com)\//i.test(imageUrl);
}

function getPortfolioCardImageSource(item) {
  if (isYouTubeThumbnail(item.imagem) && item.videoId) {
    return `https://i.ytimg.com/vi_webp/${item.videoId}/mqdefault.webp`;
  }

  return item.imagem || '';
}

function getPortfolioCardImageFallback(item) {
  if (isYouTubeThumbnail(item.imagem) && item.videoId) {
    return `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`;
  }

  return item.imagem || '';
}

function getPortfolioSortWeight(filterType) {
  switch (filterType) {
    case 'projetos':
      return 0;
    case 'trailer':
      return 1;
    case 'video':
      return 2;
    default:
      return 3;
  }
}

function buildPortfolioViewItem(item, sourceIndex) {
  const presentation = getPortfolioPresentation(item);
  const filterType = presentation.filterType;

  return {
    ...item,
    sourceIndex,
    presentation,
    filterType,
    isVideo: filterType === 'video' || filterType === 'trailer',
    excerpt: getPortfolioExcerpt(item.descricao || '')
  };
}

// ================================
// RENDERIZAÇÃO E FILTROS
// ================================

function initPortfolio() {
  // Renderizar portfólio dinamicamente
  const portfolioContainer = document.getElementById('portfolio-container');
  if (isPortfolioInitialized || !portfolioContainer || typeof PORTFOLIO_DATA === 'undefined') {
    return;
  }

  isPortfolioInitialized = true;

  if (portfolioContainer) {
    portfolioViewItems = PORTFOLIO_DATA
      .map(buildPortfolioViewItem)
      .sort((left, right) => {
        const weightDiff = getPortfolioSortWeight(left.filterType) - getPortfolioSortWeight(right.filterType);
        return weightDiff !== 0 ? weightDiff : left.sourceIndex - right.sourceIndex;
      });

    portfolioContainer.innerHTML = portfolioViewItems.map((item, index) => {
      const { presentation, filterType, isVideo, excerpt } = item;
      const titulo = escapeHtml(item.titulo);
      const resumo = escapeHtml(excerpt);
      const imagem = escapeHtml(getPortfolioCardImageSource(item));
      const fallbackImage = escapeHtml(getPortfolioCardImageFallback(item));
      const link = escapeHtml(item.link);
      const fallbackAttr = fallbackImage && fallbackImage !== imagem
        ? ` onerror="this.onerror=null;this.src='${fallbackImage}'"`
        : '';
      const delayStyle = index > 0 ? `animation-delay: ${index * 0.06}s;` : '';

      return `
        <figure class="pf-item card" style="padding: 0; border: none; ${delayStyle}" data-type="${filterType}" data-animate="scale-in">
          <a href="${link}"
             class="pf-lightbox pf-card-link"
             data-index="${index}"
             aria-label="${escapeHtml(`${presentation.actionLabel}: ${item.titulo}`)}">
            <div class="pf-card-media">
              <img class="pf-card-image" src="${imagem}" alt="${titulo}" loading="lazy" decoding="async" fetchpriority="low" width="480" height="270"${fallbackAttr}>
              <div class="pf-card-overlay"></div>
              <div class="pf-card-badges">
                <span class="pf-card-badge">${escapeHtml(presentation.typeLabel)}</span>
                <span class="pf-card-context">${escapeHtml(presentation.contextLabel)}</span>
              </div>
              ${isVideo ? `
                <span class="pf-card-play" aria-hidden="true">
                  <i class="fa-solid fa-play"></i>
                </span>
              ` : ''}
            </div>
            <div class="pf-card-copy">
              <div class="pf-card-copy-main">
                <span class="pf-card-kicker">${escapeHtml(presentation.kicker)}</span>
                <span class="pf-card-title">${titulo}</span>
                ${resumo ? `<p class="pf-card-description">${resumo}</p>` : ''}
              </div>
              <span class="pf-card-action">
                ${escapeHtml(presentation.actionLabel)}
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
            </div>
          </a>
        </figure>
      `;
    }).join('');
  }

  // Configurar filtros
  const filterBtns = Array.from(document.querySelectorAll('.pf-btn'));
  const items = Array.from(document.querySelectorAll('.pf-item'));

  const setActiveFilter = (activeBtn) => {
    filterBtns.forEach(btn => {
      const isActive = btn === activeBtn;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  };

  const setItemVisibility = (item, shouldShow) => {
    if (item._hideTimer) {
      window.clearTimeout(item._hideTimer);
      item._hideTimer = null;
    }

    if (shouldShow) {
      item.hidden = false;
      requestAnimationFrame(() => {
        item.classList.remove('is-filtered-out');
      });
      return;
    }

    item.classList.add('is-filtered-out');
    item._hideTimer = window.setTimeout(() => {
      item.hidden = true;
    }, 220);
  };

  if (filterBtns.length > 0) {
    const initiallyActiveBtn = filterBtns.find(btn => btn.classList.contains('is-active')) || filterBtns[0];
    if (initiallyActiveBtn) {
      setActiveFilter(initiallyActiveBtn);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveFilter(btn);

        const filter = btn.dataset.filter;

        items.forEach(item => {
          const itemType = item.dataset.type;
          const shouldShow = filter === 'all' || itemType === filter;

          setItemVisibility(item, shouldShow);
        });
      });

      btn.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

        event.preventDefault();
        const currentIndex = filterBtns.indexOf(btn);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + direction + filterBtns.length) % filterBtns.length;
        const nextBtn = filterBtns[nextIndex];

        if (nextBtn) {
          nextBtn.focus();
          nextBtn.click();
        }
      });
    });
  }

  // Inicializar Lightbox
  initLightbox();
}

// ================================
// LIGHTBOX MODAL
// ================================

function initLightbox() {
  const modal = document.getElementById('pf-image-modal');
  const portfolioContainer = document.getElementById('portfolio-container');

  if (modal && portfolioContainer) {
    // Elementos do layout de vídeo
    const videoLayout = modal.querySelector('.pf-video-layout');
    const modalIframe = modal.querySelector('.pf-modal-iframe');
    const modalEyebrowVideo = modal.querySelector('.pf-modal-eyebrow-video');
    const modalTituloVideo = modal.querySelector('.pf-modal-titulo-video');
    const modalDescricaoVideo = modal.querySelector('.pf-modal-descricao-video');
    const modalLinksVideo = modal.querySelector('.pf-modal-links-video');
    const driveShield = modal.querySelector('.drive-shield');
    
    // Elementos do layout de projeto/foto
    const projectLayout = modal.querySelector('.pf-project-layout');
    const modalImg = modal.querySelector('.pf-modal-img');
    const modalEyebrowProjeto = modal.querySelector('.pf-modal-eyebrow-projeto');
    const modalTituloProjeto = modal.querySelector('.pf-modal-titulo-projeto');
    const modalDescricaoProjeto = modal.querySelector('.pf-modal-descricao-projeto');
    const modalLinksProjeto = modal.querySelector('.pf-modal-links-projeto');
    
    // Elementos de controle
    const modalClose = modal.querySelector('.pf-close');
    const btnPrev = modal.querySelector('.pf-prev');
    const btnNext = modal.querySelector('.pf-next');
    
    let currentIndex = 0;
    let currentLinks = [];

    const getItemFromLink = (link) => {
      const itemIndex = Number(link?.getAttribute('data-index'));

      if (!Number.isInteger(itemIndex)) return null;

      return portfolioViewItems[itemIndex] || null;
    };

    const updateCurrentLinks = () => {
      currentLinks = Array.from(portfolioContainer.querySelectorAll('.pf-item:not([hidden]) .pf-lightbox'));
    };

    const updateModal = (index) => {
      if (!currentLinks[index]) return;
      
      const link = currentLinks[index];
      const item = getItemFromLink(link);

      if (!item) return;

      const href = item.link;
      const isVideo = item.isVideo;
      const titulo = item.titulo || '';
      const descricao = item.descricao || '';
      const site = item.site || '';
      const instagram = item.instagram || '';
      const typeLabel = item.presentation.typeLabel || '';
      const contextLabel = item.presentation.contextLabel || '';
      const eyebrow = [typeLabel, contextLabel].filter(Boolean).join(' · ');

      if (isVideo) {
        // Layout de vídeo (vertical)
        projectLayout.style.display = 'none';
        videoLayout.style.display = 'flex';
        modal.setAttribute('data-modal-type', 'video');
        
        if (modalIframe) {
          modalIframe.src = href;
          modalIframe.title = titulo ? `Vídeo: ${titulo}` : 'Vídeo do portfólio';
        }
        if (modalEyebrowVideo) modalEyebrowVideo.textContent = eyebrow;
        if (modalEyebrowProjeto) modalEyebrowProjeto.textContent = '';
        
        if (modalTituloVideo) {
          modalTituloVideo.textContent = titulo;
          modalTituloVideo.style.display = 'block';
        }
        
        if (modalDescricaoVideo) {
          const descHtml = (descricao || '').replace(/\n/g, '<br>');
          modalDescricaoVideo.innerHTML = descHtml;
          modalDescricaoVideo.style.display = 'block';
        }

        if (modalLinksVideo) {
          const linksHtml = buildModalLinks(site, instagram);
          modalLinksVideo.innerHTML = linksHtml;
          modalLinksVideo.style.display = linksHtml ? 'grid' : 'none';
        }
        
        if (driveShield) {
          const isGoogleDrive = href.includes('drive.google.com');
          driveShield.style.display = isGoogleDrive ? 'block' : 'none';
        }
        if (modalImg) {
          modalImg.src = '';
          modalImg.alt = '';
        }
      } else {
        // Layout de projeto/foto (horizontal lado a lado)
        videoLayout.style.display = 'none';
        projectLayout.style.display = 'flex';
        modal.setAttribute('data-modal-type', 'project');
        
        if (modalIframe) modalIframe.src = '';
        if (modalEyebrowVideo) modalEyebrowVideo.textContent = '';
        if (modalEyebrowProjeto) modalEyebrowProjeto.textContent = eyebrow;
        if (modalImg) {
          modalImg.src = href;
          modalImg.alt = titulo ? `Imagem do portfólio ${titulo}` : 'Imagem do portfólio';
        }
        if (modalTituloProjeto) modalTituloProjeto.textContent = titulo;
        if (modalDescricaoProjeto) modalDescricaoProjeto.textContent = descricao;
        
        if (modalLinksProjeto) {
          const linksHtml = buildModalLinks(site, instagram);
          modalLinksProjeto.innerHTML = linksHtml;
          modalLinksProjeto.style.display = linksHtml ? 'grid' : 'none';
        }

        if (driveShield) driveShield.style.display = 'none';
      }
      currentIndex = index;
    };

    const openModal = (index) => {
      updateCurrentLinks();
      updateModal(index);
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalClose) modalClose.focus({ preventScroll: true });
    };

    const closeModal = () => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('data-modal-type');
      document.body.style.overflow = '';
      if (modalImg) modalImg.src = '';
      if (modalIframe) modalIframe.src = '';
      if (modalEyebrowVideo) modalEyebrowVideo.textContent = '';
      if (modalEyebrowProjeto) modalEyebrowProjeto.textContent = '';
    };

    const nextItem = (e) => {
      if(e) e.stopPropagation();
      updateCurrentLinks();
      if (currentLinks.length === 0) return;
      let nextIndex = currentIndex + 1;
      if (nextIndex >= currentLinks.length) nextIndex = 0;
      updateModal(nextIndex);
    };

    const prevItem = (e) => {
      if(e) e.stopPropagation();
      updateCurrentLinks();
      if (currentLinks.length === 0) return;
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = currentLinks.length - 1;
      updateModal(prevIndex);
    };

    // Event Delegation para abrir o modal
    portfolioContainer.addEventListener('click', (e) => {
      const link = e.target.closest('.pf-lightbox');
      if (link) {
        e.preventDefault();
        updateCurrentLinks();
        const index = currentLinks.indexOf(link);
        if (index !== -1) openModal(index);
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (btnNext) btnNext.addEventListener('click', nextItem);
    if (btnPrev) btnPrev.addEventListener('click', prevItem);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === 'ArrowLeft') prevItem();
      }
    });
  }
}

// Exporta a função de inicialização para uso global
if (typeof window !== 'undefined') {
  window.initPortfolio = initPortfolio;
}
