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
    descricao: "O Projeto Arte de aMAR é uma iniciativa da Equipe F3 Esporte Cultura e Instituto Gas Petro que visa promover a Educação Ambiental, de forma lúdica, através da implantação do Programa de Educação Ambiental para Sustentabilidade, onde o intuito é educar e mudar a consciência ambiental dos alunos, professores e comunidade escolar sendo um veículo de transformação socioambiental e incentivar a criatividade artística dos participantes através da realização do Concurso Cultural Arte de AMAR.\n\nO Projeto pretende sensibilizar e conscientizar as crianças, jovens e toda a população brasileira a respeito da problemática do plástico no mar, dando a conhecer os efeitos negativos da sua presença nos ecossistemas marinhos e como podemos agir para prevenir e combater o problema, além de abordar conceitos sobre a economia circular.\n\nÉ direcionado a alunos da Pré-Escola, do 1º ao 9º ano, da Educação de Jovens e Adultos (EJA) e de Escolas Especiais, abrangendo diferentes faixas etárias e contextos educacionais. Destinado às escolas públicas do município do Rio de Janeiro, o projeto contempla unidades das 1ª, 2ª, 7ª e 8ª Coordenadorias Regionais de Educação (CRE), promovendo ampla e inclusiva participação estudantil. Com foco na conscientização ambiental, o projeto incentiva a criatividade por meio de atividades artísticas e educativas.\n\nNo ano de 2025 estamos visitamos 27 escolas.",
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

// ================================
// RENDERIZAÇÃO E FILTROS
// ================================

function initPortfolio() {
  // Renderizar portfólio dinamicamente
  const portfolioContainer = document.getElementById('portfolio-container');
  if (portfolioContainer && typeof PORTFOLIO_DATA !== 'undefined') {
    portfolioContainer.innerHTML = PORTFOLIO_DATA.map((item, index) => {
      const titulo = escapeHtml(item.titulo);
      const descricao = escapeHtml(item.descricao || '');
      const imagem = escapeHtml(item.imagem);
      const link = escapeHtml(item.link);
      const site = escapeHtml(item.site || '');
      const instagram = escapeHtml(item.instagram || '');
      const delayStyle = index > 0 ? `animation-delay: ${index * 0.1}s;` : '';

      if (item.tipo === 'foto' || item.tipo === 'projetos') {
        return `
          <figure class="pf-item card" style="padding: 0; border: none; ${delayStyle}" data-type="${escapeHtml(item.tipo)}" data-animate="scale-in">
            <a href="${link}" 
               class="pf-lightbox" 
               data-titulo="${titulo}"
               data-descricao="${descricao}"
               data-site="${site}"
               data-instagram="${instagram}"
               style="display: block; position: relative; overflow: hidden; aspect-ratio: 16/9;">
              <img src="${imagem}" alt="${titulo}" 
                   loading="lazy"
                   decoding="async"
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
          <figure class="pf-item card" style="padding: 0; border: none; ${delayStyle}" data-type="${dataType}" data-animate="scale-in">
            <div style="position: relative; aspect-ratio: 16/9; overflow: hidden;">
              <img src="${imagem}" alt="${titulo}" 
                   loading="lazy"
                   decoding="async"
                   style="width: 100%; height: 100%; object-fit: cover;"
                   onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
              <a href="${link}" 
                 class="pf-lightbox"
                 data-video="true"
                 data-titulo="${titulo}"
                 data-descricao="${descricao}"
                 data-site="${site}"
                 data-instagram="${instagram}"
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

  // Configurar filtros
  const filterBtns = document.querySelectorAll('.pf-btn');
  const items = document.querySelectorAll('.pf-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        items.forEach(item => {
          const itemType = item.dataset.type;
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
    const modalTituloVideo = modal.querySelector('.pf-modal-titulo-video');
    const modalDescricaoVideo = modal.querySelector('.pf-modal-descricao-video');
    const driveShield = modal.querySelector('.drive-shield');
    
    // Elementos do layout de projeto/foto
    const projectLayout = modal.querySelector('.pf-project-layout');
    const modalImg = modal.querySelector('.pf-modal-img');
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
      currentLinks = Array.from(document.querySelectorAll('.pf-item:not([style*="display: none"]) .pf-lightbox'));
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

      if (isVideo) {
        // Layout de vídeo (vertical)
        projectLayout.style.display = 'none';
        videoLayout.style.display = 'flex';
        
        if (modalIframe) modalIframe.src = href;
        
        if (modalTituloVideo) {
          modalTituloVideo.textContent = titulo;
          modalTituloVideo.style.display = titulo ? 'block' : 'none';
        }
        
        if (modalDescricaoVideo) {
          const descHtml = (descricao || '').replace(/\n/g, '<br>');
          const linksHtml = [
            site ? `<a href="${site}" target="_blank" rel="noopener" style="color: var(--primary); font-weight: 600; margin-right: 0.75rem;">Site oficial</a>` : '',
            instagram ? `<a href="${instagram}" target="_blank" rel="noopener" style="color: var(--primary); font-weight: 600;">Instagram</a>` : ''
          ].filter(Boolean).join('');

          modalDescricaoVideo.innerHTML = descHtml + (linksHtml ? `<div style="margin-top: 0.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">${linksHtml}</div>` : '');
          modalDescricaoVideo.style.display = (descricao || linksHtml) ? 'block' : 'none';
        }
        
        if (driveShield) {
          const isGoogleDrive = href.includes('drive.google.com');
          driveShield.style.display = isGoogleDrive ? 'block' : 'none';
        }
      } else {
        // Layout de projeto/foto (horizontal lado a lado)
        videoLayout.style.display = 'none';
        projectLayout.style.display = 'flex';
        
        if (modalImg) modalImg.src = href;
        if (modalTituloProjeto) modalTituloProjeto.textContent = titulo;
        if (modalDescricaoProjeto) modalDescricaoProjeto.textContent = descricao;
        
        if (modalLinksProjeto) {
          const linksHtml = [
            site ? `<a href="${site}" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1; text-align: center;"><i class="fa-solid fa-globe"></i> Site Oficial</a>` : '',
            instagram ? `<a href="${instagram}" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1; text-align: center;"><i class="fa-brands fa-instagram"></i> Instagram</a>` : ''
          ].filter(Boolean).join('');
          modalLinksProjeto.innerHTML = linksHtml;
          modalLinksProjeto.style.display = linksHtml ? 'flex' : 'none';
        }
      }
      currentIndex = index;
    };

    const openModal = (index) => {
      updateCurrentLinks();
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
