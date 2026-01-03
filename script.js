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
 * PORTFÓLIO - Adicione ou remova itens aqui
 * Cada item pode ter:
 * - tipo: "foto" ou "video"
 * - titulo: título do projeto (obrigatório)
 * - descricao: descrição detalhada (opcional)
 * - imagem: URL da imagem ou thumbnail
 * - link: URL da imagem em alta resolução ou link do vídeo
 * - videoId: ID do YouTube (apenas para vídeos do YouTube)
 */
const PORTFOLIO_DATA = [
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Dicas de Camarim Rabo Cascata",
    descricao: "Material em Google Drive para exibição no portfólio.",
    imagem: "https://drive.google.com/thumbnail?id=1Gn5llj_yVwKoKrAtL92fhcv4dwM-7w4e&sz=w1000",
    link: "https://drive.google.com/file/d/1Gn5llj_yVwKoKrAtL92fhcv4dwM-7w4e/preview?rm=minimal",
    videoId: "1Gn5llj_yVwKoKrAtL92fhcv4dwM-7w4e"
  },
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Receitas Frutas",
    descricao: "Vídeo de receitas com frutas.",
    imagem: "https://drive.google.com/thumbnail?id=1M-58OoS3QkgzbuZo9rApMmxr49dPqeKb&sz=w1000",
    link: "https://drive.google.com/file/d/1M-58OoS3QkgzbuZo9rApMmxr49dPqeKb/preview?rm=minimal",
    videoId: "1M-58OoS3QkgzbuZo9rApMmxr49dPqeKb"
  },
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Receitas Água Aromatizada Refrescante",
    descricao: "Receita de água aromatizada refrescante.",
    imagem: "https://drive.google.com/thumbnail?id=1uTQ_R6KUz8KrM7mWokBxhbhuCDhzWJzt&sz=w1000",
    link: "https://drive.google.com/file/d/1uTQ_R6KUz8KrM7mWokBxhbhuCDhzWJzt/preview?rm=minimal",
    videoId: "1uTQ_R6KUz8KrM7mWokBxhbhuCDhzWJzt"
  },
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Estreia 05_03",
    descricao: "Vídeo de estreia do programa.",
    imagem: "https://drive.google.com/thumbnail?id=1ljILU3Fncqfq9evKNejCCFaYA2P1UnD4&sz=w1000",
    link: "https://drive.google.com/file/d/1ljILU3Fncqfq9evKNejCCFaYA2P1UnD4/preview?rm=minimal",
    videoId: "1ljILU3Fncqfq9evKNejCCFaYA2P1UnD4"
  },
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Dicas de Camarim Make Colorida",
    descricao: "Dicas de maquiagem colorida.",
    imagem: "https://drive.google.com/thumbnail?id=1tu5nyPHjMV4IYqHxFP1zcrRwjRXM9XX7&sz=w1000",
    link: "https://drive.google.com/file/d/1tu5nyPHjMV4IYqHxFP1zcrRwjRXM9XX7/preview?rm=minimal",
    videoId: "1tu5nyPHjMV4IYqHxFP1zcrRwjRXM9XX7"
  },
  {
    tipo: "ellen",
    titulo: "Ellen Jabour - Receitas Gelo Aromatizado",
    descricao: "Receita de gelo aromatizado.",
    imagem: "https://drive.google.com/thumbnail?id=1VjAt_SxvFrr3-ZzziYMkSz8BVlZVC1yn&sz=w1000",
    link: "https://drive.google.com/file/d/1VjAt_SxvFrr3-ZzziYMkSz8BVlZVC1yn/preview?rm=minimal",
    videoId: "1VjAt_SxvFrr3-ZzziYMkSz8BVlZVC1yn"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 1",
    descricao: "Episódio 1 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1D0vrMfLzpUbaxz_3CY2v83ulkhkn5l6i&sz=w1000",
    link: "https://drive.google.com/file/d/1D0vrMfLzpUbaxz_3CY2v83ulkhkn5l6i/preview?rm=minimal",
    videoId: "1D0vrMfLzpUbaxz_3CY2v83ulkhkn5l6i"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 2",
    descricao: "Episódio 2 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1S3n2N87zu_jhyTMK_6QUgCDFhqqDK6c9&sz=w1000",
    link: "https://drive.google.com/file/d/1S3n2N87zu_jhyTMK_6QUgCDFhqqDK6c9/preview?rm=minimal",
    videoId: "1S3n2N87zu_jhyTMK_6QUgCDFhqqDK6c9"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 3",
    descricao: "Episódio 3 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=15KpuiedfDuRCVuub_S5-z_apY8lwD025&sz=w1000",
    link: "https://drive.google.com/file/d/15KpuiedfDuRCVuub_S5-z_apY8lwD025/preview?rm=minimal",
    videoId: "15KpuiedfDuRCVuub_S5-z_apY8lwD025"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 4",
    descricao: "Episódio 4 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1NTyFQY-wGVm9iZcK2fXNZ2ZuD2qQ9-E7&sz=w1000",
    link: "https://drive.google.com/file/d/1NTyFQY-wGVm9iZcK2fXNZ2ZuD2qQ9-E7/preview?rm=minimal",
    videoId: "1NTyFQY-wGVm9iZcK2fXNZ2ZuD2qQ9-E7"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 5",
    descricao: "Episódio 5 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1B13oPpSA80RZ4h2ipRnmltrh7hVnvPhf&sz=w1000",
    link: "https://drive.google.com/file/d/1B13oPpSA80RZ4h2ipRnmltrh7hVnvPhf/preview?rm=minimal",
    videoId: "1B13oPpSA80RZ4h2ipRnmltrh7hVnvPhf"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 6",
    descricao: "Episódio 6 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1uLXFdIreIZh5WjKqsm-lCjfs_-EAk7rW&sz=w1000",
    link: "https://drive.google.com/file/d/1uLXFdIreIZh5WjKqsm-lCjfs_-EAk7rW/preview?rm=minimal",
    videoId: "1uLXFdIreIZh5WjKqsm-lCjfs_-EAk7rW"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 7",
    descricao: "Episódio 7 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1_tqNqWyGVJRwYEUMxI9MCax3w2yxHmmN&sz=w1000",
    link: "https://drive.google.com/file/d/1_tqNqWyGVJRwYEUMxI9MCax3w2yxHmmN/preview?rm=minimal",
    videoId: "1_tqNqWyGVJRwYEUMxI9MCax3w2yxHmmN"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 8",
    descricao: "Episódio 8 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1PBI7yNxRAMvcKSx4JBEm-z8zAEWQEUJw&sz=w1000",
    link: "https://drive.google.com/file/d/1PBI7yNxRAMvcKSx4JBEm-z8zAEWQEUJw/preview?rm=minimal",
    videoId: "1PBI7yNxRAMvcKSx4JBEm-z8zAEWQEUJw"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 9",
    descricao: "Episódio 9 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1za7EyITLdGy3IUeC6X5XMV1NDOsO31gf&sz=w1000",
    link: "https://drive.google.com/file/d/1za7EyITLdGy3IUeC6X5XMV1NDOsO31gf/preview?rm=minimal",
    videoId: "1za7EyITLdGy3IUeC6X5XMV1NDOsO31gf"
  },
  {
    tipo: "ellen-mundo",
    titulo: "Ellen Jabour Descobrindo o Mundo - Ep 10",
    descricao: "Episódio 10 do programa Descobrindo o Mundo.",
    imagem: "https://drive.google.com/thumbnail?id=1Xi7-xgXvo5pwblCpuGzdv9Yo9wJw0Qoe&sz=w1000",
    link: "https://drive.google.com/file/d/1Xi7-xgXvo5pwblCpuGzdv9Yo9wJw0Qoe/preview?rm=minimal",
    videoId: "1Xi7-xgXvo5pwblCpuGzdv9Yo9wJw0Qoe"
  },
  {
    tipo: "longa",
    titulo: "Dolores",
    descricao: "Longa-metragem Dolores.",
    imagem: "https://www.cafecomfilme.com.br/media/k2/items/cache/7becad0513fa168344c9f1efebd84e3f_XL.jpg?t=20170318_171919",
    link: "https://drive.google.com/file/d/1mg_yT3yFexYHghuAMvxSN2xPHFDUaedb/preview?rm=minimal",
    videoId: "1mg_yT3yFexYHghuAMvxSN2xPHFDUaedb"
  },
  {
    tipo: "longa",
    titulo: "Homens de Barro",
    descricao: "Longa-metragem Homens de Barro.",
    imagem: "https://br.web.img3.acsta.net/r_1920_1080/img/30/35/30354bb54df57e09c2b80e4ae453fa17.jpg",
    link: "https://drive.google.com/file/d/1VgayqKfXJkbE5GuYRJqipNdZoDplKqOh/preview?rm=minimal",
    videoId: "1VgayqKfXJkbE5GuYRJqipNdZoDplKqOh"
  },
  {
    tipo: "longa",
    titulo: "Loop",
    descricao: "Longa-metragem Loop.",
    imagem: "https://br.web.img3.acsta.net/r_1920_1080/pictures/21/05/20/16/23/1607083.jpg",
    link: "https://drive.google.com/file/d/1VUe9GWZDgGn_oG0q9cWNz24EF9UrCT-2/preview?rm=minimal",
    videoId: "1VUe9GWZDgGn_oG0q9cWNz24EF9UrCT-2"
  },
  {
    tipo: "foto",
    titulo: "Teatro — Performance",
    descricao: "Projeto cultural de teatro contemporâneo com foco em performances artísticas inovadoras.",
    imagem: "https://dus6dayednven.cloudfront.net/app/uploads/2021/05/3.Nico-Ferreyra.jpg",
    link: "https://dus6dayednven.cloudfront.net/app/uploads/2021/05/3.Nico-Ferreyra.jpg"
  }
  // Para adicionar mais itens, copie um bloco acima e cole aqui
];

