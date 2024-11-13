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
    question: "Qual é o principal objetivo da psicologia escolar e educacional?",
    answers: [
      { answer: "Diagnosticar transtornos de aprendizagem nos estudantes", correct: false },
      { answer: "Promover a adaptação dos estudantes ao ambiente escolar e o desenvolvimento de práticas educacionais inclusivas", correct: true },
      { answer: "Atender apenas aos casos de indisciplina nas escolas", correct: false },
      { answer: "Avaliar exclusivamente a inteligência dos alunos por meio de testes", correct: false }
    ]
  },
  {
    question: "Quais são as práticas comuns dos psicólogos escolares para promover a inclusão no ambiente escolar?",
    answers: [
      { answer: "Realizar apenas avaliações individuais dos alunos", correct: false },
      { answer: "Desenvolver programas de prevenção ao bullying e atividades que valorizem a diversidade", correct: true },
      { answer: "Organizar atividades lúdicas esporadicamente", correct: false },
      { answer: "Somente intervir em casos de distúrbios emocionais graves", correct: false }
    ]
  },
  {
    question: "Qual a principal diferença entre a psicologia escolar e a psicologia educacional?",
    answers: [
      { answer: "A psicologia escolar foca em diagnósticos clínicos, enquanto a psicologia educacional apenas realiza atividades recreativas", correct: false },
      { answer: "A psicologia escolar atua diretamente nas escolas, enquanto a psicologia educacional foca na pesquisa e no desenvolvimento de métodos de ensino", correct: true },
      { answer: "Não há diferença entre as duas áreas", correct: false },
      { answer: "A psicologia educacional é aplicada apenas no ensino superior", correct: false }
    ]
  },
  {
    question: "Qual dessas ações NÃO é uma responsabilidade do psicólogo escolar?",
    answers: [
      { answer: "Orientação e intervenção com alunos com dificuldades de aprendizagem", correct: false },
      { answer: "Desenvolvimento de políticas escolares inclusivas junto à equipe pedagógica", correct: false },
      { answer: "Prescrição de medicamentos para alunos com distúrbios de comportamento", correct: true },
      { answer: "Apoio aos professores para entender as necessidades emocionais dos alunos", correct: false }
    ]
  },
  {
    question: "Qual é o principal foco da Psicologia do Esporte?",
    answers: [
      { answer: "Analisar o desempenho físico dos atletas ao analisar transtornos e encaminhá-lo", correct: false },
      { answer: "Avaliar o talento esportivo inato dos atletas", correct: false },
      { answer: "Compreender como os fatores psicológicos afetam o desempenho físico e como a prática de esportes e exercícios afeta o desenvolvimento psicológico", correct: true },
      { answer: "Desenvolver programas de treino físico em conjunto com a terapia individual para que o atleta tenha capacidade física e mental nos treinos", correct: false }
    ]
  },
  {
    question: "Qual é uma estratégia comum usada por psicólogos do esporte para ajudar atletas a lidarem com a ansiedade antes de uma competição?",
    answers: [
      { answer: "Incentivar o isolamento social", correct: false },
      { answer: "Usar técnicas de visualização e respiração controlada", correct: true },
      { answer: "Aplicar treinos físicos intensivos", correct: false },
      { answer: "Focar exclusivamente no aspecto técnico da modalidade", correct: false }
    ]
  },
  {
    question: "Qual das alternativas a seguir é um papel comum do psicólogo do esporte com equipes?",
    answers: [
      { answer: "Determinar a estratégia de jogo", correct: false },
      { answer: "Avaliar o preparo físico dos jogadores", correct: false },
      { answer: "Facilitar a coesão do grupo e promover a comunicação efetiva entre os membros da equipe", correct: true },
      { answer: "Gerenciar a logística das competições através da personalidade de cada membro", correct: false }
    ]
  },
  {
    question: "Qual dos seguintes fatores NÃO é frequentemente trabalhado na Psicologia do Esporte?",
    answers: [
      { answer: "Controle de ansiedade e estresse", correct: false },
      { answer: "Desenvolvimento de habilidades técnicas motoras", correct: true },
      { answer: "Motivação e autoconfiança", correct: false },
      { answer: "Reabilitação psicológica pós-lesão", correct: false }
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
    button.addEventListener('click', () => checkAnswer(button, answer.correct)); // Passa o botão para alterar a cor
    answersBox.appendChild(button);
  });
}

// Verifica a resposta clicada
function checkAnswer(button, isCorrect) {
  // Altera a cor do botão de resposta
  if (isCorrect) {
    button.style.backgroundColor = "#2eb94c"; // Verde para acerto
  } else {
    button.style.backgroundColor = "#AB3130"; // Vermelho para erro
  }

  if (isCorrect) {
    points++; // Incrementa pontuação
  }

  // Vai para a próxima pergunta ou finaliza o quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => showQuestion(), 500); // Espera meio segundo antes de mostrar a próxima pergunta
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

  // Remover a exibição de ranking
  document.querySelector('#ranking-container').classList.add('hide'); // Esconde o ranking
}

// Oculta o quiz e exibe a pontuação
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// Reinicia o quiz quando o botão "Refazer quizz" é clicado
restartBtn.addEventListener('click', function () {
  hideOrShowQuizz(); // Oculta a tela de resultado e volta ao quiz
  init(); // Reinicia o quiz
});
