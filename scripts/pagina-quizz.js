let quizzClicado;
let containerPerguntas;
let containerSelecionado;
let containerClicado;
let respostaSelecionada;
let contadorPergunta = 0;
let acertos = 0;
let erros = 0;

function carregarQuizz(quizzUnico){
    quizzClicado = quizzUnico;

    document.querySelector(".pagina-quizz").innerHTML = "";
    
    adicionaBanner(quizzClicado);
    adicionaPerguntas(quizzClicado);

}

function clicarResposta(respostaClicada){

    containerClicado = respostaClicada.parentElement.parentElement.parentElement;
    let respostas = containerClicado.querySelectorAll(".pg-qz-resposta");
    let respostaCorreta = containerClicado.querySelector(".resposta-certa").parentElement;

    if(containerClicado === containerSelecionado){
        
        if (containerClicado.querySelector(".resposta-clicada") === null){

            for(let i=0; i<respostas.length;i++){
                respostas[i].classList.add("resposta-nao-clicada");
                respostas[i].classList.add("pg-qz-resposta-errada");
            }
            respostaClicada.classList.toggle("resposta-nao-clicada");
            respostaClicada.classList.toggle("resposta-clicada");
            respostaCorreta.classList.toggle("pg-qz-resposta-errada");
            respostaCorreta.classList.toggle("pg-qz-resposta-certa");
            
            setTimeout(proximaPergunta, 2000);
            setTimeout(containerFoco, 2000);

            respostaSelecionada = containerClicado.querySelector(".resposta-clicada");
            let respostaSelecionadaValue = containerClicado.querySelector(".resposta-clicada").querySelector(".resposta-certa").innerHTML;
      
            if (respostaSelecionadaValue == 'true')
            {
              acertos += 1;
              //errosAcertos();
            }else{
              erros += 1;
              //errosAcertos();
            }
        }

    }else{
        containerFoco();
    }



}



function errosAcertos(){
    console.log("Acertos: " + acertos);
    console.log("Erros: " + erros);
}

function proximaPergunta(){
    let quantidadePerguntas = containerPerguntas.length-1;

    if (contadorPergunta === quantidadePerguntas){
        alert("finalizado");
    }else{

        contadorPergunta+=1;
        containerSelecionado = containerPerguntas[contadorPergunta];

    }
}


function containerFoco(){
    
    containerSelecionado.scrollIntoView();

}

function adicionaBanner(quizzClicado){
    document.querySelector(".pagina-quizz").innerHTML += `
    <div class="banner-quizz">
    <img src="${quizzClicado.image}" alt="">
    <span class="pagina-quizz-titulo">${quizzClicado.title}</span>
    </div>`;
}


function embaralharArray(array){
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function adicionaPerguntas(quizzClicado){
    //adiciona containers das perguntas
    for(let i = 0; i<quizzClicado.questions.length;i++)
    {
    document.querySelector(".pagina-quizz").innerHTML += `
    <div class="pg-qz-container-pergunta">
    </div>`;
    }

    //radomiza array de perguntas
    let arr = [0,1,2,3];
    embaralharArray(arr);

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
            <img src="${quizzClicado.questions[i].answers[arr[0]].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[arr[0]].text}</div>
            <div class="resposta-certa">${quizzClicado.questions[i].answers[arr[0]].isCorrectAnswer}</div>
        </div>
        <div class="pg-qz-resposta" onclick="clicarResposta(this)">
            <img src="${quizzClicado.questions[i].answers[arr[1]].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[arr[1]].text}</div>
            <div class="resposta-certa">${quizzClicado.questions[i].answers[arr[1]].isCorrectAnswer}</div>
        </div>
        </div>
        <div class="pg-qz-container-respostas">
        <div class="pg-qz-resposta" onclick="clicarResposta(this)">
            <img src="${quizzClicado.questions[i].answers[arr[2]].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[arr[2]].text}</div>
            <div class="resposta-certa">${quizzClicado.questions[i].answers[arr[2]].isCorrectAnswer}</div>
        </div>
        <div class="pg-qz-resposta" onclick="clicarResposta(this)">
            <img src="${quizzClicado.questions[i].answers[arr[3]].image}" alt="">
            <div class="pg-qz-resposta-titulo">${quizzClicado.questions[i].answers[arr[3]].text}</div>
            <div class="resposta-certa">${quizzClicado.questions[i].answers[arr[3]].isCorrectAnswer}</div>
        </div>
        </div>
        </div>
        `
    }

    containerSelecionado = containerPerguntas[contadorPergunta];
    document.body.scrollTop = document.documentElement.scrollTop = 0;


}
