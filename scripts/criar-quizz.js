let telaChamada = document.querySelector(".criacao-quizz-chamada");
let telaCriacao = document.querySelector(".criacao-quizz");

/* LIBERA TELA CRIAR QUIZZ */
function criarQuizz() {
  telaChamada.classList.add("none");
  telaCriacao.classList.remove("none");
}

/* VERIFICA SE A URL TEM EXTENSÃO DE IMAGEM */
function verificaExtensoes(str) {
    let extensoes = [
        '.jpeg', '.JPEG',
        '.jpg', '.JPG',
        '.png', '.PNG',
        '.svg', '.SVG',
        '.ico', '.ICO',
        '.jfif', '.JFIF',
        '.gif', '.GIF',
        '.bmp', '.BMP',
        '.psd', '.PSD',
        '.exif', '.EXIF',
        'tiff', '.TIFF'
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
    console.log("Válido");
  }
  else {
      alert('Preencha os dados corretamente!');
  }
}

/* EFEITO DE MOSTRAR E ESCONDER COMPOS DE PERGUNTA */
function mostrarCamposPergunta(elemento) {
  let campos = elemento.parentNode.querySelector("div");
  campos.classList.toggle("none");
}

/* PREVENINDO COMPORTAMENTOS PADRÕES */
let botaoSubmitInfoBasica = document.querySelector('.submit-info-basica');
botaoSubmitInfoBasica.addEventListener('click', function(event) {
  event.preventDefault();
});