const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}

// Page navigation
function goToPage(pageId) {
  const page = document.getElementById(pageId);
  if (!page) return;

  $$(".page").forEach((item) => item.classList.remove("active-page"));
  page.classList.add("active-page");

  $$(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  $("#nav").classList.remove("open");
  history.replaceState(null, "", `#${pageId}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-page]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    goToPage(link.dataset.page);
  });
});

$$("[data-go]").forEach((button) => {
  button.addEventListener("click", () => goToPage(button.dataset.go));
});

$$(".feature-card[data-go]").forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToPage(card.dataset.go);
    }
  });
});

$("#menuToggle").addEventListener("click", () => {
  $("#nav").classList.toggle("open");
});

const initialPage = location.hash.slice(1);
if (document.getElementById(initialPage)?.classList.contains("page")) {
  goToPage(initialPage);
}

// API helper
async function callAPI(endpoint, data) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "The request failed.");
  }

  return result;
}

// AI scam analyzer
const messageInput = $("#messageInput");
const analyzeBtn = $("#analyzeBtn");

messageInput.addEventListener("input", () => {
  $("#charCount").textContent = `${messageInput.value.length} / 4000`;
});

$("#loadSample").addEventListener("click", () => {
  messageInput.value =
    "URGENT: Your bank account will be blocked today. Verify your details immediately using this unfamiliar link. Do not ignore this message!";
  messageInput.dispatchEvent(new Event("input"));
});

analyzeBtn.addEventListener("click", async () => {
  const message = messageInput.value.trim();

  if (!message) {
    showToast("Please enter a message to analyze.");
    messageInput.focus();
    return;
  }

  if (message.length > 4000) {
    showToast("The message is too long.");
    return;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Analyzing...";
  $("#analysisStatus").textContent = "AI is checking for warning signs...";
  $("#analysisResult").textContent = "Please wait while the message is analyzed.";

  try {
    const data = await callAPI("/api/analyze", { message });
    $("#analysisResult").textContent = data.result || "No result was returned.";
    $("#analysisStatus").textContent = "Analysis complete. Review the evidence carefully.";
  } catch (error) {
    $("#analysisResult").textContent = error.message;
    $("#analysisStatus").textContent = "Unable to complete the analysis.";
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "✳ Analyze with AI";
  }
});

// AI chatbot
const chatHistory = [];
const chatMessages = $("#chatMessages");
const chatInput = $("#chatInput");
const chatSend = $("#chatSend");

function addBubble(text, role) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

async function sendChatMessage(text) {
  const content = text.trim();
  if (!content || chatSend.disabled) return;

  if (content.length > 2000) {
    showToast("Please keep your message under 2000 characters.");
    return;
  }

  addBubble(content, "user");
  chatInput.value = "";
  chatSend.disabled = true;
  chatInput.disabled = true;

  const thinking = addBubble("Thinking...", "bot");

  const nextHistory = [
    ...chatHistory,
    { role: "user", content }
  ].slice(-8);

  try {
    const data = await callAPI("/api/chat", { messages: nextHistory });
    const reply = data.reply || "No answer was returned.";
    thinking.textContent = reply;
    chatHistory.push(
      { role: "user", content },
      { role: "assistant", content: reply }
    );
    chatHistory.splice(0, Math.max(0, chatHistory.length - 8));
  } catch (error) {
    thinking.textContent = error.message;
  } finally {
    chatSend.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
  }
}

$("#chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  sendChatMessage(chatInput.value);
});

$$(".suggestion").forEach((button) => {
  button.addEventListener("click", () => sendChatMessage(button.dataset.question));
});

// Cyber safety quiz
const questions = [
  {
    q: "A stranger asks you to share an OTP to receive a payment. What should you do?",
    options: [
      "Share it if they sound trustworthy",
      "Never share it and verify the situation independently",
      "Send your PIN instead",
      "Share it if the payment is urgent"
    ],
    answer: 1,
    explanation: "Never disclose OTPs or PINs to strangers. Verify payment claims through your official app."
  },
  {
    q: "You receive a message saying your account will close unless you click an unfamiliar link. What is safest?",
    options: [
      "Click quickly to avoid losing access",
      "Forward the link to friends",
      "Visit the official website independently",
      "Reply with your account details"
    ],
    answer: 2,
    explanation: "Urgency and unexpected links are warning signs. Use a known official website or app."
  },
  {
    q: "Which password practice offers better protection?",
    options: [
      "Reuse one memorable password everywhere",
      "Use your name and birth year",
      "Use a unique, long password for each account",
      "Share passwords with a friend"
    ],
    answer: 2,
    explanation: "Unique, long passwords reduce the impact if one account is compromised. A password manager can help."
  },
  {
    q: "An online job promises huge earnings but requires an upfront registration fee. What should you do?",
    options: [
      "Pay immediately",
      "Verify the employer independently and be cautious",
      "Send identity documents without checking",
      "Borrow money to secure the job"
    ],
    answer: 1,
    explanation: "Upfront payment demands and unrealistic earnings are warning signs. Check the employer through independent sources."
  },
  {
    q: "You discover an unauthorized payment from your account in India. What should you do first?",
    options: [
      "Wait a few weeks",
      "Delete all related messages",
      "Contact your bank promptly and report the suspected fraud",
      "Pay a stranger who promises guaranteed recovery"
    ],
    answer: 2,
    explanation: "Act quickly: contact your bank or payment provider and use official cybercrime reporting channels, including 1930 for suspected financial cyber fraud in India."
  }
];

let questionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[questionIndex];
  answered = false;

  $("#questionNumber").textContent =
    `Question ${questionIndex + 1} of ${questions.length}`;
  $("#quizScore").textContent = `Score: ${score}`;
  $("#progressBar").style.width =
    `${(questionIndex / questions.length) * 100}%`;
  $("#questionText").textContent = question.q;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent =
    questionIndex === questions.length - 1 ? "See results →" : "Next question →";

  const optionsContainer = $("#quizOptions");
  optionsContainer.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener("click", () => chooseAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = questions[questionIndex];
  const buttons = $$(".quiz-option");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === selectedIndex && index !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === question.answer) score++;

  $("#quizScore").textContent = `Score: ${score}`;
  $("#quizFeedback").textContent =
    `${selectedIndex === question.answer ? "Correct! " : "Not quite. "}${question.explanation}`;
  $("#nextQuestion").disabled = false;
}

$("#nextQuestion").addEventListener("click", () => {
  if (!answered) return;

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    $("#questionNumber").textContent = "Quiz completed";
    $("#questionText").textContent =
      `Your score: ${score} / ${questions.length}`;
    $("#progressBar").style.width = "100%";
    $("#quizOptions").replaceChildren();
    $("#quizFeedback").textContent =
      score === questions.length
        ? "Excellent! Keep practising safe online habits."
        : "Good effort! Review the explanations and try again.";
    $("#nextQuestion").disabled = true;
  }
});

$("#restartQuiz").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  renderQuestion();
});

renderQuestion();
