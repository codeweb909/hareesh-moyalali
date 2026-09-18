const GEMINI_API_KEY = "gemini key";

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${sender}`;
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function askGemini(userMessage) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    GEMINI_API_KEY;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [
          {
            text:
              "You are Hareesh Moyalali AI, the friendly chatbot for a fictional Kerala political satire website. Be humorous, polite, and clear that Hareesh Moyalali is fictional satire. Do not present fictional website claims as real political facts."
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: userMessage
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Gemini API request failed");
  }

  const data = await response.json();

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I could not generate a response."
  );
}

if (chatForm) {
  chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userMessage = chatInput.value.trim();

    if (!userMessage) return;

    addMessage(userMessage, "user");
    chatInput.value = "";

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "chat-message bot";
    loadingMessage.textContent = "Thinking...";
    chatMessages.appendChild(loadingMessage);

    try {
      const reply = await askGemini(userMessage);
      loadingMessage.remove();
      addMessage(reply, "bot");
    } catch (error) {
      loadingMessage.textContent =
        "Sorry, the AI is temporarily unavailable. Please try again.";
      console.error(error);
    }
  });
}
