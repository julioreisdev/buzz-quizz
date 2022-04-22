let todosOsQuizzes;
let quizzUnico;

function buscarTodosQuizzes(){
    promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(carregarTodosQuizzes);
    promise.catch(carregarQuizzesErro);
}

function buscarApenasUmQuizz(idQuizz){
    promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    promise.then(carregarUnicoQuizz);
    promise.catch(carregarQuizzesErro);
}

function carregarTodosQuizzes(todosOsQuizzes){
    let listaTodosQuizzes = document.querySelector(".lista-quizzes-todos"); 
    listaTodosQuizzes.innerHTML = "";

    todosOsQuizzes = todosOsQuizzes.data;
    console.log(todosOsQuizzes);

    for(i=0; i<todosOsQuizzes.length; i++)
    {
    listaTodosQuizzes.innerHTML += `
    <div class="quizz" onclick="clicarNoQuizz(this)"> 
        <div class="quizz"> <img src="${todosOsQuizzes[i].image}" alt="">
        <div class="quizz-id">${todosOsQuizzes[i].id}</div>
        <div class="texto-quizz">${todosOsQuizzes[i].title}</div> 
    </div>`
    }

}

function carregarUnicoQuizz(quizzUnico){
    quizzUnico = quizzUnico.data;
    console.log(quizzUnico);
}

function carregarQuizzesErro(erro){
    alert("Erro ao carregar quizzes, código: " + erro.response.status); 
    setTimeout(reload, 1000);
}

function clicarNoQuizz(quizzClicado){
    let idClicado = Number(quizzClicado.querySelector(".quizz-id").innerHTML);
    buscarApenasUmQuizz(idClicado);

    document.querySelector(".criacao-quizz-chamada").classList.toggle("none");
    document.querySelector(".todos-quizzes").classList.toggle("none");

    document.querySelector(".pagina-quizz").classList.toggle("none");
}

buscarTodosQuizzes();
//buscarApenasUmQuizz(8107);
//carregarTodosQuizzes();