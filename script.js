// ==========================================
// HAREESH MOYALALI AI CHATBOT
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT BACKEND
// ==========================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";


// ==========================================
// MALAYALAM VOICE
// ==========================================

function speakMalayalam(text) {

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speak = () => {

    const voices =
      window.speechSynthesis.getVoices();

    const malayalamVoices =
      voices.filter(voice =>
        voice.lang &&
        voice.lang.toLowerCase().startsWith("ml")
      );

    const maleVoice =
      malayalamVoices.find(voice =>
        /male|man|moorthy|ravi|kumar|raj|arun|anil|suresh|krishnan/i
          .test(voice.name)
      );

    const selectedVoice =
      maleVoice || malayalamVoices[0];

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "ml-IN";
    speech.rate = 0.88;
    speech.pitch = 0.82;
    speech.volume = 1;

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    window.speechSynthesis.speak(speech);
  };


  // Some mobile browsers load voices asynchronously
  const voices =
    window.speechSynthesis.getVoices();

  if (voices.length) {
    speak();
  } else {

    window.speechSynthesis.onvoiceschanged = () => {
      speak();
    };

  }
}


// ==========================================
// FIXED ANSWERS
// These work even if AI backend fails
// ==========================================

function getFixedAnswer(message) {

  // Normalize question
  const text = message
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ");


  // ========================================
  // MARRIAGE DATE
  // ========================================

  const marriageWords = [
    "marriage",
    "wedding",
    "kalyanam",
    "kalyan",
    "vivaham",
    "vivaha"
  ];

  const whenWords = [
    "when",
    "eppo",
    "enna",
    "date",
    "ethu",
    "which"
  ];


  const isMarriageQuestion =
    marriageWords.some(word =>
      text.includes(word)
    ) &&
    whenWords.some(word =>
      text.includes(word)
    );


  if (
    isMarriageQuestion ||

    text.includes("moyalai marriage") ||
    text.includes("moyalali marriage") ||

    text.includes("moyalai wedding") ||
    text.includes("moyalali wedding") ||

    text.includes("marriage date") ||
    text.includes("wedding date") ||

    text === "when is marriage" ||
    text === "marriage eppo" ||
    text === "kalyanam eppo" ||
    text === "kalyanam enna"
  ) {

    return "Moyalai's marriage is on December 12.";
  }


  // ========================================
  // MARRIAGE LOCATION
  // ========================================

  if (

    text.includes("where is marriage") ||
    text.includes("where is the marriage") ||

    text.includes("where is wedding") ||
    text.includes("where is the wedding") ||

    text.includes("marriage location") ||
    text.includes("wedding location") ||

    text.includes("kalyanam evide") ||
    text.includes("kalyanam evida") ||

    text.includes("marriage evide") ||
    text.includes("marriage evida")

  ) {

    return `
      The marriage location is here:
      <br><br>
      <a
        href="https://maps.app.goo.gl/JmXvYvpREPR61rcu8"
        target="_blank"
        rel="noopener noreferrer"
      >
        📍 Open Google Maps
      </a>
    `;
  }


  // ========================================
  // BACHELOR PARTY DATE
  // ========================================

  if (

    text.includes("bachelor party") &&

    (
      text.includes("when") ||
      text.includes("eppo") ||
      text.includes("date")
    )

  ) {

    return "The bachelor party is from December 6 to December 12.";
  }


  // ========================================
  // BACHELOR PARTY LOCATION
  // ========================================

  if (

    text.includes("where is bachelor party") ||
    text.includes("bachelor party location") ||
    text.includes("bachelor party evide") ||
    text.includes("bachelor party evida")

  ) {

    return "The bachelor party will be at a private beach in Alappuzha.";
  }


  // ========================================
  // NO FIXED ANSWER
  // Let AI answer
  // ========================================

  return null;
}



// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector("nav");


if (menuButton && nav) {

  menuButton.addEventListener(
    "click",
    () => {

      nav.classList.toggle("active");

    }
  );

}



// ==========================================
// CHATBOT ELEMENTS
// ==========================================

const chatForm =
  document.getElementById("chat-form");

const chatInput =
  document.getElementById("chat-input");

