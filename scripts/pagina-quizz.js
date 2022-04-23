let quizzClicado;

function carregarQuizz(quizzUnico){
    quizzClicado = quizzUnico;

    adicionaBanner(quizzClicado);
    let i = 0;

    document.querySelector(".pg-qz-container-pergunta").innerHTML = `
    <div class="pg-qz-pergunta">${quizzClicado.questions[i].title}</div>
    <div class="pg-qz-respostas">
        <div class="pg-qz-container-respostas">
            <div class="pg-qz-resposta" onclick="clicarResposta(this)">
                <img src="https://http.cat/412.jpg" alt="">
                <div class="pg-qz-resposta-titulo">Resposta 1</div>
            </div>
            <div class="pg-qz-resposta">
                <img src="https://http.cat/412.jpg" alt="">
                <div class="pg-qz-resposta-titulo">Resposta 2</div>
            </div>
        </div>
        <div class="pg-qz-container-respostas">
            <div class="pg-qz-resposta">
                <img src="https://http.cat/412.jpg" alt="">
                <div class="pg-qz-resposta-titulo">Resposta 3</div>
            </div>
            <div class="pg-qz-resposta">
                <img src="https://http.cat/412.jpg" alt="">
                <div class="pg-qz-resposta-titulo">Resposta 4</div>
            </div>
        </div>
    </div>`;



    // for(i=0;i<quizzClicado.questions;i++)
    // {
        
    // }
}

function clicarResposta(respostaClicada){
    respostaClicada.classList.add("resposta-clicada");
    
    let respostaSelecionada = document.querySelector("resposta-clicada");
}

function adicionaBanner(quizzClicado){
    document.querySelector(".banner-quizz").innerHTML = `s
    <img src="${quizzClicado.image}" alt="">
    <span class="pagina-quizz-titulo">${quizzClicado.title}</span>`;
}