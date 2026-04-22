/**
 * Portfolio.js - Gerenciamento do Portfólio e Lightbox
 * Funcionalidades: renderização de itens, filtros, modal de visualização
 */

// ================================
// DADOS DO PORTFÓLIO
// ================================

/**
 * PORTFÓLIO - Adicione ou remova itens aqui
 * Cada item pode ter:
 * - tipo: "foto", "video", "projetos", "longa", "ellen", "ellen-mundo"
 * - titulo: título do projeto (obrigatório)
 * - descricao: descrição detalhada (opcional)
 * - imagem: URL da imagem ou thumbnail
 * - link: URL da imagem em alta resolução ou link do vídeo
 * - videoId: ID do vídeo (para vídeos)
 * - site: URL do site oficial (opcional)
 * - instagram: URL do Instagram (opcional)
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
    tipo: "projetos",
    titulo: "Arte de aMAR",
    descricao: "O Projeto Arte de aMAR é uma iniciativa da Equipe F3 Esporte Cultura e Instituto Gas Petro que visa promover a Educação Ambiental, de forma lúdica, através da implantação do Programa de Educação Ambiental para Sustentabilidade, onde o intuito é educar e mudar a consciência ambiental dos alunos, professores e comunidade escolar sendo um veículo de transformação socioambiental e incentivar a criatividade artística dos participantes através da realização do Concurso Cultural Arte de AMAR.\n\nO Projeto pretende sensibilizar e conscientizar as crianças, jovens e toda a população brasileira a respeito da problemática do plástico no mar, dando a conhecer os efeitos negativos da sua presença nos ecossistemas marinhos e como podemos agir para prevenir e combater o problema, além de abordar conceitos sobre a economia circular.\n\nÉ direcionado a alunos da Pré-Escola, do 1º ao 9º ano, da Educação de Jovens e Adultos (EJA) e de Escolas Especiais, abrangendo diferentes faixas etárias e contextos educacionais. Destinado às escolas públicas do município do Rio de Janeiro, o projeto contempla unidades das 1ª, 2ª, 7ª e 8ª Coordenadorias Regionais de Educação (CRE), promovendo ampla e inclusiva participação estudantil. Com foco na conscientização ambiental, o projeto incentiva a criatividade por meio de atividades artísticas e educativas.\n\nNo ano de 2025 visitamos 27 escolas.",
    imagem: "assets/projetos/Arte_de_amar.jpg",
    link: "assets/projetos/Arte_de_amar.jpg",
    site: "https://artedeamar.org/",
    instagram: "https://www.instagram.com/artedeamarbrasil/"
  },
  {
    tipo: "projetos",
    titulo: "Ideias Brasil",
    descricao: "O Projeto Ideias Brasil, iniciativa do Instituto Gas Petro em parceria com Equipe F3 Esporte Cultura, transforma vidas desde 2014 por meio da educação, cultura, esportes e desenvolvimento social. Alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) e aos princípios de ESG (Environmental, Social, Governance), adapta-se às necessidades das comunidades para criar impactos duradouros. Com o Rio de Janeiro como Capital Mundial do Livro em 23 de abril de 2025, reconhecida pela UNESCO, o projeto celebra a literatura como ferramenta de inclusão e sustentabilidade.\n\nFocado em jovens de 15 a 17 anos de escolas públicas, o Ideias Brasil promove leitura, criatividade e pensamento crítico through do Concurso Literário, da Jornada Literária Itinerante e da Roda de Debates. Nosso objetivo é inspirar uma geração a usar as palavras para construir um futuro mais consciente, valorizando a herança cultural brasileira e conectando educação à cidadania. Assim, deixamos um legado que reflete o poder transformador da literatura no Brasil e no mundo.",
    imagem: "assets/projetos/ideias_brasil.jpg",
    link: "assets/projetos/ideias_brasil.jpg",
    site: "https://ideiasbrasil.com/",
    instagram: "https://www.instagram.com/ideiasbrasiloficial"
  },
  {
    tipo: "projetos",
    titulo: "Brasilidade Fashion",
    descricao: "Brasilidade Fashion é uma iniciativa inovadora que une moda, sustentabilidade e inclusão social. Inspirado nos princípios da moda sustentável, o projeto adota a prática da Reciclagem Fashion — também conhecida como eco-fashion — como ferramenta de transformação. Essa abordagem consiste na reutilização criativa de roupas e materiais têxteis, com o objetivo de minimizar o desperdício e reduzir os impactos ambientais da indústria da moda.\n\nNosso principal propósito é capacitar jovens em situação de vulnerabilidade social, oferecendo formação técnica e criativa para que se tornem protagonistas de suas próprias histórias. Por meio do aprendizado e da valorização da moda como expressão cultural, o projeto busca fomentar a geração de renda, a autonomia e o empreendedorismo sustentável.",
    imagem: "assets/projetos/identidade_brasileira.jpg",
    link: "assets/projetos/identidade_brasileira.jpg",
    site: "https://brasilidadefashion.com.br/",
    instagram: "https://www.instagram.com/brasilidadefashion/"
  },
  {
    tipo: "projetos",
    titulo: "Positivamente",
    descricao: "Um dia de imersão cultural para adultos acima de 35 anos, com oficinas gratuitas de yoga e meditação, artesanato e dança, além de talk shows conduzidos por especialistas em saúde mental, bem-estar e autocuidado.\n\nObjetivos:\n\n• Tornar a cultura e as oportunidades de aprendizado acessíveis a todos, especialmente para adultos acima de 35 anos.\n\n• Oferecer uma experiência única que promova o bem-estar físico, mental e emocional dos participantes.\n\n• Estimular a criatividade, a socialização e o autocuidado, proporcionando ferramentas para um estilo de vida mais saudável e equilibrado.",
    imagem: "assets/projetos/positiva'_mente.jpg",
    link: "assets/projetos/positiva'_mente.jpg",
    site: "https://positivamentebrasil.com.br/",
    instagram: "https://www.instagram.com/positivamentebrasil"
  },
  {
    tipo: "foto",
    titulo: "Teatro — Performance",
    descricao: "Projeto cultural de teatro contemporâneo com foco em performances artísticas inovadoras.",
    imagem: "https://dus6dayednven.cloudfront.net/app/uploads/2021/05/3.Nico-Ferreyra.jpg",
    link: "https://dus6dayednven.cloudfront.net/app/uploads/2021/05/3.Nico-Ferreyra.jpg"
  }
];

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

  switch (type) {
    case 'foto':
      return {
        filterType: 'foto',
        typeLabel: 'Foto',
        contextLabel: 'Registro visual',
        actionLabel: 'Abrir imagem',
        kicker: 'Ver imagem'
      };
    case 'projetos':
      return {
        filterType: 'projetos',
        typeLabel: 'Projeto',
        contextLabel: 'Projeto cultural',
        actionLabel: 'Abrir projeto',
        kicker: 'Ver detalhes'
      };
    case 'longa':
      return {
        filterType: 'video',
        typeLabel: 'Trailer',
        contextLabel: 'Longa-metragem',
        actionLabel: 'Abrir trailer',
        kicker: 'Assistir trailer'
      };
    case 'ellen':
      return {
        filterType: 'video',
        typeLabel: 'Vídeo',
        contextLabel: 'Ellen Jabour',
        actionLabel: 'Abrir vídeo',
        kicker: 'Assistir conteúdo'
      };
    case 'ellen-mundo':
      return {
        filterType: 'video',
        typeLabel: 'Série',
        contextLabel: 'Descobrindo o Mundo',
        actionLabel: 'Abrir episódio',
        kicker: 'Assistir episódio'
      };
    default:
      return {
        filterType: 'video',
        typeLabel: 'Vídeo',
        contextLabel: 'Audiovisual',
        actionLabel: 'Abrir vídeo',
        kicker: 'Assistir conteúdo'
      };
  }
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

// ================================
// RENDERIZAÇÃO E FILTROS
// ================================

function initPortfolio() {
  // Renderizar portfólio dinamicamente
  const portfolioContainer = document.getElementById('portfolio-container');
  if (portfolioContainer && typeof PORTFOLIO_DATA !== 'undefined') {
    portfolioContainer.innerHTML = PORTFOLIO_DATA.map((item, index) => {
      const presentation = getPortfolioPresentation(item);
      const isVideo = presentation.filterType === 'video';
      const titulo = escapeHtml(item.titulo);
      const descricao = escapeHtml(item.descricao || '');
      const resumo = escapeHtml(getPortfolioExcerpt(item.descricao || ''));
      const imagem = escapeHtml(item.imagem);
      const link = escapeHtml(item.link);
      const site = escapeHtml(item.site || '');
      const instagram = escapeHtml(item.instagram || '');
      const videoId = escapeHtml(item.videoId || '');
      const fallbackAttr = videoId ? ` onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"` : '';
      const delayStyle = index > 0 ? `animation-delay: ${index * 0.06}s;` : '';

      return `
        <figure class="pf-item card" style="padding: 0; border: none; ${delayStyle}" data-type="${presentation.filterType}" data-animate="scale-in">
          <a href="${link}"
             class="pf-lightbox pf-card-link"
             data-video="${isVideo ? 'true' : 'false'}"
             data-titulo="${titulo}"
             data-descricao="${descricao}"
             data-site="${site}"
             data-instagram="${instagram}"
             data-type-label="${escapeHtml(presentation.typeLabel)}"
             data-context-label="${escapeHtml(presentation.contextLabel)}"
             aria-label="${escapeHtml(`${presentation.actionLabel}: ${item.titulo}`)}">
            <div class="pf-card-media">
              <img class="pf-card-image" src="${imagem}" alt="${titulo}" loading="lazy" decoding="async"${fallbackAttr}>
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

    const updateCurrentLinks = () => {
      currentLinks = Array.from(document.querySelectorAll('.pf-item:not([hidden]) .pf-lightbox'));
    };

    const updateModal = (index) => {
      if (!currentLinks[index]) return;
      
      const link = currentLinks[index];
      const href = link.getAttribute('href');
      const isVideo = link.getAttribute('data-video') === 'true';
      const titulo = link.getAttribute('data-titulo') || '';
      const descricao = link.getAttribute('data-descricao') || '';
      const site = link.getAttribute('data-site') || '';
      const instagram = link.getAttribute('data-instagram') || '';
      const typeLabel = link.getAttribute('data-type-label') || '';
      const contextLabel = link.getAttribute('data-context-label') || '';
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
          modalLinksVideo.style.display = linksHtml ? 'flex' : 'none';
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
          modalLinksProjeto.style.display = linksHtml ? 'flex' : 'none';
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
