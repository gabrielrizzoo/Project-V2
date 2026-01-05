/**
 * Script principal do site Incentivart
 * Funcionalidades: navegação, formulários, animações e transições
 */

// ================================
// DADOS DE CONFIGURAÇÃO - FÁCIL EDIÇÃO
// ================================

/**
 * SERVIÇOS - Adicione ou remova serviços aqui
 * Cada serviço deve ter: titulo, subtitulo, itens (array de strings)
 */
const SERVICOS_DATA = [
  {
    titulo: "Projetos Culturais",
    subtitulo: "Leis de Incentivo e Editais",
    itens: [
      "Identificação de oportunidades",
      "Análise de viabilidade",
      "Elaboração conforme legislação"
    ]
  },
  {
    titulo: "Projetos Audiovisuais",
    subtitulo: "ANCINE e Editais",
    itens: [
      "Mapeamento de linhas",
      "Estratégia e orçamento",
      "Submissão e acompanhamento"
    ]
  },
  {
    titulo: "Terceiro Setor",
    subtitulo: "Aprovação em Incentivo",
    itens: [
      "Saúde, Educação e Cultura",
      "Esporte e Meio Ambiente",
      "Ação Social"
    ]
  }
  // Para adicionar mais serviços, copie o bloco acima e cole aqui
];

/**
 * CLIENTES/PARCEIROS - Adicione ou remova aqui
 */
const CLIENTES_DATA = [
  "Valkyria Filmes",
  "Pipoca Cultural",
  "Instituto Ciativo",
  "P J X",
  "Pan Tiles",
  "Mower"
  // Adicione mais clientes aqui
];

// ================================
// UTILITÁRIOS DE PERFORMANCE E SEGURANÇA
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

