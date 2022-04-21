let telaChamada = document.querySelector(".criacao-quizz-chamada");
let telaCriacao = document.querySelector(".criacao-quizz");
let telaInformacoesBasicas = document.querySelector(".informacoes-basicas");
let telaCadastroPerguntas = document.querySelector(".perguntas");

let todosQuizzes = document.querySelector(".todos-quizzes");

let totalPerguntas;

/* LIBERA TELA CRIAR QUIZZ */
function criarQuizz() {
  telaChamada.classList.add("none");
  todosQuizzes.classList.add("none");
  telaCriacao.classList.remove("none");
}

/* VERIFICA SE A URL TEM EXTENSÃO DE IMAGEM */
function verificaExtensoes(str) {
  let extensoes = [
    ".jpeg",
    ".JPEG",
    ".jpg",
    ".JPG",
    ".png",
    ".PNG",
    ".svg",
    ".SVG",
    ".ico",
    ".ICO",
    ".jfif",
    ".JFIF",
    ".gif",
    ".GIF",
    ".bmp",
    ".BMP",
    ".psd",
    ".PSD",
    ".exif",
    ".EXIF",
    "tiff",
    ".TIFF",
  ];
  for (let i = 0; i < extensoes.length; i++) {
    if (str.includes(extensoes[i])) {
      return true;
    }
  }
  return false;
}

/* VERIFICA INFORMAÇÕES DE QUIZZ BÁSICAS FORNECIDAS PELO USUÁRIO */
function verificaInformacoesBasicas() {
  let titulo = document.querySelector(".quizz-titulo").value;
  let img = document.querySelector(".quizz-img-url").value;
  let qtdPerguntas = document.querySelector(".quizz-quatidade-perguntas").value;
  let qtdNiveis = document.querySelector(".quizz-quantidade-niveis").value;

  let urlValida = verificaExtensoes(img);
  let tituloValido = titulo.length >= 20;
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

  let camposCadastroPerguntas = telaCadastroPerguntas.querySelector('form');

  for (let i = 1; i <= totalPerguntas; i++) {
    camposCadastroPerguntas.innerHTML += `
    <div class="pergunta">
      <p onclick="mostrarCamposPergunta(this)" class="pergunta-titulo">Pergunta ${i} <img src="static/img/Vector.svg" /></p>
      <div class="none">
          <input type="text" placeholder="Texto da pergunta" required>
          <input type="text" placeholder="Cor de fundo da pergunta" required>
          <p>Resposta correta</p>
          <input type="text" placeholder="Resposta correta" required>
          <input type="url" placeholder="URL da imagem" required>
          <p>Respostas incorretas</p>
          <input type="text" placeholder="Resposta incorreta 1" required>
          <input type="url" placeholder="URL da imagem 1" required>
          <input type="text" placeholder="Resposta incorreta 2">
          <input type="url" placeholder="URL da imagem 2">
          <input type="text" placeholder="Resposta correta 3">
          <input type="url" placeholder="URL da imagem 3">
      </div>
    </div>
    `;
  }
  camposCadastroPerguntas.innerHTML += `<button class="criacao-input-submit botao-submit">Prosseguir para criar níveis</button>`;
}

/* EFEITO DE MOSTRAR E ESCONDER COMPOS DE PERGUNTA */
function mostrarCamposPergunta(elemento) {
  let campos = elemento.parentNode.querySelector("div");
  campos.classList.toggle("none");
}

/* PREVENINDO COMPORTAMENTOS PADRÕES */
let botaoSubmit = document.querySelector(".botao-submit");
botaoSubmit.addEventListener("click", function (event) {
  event.preventDefault();
});
