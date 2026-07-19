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
    descricao: "Projetos incentivados exigem mais do que uma boa ideia: coerência técnica, aderência normativa, planejamento financeiro, documentação organizada e capacidade de demonstrar relevância cultural e impacto social. A Incentivart estrutura ou reestrutura projetos para mecanismos federais, estaduais e municipais, conforme as exigências de cada programa.",
    inclui: [
      "Diagnóstico e enquadramento do projeto",
      "Estruturação completa da proposta",
      "Justificativa, objetivos, metas e indicadores",
      "Plano de trabalho e cronograma",
      "Orçamento técnico compatível com a legislação aplicável",
      "Contrapartidas sociais e medidas de acessibilidade",
      "Organização de anexos e documentação para submissão em sistemas oficiais"
    ],
    beneficios: [
      "Projetos mais competitivos",
      "Mais chances de aprovação por consistência técnica",
      "Menos diligências e retrabalho",
      "Projeto mais apresentável a patrocinadores e parceiros",
      "Redução de riscos de glosas na prestação de contas"
    ],
    cta: "Quero estruturar meu projeto"
  },
  {
    titulo: "Projetos Culturais — Editais de Fomento Direto (públicos e privados)",
    descricao: "Editais eliminam projetos por detalhes: inconsistências, documentos faltando, orçamento fora do padrão. A Incentivart realiza a leitura completa do regulamento e estrutura o projeto alinhado aos critérios de avaliação do edital.",
    inclui: [
      "Leitura técnica e interpretação do edital",
      "Identificação de oportunidades e riscos",
      "Adequação do projeto ao regulamento e aos critérios de seleção",
      "Estruturação de metodologia, impacto, público e indicadores",
      "Cronograma e orçamento compatíveis",
      "Revisão técnica completa antes do envio"
    ],
    beneficios: [
      "Proposta mais competitiva e alinhada ao edital",
      "Menor risco de inabilitação",
      "Maior aderência aos critérios de avaliação",
      "Economia de tempo e segurança no processo de inscrição",
      "Linguagem profissional e objetiva"
    ],
    cta: "Tenho um edital em vista"
  },
  {
    titulo: "Projetos Audiovisuais — ANCINE e FSA (longas, séries, festivais e mostras)",
    descricao: "O mercado audiovisual tem exigências próprias, que demandam conhecimento especializado sobre regulamentação, estruturação financeira e fontes de financiamento. A Incentivart estrutura ou reestrutura projetos com padrão técnico e linguagem adequada aos mecanismos do setor.",
    inclui: [
      "Estruturação técnica da proposta",
      "Organização documental e requisitos regulatórios",
      "Plano de execução, cronograma e orçamento",
      "Plano de negócios por janela de comercialização",
      "Preparação para submissão na linha ou mecanismo aplicável"
    ],
    beneficios: [
      "Projeto mais robusto e defensável tecnicamente",
      "Menos inconsistências regulatórias",
      "Material organizado para acelerar desenvolvimento e submissão",
      "Economia de tempo",
      "Melhor posicionamento para parcerias e financiamento"
    ],
    cta: "Quero preparar um projeto audiovisual"
  },
  {
    titulo: "Prestação de Contas e Compliance",
    descricao: "Prestação de contas não é \"relatório genérico\": é conformidade, evidência e rastreabilidade. A Incentivart organiza documentos e elabora relatórios técnicos e financeiros para reduzir riscos de diligência e glosas.",
    inclui: [
      "Organização documental (comprovantes, contratos, evidências)",
      "Relatório técnico de execução, metas, público e resultados",
      "Relatório financeiro com rubricas, conciliações e consistência",
      "Preparação para envio em sistemas/plataformas exigidos",
      "Revisão de conformidade com regras do mecanismo"
    ],
    beneficios: [
      "Menos diligências e risco de reprovação",
      "Segurança jurídica e administrativa",
      "Prestação de contas clara e auditável",
      "Processos mais organizados",
      "Maior tranquilidade para encerramento do projeto"
    ],
    cta: "Preciso prestar contas"
  },
  {
    titulo: "Gestão e Governança de Execução",
    descricao: "Uma execução eficiente depende de planejamento, controle documental, acompanhamento financeiro e gestão contínua das obrigações junto aos órgãos financiadores. A Incentivart implementa práticas de governança para garantir cumprimento de metas e organização.",
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
      "Documentação pronta para a prestação de contas"
    ],
    cta: "Quero apoio na execução"
  },
  {
    titulo: "Mapa de Monetização do Roteiro",
    novo: true,
    descricao: "Análise técnica de roteiro para product placement e advertainment. Entregável voltado a produtoras audiovisuais, produtores executivos e roteiristas que querem abrir novas fontes de receita sem comprometer a obra. O roteiro é lido cena a cena para mapear onde inserções cabem de forma orgânica, resultando em documento organizado por tipo e segmento de mercado, pronto para embasar negociação com marcas e patrocinadores.",
    inclui: [
      "Leitura técnica cena a cena",
      "Identificação de contextos narrativos com potencial para inserção",
      "Mapeamento de oportunidades de product placement e advertainment",
      "Critérios de integração",
      "Organização por segmento de mercado",
      "Relatório estratégico para negociação"
    ],
    beneficios: [
      "Novas fontes de financiamento",
      "Material profissional para apresentar a marcas/parceiros",
      "Inserções mais orgânicas e estratégicas",
      "Maior potencial de monetização do projeto"
    ],
    cta: "Quero monetizar meu projeto"
  }
];

