// Fecha o menu do celular (hambúrguer do tema Nightfall).
// O tema abre o menu com uma caixa de seleção escondida (#side-menu).
// Como os links levam para seções da mesma página, a página não recarrega
// e o menu continuaria aberto. Este script desmarca a caixa ao clicar num link.
(function () {
  var caixa = document.getElementById('side-menu');
  if (!caixa) return;

  function fechar() {
    caixa.checked = false;
  }

  document.querySelectorAll('.headerLinks a').forEach(function (link) {
    link.addEventListener('click', fechar);
  });

  // Tecla Esc também fecha
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fechar();
  });

  // Se a tela crescer (celular girado, janela redimensionada), fecha
  window.matchMedia('(min-width: 769px)').addEventListener('change', fechar);
})();
