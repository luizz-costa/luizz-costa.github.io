// Comportamentos do menu do cabeçalho.
(function () {
  // ---------- 1. Fecha o menu do celular ao tocar num link ----------
  // O tema abre o menu com uma caixa de seleção escondida (#side-menu).
  // Como os links levam para seções da mesma página, a página não recarrega
  // e o menu continuaria aberto. Aqui a caixa é desmarcada ao clicar num link.
  var caixa = document.getElementById('side-menu');

  function fecharMenu() {
    if (caixa) caixa.checked = false;
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('.headerLinks a'));

  links.forEach(function (link) {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharMenu();
  });

  window.matchMedia('(min-width: 769px)').addEventListener('change', fecharMenu);

  // ---------- 2. Destaca a seção que está na tela (menu e prompt) ----------
  // Cada link aponta para uma seção (#sobre, #trajetoria...). A seção "atual"
  // é a que está passando por uma linha imaginária a 40% da altura da tela.
  // O link dessa seção ganha a classe "ativo" (cor âmbar, definida no CSS).
  var itens = links
    .map(function (link) {
      var id = new URL(link.href, location.href).hash.slice(1);
      var secao = id && document.getElementById(id);
      return secao ? { link: link, secao: secao, id: id } : null;
    })
    .filter(Boolean);

  if (!itens.length) return;

  // O caminho do prompt (o "~" em luiz@homelab:~$) acompanha a seção,
  // como se a página desse "cd" em cada uma: luiz@homelab:~/projetos$
  var caminho = document.querySelector('.prompt-path');

  function marcar(ativo) {
    if (caminho) caminho.textContent = ativo ? '~/' + ativo.id : '~';

    itens.forEach(function (item) {
      var eAtivo = item === ativo;
      item.link.classList.toggle('ativo', eAtivo);
      if (eAtivo) {
        item.link.setAttribute('aria-current', 'location');
      } else {
        item.link.removeAttribute('aria-current');
      }
    });
  }

  function atualizar() {
    var linha = window.innerHeight * 0.4;
    var noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    // No fim da página, a última seção (contato) fica ativa,
    // mesmo sendo curta demais para alcançar a linha.
    if (noFim) {
      marcar(itens[itens.length - 1]);
      return;
    }

    var ativo = null;
    itens.forEach(function (item) {
      var r = item.secao.getBoundingClientRect();
      if (r.top <= linha && r.bottom > linha) ativo = item;
    });

    // Seções que não estão no menu (tecnologias, certificados)
    // e a apresentação no topo deixam todos os itens brancos.
    marcar(ativo);
  }

  // Recalcula no máximo uma vez por quadro de animação, para não pesar
  var agendado = false;
  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () {
      agendado = false;
      atualizar();
    });
  }

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  atualizar();
})();