/**
 * PARCEIROS - Adicione ou remova aqui (carrossel de logos em servicos.html)
 * logo: caminho do arquivo em Incentivart/Logos/ (preferir .webp)
 * link: site oficial ou Instagram, aberto em nova guia ao clicar no card
 *       (opcional — deixe "" e o chip fica sem clique)
 * semFiltro: true exibe a logo sempre em cores (para logos que ficam
 *       ilegíveis com o filtro grayscale do carrossel)
 */
const PARCEIROS_DATA = [
  { nome: "Valkyria Filmes", logo: "Incentivart/Logos/Valkyria_logo.webp", link: "https://www.valkyriafilmes.com/" },
  { nome: "Pipoca Cultural", logo: "Incentivart/Logos/Pipoca_logo.webp", link: "https://www.instagram.com/pipoca.cultural/", semFiltro: true },
  { nome: "Instituto Ciativa", logo: "Incentivart/Logos/CIATIVA_logo.webp", link: "https://www.instagram.com/ciativa/" },
  { nome: "Equipe F3 Esporte e Cultura", logo: "Incentivart/Logos/EquipeF3_logo.webp", link: "https://equipef3.com/" },
  { nome: "Instituto Gas Petro - IGP", logo: "Incentivart/Logos/IGP_logo.webp", link: "https://igp5.org/" },
  { nome: "Igloo Filmes", logo: "Incentivart/Logos/Igloo_logo.webp", link: "https://www.igloo.art.br/" },
  { nome: "Jardineiro da Felicidade", logo: "Incentivart/Logos/Jardineiro_logo.webp", link: "https://www.jardineirodafelicidade.com.br/" },
  { nome: "L2C", logo: "Incentivart/Logos/L2C_logo.webp", link: "https://www.l2c.art.br/" },
  { nome: "Margarida Filmes", logo: "Incentivart/Logos/Margarida_logo.webp", link: "https://www.margaridafilmes.com.br/" },
  { nome: "Hi Hat Girls", logo: "Incentivart/Logos/HiHATGIRLS_logo.webp", link: "https://www.hihatgirls.com/" },
  { nome: "Olhar da Alma", logo: "Incentivart/Logos/OlharDaAlma_logo.webp", link: "https://olhardaalma.com.br/" },
  { nome: "Letras & Contos", logo: "Incentivart/Logos/LetrasEContos_logo.webp", link: "" },
  { nome: "Fazer Cinema", logo: "Incentivart/Logos/FAZERCINEMA_logo.webp", link: "http://www.fazercinema.com/" }
];

/**
 * CLIENTES - Adicione ou remova aqui (carrossel de cards foto + nome em servicos.html)
 * foto: caminho do arquivo em Incentivart/Logos/Clientes/ (preferir .webp)
 * link: site oficial ou Instagram, aberto em nova guia ao clicar no card
 *       (opcional — deixe "" e o chip fica sem clique)
 */
