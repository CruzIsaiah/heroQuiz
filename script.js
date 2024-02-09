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
    question: "What is your motivation for doing what you do?",
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
  // Additional questions for each archetype
  {
    question: "How do you react when someone stands in the way of your goals?",
    answers: [
      {
        text: "I'll do whatever it takes to remove them as a threat, no matter the cost.",
        role: "villain",
      },
      {
        text: "I'll try to manipulate or deceive them to achieve my objectives.",
        role: "villain",
      },
      {
        text: "I'll assess the situation and determine if it's worth compromising or finding an alternative solution.",
        role: "hero",
      },
      {
        text: "I'll consider their perspective and attempt to negotiate or find common ground.",
        role: "civilian",
      },
    ],
  },
  {
    question: "What's your approach to gaining power or influence?",
    answers: [
      {
        text: "I believe in seizing power through force and intimidation.",
        role: "villain",
      },
      {
        text: "I prefer to manipulate situations to my advantage, controlling others from behind the scenes.",
        role: "villain",
      },
      {
        text: "I focus on building alliances and leveraging my resources strategically.",
        role: "hero",
      },
      {
        text: "I aim to inspire and lead others through charisma and persuasion.",
        role: "hero",
      },
    ],
  },
  {
    question: "How do you handle conflicts in your personal relationships?",
    answers: [
      {
        text: "I strive to maintain harmony and resolve conflicts through open communication and compromise.",
        role: "civilian",
      },
      {
        text: "I avoid confrontation and prioritize keeping the peace, even if it means sacrificing my own needs.",
        role: "civilian",
      },
      {
        text: "I seek advice from friends or family members to help navigate difficult situations.",
        role: "hero",
      },
      {
        text: "I confront issues directly, addressing them head-on to find a resolution.",
        role: "hero",
      },
    ],
  },
  {
    question:
      "What's your response to unexpected challenges in your daily life?",
    answers: [
      {
        text: "I adapt quickly, finding creative solutions to overcome obstacles.",
        role: "hero",
      },
      {
        text: "I seek support from loved ones or seek professional assistance if necessary.",
        role: "civilian",
      },
      {
        text: "I may feel overwhelmed initially but ultimately find a way to cope and move forward.",
        role: "civilian",
      },
      {
        text: "I view challenges as opportunities for growth and embrace them with a positive attitude.",
        role: "hero",
      },
    ],
  },
  {
    question: "What's your idea of a good time?",
    answers: [
      {
        text: "Pulling elaborate pranks on unsuspecting victims.",
        role: "villain",
      },
      {
        text: "Attending lively parties and social events.",
        role: "edgelord",
      },
      {
        text: "Exploring abandoned places and seeking thrills.",
        role: "edgelord",
      },
      {
        text: "Engaging in intellectual debates and mind games.",
        role: "hero",
      },
    ],
  },
  {
    question: "What's your attitude towards change and uncertainty?",
    answers: [
      {
        text: "I embrace it wholeheartedly and seek out new experiences.",
        role: "edgelord",
      },
      {
        text: "I prefer stability and avoid unnecessary risks.",
        role: "civilian",
      },
      {
        text: "I cautiously approach change, weighing the potential benefits and drawbacks.",
        role: "hero",
      },
      {
        text: "I thrive in unpredictable environments and adapt quickly to new situations.",
        role: "villain",
      },
    ],
  },
  {
    question: "How do you express your individuality or uniqueness?",
    answers: [
      {
        text: "I challenge societal norms and conventions, embracing alternative lifestyles or beliefs.",
        role: "edgelord",
      },
      {
        text: "I cultivate an aura of mystery and intrigue, often keeping my true thoughts and feelings hidden.",
        role: "edgelord",
      },
      {
        text: "I express myself through unconventional art forms or creative outlets.",
        role: "villain",
      },
      {
        text: "I reject mainstream culture and seek out niche interests that resonate with my identity.",
        role: "hero",
      },
    ],
  },
  {
    question: "What drives your skepticism or cynicism towards authority?",
    answers: [
      {
        text: "I believe those in power are inherently corrupt and seek to exploit others for personal gain.",
        role: "villain",
      },
      {
        text: "I question the motives and intentions of authority figures, preferring to rely on my own judgment.",
        role: "edgelord",
      },
      {
        text: "I've had negative experiences with authority in the past, leading me to distrust their actions.",
        role: "hero",
      },
      {
        text: "I perceive authority as restrictive and oppressive, stifling individual freedom and expression.",
        role: "civilian",
      },
    ],
  },
  // Additional questions

  {
    question: "What would you do if you witnessed a crime being committed?",
    answers: [
      {
        text: "I would join in or assist the criminal if it benefits me.",
        role: "villain",
      },
      {
        text: "I would report the crime to the authorities and provide any information I have.",
        role: "civilian",
      },
      {
        text: "I would observe from a distance and assess the situation before taking action.",
        role: "edgelord",
      },
      {
        text: "I would intervene immediately to stop the crime and help the victim.",
        role: "hero",
      },
    ],
  },
  {
    question:
      "How do you react when someone challenges your beliefs or opinions?",
    answers: [
      {
        text: "I become defensive and may resort to aggression to defend my views.",
        role: "villain",
      },
      {
        text: "I engage in respectful debate and try to understand the opposing perspective.",
        role: "hero",
      },
      {
        text: "I withdraw and keep my opinions to myself, avoiding confrontation.",
        role: "civilian",
      },
      {
        text: "I question my own beliefs and may reconsider them if presented with compelling arguments.",
        role: "edgelord",
      },
    ],
  },
  {
    question: "What's your approach to dealing with injustice or unfairness?",
    answers: [
      {
        text: "I exploit the situation for my own benefit, regardless of its impact on others.",
        role: "villain",
      },
      {
        text: "I speak out against injustice and advocate for fairness and equality.",
        role: "hero",
      },
      {
        text: "I avoid getting involved and focus on maintaining my own sense of equilibrium.",
        role: "civilian",
      },
      {
        text: "I analyze the situation and may take unconventional or rebellious actions to address the injustice.",
        role: "edgelord",
      },
    ],
  },
  {
    question:
      "How do you handle secrets or confidential information entrusted to you?",
    answers: [
      {
        text: "I may use the information for personal gain or as leverage against others.",
        role: "villain",
      },
      {
        text: "I uphold confidentiality and only share information when necessary and appropriate.",
        role: "civilian",
      },
      {
        text: "I keep the information to myself, using it as a source of power or knowledge.",
        role: "edgelord",
      },
      {
        text: "I honor the trust placed in me and protect the confidentiality of sensitive information.",
        role: "hero",
      },
    ],
  },
  {
    question: "What's your preferred method of relaxation?",
    answers: [
      {
        text: "Indulging in luxurious comforts and pampering myself.",
        role: "villain",
      },
      {
        text: "Spending quality time with loved ones and enjoying simple pleasures.",
        role: "civilian",
      },
      {
        text: "Exploring my inner thoughts and emotions through introspection.",
        role: "edgelord",
      },
      {
        text: "Engaging in adventurous activities and seeking adrenaline rushes.",
        role: "hero",
      },
    ],
  },
  {
    question:
      "How do you approach decision-making in high-pressure situations?",
    answers: [
      {
        text: "I trust my instincts and make quick decisions based on gut feelings.",
        role: "edgelord",
      },
      {
        text: "I analyze the situation carefully, weighing all possible outcomes before taking action.",
        role: "hero",
      },
      {
        text: "I manipulate circumstances to ensure the outcome aligns with my desires.",
        role: "villain",
      },
      {
        text: "I seek advice from trusted allies or mentors to guide my choices.",
        role: "civilian",
      },
    ],
  },
  {
    question: "How do you handle failure or setbacks?",
    answers: [
      {
        text: "I refuse to accept failure and will do whatever it takes to overcome obstacles.",
        role: "hero",
      },
      {
        text: "I view setbacks as opportunities for learning and growth, adapting my approach accordingly.",
        role: "civilian",
      },
      {
        text: "I blame external factors or other individuals for my failures, avoiding personal responsibility.",
        role: "villain",
      },
      {
        text: "I retreat into solitude, reflecting on my mistakes and seeking inner strength to persevere.",
        role: "edgelord",
      },
    ],
  },
  {
    question:
      "What role do ethics or morality play in your decision-making process?",
    answers: [
      {
        text: "I prioritize my own self-interests above all else, disregarding moral considerations.",
        role: "villain",
      },
      {
        text: "I adhere to a strict moral code, striving to do what is right even in difficult circumstances.",
        role: "hero",
      },
      {
        text: "I question conventional morality and make decisions based on my own personal values.",
        role: "edgelord",
      },
      {
        text: "I seek to maintain a balance between ethical principles and practical concerns.",
        role: "civilian",
      },
    ],
  },
];
