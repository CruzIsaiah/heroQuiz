const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictureElement = document.getElementById("picture");

let shuffledQuestions, currentQuestionIndex;
let score = {
  villain: 0,
  civilian: 0,
  edgelord: 0,
  hero: 0,
};

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  // Shuffle the answer choices randomly
  const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.dataset.role = answer.role;
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const role = selectedButton.dataset.role;
  updateScore(role);
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    showResult();
  }
}

function updateScore(role) {
  if (role) {
    score[role]++;
  }
}

function showResult() {
  // Hide the answer buttons
  answerButtonsElement.classList.add("hide");

  const roles = {
    hero: {
      name: "Hero",
      description:
        "You are the epitome of bravery and selflessness. You always strive to help others and stand up for what's right.",
    },
    villain: {
      name: "Villain",
      description:
        "You enjoy chaos and causing trouble. You embrace your darker side and have your own agenda that goes against societal norms.",
    },
    edgelord: {
      name: "Edgelord",
      description:
        "You're mysterious and have a brooding personality. You prefer to keep to yourself and tend to question authority and conventional thinking.",
    },
    civilian: {
      name: "Civilian",
      description:
        "You're an everyday person just trying to live a normal life. You prefer to avoid conflicts and focus on your own well-being and relationships.",
    },
  };

  const appendIsh = (role) => (score[role] < 3 ? `${role}-ish` : `the ${role}`);

  const result =
    score.hero >= score.villain &&
    score.hero >= score.edgelord &&
    score.hero >= score.civilian
      ? roles.hero
      : score.villain >= score.hero &&
        score.villain >= score.edgelord &&
        score.villain >= score.civilian
      ? roles.villain
      : score.edgelord >= score.hero &&
        score.edgelord >= score.villain &&
        score.edgelord >= score.civilian
      ? roles.edgelord
      : roles.civilian;

  // Add a CSS class to the body element based on the selected role
  document.body.classList.add(result.name.toLowerCase());

  const roleName = appendIsh(result.name.toLowerCase());

  questionElement.innerText = `You're ${roleName}!`;

  // Create a new paragraph element for the description
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = result.description;
  questionElement.appendChild(descriptionElement);

  // Update the "Next" button
  nextButton.innerText = "Show Score";
  nextButton.classList.remove("hide");
  nextButton.removeEventListener("click", setNextQuestion);
  nextButton.addEventListener("click", showScore);
}

function showScore() {
  // Remove the click event listener from the "Next" button
  nextButton.removeEventListener("click", showScore);

  // Show the final score
  const scoreText = `Hero: ${score.hero}<br>Villain: ${score.villain}<br>Edgelord: ${score.edgelord}<br>Civilian: ${score.civilian}`;
  questionElement.innerHTML = scoreText;
  nextButton.innerText = "Restart";
  nextButton.addEventListener("click", restartGame);
}

function restartGame() {
  nextButton.removeEventListener("click", restartGame);
  score = {
    villain: 0,
    civilian: 0,
    edgelord: 0,
    hero: 0,
  };

  // Remove the CSS class from the body element
  document.body.className = "";

  setNextQuestion();
}

function showPicture() {
  pictureElement.style.display = "block";
}

nextButton.addEventListener("click", showPicture);
// Hide the picture initially
pictureElement.style.display = "none";

const questions = [
  {
    question: "If someone's in trouble, what are you more likely to do?",
    answers: [
      {
        text: "Laugh because you're the reason they're in trouble",
        role: "villain",
      },
      {
        text: "Call for help, maybe someone nearby will hear",
        role: "civilian",
      },
      { text: "You don't care, but someone will pay", role: "edgelord" },
      { text: "Spring into action, there's no time to waste", role: "hero" },
    ],
  },
  {
    question:
      "You're training and you are struggling to adapt to a difficult routine, what best describes your mindset?",
    answers: [
      {
        text: "To be the strongest so no one can stop you",
        role: "villain",
      },
      { text: "I wouldn't train, I don't like to fight", role: "civilian" },
      { text: "I don't need to train, I'm naturally gifted", role: "edgelord" },
      { text: "I can't give up, people are counting on me", role: "hero" },
    ],
  },
  {
    question: "What is the motivation for doing what you do?",
    answers: [
      { text: "To create chaos of course", role: "villain" },
      { text: "I want to provide for my family", role: "civilian" },
      {
        text: "If I told you, you wouldn't understand",
        role: "edgelord",
      },
      { text: "To help all people in need", role: "hero" },
    ],
  },
  {
    question: "What is your preferred tool?",
    answers: [
      { text: "Poison or anything sharp", role: "villain" },
      {
        text: "My lawnmower. I like to keep my yard maintained.",
        role: "civilian",
      },
      { text: "I don't need any tools to win a fight", role: "edgelord" },
      { text: "The only tool we need is friendship", role: "hero" },
    ],
  },
  {
    question: "What is the best way to prepare for a test?",
    answers: [
      {
        text: "I just sit next to the smart kid in class 👀",
        role: "villain",
      },
      {
        text: "Study I think, but probably just watch TV instead",
        role: "civilian",
      },
      {
        text: "I don't need to study, naturally gifted",
        role: "edgelord",
      },
      { text: "Studying hard and asking questions when needed", role: "hero" },
    ],
  },
];
