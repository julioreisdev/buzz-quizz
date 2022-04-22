let telaChamada = document.querySelector(".criacao-quizz-chamada");
let telaCriacao = document.querySelector(".criacao-quizz");
let telaInformacoesBasicas = document.querySelector(".informacoes-basicas");
let telaCadastroPerguntas = document.querySelector(".perguntas");
let telaCadastroNiveis = document.querySelector(".niveis");

let todosQuizzes = document.querySelector(".todos-quizzes");

let totalNiveis;
let totalPerguntas;

/* LIBERA TELA CRIAR QUIZZ */
function criarQuizz() {
  telaChamada.classList.add("none");
  todosQuizzes.classList.add("none");
  telaCriacao.classList.remove("none");
}

/* VERIFICA SE UMA URL É VÁLIDA */
function verificaUrl(str) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

/* VERIFICA INFORMAÇÕES DE QUIZZ BÁSICAS FORNECIDAS PELO USUÁRIO */
function verificaInformacoesBasicas() {
  let titulo = document.querySelector(".quizz-titulo").value;
  let img = document.querySelector(".quizz-img-url").value;
  let qtdPerguntas = document.querySelector(".quizz-quatidade-perguntas").value;
  let qtdNiveis = document.querySelector(".quizz-quantidade-niveis").value;
  totalNiveis = qtdNiveis;

  let urlValida = verificaUrl(img);
  let tituloValido = titulo.length >= 20 && titulo.length <= 65;
  let qtdPerguntasValida = Number(qtdPerguntas) >= 3;
  let qtdNiveisValida = Number(qtdNiveis) >= 2;

  if (tituloValido && urlValida && qtdPerguntasValida && qtdNiveisValida) {
    totalPerguntas = Number(qtdPerguntas);
    renderizarCadastroPerguntas();
  } else {
    alert("Preencha os dados corretamente!");
  }
}

/* RENDERIZAR OS CAMPOS DAS PERGUNTAS PARA CADASTRO */
function renderizarCadastroPerguntas() {
  telaInformacoesBasicas.classList.add("none");
  telaCadastroPerguntas.classList.remove("none");

  let camposCadastroPerguntas = telaCadastroPerguntas.querySelector("form");

  for (let i = 1; i <= totalPerguntas; i++) {
    camposCadastroPerguntas.innerHTML += `
    <div class="pergunta">
      <p onclick="toggleTela(this)" class="pergunta-titulo">Pergunta ${i} <img src="static/img/Vector.svg" /></p>
      <div class="none">
          <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" required>
          <input class="cor-fundo-pergunta" type="text" placeholder="Cor de fundo da pergunta" required>
          <p>Resposta correta</p>
          <input class="texto-resposta" type="text" placeholder="Resposta correta" required>
          <input class="img-obrigatoria" type="url" placeholder="URL da imagem" required>
          <p>Respostas incorretas</p>
          <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1(Obrigatório)" required>
          <input class="img-obrigatoria" type="url" placeholder="URL da imagem 1 (Obrigatório)" required>
          <input class="resposta-incorreta-opcional" type="text" placeholder="Resposta incorreta 2">
          <input class="img-incorreta-opcional" type="url" placeholder="URL da imagem 2">
          <input class="resposta-incorreta-opcional" type="text" placeholder="Resposta correta 3">
          <input class="img-incorreta-opcional" type="url" placeholder="URL da imagem 3">
      </div>
    </div>
    `;
  }
  camposCadastroPerguntas.innerHTML += `<a onclick="verificarCamposPergunta()" class="criacao-input-submit botao-submit">Prosseguir para criar níveis</a>`;
}

/* EFEITO DE MOSTRAR E ESCONDER COMPOS DE PERGUNTA */
function toggleTela(elemento) {
  let campos = elemento.parentNode.querySelector("div");
  campos.classList.toggle("none");
}

function verificaTextoPergunta() {
  let perguntas = document.querySelectorAll(".texto-pergunta");
  for (let i = 0; i < perguntas.length; i++) {
    if (perguntas[i].value.length < 20) {
      return false;
    }
  }
  return true;
}

function verificaFormatoCor() {
  let hexadecimais = "0123456789abcdef";
  let cores = document.querySelectorAll(".cor-fundo-pergunta");

  for (let i = 0; i < cores.length; i++) {
    let cor = cores[i];
    if (cor.value.length !== 7 || cor.value[0] !== "#") {
      return false;
    }
    for (let j = 1; j < cor.value.length; j++) {
      if (hexadecimais.includes(cor.value[j]) === false) {
        return false;
      }
    }
  }
  return true;
}

function verificarTextoResposta() {
  let respostas = document.querySelectorAll(".texto-resposta");

  for (let i = 0; i < respostas.length; i++) {
    let resposta = respostas[i];
    if (resposta.value === "") {
      return false;
    }
  }
  return true;
}

function verificaImgs() {
  let imgs = document.querySelectorAll(".img-obrigatoria");
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    if (verificaUrl(img.value) === false) {
      return false;
    }
  }
  return true;
}

function verificaRespostasIncorretasOpcionais() {
  let respostas = document.querySelectorAll(".resposta-incorreta-opcional");
  let imgs = document.querySelectorAll(".img-incorreta-opcional");

  let status = [];

  for (let i = 0; i < respostas.length; i++) {
    let resposta = respostas[i];
    let img = imgs[i];
    if (resposta.value !== "" || img.value !== "") {
      status.push(resposta.value !== "" && verificaUrl(img.value));
    }
  }

  for (let k = 0; k < status.length; k++) {
    if (status[k] === false) {
      return false;
    }
  }
  return true;
}

/*  */
function cadastroNiveis() {
  let camposCadastroNiveis = telaCadastroNiveis.querySelector("form");

  for (let i = 1; i <= totalNiveis; i++) {
    camposCadastroNiveis.innerHTML += `
    <div class="nivel">
      <p onclick="toggleTela(this)" class="nivel-titulo">Nível ${i} <img src="static/img/Vector.svg" /></p>
      <div class="none">
          <input class="texto-titulo-nivel" type="text" placeholder="Título do nível" required>
          <input class="porcentagem-nivel" type="text" placeholder="% de acerto mínima" required>
          <input class="url-img-nivel" type="url" placeholder="URL da imagem do nível" required>
          <input class="descricao-nivel" type="text" placeholder="Descrição do nível" required>
      </div>
    </div>
    `;
  }
  camposCadastroNiveis.innerHTML += `<a onclick="verificarCamposNiveis()" class="criacao-input-submit botao-submit">Finalizar Quizz</a>`;
}

function verificarCamposPergunta() {
  let textoPerguntaValido = verificaTextoPergunta();
  let corValida = verificaFormatoCor();
  let respostaValida = verificarTextoResposta();
  let respostasIncorretasOpcionais = verificaRespostasIncorretasOpcionais();
  let imgObrigatoriasValidas = verificaImgs();

  if (
    textoPerguntaValido &&
    corValida &&
    respostaValida &&
    respostasIncorretasOpcionais &&
    imgObrigatoriasValidas
  ) {
    telaCadastroPerguntas.classList.add("none");
    telaCadastroNiveis.classList.remove("none");
    cadastroNiveis();
  } else {
    alert("Preencha os dados corretamente!");
  }
}

/* PREVENINDO COMPORTAMENTOS PADRÕES */
let botaoSubmit = document.querySelector(".botao-submit");
botaoSubmit.addEventListener("click", function (event) {
  event.preventDefault();
});
