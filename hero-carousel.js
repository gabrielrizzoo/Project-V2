/**
 * Card Stack Carousel do hero da Home.
 * Usa as mesmas fotos otimizadas de Incentivart/fotos-site/ exibidas
 * na galeria de servicos.html. Transições apenas com transform/opacity;
 * navegação por setas, teclado (← →), dots e swipe/arraste (Pointer Events).
 */
(function () {
  'use strict';

  const HERO_FOTOS = [
    { src: 'Incentivart/fotos-site/44509923242_f35957a3c6_b.webp', alt: 'Telão exibe a marca do Festival Século XXI — Mulheres, Ação!' },
    { src: 'Incentivart/fotos-site/43649900855_16247e90fe_b.webp', alt: 'Celular em tripé transmite ao vivo o debate com convidadas no palco do festival' },
    { src: 'Incentivart/fotos-site/43796270634_22b99322d4_b.webp', alt: 'Espectadora observa tela rosa com a palavra feminismo' },
    { src: 'Incentivart/fotos-site/43604610935_0f83645f22_b.webp', alt: 'Silhueta de espectadora diante de tela azul com a palavra sororidade' },
    { src: 'Incentivart/fotos-site/30689017558_f04d4a3e98_b.webp', alt: 'Painel iluminado exibe a hashtag #mulheresação em parede de tijolos' },
    { src: 'Incentivart/fotos-site/30689016738_50e02854d8_b.webp', alt: 'Projeção da vinheta do Centro Audiovisual Simone de Beauvoir na sala de cinema' },
    { src: 'Incentivart/fotos-site/44464278912_7938e41c68_b.webp', alt: 'Folhetos de programação do festival enfileirados com entrada franca' },
    { src: 'Incentivart/fotos-site/convite-seculo-xxi-mulheres-acao.webp', alt: 'Convite evento "Século XXI Mulheres, Ação!" com Produção de Ludmila Lorenzetto', w: 1098, h: 1600 },
    { src: 'Incentivart/fotos-site/43604194695_4f0b52e4dd_b.webp', alt: 'Adesivos e bótons roxos do festival organizados em caixa sobre mesa florida' },
    { src: 'Incentivart/fotos-site/44464054622_8d4b7493bc_b.webp', alt: "Participante segura sacola rosa do festival em jardim com espelho d'água" },
    { src: 'Incentivart/fotos-site/44513888001_f8e875d8ef_b.webp', alt: 'Kit do festival em sacola rosa translúcida sobre o jardim' },
    { src: 'Incentivart/fotos-site/filme-dolores-festival-do-rio-2016.webp', alt: 'Equipe do filme Dolores apresenta a sessão no Festival do Rio 2016 — foto: Cristina Granato', w: 1334, h: 1600 },
    { src: 'Incentivart/fotos-site/bastidores-camarim-maquiagem.webp', alt: 'Atriz retoca a maquiagem no espelho iluminado do camarim nos bastidores de filmagem', w: 1600, h: 900 },
    { src: 'Incentivart/fotos-site/projeto-amar-2025-em-ayrton-senna-01.webp', alt: 'Apresentação musical do projeto Arte de aMAR para as crianças da EM Ayrton Senna', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/projeto-amar-2025-em-ayrton-senna-02.webp', alt: 'Crianças participam de jogo educativo do projeto Arte de aMAR na biblioteca da EM Ayrton Senna', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/ideias-brasil-concurso-literario.webp', alt: 'Apresentação do concurso literário do projeto Ideias Brasil para estudantes em sala de aula', w: 1600, h: 900 },
    { src: 'Incentivart/fotos-site/brasilidade-fashion-capacitacao-01.webp', alt: 'Turma da capacitação gratuita em moda sustentável do Brasilidade Fashion', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/brasilidade-fashion-capacitacao-02.webp', alt: 'Instrutor do Brasilidade Fashion prepara tecidos de reaproveitamento na oficina de moda sustentável', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/brasilidade-fashion-oficina-estamparia.webp', alt: 'Participantes pintam estampas em tecido na oficina de estamparia do Brasilidade Fashion', w: 1200, h: 1600 },
    { src: 'Incentivart/fotos-site/desfile-brasilidade-fashion-01.webp', alt: 'Passarela do desfile Brasilidade Fashion montada no shopping — foto: Ariel Subira', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/desfile-brasilidade-fashion-02.webp', alt: 'Modelo desfila look jeans autoral na passarela do Brasilidade Fashion — foto: Ariel Subira', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/desfile-brasilidade-fashion-03.webp', alt: 'Modelo apresenta jaqueta jeans customizada no desfile Brasilidade Fashion — foto: Ariel Subira', w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/positivamente-2025-tenda-criativa.webp', alt: "Oficina de pintura na Tenda Criativa do Positiva'Mente — foto: Ariel Subira", w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/positivamente-2025-yoga.webp', alt: "Prática de yoga na tenda do Positiva'Mente com o Corcovado ao fundo — foto: Ariel Subira", w: 1600, h: 1067 },
    { src: 'Incentivart/fotos-site/positivamente-2025-bate-papo.webp', alt: "Público acompanha o bate-papo do Positiva'Mente acomodado em puffs — foto: Ariel Subira", w: 1600, h: 1067 }
  ];

  const AUTOPLAY_MS = 5000;
  const SWIPE_THRESHOLD_PX = 40;
  const EAGER_CARDS = 3; // frontal + 2 visíveis atrás carregam sem lazy

  function init() {
    const stack = document.getElementById('hero-stack');
    if (!stack) return;

    const cardsWrap = stack.querySelector('.hero-stack-cards');
    const prevBtn = stack.querySelector('[data-dir="-1"]');
    const nextBtn = stack.querySelector('[data-dir="1"]');
    const dotsWrap = stack.querySelector('.hero-stack-dots');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let current = 0;
    let autoplayTimer = null;

    const cards = HERO_FOTOS.map((foto, i) => {
      const card = document.createElement('figure');
      card.className = 'hero-card is-hidden';

      const img = document.createElement('img');
      img.src = foto.src;
      img.alt = foto.alt;
      img.width = foto.w || 1024;
      img.height = foto.h || 684;
      img.decoding = 'async';
      img.draggable = false;
      if (i >= EAGER_CARDS) img.loading = 'lazy';

      card.appendChild(img);
      cardsWrap.appendChild(card);
      return card;
    });

    const dots = HERO_FOTOS.map((foto, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-stack-dot';
      dot.setAttribute('aria-label', 'Ir para a foto ' + (i + 1) + ' de ' + HERO_FOTOS.length);
      dot.addEventListener('click', () => {
        goTo(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function render() {
      const total = cards.length;
      cards.forEach((card, i) => {
        const offset = (i - current + total) % total;
        card.classList.remove('is-front', 'is-behind-1', 'is-behind-2', 'is-hidden');
        if (offset === 0) card.classList.add('is-front');
        else if (offset === 1) card.classList.add('is-behind-1');
        else if (offset === 2) card.classList.add('is-behind-2');
        else card.classList.add('is-hidden');
        card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function goTo(index) {
      const total = cards.length;
      current = ((index % total) + total) % total;
      render();
    }

    function step(dir) {
      goTo(current + dir);
    }

    // Autoplay: transição automática contínua; pausa em hover e,
    // após interação manual, o cronômetro reinicia (não para de vez).
    // Desativado quando o usuário prefere menos movimento.
    function startAutoplay() {
      if (reduceMotion || autoplayTimer) return;
      autoplayTimer = setInterval(() => step(1), AUTOPLAY_MS);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    prevBtn.addEventListener('click', () => { step(-1); restartAutoplay(); });
    nextBtn.addEventListener('click', () => { step(1); restartAutoplay(); });

    stack.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
        restartAutoplay();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
        restartAutoplay();
      }
    });

    // Swipe/arraste com Pointer Events (touch e mouse)
    let dragStartX = null;

    cardsWrap.addEventListener('pointerdown', (event) => {
      dragStartX = event.clientX;
      // Garante o pointerup mesmo se o arraste sair do card
      if (cardsWrap.setPointerCapture) {
        cardsWrap.setPointerCapture(event.pointerId);
      }
      stopAutoplay();
    });

    cardsWrap.addEventListener('pointerup', (event) => {
      if (dragStartX === null) return;
      const deltaX = event.clientX - dragStartX;
      dragStartX = null;
      if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
        step(deltaX < 0 ? 1 : -1);
      }
      restartAutoplay();
    });

    cardsWrap.addEventListener('pointercancel', () => {
      dragStartX = null;
    });

    stack.addEventListener('mouseenter', stopAutoplay);
    stack.addEventListener('mouseleave', startAutoplay);
    stack.addEventListener('focusin', stopAutoplay);

    render();
    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
