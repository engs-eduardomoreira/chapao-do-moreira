let notaEscolhida = 0;
let contador = 0;
const avaliacoes = [];

const escolha = document.getElementById("escolha");
const estrelas = escolha.querySelectorAll("button");
const campoNome = document.getElementById("nome");
const campoComentario = document.getElementById("comentario");
const msg = document.getElementById("msg");
const botaoEnviar = document.getElementById("enviar");
const seletorOrdem = document.getElementById("ordem");
const lista = document.getElementById("lista");

function pintarEscolha(n) {
  for (let i = 0; i < estrelas.length; i++) {
    estrelas[i].classList.toggle("ligada", i < n);
  }
}

function desenharEstrelas(nota) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += '<span class="' + (i <= nota ? "" : "apagada") + '">★</span>';
  }
  return html;
}

function atualizarLista() {
  const modo = seletorOrdem.value;
  const copia = avaliacoes.slice();

  if (modo === "recentes") copia.sort((a, b) => b.ordem - a.ordem);
  if (modo === "maior") copia.sort((a, b) => b.nota - a.nota || b.ordem - a.ordem);
  if (modo === "menor") copia.sort((a, b) => a.nota - b.nota || b.ordem - a.ordem);

  lista.innerHTML = "";

  if (copia.length === 0) {
    lista.textContent = "Ainda não há avaliações. Seja o primeiro a avaliar!";
    return;
  }

  copia.forEach(function (a) {
    const item = document.createElement("div");
    item.className = "av-item";

    const nome = document.createElement("b");
    nome.textContent = a.nome;

    const estrelasItem = document.createElement("div");
    estrelasItem.className = "av-estrelas";
    estrelasItem.innerHTML = desenharEstrelas(a.nota);

    const texto = document.createElement("p");
    texto.textContent = a.texto;

    item.append(nome, estrelasItem, texto);
    lista.appendChild(item);
  });
}

estrelas.forEach(function (botao, i) {
  botao.onclick = function () {
    notaEscolhida = i + 1;
    pintarEscolha(notaEscolhida);
  };
});

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

  contador++;
  avaliacoes.push({ nome: nome || "Cliente", nota: notaEscolhida, texto: texto, ordem: contador });
  atualizarLista();

  campoNome.value = "";
  campoComentario.value = "";
  notaEscolhida = 0;
  pintarEscolha(0);

  msg.className = "ok";
  msg.textContent = "Obrigado! Sua avaliação foi enviada.";
};

seletorOrdem.onchange = atualizarLista;

atualizarLista();