/**
 * Escapa caracteres HTML para prevenir XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ================================
// ANIMAÇÕES DE SCROLL (Intersection Observer)
// ================================
function initScrollAnimations() {
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
}

// ================================
// NAVEGAÇÃO E HEADER
// ================================
function initHeader() {
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
    const closeMenu = () => {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileToggle.focus();
    };

    mobileToggle.addEventListener('click', () => {
      const isExpanded = nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Fechar menu ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Acessibilidade: Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
      }
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
}

// ================================
// FORMULÁRIO DE CONTATO
// ================================
function initForm() {
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
}

// ================================
// SERVIÇOS E CLIENTES (Renderização Dinâmica)
// ================================
function initServicosClientes() {
  // Renderizar serviços dinamicamente
  const servicosContainer = document.getElementById('servicos-container');
  if (servicosContainer && typeof SERVICOS_DATA !== 'undefined') {
    servicosContainer.innerHTML = SERVICOS_DATA.map((servico, index) => `
      <article class="card" data-animate="fade-up" ${index > 0 ? `style="animation-delay: ${index * 0.1}s;"` : ''}>
        <div class="rotate-360" style="position: absolute; top: 1rem; right: 1rem; font-size: 4rem; font-weight: 800; color: rgba(255,255,255,0.03);">${index + 1}</div>
        <h3 style="color: var(--primary);">${escapeHtml(servico.titulo)}</h3>
        <h5 style="color: var(--text-muted);">${escapeHtml(servico.subtitulo)}</h5>
        <ul style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${servico.itens.map(item => `
            <li><i class="fa-solid fa-check" style="color: var(--success); margin-right: 0.5rem;"></i> ${escapeHtml(item)}</li>
          `).join('')}
        </ul>
        <a href="contato.html" class="btn btn-contact" style="margin-top: 2rem; width: 100%;">ENTRE EM CONTATO</a>
      </article>
    `).join('');
  }

  // Renderizar clientes dinamicamente
  const clientesContainer = document.getElementById('clientes-container');
  if (clientesContainer && typeof CLIENTES_DATA !== 'undefined') {
    clientesContainer.innerHTML = CLIENTES_DATA.map(cliente => `
      <div class="card" style="padding: 1rem 2rem; min-width: 150px; text-align: center; font-weight: 600;">${escapeHtml(cliente)}</div>
    `).join('');
  }
}

// Nota: Funcionalidade de portfólio (PORTFOLIO_DATA, filtros, lightbox)
// está em portfolio.js.

// ================================
// FOOTER YEAR
// ================================
function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ================================
// PRIVACY POLICY MODAL
// ================================
const PrivacyModal = {
  triggerCheckbox: null,
  content: `
    <p>A sua privacidade é importante para nós. É política da Incentivart respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Incentivart.</p>

    <h3>1. Coleta de Dados</h3>
    <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
    <p>Os dados coletados em nosso formulário de contato (Nome, E-mail, Telefone) são utilizados exclusivamente para responder às suas solicitações e dúvidas.</p>

    <h3>2. Retenção de Dados</h3>
    <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

    <h3>3. Compartilhamento de Dados</h3>
    <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

    <h3>4. Cookies e Analytics</h3>
    <p>Não utilizamos cookies de rastreamento ou ferramentas de analytics que coletam dados pessoais identificáveis.</p>

    <h3>5. Consentimento</h3>
    <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.</p>

    <p style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">Esta política é efetiva a partir de Novembro/2025.</p>
  `,

  init() {
    // Find all privacy policy links
    const links = document.querySelectorAll('a[href="politica-de-privacidade.html"]');
    
    if (links.length > 0) {
      this.createModal();
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });
    }

    // Find the consent checkbox
    const consentCheckbox = document.querySelector('input[name="consentimento"]');
    if (consentCheckbox) {
      this.createModal();
      
      consentCheckbox.addEventListener('click', (e) => {
        // If the user is trying to check the box (it is currently unchecked)
        if (consentCheckbox.checked) {
          e.preventDefault(); // Prevent checking immediately
          consentCheckbox.checked = false; // Ensure it stays unchecked
          this.open(consentCheckbox);
        }
      });
    }
  },

  createModal() {
    if (document.getElementById('privacy-modal')) return;

    const modalHTML = `
      <div id="privacy-modal" class="modal-backdrop" aria-hidden="true">
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
          <div class="modal-header">
            <h2 id="privacy-title" class="modal-title">Política de Privacidade</h2>
            <button class="modal-close" aria-label="Fechar modal">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            ${this.content}
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary modal-confirm-btn">Entendi</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Bind events
    this.modal = document.getElementById('privacy-modal');
    
    // Close buttons (X)
    const closeBtns = this.modal.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.close(false));
    });

    // Confirm button (Entendi)
    const confirmBtn = this.modal.querySelector('.modal-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.close(true));
    }

    // Backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close(false);
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close(false);
    });
  },

  open(checkbox = null) {
    this.triggerCheckbox = checkbox;
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    this.isOpen = true;
  },

  close(confirmed = false) {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.isOpen = false;

    if (confirmed && this.triggerCheckbox) {
      this.triggerCheckbox.checked = true;
    }
    
    // Reset trigger after a short delay to ensure no double-triggering
    setTimeout(() => {
      this.triggerCheckbox = null;
    }, 100);
  }
};

// ================================
// INICIALIZAÇÃO - Executa quando o DOM estiver pronto
// ================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderiza serviços e clientes (script.js)
  initServicosClientes();

  // 2. Renderiza o portfólio (portfolio.js)
  if (typeof window.initPortfolio === 'function') {
    window.initPortfolio();
  }
  
  // 3. Depois inicializa as animações (para pegar os elementos renderizados)
  initScrollAnimations();
  
  // 4. Inicializa o header e navegação
  initHeader();
  
  // 5. Inicializa o formulário
  initForm();
  
  // 6. Atualiza o ano no footer
  updateYear();
  
  // 7. Inicializa o modal de privacidade
  PrivacyModal.init();
});
