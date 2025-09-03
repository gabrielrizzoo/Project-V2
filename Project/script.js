/**
 * Script principal do site Incentivart
 * Funcionalidades: navegação, formulários, animações e transições
 */

// ================================
// UTILITÁRIOS DE PERFORMANCE
// ================================

/**
 * Função debounce para limitar execução de funções
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
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
 * Função throttle para controlar frequência de execução
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ================================
// NAVEGAÇÃO E MENU
// ================================

/**
 * Marca o link ativo na navegação baseado na página atual
 */
(function marcarLinkAtivo() {
  const page = document.body.getAttribute('data-page');
  const links = document.querySelectorAll('.nav a');
  
  // Usa requestAnimationFrame para melhor performance
  requestAnimationFrame(() => {
    links.forEach(a => {
      const href = a.getAttribute('href');
      if ((page === 'home' && href.includes('index')) ||
          (page && href.includes(page))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  });
})();

/**
 * Funcionalidade do menu mobile
 */
(function menuMobile() {
  const botaoMenu = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const topbar = document.querySelector('.topbar');
  
  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', function() {
      const estaAberto = nav.classList.contains('active');
      
      nav.classList.toggle('active');
      topbar.classList.toggle('menu-open');
      botaoMenu.setAttribute('aria-expanded', String(!estaAberto));
      botaoMenu.setAttribute('aria-label', estaAberto ? 'Abrir menu' : 'Fechar menu');

      // Focus management: when opening, focus first focusable inside nav
      if (!estaAberto) {
        const focusables = nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        focusables[0]?.focus();
        trapFocus(nav);
      } else {
        releaseFocusTrap();
      }
      
      // Previne scroll do body quando menu está aberto
      document.body.style.overflow = estaAberto ? '' : 'hidden';
    });
    
    // Fecha menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (!topbar.contains(e.target) && nav.classList.contains('active')) {
        fecharMenu();
      }
    });
    
    // Fecha menu com tecla Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        fecharMenu();
        botaoMenu.focus();
      }
    });
    
    function fecharMenu() {
      nav.classList.remove('active');
      topbar.classList.remove('menu-open');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
      releaseFocusTrap();
    }
  }
})();

// Small focus trap implementation used for the mobile nav
let _trapCleanup = null;
function trapFocus(container) {
  const focusable = Array.from(container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length -1];

  function handleKey(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.addEventListener('keydown', handleKey);
  _trapCleanup = () => document.removeEventListener('keydown', handleKey);
}

function releaseFocusTrap() {
  if (typeof _trapCleanup === 'function') {
    _trapCleanup();
    _trapCleanup = null;
  }
}

// Add a class to body when user is navigating with keyboard (Tab) to improve focus visuals
;(function keyboardOnlyFocus() {
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }

  function handleMouseDownOnce() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);
})();

// ================================
// FORMULÁRIO DE CONTATO
// ================================

/**
 * Validação e envio do formulário de contato
 */