const chatMessages =
  document.getElementById("chat-messages");



// ==========================================
// ADD CHAT MESSAGE
// ==========================================

function addChatMessage(text, sender) {

  if (!chatMessages) return;


  const message =
    document.createElement("div");


  message.className =
    sender === "user"
      ? "chat-message user"
      : "chat-message bot";


  // innerHTML allows Google Maps link
  message.innerHTML = text;


  chatMessages.appendChild(message);


  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}



// ==========================================
// ASK HAREESH AI
// JSONP CONNECTION
// ==========================================

function askHareeshAI(message) {

  return new Promise(
    (resolve, reject) => {

      const callbackName =
        "hareeshAI_" +
        Date.now() +
        "_" +
        Math.floor(
          Math.random() * 10000
        );


      const script =
        document.createElement("script");


      const timeout =
        setTimeout(() => {

          cleanup();

          reject(
            new Error(
              "AI request timed out."
            )
          );

        }, 60000);



      function cleanup() {

        clearTimeout(timeout);


        if (script.parentNode) {

          script.parentNode.removeChild(
            script
          );

        }


        try {

          delete window[callbackName];

        } catch (e) {

          window[callbackName] =
            undefined;

        }

      }



      // ====================================
      // GOOGLE APPS SCRIPT RESPONSE
      // ====================================

      window[callbackName] =
        function(data) {

          cleanup();


          if (
            data &&
            data.error
          ) {

            reject(
              new Error(
                data.error
              )
            );

            return;
          }


          if (
            data &&
            data.reply
          ) {

            resolve(
              data.reply
            );

            return;
          }


          reject(
            new Error(
              "Invalid AI response."
            )
          );

        };



      // ====================================
      // CONNECTION ERROR
      // ====================================

      script.onerror =
        function() {

          cleanup();


          reject(
            new Error(
              "Unable to connect to Hareesh AI."
            )
          );

        };



      // ====================================
      // SEND REQUEST
      // ====================================

      script.src =
        CHATBOT_BACKEND_URL +
        "?message=" +
        encodeURIComponent(message) +
        "&callback=" +
        callbackName;


      document.body.appendChild(
        script
      );

    }
  );
}



// ==========================================
// SEND MESSAGE
// ==========================================

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      const message =
        chatInput.value.trim();


      if (!message) return;



      // ====================================
      // CHECK FIXED ANSWERS FIRST
      // ====================================

      const fixedReply =
        getFixedAnswer(message);


      if (fixedReply) {

        addChatMessage(
          message,
          "user"
        );


        chatInput.value = "";


        addChatMessage(
          fixedReply,
          "bot"
        );


        // Speak only the text,
        // not HTML tags
        const speechText =
          fixedReply.replace(
            /<[^>]*>/g,
            ""
          );


        speakMalayalam(
          speechText
        );


        return;
      }



      // ====================================
      // SHOW USER MESSAGE
      // ====================================

      addChatMessage(
        message,
        "user"
      );


      chatInput.value = "";



      // ====================================
      // LOADING MESSAGE
      // ====================================

      const loading =
        document.createElement("div");


      loading.className =
        "chat-message bot";


      loading.textContent =
        "Hareesh AI is thinking...";


      chatMessages.appendChild(
        loading
      );


      chatMessages.scrollTop =
        chatMessages.scrollHeight;



      // ====================================
      // ASK AI
      // ====================================

      try {

        const reply =
          await askHareeshAI(
            message
          );


        loading.remove();


        addChatMessage(
          reply,
          "bot"
        );


        speakMalayalam(
          reply
        );


      } catch (error) {

        console.error(
          "Hareesh AI error:",
          error
        );


        loading.textContent =
          "Sorry, Hareesh AI is temporarily unavailable. Please try again.";

      }

    }
  );

}



// ==========================================
// QUICK QUESTION BUTTONS
// ==========================================

document
  .querySelectorAll(
    ".quick-question"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const question =
          this.textContent.trim();


        if (
          chatInput &&
          chatForm
        ) {

          chatInput.value =
            question;


          chatForm.dispatchEvent(
            new Event(
              "submit",
              {
                bubbles: true,
                cancelable: true
              }
            )
          );

        }

      }
    );

  });
