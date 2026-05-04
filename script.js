/**
 * Script principal do site Incentivart
 * Funcionalidades: navegação, formulários, animações e transições
 */

// ================================
// DADOS DE CONFIGURAÇÃO - FÁCIL EDIÇÃO
// ================================

/**
 * SERVIÇOS - Adicione ou remova serviços aqui
 * Cada serviço deve ter: titulo, descricao, inclui, beneficios e cta
 */
const SERVICOS_DATA = [
  {
    titulo: "Projetos Culturais — Leis de Incentivo (Rouanet, estaduais e municipais)",
    descricao: "Projetos para leis de incentivo exigem consistência técnica, coerência orçamentária e aderência normativa. Estruturo (ou reestruturo) sua proposta para ficar apta à submissão, com narrativa clara e documentação organizada.",
    inclui: [
      "Enquadramento e tipologia conforme o mecanismo",
      "Justificativa, objetivos, metas e indicadores",
      "Plano de trabalho e cronograma",
      "Orçamento estruturado conforme regras do incentivo",
      "Contrapartidas e diretrizes de acessibilidade (quando aplicável)",
      "Organização de anexos e documentação para submissão em sistemas oficiais"
    ],
    beneficios: [
      "Mais chances de aprovação por consistência técnica",
      "Menos diligências e retrabalho",
      "Projeto mais apresentável a patrocinadores e parceiros",
      "Redução de riscos de glosas na prestação de contas"
    ],
    cta: "Quero estruturar meu projeto"
  },
  {
    titulo: "Projetos Culturais — Editais de Fomento Direto (públicos e privados)",
    descricao: "Editais eliminam projetos por detalhes: inconsistências, documentos faltando, orçamento fora do padrão. Eu preparo sua inscrição com estratégia e precisão, alinhando a proposta aos critérios de avaliação do edital.",
    inclui: [
      "Leitura técnica do edital e checklist de exigências",
      "Adequação do projeto ao regulamento (limites, vedações, anexos)",
      "Estruturação técnica: metodologia, impacto, público, indicadores",
      "Cronograma e orçamento compatíveis",
      "Revisão final para consistência, clareza e aderência"
    ],
    beneficios: [
      "Proposta mais competitiva e alinhada ao edital",
      "Menos risco de inabilitação",
      "Economia de tempo e segurança no envio",
      "Projeto com linguagem profissional e objetiva"
    ],
    cta: "Tenho um edital em vista"
  },
  {
    titulo: "Projetos Audiovisuais — ANCINE e FSA (longas, séries, festivais e mostras)",
    descricao: "Projetos audiovisuais precisam unir proposta artística, viabilidade e conformidade. Estruturo o projeto com padrão técnico e linguagem adequada para mecanismos do setor audiovisual, preparando materiais e organização para submissão.",
    inclui: [
      "Estruturação do projeto por formato (longa, série, festival/mostra)",
      "Materiais técnicos: apresentação, proposta, público, posicionamento",
      "Plano de execução, cronograma e orçamento",
      "Organização de documentação e requisitos regulatórios",
      "Preparação para submissão conforme a linha/mecanismo aplicável"
    ],
    beneficios: [
      "Projeto mais robusto e defensável tecnicamente",
      "Menos inconsistências na análise regulatória",
      "Material organizado para acelerar desenvolvimento e submissões",
      "Melhor posicionamento para parcerias e financiamento"
    ],
    cta: "Quero preparar um projeto audiovisual"
  },
  {
    titulo: "Prestação de Contas — Técnica e Financeira (envio em sistemas)",
    descricao: "Prestação de contas não é \"relatório genérico\". É conformidade, evidência e rastreabilidade. Organizo documentos e elaboro relatórios técnicos e financeiros para reduzir riscos de diligência e glosas.",
    inclui: [
      "Organização documental (comprovantes, contratos, evidências)",
      "Relatório técnico: execução, metas, público, resultados",
      "Relatório financeiro: rubricas, conciliações e consistência",
      "Preparação para envio em sistemas/plataformas exigidos",
      "Revisão de conformidade com regras do mecanismo"
    ],
    beneficios: [
      "Menos diligências e risco de reprovação",
      "Segurança jurídica e administrativa",
      "Prestação de contas clara e auditável",
      "Tranquilidade para fechar o projeto corretamente"
    ],
    cta: "Preciso prestar contas"
  },
  {
    titulo: "Gestão de Projetos Culturais — Execução com governança",
    descricao: "Aprovou e agora precisa executar sem perder prazos, orçamento e documentação? Eu apoio a gestão para garantir cumprimento de metas, organização e preparo contínuo para prestação de contas.",
    inclui: [
      "Planejamento da execução e organização de rotinas",
      "Gestão de cronograma, entregáveis e responsabilidades",
      "Acompanhamento orçamentário por rubricas",
      "Articulação com instituições, equipes e parceiros",
      "Organização documental ao longo do projeto"
    ],
    beneficios: [
      "Execução mais eficiente e previsível",
      "Menos riscos operacionais e financeiros",
      "Melhor comunicação e organização com parceiros",
      "Documentação pronta (não \"corrida\" no final)"
    ],
    cta: "Quero apoio na execução"
  },
  {
    titulo: "Análise de Roteiro — Product Placement e Advertainment (monetização)",
    descricao: "Monetizar com marcas sem ferir a obra exige método. Faço leitura técnica do roteiro cena a cena para mapear oportunidades orgânicas de inserção, organizando tudo por tipo e segmento para facilitar negociação.",
    indicadoPara: "Produtoras de pequeno e médio porte, roteiristas e produtores executivos; longas, minisséries, obras seriadas e webséries.",
    inclui: [
      "Leitura técnica cena a cena",
      "Identificação de contextos narrativos com potencial para marcas",
      "Mapeamento de oportunidades de product placement e advertainment",
      "Classificação: visual, verbal ou integrada à narrativa",
      "Organização por segmento de mercado",
      "Diretrizes para preservar integridade artística"
    ],
    beneficios: [
      "Amplia fontes de financiamento do projeto",
      "Material profissional para apresentar a marcas/parceiros",
      "Inserções mais orgânicas e estratégicas",
      "Mais previsibilidade na estratégia de monetização"
    ],
    cta: "Quero monetizar meu projeto"
  }
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

  if (!header) return;

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
    const navLinks = Array.from(document.querySelectorAll('.nav a'));
    const activeLink = navLinks.find(link => {
      const href = link.getAttribute('href') || '';

      if (currentPage === 'home') {
        return href === './' || href === '/' || href === 'index.html';
      }

      return href === currentPage || href === `${currentPage}.html` || href === `./${currentPage}`;
    });

    if (activeLink) activeLink.classList.add('active');
  } else {
    // Fallback para home
    const homeLink = document.querySelector('.nav a[href="./"], .nav a[href="/"], .nav a[href="index.html"]');
    if (homeLink && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/')) {
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
    const msgError = document.getElementById('msgErro');

    if (msgSuccess) {
      msgSuccess.style.display = 'none';
    }

    if (msgError) {
      msgError.style.display = 'none';
      const msgErrorText = msgError.querySelector('span');
      if (msgErrorText) {
        msgErrorText.textContent = '';
      }
    }

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
      const responseData = await response.json().catch(() => null);

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
        throw new Error(responseData?.message || 'Ocorreu um erro ao enviar sua mensagem.');
      }
    } catch (error) {
      console.error('Erro:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';

      if (msgError) {
        const msgErrorText = msgError.querySelector('span');
        if (msgErrorText) {
          msgErrorText.textContent = errorMessage;
        }
        msgError.style.display = 'flex';
        msgError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert(errorMessage);
      }
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
  // Ícones e cores correspondentes a cada serviço
  const SERVICOS_META = [
    { icon: 'fa-solid fa-gavel',           accent: '#de7f56' }, // Leis de Incentivo
    { icon: 'fa-solid fa-bullseye',        accent: '#e44b33' }, // Editais de Fomento
    { icon: 'fa-solid fa-film',            accent: '#ffb300' }, // Projetos Audiovisuais
    { icon: 'fa-solid fa-file-invoice',    accent: '#00c853' }, // Prestação de Contas
    { icon: 'fa-solid fa-diagram-project', accent: '#00b0ff' }, // Gestão de Projetos
    { icon: 'fa-solid fa-clapperboard',    accent: '#ab47bc' }  // Análise de Roteiro
  ];

  // Renderizar serviços dinamicamente
  const servicosContainer = document.getElementById('servicos-container');
  if (servicosContainer && typeof SERVICOS_DATA !== 'undefined') {
    const renderChecklist = (items) => items.map(item => `
      <li>
        <span class="check-dot"></span>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join('');

    servicosContainer.innerHTML = SERVICOS_DATA.map((servico, index) => {
      const meta = SERVICOS_META[index] || { icon: 'fa-solid fa-check', accent: '#de7f56' };
      const ctaHref = servico.ctaHref || 'contato.html';
      const stepLabel = `Módulo ${String(index + 1).padStart(2, '0')}`;
      return `
      <article class="service-card" data-animate="fade-up" style="transition-delay: ${index * 0.045}s; --card-accent: ${meta.accent};">
        <div class="service-card-accent"></div>
        <div class="service-card-body">
          <div class="service-card-top">
            <div class="service-icon-wrap">
              <i class="${meta.icon} service-icon"></i>
            </div>
            <span class="service-step" aria-label="${stepLabel}">${stepLabel}</span>
          </div>
          <h3 class="service-title">${escapeHtml(servico.titulo)}</h3>
          <div class="service-content-stack">
            <p class="service-subtitle">${escapeHtml(servico.descricao)}</p>
            ${servico.indicadoPara ? `
            <div class="service-context">
              <p class="service-section-title">Indicado para</p>
              <p>${escapeHtml(servico.indicadoPara)}</p>
            </div>` : ''}
            <div class="service-section">
              <p class="service-section-title">Inclui</p>
              <ul class="service-checklist">
                ${renderChecklist(servico.inclui)}
              </ul>
            </div>
            <div class="service-section">
              <p class="service-section-title">Benefícios para você</p>
              <ul class="service-checklist">
                ${renderChecklist(servico.beneficios)}
              </ul>
            </div>
          </div>
          <a href="${ctaHref}" class="service-btn" aria-label="${escapeHtml(servico.cta)} sobre ${escapeHtml(servico.titulo)}">
            ${escapeHtml(servico.cta)} <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </article>`;
    }).join('');
  }

  // Renderizar clientes dinamicamente
  const clientesContainer = document.getElementById('clientes-container');
  if (clientesContainer && typeof CLIENTES_DATA !== 'undefined') {
    clientesContainer.innerHTML = CLIENTES_DATA.map((cliente, index) => `
      <div class="card client-chip" data-animate="fade-up" style="transition-delay: ${index * 0.05}s;">${escapeHtml(cliente)}</div>
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
    const links = document.querySelectorAll('[data-open-privacy-modal="true"]');
    
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
