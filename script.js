/**
 * Script principal do site Incentivart
 * Funcionalidades: navegação, formulários, animações e transições
 */

// ================================
// UTILITÁRIOS DE PERFORMANCE
// ================================

/**
 * Função debounce para limitar execução de funções
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ================================
// ANIMAÇÕES DE SCROLL (Intersection Observer)
// ================================
(function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos com data-animate
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => observer.observe(el));
})();

// ================================
// NAVEGAÇÃO E HEADER
// ================================
(function initHeader() {
  const header = document.querySelector('.topbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');

  // Header scroll effect
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 10));

  // Mobile Menu
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');

      const isExpanded = nav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);

      if (isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Fechar menu ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Marcar link ativo
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    const activeLink = document.querySelector(`.nav a[href*="${currentPage}"]`);
    if (activeLink) activeLink.classList.add('active');
  } else {
    // Fallback para home
    const homeLink = document.querySelector('.nav a[href="index.html"]');
    if (homeLink && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      homeLink.classList.add('active');
    }
  }
})();

// ================================
// FORMULÁRIO DE CONTATO
// ================================
(function initForm() {
  const form = document.getElementById('contatoForm');

  // Choice Chips Logic
  const chips = document.querySelectorAll('.choice-chip input');
  chips.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        input.parentElement.classList.add('selected');
      } else {
        input.parentElement.classList.remove('selected');
      }
    });
  });

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    const msgSuccess = document.getElementById('msgOk');

    // Estado de loading
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-loading">Enviando...</span>';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        // Reset chips
        document.querySelectorAll('.choice-chip').forEach(c => c.classList.remove('selected'));

        if (msgSuccess) {
          msgSuccess.style.display = 'flex';
          msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            msgSuccess.style.display = 'none';
          }, 5000);
        }
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });

  // Contador de caracteres
  const textarea = document.getElementById('mensagem');
  const counter = document.getElementById('mensagem-count');

  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      const current = textarea.value.length;
      counter.textContent = current;

      if (current > 750) {
        counter.parentElement.style.color = 'var(--warning)';
      } else {
        counter.parentElement.style.color = 'inherit';
      }
    });
  }
})();

// ================================
// PORTFÓLIO (Filtros e Modal)
// ================================
(function initPortfolio() {
  const filterBtns = document.querySelectorAll('.pf-btn');
  const items = document.querySelectorAll('.pf-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        items.forEach(item => {
          if (filter === 'all' || item.dataset.type === filter) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Simples
  const lightboxLinks = document.querySelectorAll('.pf-lightbox');
  const modal = document.getElementById('pf-image-modal');

  if (modal && lightboxLinks.length > 0) {
    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.pf-close');

    lightboxLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = link.getAttribute('href');
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      modalImg.src = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
  }
})();

// ================================
// FOOTER YEAR
// ================================
(function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
