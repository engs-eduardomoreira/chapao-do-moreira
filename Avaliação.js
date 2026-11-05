let notaEscolhida = 0;
let contador = 0;
const avaliacoes = [];

const caixaResumo = document.getElementById("resumo");
const campoMedia = document.getElementById("media");
const campoMediaEstrelas = document.getElementById("mediaEstrelas");
const campoTotal = document.getElementById("total");
const campoBarras = document.getElementById("barras");

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

function atualizarResumo(animar) {
  const total = avaliacoes.length;
  let soma = 0;
  const contagem = [0, 0, 0, 0, 0, 0];

  avaliacoes.forEach(function (a) {
    soma += a.nota;
    contagem[a.nota]++;
  });

  const media = total ? soma / total : 0;
  campoMedia.textContent = media.toFixed(1).replace(".", ",");
  campoMediaEstrelas.innerHTML = desenharEstrelas(Math.round(media));
  campoTotal.textContent = total + (total === 1 ? " avaliação" : " avaliações");

  campoBarras.innerHTML = "";
  for (let n = 5; n >= 1; n--) {
    const porcentagem = total ? (contagem[n] / total) * 100 : 0;

    const linha = document.createElement("div");
    linha.className = "av-linha";
    linha.innerHTML =
      "<span>" + n + "★</span>" +
      '<div class="av-trilho"><div class="av-preenchido" style="width:' + porcentagem + '%"></div></div>' +
      '<span class="av-num">' + contagem[n] + "</span>";
    campoBarras.appendChild(linha);
  }

  if (animar) {
    caixaResumo.classList.remove("pulsar");
    void caixaResumo.offsetWidth;
    caixaResumo.classList.add("pulsar");
  }
}

function atualizarLista(idNovo) {
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
    item.className = "av-item" + (a.ordem === idNovo ? " nova" : "");

    const avatar = document.createElement("div");
    avatar.className = "av-avatar";
    avatar.textContent = a.nome.charAt(0).toUpperCase();

    const conteudo = document.createElement("div");

    const nome = document.createElement("b");
    nome.textContent = a.nome;

    const quando = document.createElement("span");
    quando.className = "av-quando";
    quando.textContent = a.data;

    const estrelasItem = document.createElement("div");
    estrelasItem.className = "av-estrelas";
    estrelasItem.innerHTML = desenharEstrelas(a.nota);

    const texto = document.createElement("p");
    texto.textContent = a.texto;

    conteudo.append(nome, quando, estrelasItem, texto);
    item.append(avatar, conteudo);
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
  avaliacoes.push({
    nome: nome || "Cliente",
    nota: notaEscolhida,
    texto: texto,
    data: new Date().toLocaleDateString("pt-BR"),
    ordem: contador
  });

  atualizarLista(contador);
  atualizarResumo(true);

  campoNome.value = "";
  campoComentario.value = "";
  notaEscolhida = 0;
  pintarEscolha(0);

  msg.className = "ok";
  msg.textContent = "Obrigado! Sua avaliação foi enviada.";
};

seletorOrdem.onchange = function () {
  atualizarLista();
};

atualizarResumo(false);
atualizarLista();