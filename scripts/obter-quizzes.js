//const todosOsQuizzes = [ { id: 1, title: "Título do quizz", image: "https://http.cat/411.jpg", questions: [ { title: "Título da pergunta 1", color: "#123456", answers: [ { text: "Texto da resposta 1", image: "https://http.cat/411.jpg", isCorrectAnswer: true }, { text: "Texto da resposta 2", image: "https://http.cat/412.jpg", isCorrectAnswer: false } ] }, { title: "Título da pergunta 2", color: "#123456", answers: [ { text: "Texto da resposta 1", image: "https://http.cat/411.jpg", isCorrectAnswer: true }, { text: "Texto da resposta 2", image: "https://http.cat/412.jpg", isCorrectAnswer: false } ] }, { title: "Título da pergunta 3", color: "#123456", answers: [ { text: "Texto da resposta 1", image: "https://http.cat/411.jpg", isCorrectAnswer: true }, { text: "Texto da resposta 2", image: "https://http.cat/412.jpg", isCorrectAnswer: false } ] } ], levels: [ { title: "Título do nível 1", image: "https://http.cat/411.jpg", text: "Descrição do nível 1", minValue: 0 }, { title: "Título do nível 2", image: "https://http.cat/412.jpg", text: "Descrição do nível 2", minValue: 50 } ] } ];
let todosOsQuizzes;

function buscarTodosQuizzes(){
    promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(carregarTodosQuizzes);
    promise.catch(carregarTodosQuizzesErro);
}

function carregarTodosQuizzes(todosOsQuizzes){
    let listaTodosQuizzes = document.querySelector(".lista-quizzes-todos"); 
    listaTodosQuizzes.innerHTML = "";

    todosOsQuizzes = todosOsQuizzes.data;
    console.log(todosOsQuizzes);

    for(i=0; i<todosOsQuizzes.length; i++)
    {
    listaTodosQuizzes.innerHTML += `<div class="lista-quizzes-todos"> <div class="quizz"> <img src="${todosOsQuizzes[i].image}" alt=""> <div class="texto-quizz">${todosOsQuizzes[i].title}</div> </div>`
    }

}

function carregarTodosQuizzesErro(erro){
    alert("Erro ao carregar quizzes, código: " + erro.response.status); 
    setTimeout(reload, 1000);
}

buscarTodosQuizzes();
//carregarTodosQuizzes();