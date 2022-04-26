let telaChamadaSimples = document.querySelector(
  ".criacao-quizz-chamada-simples"
);
let telaChamada = document.querySelector(".criacao-quizz-chamada");
let telaCriacao = document.querySelector(".criacao-quizz");
let telaInformacoesBasicas = document.querySelector(".informacoes-basicas");
let telaCadastroPerguntas = document.querySelector(".perguntas");
let telaCadastroNiveis = document.querySelector(".niveis");
let telaSucessoQuizz = document.querySelector(".sucesso-quizz");
let telaQuizzesUsuario = document.querySelector(".quizzes-usuario");

let todosQuizzes = document.querySelector(".todos-quizzes");

let totalNiveis;
let totalPerguntas;
let totalAlternativas = 1;

let tituloQuizz;
let imgQuizz;

let questions = [];
let levels = [];


//let quizzesId = JSON.parse(localStorage.getItem('id'));
let quizzesId = [];

let sucessoQuizzId;

/* LIBERA TELA CRIAR QUIZZ */
function criarQuizz() {
  telaChamadaSimples.classList.add("none");
  telaChamada.classList.add("none");
  todosQuizzes.classList.add("none");
  telaQuizzesUsuario.classList.add("none");
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
  tituloQuizz = titulo;

  let img = document.querySelector(".quizz-img-url").value;
  imgQuizz = img;

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
          <input class="texto-resposta correta" type="text" placeholder="Resposta correta" required>
          <input class="img-obrigatoria" type="url" placeholder="URL da imagem" required>
          <p>Respostas incorretas</p>
          <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1(Obrigatório)" required>
          <input class="img-obrigatoria" type="url" placeholder="URL da imagem 1 (Obrigatório)" required>
          <input class="resposta-incorreta-opcional" type="text" placeholder="Resposta incorreta 2">
          <input class="img-incorreta-opcional" type="url" placeholder="URL da imagem 2">
          <input class="resposta-incorreta-opcional" type="text" placeholder="Resposta incorreta 3">
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

function verificaImgs(str) {
  let imgs = document.querySelectorAll(str);
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
    totalAlternativas++;
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
          <input class="porcentagem-nivel" type="number" placeholder="% de acerto mínima" required>
          <input class="url-img-nivel" type="url" placeholder="URL da imagem do nível" required>
          <input class="descricao-nivel" type="text" placeholder="Descrição do nível" required>
      </div>
    </div>
    `;
  }
  camposCadastroNiveis.innerHTML += `<a onclick="verificarCamposNivel()" class="criacao-input-submit botao-submit">Finalizar Quizz</a>`;
}

function verificarCamposPergunta() {
  let textoPerguntaValido = verificaTextoPergunta();
  let corValida = verificaFormatoCor();
  let respostaValida = verificarTextoResposta();
  let respostasIncorretasOpcionais = verificaRespostasIncorretasOpcionais();
  let imgObrigatoriasValidas = verificaImgs(".img-obrigatoria");

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
    console.log("textoPerguntaValido" + textoPerguntaValido);
    console.log("corValida" + corValida);
    console.log("respostaValida" + respostaValida);
    console.log("respostasIncorretasOpcionais" + respostasIncorretasOpcionais);
    console.log("imgObrigatoriasValidas" + imgObrigatoriasValidas);
    alert("Preencha os dados corretamente!");
  }
}

function verificaTamanhoTextos(str, n) {
  let perguntas = document.querySelectorAll(str);
  for (let i = 0; i < perguntas.length; i++) {
    if (perguntas[i].value.length < n) {
      return false;
    }
  }
  return true;
}

function verificaPorcentagemNiveis() {
  let porcentagens = document.querySelectorAll(".porcentagem-nivel");
  let nivelZero = false;
  for (let i = 0; i < porcentagens.length; i++) {
    let porcentagem = Number(porcentagens[i].value);
    console.log(porcentagem);
    if (porcentagem < 0 || porcentagem > 100) {
      return false;
    }
    if (porcentagem === 0) {
      nivelZero = true;
    }
  }
  if (nivelZero) {
    return true;
  }
  return false;
}

/*  */

function pegarPerguntas() {
  let perguntas = document.querySelectorAll("form .pergunta");
  for (let i = 0; i < perguntas.length; i++) {
    let pergunta = perguntas[i];
    let inputs = pergunta.querySelectorAll("input");

    let answer = {
      text: "",
      image: "",
      isCorrectAnswer: false,
    };

    let answer2 = {
      text: "",
      image: "",
      isCorrectAnswer: false,
    };

    let answer3 = {
      text: "",
      image: "",
      isCorrectAnswer: false,
    };

    let answer4 = {
      text: "",
      image: "",
      isCorrectAnswer: false,
    };

    let answers = [];

    let question = {
      title: "",
      color: "",
      answers,
    };

    question.title = inputs[0].value;
    question.color = inputs[1].value;

    answer.text = inputs[2].value;
    answer.image = inputs[3].value;
    answer.isCorrectAnswer = true;
    answers.push(answer);

    answer2.text = inputs[4].value;
    answer2.image = inputs[5].value;
    answers.push(answer2);

    if (inputs[6].value !== "") {
      answer3.text = inputs[6].value;
      answer3.image = inputs[7].value;
      answers.push(answer3);
    }
    if (inputs[8].value !== "") {
      answer4.text = inputs[8].value;
      answer4.image = inputs[9].value;
      answers.push(answer4);
    }

    questions.push(question);
  }
}

function pegarNiveis() {
  let niveis = document.querySelectorAll(".nivel");
  for (let i = 0; i < niveis.length; i++) {
    let nivel = niveis[i];
    let inputs = nivel.querySelectorAll("input");

    let level = {
      title: "",
      image: "",
      text: "",
      minValue: 0,
    };

    level.title = inputs[0].value;
    level.image = inputs[2].value;
    level.text = inputs[3].value;
    level.minValue = inputs[1].value;

    levels.push(level);
  }
}

function verificarCamposNivel() {
  let tituloNivel = verificaTamanhoTextos(".texto-titulo-nivel", 10);
  let porcentagemNivel = verificaPorcentagemNiveis();
  let imgUrlNivel = verificaImgs(".url-img-nivel");
  let descricaoNivel = verificaTamanhoTextos(".descricao-nivel", 30);
  /* pegarPerguntas();
  pegarNiveis(); */

  /*  */

  let quizz = {
    title: tituloQuizz,
    image: imgQuizz,
    questions,
    levels,
  };

  function sucessoQuizz(response) {
    localStorage.setItem("id", "[]");

    telaCadastroNiveis.classList.add("none");
    telaSucessoQuizz.classList.remove("none");

    let titulo = telaSucessoQuizz.querySelector(".sucesso-quizz-titulo");
    let img = telaSucessoQuizz.querySelector("img");

    titulo.innerHTML = tituloQuizz;
    img.setAttribute("src", imgQuizz);

    console.log(response.data.id);

    
    quizzesId.push(response.data.id);
    localStorage.setItem("id", JSON.stringify(quizzesId));

    sucessoQuizzId = response.data.id;
  }

  if (tituloNivel && porcentagemNivel && imgUrlNivel && descricaoNivel) {
    pegarPerguntas();
    pegarNiveis();
    let promise = axios.post(
      "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
      quizz
    );

    promise.then(sucessoQuizz);

    console.log(quizz);
  } else {
    alert("Preencha os dados corretamente!");
  }
}

/* PREVENINDO COMPORTAMENTOS PADRÕES */
let botaoSubmit = document.querySelector(".botao-submit");
botaoSubmit.addEventListener("click", function (event) {
  event.preventDefault();
});

function carregaQuizzSucesso() {
  zerarQuizz();
  buscarApenasUmQuizz(sucessoQuizzId);

  document.querySelector(".criacao-quizz").classList.toggle("none");
  document.querySelector(".pagina-quizz").classList.toggle("none");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}
