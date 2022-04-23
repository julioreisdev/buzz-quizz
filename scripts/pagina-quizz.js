let quizzClicado;
let containerPerguntas;

function carregarQuizz(quizzUnico){
    quizzClicado = quizzUnico;

    document.querySelector(".pagina-quizz").innerHTML = "";
    
    adicionaBanner(quizzClicado);
    adicionaPerguntas(quizzClicado);

    

}

function clicarResposta(respostaClicada){
    respostaClicada.classList.add("resposta-clicada");
    
    let respostaSelecionada = document.querySelector("resposta-clicada");
}

function adicionaBanner(quizzClicado){
    document.querySelector(".pagina-quizz").innerHTML += `
    <div class="banner-quizz">
    <img src="${quizzClicado.image}" alt="">
    <span class="pagina-quizz-titulo">${quizzClicado.title}</span>
    </div>`;
}


function adicionaPerguntas(quizzClicado){
    //adiciona containers das perguntas
    for(let i = 0; i<quizzClicado.questions.length;i++)
    {
    document.querySelector(".pagina-quizz").innerHTML += `
    <div class="pg-qz-container-pergunta">
    </div>`;
    }

    //adiciona perguntas dentro dos containers
    containerPerguntas = document.querySelectorAll(".pg-qz-container-pergunta");
    for(let i=0; i<quizzClicado.questions.length;i++)
    {
        containerPerguntas[i].innerHTML = `
        <div class="pg-qz-pergunta" style="background-color: ${quizzClicado.questions[i].color}">${quizzClicado.questions[i].title}
        </div>
        <div class="pg-qz-respostas">
        <div class="pg-qz-container-respostas">
        <div class="pg-qz-resposta" onclick="clicarResposta(this)">
            <img src="${quizzClicado.questions[i].answers[0].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[0].text}</div>
        </div>
        <div class="pg-qz-resposta">
            <img src="${quizzClicado.questions[i].answers[1].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[1].text}</div>
        </div>
        </div>
        <div class="pg-qz-container-respostas">
        <div class="pg-qz-resposta">
            <img src="${quizzClicado.questions[i].answers[2].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[2].text}</div>
        </div>
        <div class="pg-qz-resposta">
            <img src="${quizzClicado.questions[i].answers[3].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[3].text}</div>
        </div>
        </div>
        </div>
        `
    }
}
