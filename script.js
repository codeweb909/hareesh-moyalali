// ==========================================
// HAREESH MOYALALI AI CHATBOT
// ==========================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";

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
  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(reply);
  voice.lang = "ml-IN";
  voice.rate = 0.9;
  voice.pitch = 0.9;
  voice.volume = 1;

  window.speechSynthesis.speak(voice);
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