const CLIENTES_DATA = [
  { nome: "Ellen Jabour", foto: "Incentivart/Logos/Clientes/EllenJabour_foto.webp", link: "https://www.instagram.com/ellenjabour/" },
  { nome: "Andréa Cals", foto: "Incentivart/Logos/Clientes/AndreaCals_foto.webp", link: "https://www.instagram.com/andrea.cals/" },
  { nome: "Bruna Steiner", foto: "Incentivart/Logos/Clientes/BrunaSteiner_foto.webp", link: "https://www.instagram.com/brunasteiner/" },
  { nome: "Gabriela Alves Toulier", foto: "Incentivart/Logos/Clientes/GabrielaAlvesToulier_foto.webp", link: "https://www.instagram.com/gabi.alves.toulier/" },
  { nome: "Kelly Jabour", foto: "Incentivart/Logos/Clientes/KellyJabour_foto.webp", link: "https://www.instagram.com/kellyjabour/" },
  { nome: "Maria Eugênia Baptista", foto: "Incentivart/Logos/Clientes/MariaEugeniaBaptista_foto.webp", link: "https://www.instagram.com/meugenia.art" },
  { nome: "Najla Raja", foto: "Incentivart/Logos/Clientes/NajlaRaja_foto.webp", link: "https://www.instagram.com/najla_raja/" },
  { nome: "Patricia von Studnitz", foto: "Incentivart/Logos/Clientes/PatriciaVonStudnitz_foto.webp", link: "https://www.instagram.com/patriciavonstudnitz/" }
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
let scrollAnimationObserver;
const observedAnimatedElements = new WeakSet();
const SCROLL_ANIMATION_PRELOAD = 180;

function getAnimatedElements(root = document) {
  const elements = [];

  if (root instanceof Element && root.matches('[data-animate]')) {
    elements.push(root);
  }

  return elements.concat(Array.from(root.querySelectorAll('[data-animate]')));
}

// Stagger automático: irmãos animados dentro do mesmo contêiner entram em
// cascata, sem depender de classes delay-* manuais em cada item.
const STAGGER_STEP_MS = 80;
const STAGGER_MAX_MS = 480;
const REVEAL_DELAY_CLASSES = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

function applyStaggerDelays(elements) {
  const groups = new Map();

  elements.forEach(el => {
    const parent = el.parentElement;
    if (!parent) return;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach(group => {
    if (group.length < 2) return;

    group.forEach((el, index) => {
      if (el.style.transitionDelay) return; // respeita delays definidos na renderização
      el.style.transitionDelay = `${Math.min(index * STAGGER_STEP_MS, STAGGER_MAX_MS)}ms`;
    });
  });
}

// Após a entrada, remove o atraso para que transições de hover respondam na hora.
function clearRevealDelayAfterAnimation(el) {
  const clear = () => {
    el.style.transitionDelay = '';
    el.classList.remove(...REVEAL_DELAY_CLASSES);
  };

  el.addEventListener('transitionend', clear, { once: true });
  setTimeout(clear, 1800);
}

function getScrollAnimationObserver() {
  if (scrollAnimationObserver) return scrollAnimationObserver;

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px ${SCROLL_ANIMATION_PRELOAD}px 0px`,
    threshold: 0.01
  };

  scrollAnimationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        clearRevealDelayAfterAnimation(entry.target);
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  return scrollAnimationObserver;
}

function isElementNearViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight + SCROLL_ANIMATION_PRELOAD && rect.bottom >= -80;
}

function initScrollAnimations(root = document) {
  const animatedElements = getAnimatedElements(root);

  applyStaggerDelays(animatedElements);

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => {
      el.classList.add('in-view');
      clearRevealDelayAfterAnimation(el);
    });
    return;
  }

  const observer = getScrollAnimationObserver();
  animatedElements.forEach(el => {
    if (observedAnimatedElements.has(el)) return;

    if (isElementNearViewport(el)) {
      el.classList.add('in-view');
      clearRevealDelayAfterAnimation(el);
      observedAnimatedElements.add(el);
      return;
    }

    observedAnimatedElements.add(el);
    observer.observe(el);
  });
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

    // Estado de loading: a classe .loading é o que exibe o .btn-loading
    // (contatos.css esconde .btn-loading por padrão)
    btn.disabled = true;
    btn.classList.add('loading');
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
        // form.reset() desmarca os inputs mas não remove a classe visual dos chips
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
      btn.classList.remove('loading');
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
// SERVIÇOS, PARCEIROS E CLIENTES (Renderização Dinâmica)
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
      const stepNumber = String(index + 1).padStart(2, '0');
      const stepLabel = `Serviço ${stepNumber}`;
      return `
      <article class="service-card" data-animate="fade-up" style="transition-delay: ${index * 0.045}s; --card-accent: ${meta.accent};">
        <div class="service-card-accent"></div>
        <div class="service-card-body">
          <div class="service-card-top">
            <div class="service-icon-wrap">
              <i class="${meta.icon} service-icon"></i>
            </div>
            ${servico.novo ? '<span class="service-badge-new">Novo</span>' : ''}
            <span class="service-step" aria-label="${stepLabel}">${stepNumber}</span>
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

  // Carrosséis de parceiros e clientes: o loop infinito anima translateX(-50%),
  // então o conteúdo precisa existir em duas metades idênticas. As cópias saem
  // da navegação por teclado/leitores de tela (aria-hidden + tabindex=-1) para
  // não duplicar links na árvore de acessibilidade.
  const buildCarouselTrack = (items, buildChip, repeats = 1) => {
    let half = '';
    let cloneHalf = '';
    for (let i = 0; i < repeats; i++) {
      half += items.map(item => buildChip(item, i > 0)).join('');
      cloneHalf += items.map(item => buildChip(item, true)).join('');
    }
    return half + cloneHalf;
  };

  const cloneAttrs = (isClone) => (isClone ? ' aria-hidden="true" tabindex="-1"' : '');

  // Chip com link vira âncora (abre site/Instagram em nova guia); sem link,
  // vira div estática com o mesmo visual (ex.: parceiro ainda sem página)
  const buildParceiroChip = (parceiro, isClone) => {
    const classesLogo = `client-chip-logo${parceiro.semFiltro ? ' client-chip-logo--sem-filtro' : ''}`;
    const logo = `<img class="${classesLogo}" src="${escapeHtml(parceiro.logo)}" alt="${escapeHtml(parceiro.nome)}" width="160" height="48" loading="lazy" decoding="async">`;
    if (!parceiro.link) {
      return `<div class="card client-chip"${isClone ? ' aria-hidden="true"' : ''}>${logo}</div>`;
    }
    return `
    <a class="card client-chip" href="${escapeHtml(parceiro.link)}" target="_blank" rel="noopener noreferrer"
       aria-label="Abrir página de ${escapeHtml(parceiro.nome)} em nova guia"${cloneAttrs(isClone)}>
      ${logo}
    </a>
  `;
  };

  const buildClienteChip = (cliente, isClone) => {
    const conteudo = `
      <img class="cliente-chip-foto" src="${escapeHtml(cliente.foto)}" alt="${escapeHtml(cliente.nome)}" width="150" height="150" loading="lazy" decoding="async">
      <span class="cliente-chip-nome">${escapeHtml(cliente.nome)}</span>`;
    if (!cliente.link) {
      return `<div class="card client-chip client-chip--cliente"${isClone ? ' aria-hidden="true"' : ''}>${conteudo}</div>`;
    }
    return `
    <a class="card client-chip client-chip--cliente" href="${escapeHtml(cliente.link)}" target="_blank" rel="noopener noreferrer"
       aria-label="Abrir página de ${escapeHtml(cliente.nome)} em nova guia"${cloneAttrs(isClone)}>
      ${conteudo}
    </a>
  `;
  };

  const parceirosContainer = document.getElementById('parceiros-container');
  if (parceirosContainer && typeof PARCEIROS_DATA !== 'undefined') {
    parceirosContainer.innerHTML = buildCarouselTrack(PARCEIROS_DATA, buildParceiroChip);
  }

  const clientesContainer = document.getElementById('clientes-container');
  if (clientesContainer && typeof CLIENTES_DATA !== 'undefined') {
    // Repete o conjunto 2x para cada metade do track ficar mais larga que a
    // área visível em qualquer tela (senão o loop mostraria um vão em branco)
    clientesContainer.innerHTML = buildCarouselTrack(CLIENTES_DATA, buildClienteChip, 2);
  }

  // Marquee via requestAnimationFrame: velocidade constante em px/s (a animação
  // CSS com duração fixa deixava o track de clientes ~2x mais rápido que o de
  // parceiros), loop exato medido em pixels (sem salto no retorno) e pausa com
  // desaceleração suave no hover/foco. Sem JS, o fallback é a animação CSS.
  const initMarquee = (track, { speed = 55, reverse = false } = {}) => {
    if (!track || !track.children.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const carousel = track.closest('.clients-carousel');
    track.classList.add('clients-track--js');

    let half = 0;
    let pos = 0;
    let current = speed; // velocidade atual, suavizada em direção ao alvo
    let target = speed;
    let last = performance.now();

    const measure = () => {
      half = track.scrollWidth / 2;
      if (half > 0) pos %= half;
    };

    const step = (now) => {
      // dt limitado para não "pular" ao voltar de uma aba em segundo plano
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      current += (target - current) * Math.min(1, dt * 5);
      if (half > 0 && Math.abs(current) > 0.01) {
        pos = (pos + current * dt) % half;
        const offset = reverse ? pos - half : -pos;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      requestAnimationFrame(step);
    };

    if (carousel) {
      const pause = () => { target = 0; };
      const resume = () => { target = speed; };
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
      carousel.addEventListener('focusin', pause);
      carousel.addEventListener('focusout', resume);
    }

    measure();
    window.addEventListener('resize', measure);
    requestAnimationFrame(step);
  };

  // Clientes roda um pouco mais lento (cards maiores pedem leitura) e em
  // sentido contrário ao de parceiros
  initMarquee(parceirosContainer, { speed: 55 });
  initMarquee(clientesContainer, { speed: 42, reverse: true });
}

// Nota: Funcionalidade de portfólio (PORTFOLIO_DATA, filtros, lightbox)
// está em portfolio.js.

// ================================
// LIGHTBOX DA GALERIA DE FOTOS
// ================================

/**
 * Lightbox da galeria de fotos de servicos.html (seção #fotos, abaixo do
 * portfólio): amplia a foto com fade + scale, mostra o texto alternativo
 * como legenda e fecha pelo X, clique fora ou ESC.
 */
const ImageLightbox = {
  modal: null,
  lastTrigger: null,

  // O modal só entra no DOM na primeira ampliação (páginas sem galeria não pagam o custo)
  createModal() {
    if (this.modal) return;

    const modalHTML = `
      <div id="img-lightbox" class="img-lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" aria-hidden="true">
        <button type="button" class="img-lightbox-close" aria-label="Fechar foto ampliada">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <figure class="img-lightbox-figure">
          <img class="img-lightbox-img" src="" alt="">
          <figcaption class="img-lightbox-caption"></figcaption>
        </figure>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('img-lightbox');

    this.modal.querySelector('.img-lightbox-close').addEventListener('click', () => this.close());

    // Clique no backdrop (fora da foto/legenda) fecha
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) this.close();
    });
  },

  open({ src, alt = '' }, trigger = null) {
    this.createModal();
    this.lastTrigger = trigger;

    const img = this.modal.querySelector('.img-lightbox-img');
    const caption = this.modal.querySelector('.img-lightbox-caption');

    img.src = src;
    img.alt = alt;
    caption.textContent = alt;
    caption.style.display = alt ? '' : 'none';

    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll da página atrás do modal
    this.modal.querySelector('.img-lightbox-close').focus({ preventScroll: true });
  },

  close() {
    if (!this.modal) return;

    // Devolve o foco a quem abriu antes de esconder o modal (evita foco
    // preso em subtree com aria-hidden)
    if (this.lastTrigger && document.contains(this.lastTrigger)) {
      this.lastTrigger.focus({ preventScroll: true });
    }
    this.lastTrigger = null;

    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  },

  init() {
    // Delegação na grade da galeria: cada foto fica dentro de um botão
    // .foto-zoom (ver servicos.html)
    const fotosGrid = document.querySelector('.fotos-grid');
    if (!fotosGrid) return;

    fotosGrid.addEventListener('click', (e) => {
      const zoom = e.target.closest('.foto-zoom');
      if (!zoom) return;
      const foto = zoom.querySelector('img');
      if (!foto) return;
      this.open({ src: foto.currentSrc || foto.src, alt: foto.alt }, zoom);
    });
  }
};

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

    // O checkbox de consentimento não marca direto: abre o modal primeiro,
    // e só é marcado se o usuário confirmar ("Entendi"). Garante que o
    // consentimento passe pela leitura da política (LGPD).
    const consentCheckbox = document.querySelector('input[name="consentimento"]');
    if (consentCheckbox) {
      this.createModal();

      consentCheckbox.addEventListener('click', (e) => {
        if (consentCheckbox.checked) {
          e.preventDefault();
          consentCheckbox.checked = false;
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

    this.modal = document.getElementById('privacy-modal');

    // Fechar pelo X, clique no backdrop ou ESC = não confirmado;
    // só o botão "Entendi" confirma (e marca o checkbox que abriu o modal)
    const closeBtns = this.modal.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.close(false));
    });

    const confirmBtn = this.modal.querySelector('.modal-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.close(true));
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close(false);
    });
  },

  open(checkbox = null) {
    this.triggerCheckbox = checkbox;
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll da página atrás do modal
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

    // Pequeno atraso antes de limpar a referência para evitar reabertura
    // pelo mesmo clique que fechou o modal
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

  // 2. Renderiza o portfólio imediatamente para evitar atraso de conteúdo
  if (typeof window.initPortfolio === 'function') {
    window.initPortfolio();
  }

  // 3. Inicializa as animações depois dos elementos dinâmicos estarem no DOM
  initScrollAnimations();
  
  // 4. Inicializa o header e navegação
  initHeader();
  
  // 5. Inicializa o formulário
  initForm();
  
  // 6. Atualiza o ano no footer
  updateYear();
  
  // 7. Inicializa o modal de privacidade
  PrivacyModal.init();

  // 8. Inicializa o lightbox de imagens dos carrosséis
  ImageLightbox.init();
});
