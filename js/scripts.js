// Declaração de variáveis globais
const nameForm = document.querySelector('#name-form');
const playerNameInput = document.querySelector('#player-name');
const playerDisplayName = document.querySelector('#player-display-name');
const nameContainer = document.querySelector('#name-container');
const questionElement = document.querySelector('#question-text');
const questionNumberElement = document.querySelector('#question-number');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const restartBtn = document.querySelector('#restart');
const rankingList = document.querySelector('#ranking-list');

let playerName = '';
let points = 0;
let currentQuestionIndex = 0;
let questions = [
  {
    question: "O que é Psicologia?",
    answers: [
      { answer: "Estudo da mente e comportamento", correct: true },
      { answer: "Estudo de números", correct: false },
      { answer: "Estudo de animais", correct: false },
      { answer: "Estudo de astros", correct: false }
    ]
  },
  {
    question: "Quem é considerado o pai da psicanálise?",
    answers: [
      { answer: "Sigmund Freud", correct: true },
      { answer: "Carl Rogers", correct: false },
      { answer: "Jean Piaget", correct: false },
      { answer: "B.F. Skinner", correct: false }
    ]
  },
  {
    question: "Qual é o foco principal da psicologia comportamental?",
    answers: [
      { answer: "Pensamentos inconscientes", correct: false },
      { answer: "Comportamentos observáveis", correct: true },
      { answer: "Sonhos e memórias", correct: false },
      { answer: "Experiências espirituais", correct: false }
    ]
  },
  {
    question: "Quem desenvolveu a teoria do condicionamento clássico?",
    answers: [
      { answer: "Sigmund Freud", correct: false },
      { answer: "Ivan Pavlov", correct: true },
      { answer: "Carl Jung", correct: false },
      { answer: "Albert Bandura", correct: false }
    ]
  },
  {
    question: "O que é 'cognição' na psicologia?",
    answers: [
      { answer: "Processos mentais envolvidos no conhecimento", correct: true },
      { answer: "Respostas emocionais", correct: false },
      { answer: "Reações fisiológicas", correct: false },
      { answer: "Movimentos físicos", correct: false }
    ]
  },
  {
    question: "Qual psicólogo é conhecido pela hierarquia das necessidades?",
    answers: [
      { answer: "Abraham Maslow", correct: true },
      { answer: "B.F. Skinner", correct: false },
      { answer: "Erik Erikson", correct: false },
      { answer: "John Watson", correct: false }
    ]
  },
  {
    question: "Qual a principal função dos neurotransmissores no cérebro?",
    answers: [
      { answer: "Transmitir impulsos elétricos", correct: true },
      { answer: "Gerar energia celular", correct: false },
      { answer: "Regenerar células cerebrais", correct: false },
      { answer: "Controlar o fluxo sanguíneo", correct: false }
    ]
  },
  {
    question: "O que é um transtorno de ansiedade?",
    answers: [
      { answer: "Estado mental relacionado ao excesso de preocupações e medos", correct: true },
      { answer: "Perda total de memória", correct: false },
      { answer: "Dificuldade em processar emoções", correct: false },
      { answer: "Falta de habilidade motora", correct: false }
    ]
  },
  {
    question: "Qual desses é um transtorno do humor?",
    answers: [
      { answer: "Transtorno Bipolar", correct: true },
      { answer: "Esquizofrenia", correct: false },
      { answer: "Transtorno obsessivo-compulsivo (TOC)", correct: false },
      { answer: "Transtorno de Personalidade Borderline", correct: false }
    ]
  },
  {
    question: "Qual é o principal foco da terapia cognitivo-comportamental (TCC)?",
    answers: [
      { answer: "Modificar pensamentos e comportamentos disfuncionais", correct: true },
      { answer: "Interpretar sonhos", correct: false },
      { answer: "Investigar memórias reprimidas", correct: false },
      { answer: "Estimular criatividade artística", correct: false }
    ]
  }
];
let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

// Manipula o envio do formulário e inicia o quiz
nameForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita reload da página
  playerName = playerNameInput.value.trim();
  
  if (playerName) {
    playerDisplayName.textContent = playerName; // Exibe o nome no final do quiz
    nameContainer.classList.add('hide'); // Esconde o formulário de nome
    document.querySelector('main').classList.remove('hide'); // Mostra o quiz
    init(); // Inicia o quiz
  }
});

// Função de inicialização do quiz
function init() {
  points = 0; // Reseta pontuação
  currentQuestionIndex = 0; // Reseta pergunta
  showQuestion();
}

// Função para exibir a pergunta atual
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Atualiza número da pergunta e texto
  questionNumberElement.textContent = currentQuestionIndex + 1;
  questionElement.textContent = currentQuestion.question;

  // Limpa respostas anteriores
  answersBox.innerHTML = '';

  // Gera as opções de resposta
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerHTML = `<span class="btn-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="question-answer">${answer.answer}</span>`;
    button.classList.add('answer-btn');
    button.addEventListener('click', () => checkAnswer(answer.correct));
    answersBox.appendChild(button);
  });
}

// Verifica a resposta clicada
function checkAnswer(isCorrect) {
  if (isCorrect) {
    points++; // Incrementa pontuação
  }

  // Vai para a próxima pergunta ou finaliza o quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showSuccessMessage(); // Mostra tela final com pontuação
  }
}

// Exibe a mensagem de sucesso e a pontuação final
function showSuccessMessage() {
  hideOrShowQuizz();

  // Calcula a pontuação final em porcentagem
  const score = ((points / questions.length) * 100).toFixed(2);
  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  // Atualiza o número de perguntas corretas e total de perguntas
  const correctAnswers = document.querySelector('#correct-answers');
  const questionsQty = document.querySelector('#questions-qty');
  correctAnswers.textContent = points;
  questionsQty.textContent = questions.length;

  // Atualiza o ranking
  updateRanking(playerName, points);

  // Exibe o ranking
  displayRanking();
  document.querySelector('#ranking-container').classList.remove('hide'); // Mostrar ranking após exibir a pontuação
}

// Oculta o quiz e exibe a pontuação
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// Atualiza o ranking e salva no localStorage
function updateRanking(name, points) {
  ranking.push({ name, points });
  ranking.sort((a, b) => b.points - a.points); // Ordena por pontuação
  localStorage.setItem('ranking', JSON.stringify(ranking)); // Armazena no localStorage
}

// Exibe o ranking atualizado
function displayRanking() {
  rankingList.innerHTML = ''; // Limpa o ranking atual

  ranking.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${player.name} - ${player.points} pontos`;
    rankingList.appendChild(listItem);
  });
}

// Reinicia o quiz quando o botão "Refazer quizz" é clicado
restartBtn.addEventListener('click', function () {
  hideOrShowQuizz(); // Oculta a tela de resultado e volta ao quiz
  init(); // Reinicia o quiz
});
