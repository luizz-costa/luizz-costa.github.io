// Botão "copiar" dos blocos de código: copia o texto do bloco para a área de transferência.
document.querySelectorAll('.codigo-copiar').forEach(function (botao) {
  botao.addEventListener('click', function () {
    var codigo = botao.closest('.codigo').querySelector('pre code');
    var texto = codigo.innerText.replace(/\n$/, '');

    navigator.clipboard.writeText(texto).then(
      function () { botao.textContent = 'copiado'; },
      function () { botao.textContent = 'erro'; }
    );

    setTimeout(function () { botao.textContent = 'copiar'; }, 2000);
  });
});