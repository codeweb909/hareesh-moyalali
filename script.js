// ==========================================
// HAREESH MOYALALI AI CHATBOT
// ==========================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbwGRGqpD5_zlpa7rZHlV6dM4X3SFLNkAvg2lX-i5k32SXK1Lq7ov3SeQiTb548aIV5u/exec";


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
// Chatbot
// ------------------------------------------

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

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


async function askHareeshAI(message) {

  const response = await fetch(CHATBOT_BACKEND_URL, {
    method: "POST",

    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },

    body: JSON.stringify({
      message: message
    })
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.reply;
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

    loading.textContent = "Hareesh AI is thinking...";

    chatMessages.appendChild(loading);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {

      const reply = await askHareeshAI(message);

      loading.remove();

      addChatMessage(reply, "bot");

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

document.querySelectorAll(".quick-question").forEach(button => {

  button.addEventListener("click", function() {

    const question = this.textContent.trim();

    if (chatInput) {

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
