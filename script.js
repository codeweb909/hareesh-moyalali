// ==========================================
// HAREESH MOYALALI AI CHATBOT
// ==========================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";


function speakMalayalam(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();

  const malayalamVoices = voices.filter(voice =>
    voice.lang && voice.lang.toLowerCase().startsWith("ml")
  );

  const maleVoice = malayalamVoices.find(voice =>
    /male|man|moorthy|ravi|kumar|raj|arun|anil|suresh|krishnan/i.test(
      voice.name
    )
  );

  const selectedVoice =
    maleVoice || malayalamVoices[0];

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "ml-IN";
  speech.rate = 0.88;
  speech.pitch = 0.82;
  speech.volume = 1;

  if (selectedVoice) {
    speech.voice = selectedVoice;
  }

  window.speechSynthesis.speak(speech);
}
function getFixedAnswer(message) {
  const text = message.toLowerCase().trim();

  if (
    text.includes("when is moyalai marriage") ||
    text.includes("when is moyalali marriage") ||
    text.includes("moyalai marriage")
  ) {
    return "Moyalai's marriage is on December 12.";
  }

  if (
    text.includes("where is marriage") ||
    text.includes("marriage location") ||
    text.includes("where is the marriage")
  ) {
    return 'The marriage location is here: <a href="https://maps.app.goo.gl/JmXvYvpREPR61rcu8" target="_blank">Open Google Maps</a>';
  }

  if (
    text.includes("when is bachelor party") ||
    text.includes("bachelor party")
  ) {
    return "The bachelor party is from December 6 to December 12.";
  }

  if (
    text.includes("where is bachelor party") ||
    text.includes("where is it")
  ) {
    return "The bachelor party will be at a private beach in Alappuzha.";
  }

  return null;
}
// ------------------------------------------
// Mobile menu
// ------------------------------------------

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


// ------------------------------------------
// Chatbot elements
// ------------------------------------------

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");


// ------------------------------------------
// Add message
// ------------------------------------------

function addChatMessage(text, sender) {

  if (!chatMessages) return;

  const message = document.createElement("div");

  message.className =
    sender === "user"
      ? "chat-message user"
      : "chat-message bot";

  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ------------------------------------------
// Ask AI using JSONP
// ------------------------------------------

function askHareeshAI(message) {

  return new Promise((resolve, reject) => {

    const callbackName =
      "hareeshAI_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 10000);

    const script = document.createElement("script");

    const timeout = setTimeout(() => {

      cleanup();

      reject(new Error("AI request timed out."));

    }, 60000);


    function cleanup() {

      clearTimeout(timeout);

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      try {
        delete window[callbackName];
      } catch (e) {
        window[callbackName] = undefined;
      }
    }


    window[callbackName] = function(data) {

      cleanup();

      if (data && data.error) {

        reject(new Error(data.error));

        return;
      }

      if (data && data.reply) {

        resolve(data.reply);

        return;
      }

      reject(new Error("Invalid AI response."));
    };


    script.onerror = function() {

      cleanup();

      reject(new Error("Unable to connect to Hareesh AI."));
    };


    script.src =
      CHATBOT_BACKEND_URL +
      "?message=" +
      encodeURIComponent(message) +
      "&callback=" +
      callbackName;

    document.body.appendChild(script);

  });
}


// ------------------------------------------
// Send message
// ------------------------------------------

if (chatForm) {

  chatForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) return;
const fixedReply = getFixedAnswer(message);

if (fixedReply) {
  addChatMessage(fixedReply, "bot");
  speakMalayalam(fixedReply.replace(/<[^>]*>/g, ""));
  return;
}

    addChatMessage(message, "user");

    chatInput.value = "";


    const loading = document.createElement("div");

    loading.className = "chat-message bot";

    loading.textContent =
      "Hareesh AI is thinking...";

    chatMessages.appendChild(loading);

    chatMessages.scrollTop =
      chatMessages.scrollHeight;


    try {

      const reply =
        await askHareeshAI(message);

      loading.remove();

      addChatMessage(reply, "bot");

if ("speechSynthesis" in window) {
  speakMalayalam(reply);
}
    } catch (error) {

      console.error(error);

      loading.textContent =
        "Sorry, Hareesh AI is temporarily unavailable. Please try again.";

    }

  });

}


// ------------------------------------------
// Quick question buttons
// ------------------------------------------

document
  .querySelectorAll(".quick-question")
  .forEach(button => {

    button.addEventListener("click", function() {

      const question =
        this.textContent.trim();

      if (chatInput && chatForm) {

        chatInput.value = question;

        chatForm.dispatchEvent(
          new Event("submit", {
            bubbles: true,
            cancelable: true
          })
        );

      }

    });

  });
