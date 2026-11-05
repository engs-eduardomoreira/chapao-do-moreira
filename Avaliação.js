let notaEscolhida = 0;
const escolha = document.getElementById("escolha");
const estrelas = escolha.querySelectorAll("button");

function pintarEscolha(n) {
  for (let i = 0; i < estrelas.length; i++) {
    estrelas[i].classList.toggle("ligada", i < n);
  }
}

estrelas.forEach(function (botao, i) {
  botao.onclick = function () {
    notaEscolhida = i + 1;
    pintarEscolha(notaEscolhida);
  };
});