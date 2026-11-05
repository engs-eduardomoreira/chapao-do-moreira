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

const avaliacoes = [];

const campoNome = document.getElementById("nome");
const campoComentario = document.getElementById("comentario");
const msg = document.getElementById("msg");
const botaoEnviar = document.getElementById("enviar");

botaoEnviar.onclick = function () {
  const nome = campoNome.value.trim();
  const texto = campoComentario.value.trim();
  msg.className = "";

  if (notaEscolhida === 0) {
    msg.textContent = "Escolha uma nota de 1 a 5 estrelas.";
    return;
  }

  if (texto.length < 5) {
    msg.textContent = "Escreva um comentário curto sobre sua visita.";
    return;
  }

  avaliacoes.push({ nome: nome || "Cliente", nota: notaEscolhida, texto: texto });
  console.log(avaliacoes);

  campoNome.value = "";
  campoComentario.value = "";
  notaEscolhida = 0;
  pintarEscolha(0);

  msg.className = "ok";
  msg.textContent = "Obrigado! Sua avaliação foi enviada.";
};