(function formularioContato() {
  const form = document.getElementById('contatoForm');
  if (!form) return;

  let jaEnviouFormulario = false; // Só mostra erros após primeira tentativa de envio
  
  const campos = form.querySelectorAll('input[required], textarea[required]');
  const botaoEnviar = form.querySelector('button[type="submit"]');
  const checkboxSegmento = form.querySelectorAll('input[name="segmento"]');
  const checkboxTermos = form.querySelector('#termos');
  const textareaMensagem = form.querySelector('#mensagem');
  const contadorMensagem = document.getElementById('mensagem-count');

  /**
   * Atualiza contador de caracteres da mensagem
   */
  function atualizarContadorMensagem() {
    if (textareaMensagem && contadorMensagem) {
      const atual = textareaMensagem.value.length;
      const maximo = parseInt(textareaMensagem.getAttribute('maxlength')) || 800;
      
      contadorMensagem.textContent = atual;
      
      const container = contadorMensagem.closest('.field-counter');
      if (container) {
        container.classList.remove('warning', 'error');
        
        if (atual > maximo * 0.9) {
          container.classList.add('warning');
        }
        if (atual >= maximo) {
          container.classList.add('error');
        }
      }
    }
  }

  // Inicializa contador de caracteres
  if (textareaMensagem) {
    textareaMensagem.addEventListener('input', atualizarContadorMensagem);
    atualizarContadorMensagem(); // Atualiza inicialmente
  }

  /**
   * Valida um campo específico
   * @param {HTMLElement} campo - Elemento do campo a ser validado
   * @returns {boolean} - Se o campo é válido
   */
  function validarCampo(campo) {
    if (!jaEnviouFormulario) return true; // Não valida antes da primeira tentativa
    
    const containerCampo = campo.closest('.field') || campo.closest('label');
    const elementoErro = containerCampo?.querySelector('.error-message');
    let eValido = true;
    let mensagemErro = '';
    
    // Função para sanitizar texto contra XSS
    const sanitizarTexto = (texto) => texto.replace(/[<>\"'&]/g, '');
    
    // Remove estado de erro anterior
    containerCampo?.classList.remove('has-error');
    if (elementoErro) elementoErro.textContent = '';
    
    // Verifica se campo obrigatório está vazio
    if (campo.hasAttribute('required') && !campo.value.trim()) {
      eValido = false;
      const label = campo.labels?.[0]?.textContent?.replace('*', '').trim() || 'Este campo';
      mensagemErro = sanitizarTexto(`${label} é obrigatório.`);
    }
    
    // Validação específica para email
    if (campo.type === 'email' && campo.value.trim()) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(campo.value.trim())) {
        eValido = false;
        mensagemErro = sanitizarTexto('Por favor, insira um e-mail válido.');
      }
    }
    
    // Validação específica para telefone
    if (campo.type === 'tel' && campo.value.trim()) {
      const telefone = campo.value.trim().replace(/\D/g, ''); // Remove não-dígitos
      if (telefone.length < 10 || telefone.length > 11) {
        eValido = false;
        mensagemErro = sanitizarTexto('Telefone deve ter 10 ou 11 dígitos (ex: 21987654321).');
      }
    }
    
    // Mostra erro se campo inválido (usando textContent é seguro contra XSS)
    if (!eValido && containerCampo && elementoErro) {
      containerCampo.classList.add('has-error');
      elementoErro.textContent = mensagemErro;
    }
    
    return eValido;
  }

  /**
   * Valida grupo de checkboxes de segmento
   * @returns {boolean} - Se pelo menos um checkbox está marcado
   */
  function validarSegmento() {
    if (!jaEnviouFormulario) return true;
    
    const algumMarcado = Array.from(checkboxSegmento).some(cb => cb.checked);
    const containerSegmento = document.querySelector('#segmento-error');
    
    if (!algumMarcado) {
      if (containerSegmento) {
        containerSegmento.textContent = 'Selecione pelo menos um segmento cultural.';
        containerSegmento.closest('.field')?.classList.add('has-error');
      }
      return false;
    } else {
      if (containerSegmento) {
        containerSegmento.textContent = '';
        containerSegmento.closest('.field')?.classList.remove('has-error');
      }
      return true;
    }
  }

  /**
   * Valida checkbox de termos
   * @returns {boolean} - Se os termos foram aceitos
   */
  function validarTermos() {
    if (!jaEnviouFormulario) return true;
    
    const containerTermos = document.querySelector('#termos-error');
    
    if (!checkboxTermos?.checked) {
      if (containerTermos) {
        containerTermos.textContent = 'Você deve concordar com os termos e condições.';
        containerTermos.closest('label')?.classList.add('has-error');
      }
      return false;
    } else {
      if (containerTermos) {
        containerTermos.textContent = '';
        containerTermos.closest('label')?.classList.remove('has-error');
      }
      return true;
    }
  }

  /**
   * Valida todo o formulário
   * @returns {boolean} - Se o formulário é válido
   */
  function validarFormulario() {
    let formularioValido = true;
    
    // Valida campos obrigatórios
    campos.forEach(campo => {
      if (!validarCampo(campo)) {
        formularioValido = false;
      }
    });
    
    // Valida segmento cultural
    if (!validarSegmento()) {
      formularioValido = false;
    }
    
    // Valida termos
    if (!validarTermos()) {
      formularioValido = false;
    }
    
    return formularioValido;
  }

  // Adiciona listeners para validação em tempo real (só após primeira tentativa)
  campos.forEach(campo => {
    const validarComDebounce = debounce(() => validarCampo(campo), 300);
    campo.addEventListener('blur', validarComDebounce);
    campo.addEventListener('input', validarComDebounce);
  });

  // Validação para checkboxes de segmento
  checkboxSegmento.forEach(checkbox => {
    checkbox.addEventListener('change', () => validarSegmento());
  });

  // Validação para checkbox de termos
  if (checkboxTermos) {
    checkboxTermos.addEventListener('change', () => validarTermos());
  }

  // Envio do formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    jaEnviouFormulario = true; // Marca que já houve tentativa de envio
    
    // Valida formulário completo
    if (!validarFormulario()) {
      // Foca no primeiro campo com erro
      const primeiroErro = form.querySelector('.has-error input, .has-error textarea');
      if (primeiroErro) {
        primeiroErro.focus();
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Mostra estado de carregamento
    const textoCarregando = botaoEnviar.querySelector('.btn-loading');
    
    botaoEnviar.disabled = true;
    botaoEnviar.classList.add('loading');
    if (textoCarregando) textoCarregando.style.display = 'inline';

    try {
      // Envia formulário via Formspree
      const dadosFormulario = new FormData(form);
      const resposta = await fetch(form.action, {
        method: 'POST',
        body: dadosFormulario,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (resposta.ok) {
        // Sucesso - mostra mensagem e reseta formulário
        mostrarMensagemSucesso();
        form.reset();
        jaEnviouFormulario = false; // Reseta validação
        
        // Remove estados de erro
        form.querySelectorAll('.has-error').forEach(el => {
          el.classList.remove('has-error');
        });
        form.querySelectorAll('.error-message').forEach(el => {
          el.textContent = '';
        });
      } else {
        throw new Error('Erro no envio');
      }
    } catch (erro) {
      console.error('Erro ao enviar formulário:', erro);
      alert('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.');
    } finally {
      // Restaura botão
      botaoEnviar.disabled = false;
      botaoEnviar.classList.remove('loading');
      if (textoCarregando) textoCarregando.style.display = 'none';
    }
  });

  /**
   * Mostra mensagem de sucesso
   */
  function mostrarMensagemSucesso() {
    const mensagemSucesso = document.getElementById('msgOk');
    if (mensagemSucesso) {
      mensagemSucesso.style.display = 'block';
      mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Esconde após 5 segundos
      setTimeout(() => {
        mensagemSucesso.style.display = 'none';
      }, 5000);
    }
  }

  // Verifica se voltou da página de sucesso
  const urlParams = new URLSearchParams(window.location.search);
  const enviado = urlParams.get('enviado');
  
  // Validação rigorosa do parâmetro para prevenir XSS
  if (enviado === '1' || enviado === 'true') {
    mostrarMensagemSucesso();
    // Remove parâmetro da URL de forma segura
    const novaUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, novaUrl);
  }
})();

// ================================
// ANO AUTOMÁTICO NO RODAPÉ
// ================================

/**
 * Atualiza automaticamente o ano no rodapé
 */
(function atualizarAnoRodape() {
  const elementoAno = document.getElementById('year');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
})();

// ================================
// MODAL DOS TERMOS E CONDIÇÕES
// ================================

/**
 * Controla o modal dos termos e condições
 */
(function controlarModalTermos() {
  const linkTermos = document.getElementById('linkTermos');
  const modal = document.getElementById('modalTermos');
  const btnFechar = document.getElementById('btnFecharTermos');
  const btnAceitar = document.getElementById('btnAceitarTermos');
  const modalClose = modal?.querySelector('.modal-close');
  const checkboxTermos = document.getElementById('termos');

  if (!linkTermos || !modal) return;

  // Função para abrir modal
  function abrirModal(event) {
    event.preventDefault();
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Foca no botão fechar para acessibilidade
    setTimeout(() => modalClose?.focus(), 100);
    
    // Previne scroll da página
    document.body.style.overflow = 'hidden';
  }

  // Função para fechar modal
  function fecharModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restaura scroll da página
    document.body.style.overflow = '';
    
    // Retorna foco para o link dos termos
    linkTermos?.focus();
  }

  // Função para aceitar termos
  function aceitarTermos() {
    if (checkboxTermos) {
      checkboxTermos.checked = true;
      
      // Dispara evento de mudança para ativar validação
      checkboxTermos.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    fecharModal();
  }

  // Event listeners
  linkTermos.addEventListener('click', abrirModal);
  btnFechar?.addEventListener('click', fecharModal);
  btnAceitar?.addEventListener('click', aceitarTermos);
  modalClose?.addEventListener('click', fecharModal);

  // Fechar modal com ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      fecharModal();
    }
  });

  // Fechar modal clicando fora
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      fecharModal();
    }
  });
})();

// ================================
// INICIALIZAÇÃO GERAL
// ================================

/**
 * Inicialização e limpeza do estado da página
 */
(function inicializacao() {
  // Remove classes de preload quando JS carrega
  function limparEstadoPreload() {
    const html = document.documentElement;
    html.classList.remove('no-js', 'is-preload');
    html.classList.add('js-ready');
  }

  // Registra Service Worker se disponível
  function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            // Service Worker registrado com sucesso
          })
          .catch((error) => {
            // Falha no registro do Service Worker
          });
      });
    }
  }

  // Executa inicializações
  limparEstadoPreload();
  registrarServiceWorker();
})();
