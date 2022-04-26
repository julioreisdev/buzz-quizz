let todosOsQuizzes;
let quizzUnico;
let objetoQuizzesUsuario = [{}];


function buscarTodosQuizzes(){
    promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(carregarTodosQuizzes);
    promise.catch(carregarQuizzesErro);
}

function buscarApenasUmQuizz(idQuizz){
    promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idQuizz}`);
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
        <img src="${todosOsQuizzes[i].image}" alt="">
        <div class="quizz-id">${todosOsQuizzes[i].id}</div>
        <div class="texto-quizz">${todosOsQuizzes[i].title}</div> 
    </div>`
    }
    carregarQuizzesUsuario(todosOsQuizzes);
}

function filtraQuizzesUsuario(todosOsQuizzes, vetorQuizzesUsuario){

    for(let i=0;i<todosOsQuizzes.length;i++){
        for(let j=0;j<vetorQuizzesUsuario.length;j++){
            if (todosOsQuizzes[i].id === vetorQuizzesUsuario[j]) {
                objetoQuizzesUsuario.push(todosOsQuizzes[i]);
                }
        }
    }
    
    return objetoQuizzesUsuario;
}

function carregarQuizzesUsuario(todosOsQuizzes){
    let vetorQuizzesUsuario = localStorage.getItem("id");
    let listaQuizzesUsuario = document.querySelector(".lista-quizzes-usuario");
    vetorQuizzesUsuario = JSON.parse(vetorQuizzesUsuario);
    listaQuizzesUsuario.innerHTML = "";


    if(vetorQuizzesUsuario !== null )
    {
        if(vetorQuizzesUsuario.length > 0){
            document.querySelector(".criacao-quizz-chamada-simples").classList.remove("none");
            document.querySelector(".criacao-quizz-chamada").classList.add("none");
            let quizzesUsuario = filtraQuizzesUsuario(todosOsQuizzes, vetorQuizzesUsuario);
            quizzesUsuario.shift();
            console.log(quizzesUsuario);


            for(let i=0; i<quizzesUsuario.length; i++)
            {
                console.log(i);
                listaQuizzesUsuario.innerHTML += `
            <div class="quizz" onclick="clicarNoQuizz(this)"> 
                <img src="${quizzesUsuario[i].image}" alt="">
                <div class="quizz-id">${quizzesUsuario[i].id}</div>
                <div class="texto-quizz">${quizzesUsuario[i].title}</div> 
            </div>`
            }
        }
    }else{
        document.querySelector(".criacao-quizz-chamada-simples").classList.toggle("none");
    }
}

function carregarUnicoQuizz(quizzUnico){
    quizzUnico = quizzUnico.data;
    console.log(quizzUnico);
    carregarQuizz(quizzUnico);
}

function carregarQuizzesErro(erro){
    alert("Erro ao carregar quizzes, código: " + erro.response.status); 
    setTimeout(reload, 1000);
}

function clicarNoQuizz(quizzClicado){
    let idClicado = Number(quizzClicado.querySelector(".quizz-id").innerHTML);
    buscarApenasUmQuizz(idClicado);

    document.querySelector(".criacao-quizz-chamada").classList.add("none");
    document.querySelector(".todos-quizzes").classList.toggle("none");

    document.querySelector(".pagina-quizz").classList.toggle("none");

    document.querySelector(".quizzes-usuario").classList.toggle("none");
    document.querySelector(".criacao-quizz-chamada-simples").classList.toggle("none");
    
}

buscarTodosQuizzes();
//carregarQuizzesUsuario();
//buscarApenasUmQuizz(8107);
//carregarTodosQuizzes();