/**
 * CLIENTES/PARCEIROS - Adicione ou remova aqui
 */
const CLIENTES_DATA = [
  "Valkyria Filmes",
  "Pipoca Cultural",
  "Instituto Criativo",
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
// PORTFÓLIO (Filtros e Modal)
// ================================
function initPortfolio() {
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

  // Renderizar portfólio dinamicamente
  const portfolioContainer = document.getElementById('portfolio-container');
  if (portfolioContainer && typeof PORTFOLIO_DATA !== 'undefined') {
    portfolioContainer.innerHTML = PORTFOLIO_DATA.map((item, index) => {
      const titulo = escapeHtml(item.titulo);
      const descricao = escapeHtml(item.descricao || '');
      const imagem = escapeHtml(item.imagem); // URLs também devem ser sanitizadas se vierem de input de usuário, mas aqui assumimos seguras ou escapamos aspas
      const link = escapeHtml(item.link);

      if (item.tipo === 'foto') {
        return `
          <figure class="pf-item card" style="padding: 0; border: none;" data-type="foto" data-animate="scale-in" ${index > 0 ? `style="animation-delay: ${index * 0.1}s;"` : ''}>
            <a href="${link}" 
               class="pf-lightbox" 
               data-titulo="${titulo}"
               data-descricao="${descricao}"
               style="display: block; position: relative; overflow: hidden; aspect-ratio: 16/9;">
              <img src="${imagem}" alt="${titulo}" 
                   loading="lazy"
                   style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 1rem; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
                <figcaption style="color: white; font-weight: 600;">${titulo}</figcaption>
              </div>
            </a>
          </figure>
        `;
      } else {
        // Video, Longa, Ellen ou Ellen-Mundo
        const videoId = escapeHtml(item.videoId);
        let dataType = 'video';
        if (item.tipo === 'longa') dataType = 'longa';
        else if (item.tipo === 'ellen') dataType = 'ellen';
        else if (item.tipo === 'ellen-mundo') dataType = 'ellen-mundo';
        
        return `
          <figure class="pf-item card" style="padding: 0; border: none;" data-type="${dataType}" data-animate="scale-in" ${index > 0 ? `style="animation-delay: ${index * 0.1}s;"` : ''}>
            <div style="position: relative; aspect-ratio: 16/9; overflow: hidden;">
              <img src="${imagem}" alt="${titulo}" 
                   loading="lazy"
                   style="width: 100%; height: 100%; object-fit: cover;"
                   onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
              <a href="${link}" 
                 class="pf-lightbox"
                 data-video="true"
                 data-titulo="${titulo}"
                 data-descricao="${descricao}"
                 style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3);">
                <i class="fa-solid fa-play-circle" style="font-size: 4rem; color: white; opacity: 0.8;"></i>
              </a>
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 1rem; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); pointer-events: none;">
                <figcaption style="color: white; font-weight: 600;">${titulo}</figcaption>
              </div>
            </div>
          </figure>
        `;
      }
    }).join('');
  }

  // Agora pegar os elementos renderizados
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
          const itemType = item.dataset.type;
          // 'video' mostra todos os vídeos (ellen, ellen-mundo, longa, e video genérico)
          const shouldShow = filter === 'all' || 
                            itemType === filter || 
                            (filter === 'video' && (itemType === 'ellen' || itemType === 'ellen-mundo' || itemType === 'longa' || itemType === 'video'));
          
          if (shouldShow) {
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

  // Lightbox Avançado
  initLightbox();
}

function initLightbox() {
  const modal = document.getElementById('pf-image-modal');
  // Usar delegação de eventos para melhor performance e suporte a conteúdo dinâmico
  const portfolioContainer = document.getElementById('portfolio-container');

  if (modal && portfolioContainer) {
    const modalImg = modal.querySelector('.pf-modal-img');
    const modalIframe = modal.querySelector('.pf-modal-iframe');
    const modalClose = modal.querySelector('.pf-close');
    const btnPrev = modal.querySelector('.pf-prev');
    const btnNext = modal.querySelector('.pf-next');
    const modalTitulo = modal.querySelector('.pf-modal-titulo');
    const modalDescricao = modal.querySelector('.pf-modal-descricao');
    const driveShield = modal.querySelector('.drive-shield');
    
    let currentIndex = 0;
    let currentLinks = []; // Armazena os links visíveis atuais

    const updateCurrentLinks = () => {
      // Pega apenas os links dos itens visíveis
      currentLinks = Array.from(document.querySelectorAll('.pf-item:not([style*="display: none"]) .pf-lightbox'));
    };

    const updateModal = (index) => {
      if (!currentLinks[index]) return;
      
      const link = currentLinks[index];
      const href = link.getAttribute('href');
      const isVideo = link.getAttribute('data-video') === 'true';
      const titulo = link.getAttribute('data-titulo') || '';
      const descricao = link.getAttribute('data-descricao') || '';

      // Atualizar título e descrição
      if (modalTitulo) {
        modalTitulo.textContent = titulo;
        modalTitulo.style.display = titulo ? 'block' : 'none';
      }
      if (modalDescricao) {
        modalDescricao.textContent = descricao;
        modalDescricao.style.display = descricao ? 'block' : 'none';
      }

      if (isVideo) {
        if (modalImg) {
          modalImg.style.display = 'none';
          modalImg.src = '';
        }
        if (modalIframe) {
          modalIframe.src = href;
          modalIframe.style.display = 'block';
        }
        // Mostrar shield apenas para vídeos do Google Drive
        if (driveShield) {
          const isGoogleDrive = href.includes('drive.google.com');
          driveShield.style.display = isGoogleDrive ? 'block' : 'none';
        }
      } else {
        if (modalIframe) {
          modalIframe.style.display = 'none';
          modalIframe.src = '';
        }
        if (modalImg) {
          modalImg.src = href;
          modalImg.style.display = 'block';
        }
        if (driveShield) {
          driveShield.style.display = 'none';
        }
      }
      currentIndex = index;
    };

    const openModal = (index) => {
      updateCurrentLinks(); // Atualiza a lista de links baseada no filtro atual
      // Encontrar o índice correto na lista filtrada
      // O index passado originalmente pode ser do array completo, precisamos achar o elemento correspondente
      // Mas como usamos delegação, podemos passar o elemento clicado
      
      updateModal(index);
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (modalImg) modalImg.src = '';
      if (modalIframe) modalIframe.src = '';
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
        if (index !== -1) {
          openModal(index);
        }
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (btnNext) btnNext.addEventListener('click', nextItem);
    if (btnPrev) btnPrev.addEventListener('click', prevItem);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('pf-content-container')) closeModal();
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
  // 1. Primeiro renderiza o conteúdo dinâmico (serviços, clientes, portfólio)
  initPortfolio();
  
  // 2. Depois inicializa as animações (para pegar os elementos renderizados)
  initScrollAnimations();
  
  // 3. Inicializa o header e navegação
  initHeader();
  
  // 4. Inicializa o formulário
  initForm();
  
  // 5. Atualiza o ano no footer
  updateYear();
  
  // 6. Inicializa o modal de privacidade
  PrivacyModal.init();
});
