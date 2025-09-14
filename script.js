const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

const questions = [
  {
    question: "Qual linguagem é usada para estruturar páginas web?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Qual elemento CSS altera a cor do texto?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background", correct: false }
    ]
  },
  {
    question: "Qual método JS é usado para adicionar um evento?",
    answers: [
      { text: "addEventListener", correct: true },
      { text: "setEvent", correct: false },
      { text: "onClick", correct: false },
      { text: "addEvent", correct: false }
    ]
  },
  {
    question: "Qual símbolo é usado para comentário em JS?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: false },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false }
    ]
  },
  {
    question: "Qual tag HTML define um parágrafo?",
    answers: [
      { text: "<p>", correct: true },
      { text: "<h1>", correct: false },
      { text: "<div>", correct: false },
      { text: "<span>", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hide");
  document.getElementById("quiz").classList.remove("hide");
  nextButton.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreElement.textContent = score;
}

restartBtn.addEventListener("click", startQuiz);
