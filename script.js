// ==========================================
// HAREESH MOYALALI AI CHATBOT
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

    const voices = window.speechSynthesis.getVoices();

    const malayalamVoices = voices.filter(voice =>
      voice.lang &&
      voice.lang.toLowerCase().startsWith("ml")
    );

    const maleVoice = malayalamVoices.find(voice =>
      /male|man|moorthy|ravi|kumar|raj|arun|anil|suresh|krishnan/i
        .test(voice.name)
    );

    const selectedVoice =
      maleVoice || malayalamVoices[0] || null;

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

  // Some Android browsers load voices asynchronously
  if (window.speechSynthesis.getVoices().length) {
    speak();
  } else {
    window.speechSynthesis.onvoiceschanged = speak;
  }
}


// ==========================================
// NORMALIZE USER QUESTION
// ==========================================

function normalizeText(text) {

  return text
    .toLowerCase()
    .trim()
    .replace(/[?.!,]/g, "")
    .replace(/\s+/g, " ");
}


// ==========================================
// FIXED / IMPORTANT ANSWERS
// ==========================================

function getFixedAnswer(message) {

  const text = normalizeText(message);


  // ----------------------------------------
  // MARRIAGE DATE
  // ----------------------------------------

  const marriageKeywords = [

    "moyalai marriage",
    "moyalali marriage",
    "moyalai wedding",
    "moyalali wedding",

    "when is moyalai marriage",
    "when is moyalali marriage",

    "moyalai kalyanam",
    "moyalali kalyanam",

    "moyalaiude kalyanam",
    "moyalaliude kalyanam",

    "moyalai kalyanam eppo",
    "moyalali kalyanam eppo",

    "moyalai wedding date",
    "moyalali wedding date",

    "kalyanam eppo",
    "kalyanam enna",
    "kalyanam epo",
    "kalyanam eppozha",

    "wedding eppo",
    "wedding enna",

    "marriage eppo",
    "marriage date",

    "when is the wedding",
    "when is the marriage",

    "കല്യാണം എപ്പോ",
    "കല്യാണം എപ്പോഴാണ്",
    "വിവാഹം എപ്പോ",
    "വിവാഹം എപ്പോഴാണ്"
  ];

  if (
    marriageKeywords.some(keyword =>
      text.includes(keyword)
    )
  ) {

    return "മോയലായിയുടെ വിവാഹം ഡിസംബർ 12-നാണ്.";
  }


  // ----------------------------------------
  // MARRIAGE LOCATION
  // ----------------------------------------

  const locationKeywords = [

    "where is marriage",
    "where is the marriage",
    "marriage location",
    "wedding location",
    "where is wedding",

    "moyalai marriage location",
    "moyalali marriage location",

    "kalyanam evide",
    "kalyanam evide aanu",
    "kalyanam evideya",

    "വിവാഹം എവിടെയാണ്",
    "കല്യാണം എവിടെയാണ്",
    "കല്യാണം എവിടെ"
  ];

  if (
    locationKeywords.some(keyword =>
      text.includes(keyword)
    )
  ) {

    return "വിവാഹത്തിന്റെ ലൊക്കേഷൻ: https://maps.app.goo.gl/JmXvYvpREPR61rcu8";
  }


  // ----------------------------------------
  // BACHELOR PARTY DATE
  // ----------------------------------------

  const bachelorDateKeywords = [

    "when is bachelor party",
    "bachelor party date",
    "when is the bachelor party",

    "bachelor party eppo",
    "bachelor party enna",

    "ബാച്ചിലർ പാർട്ടി എപ്പോ",
    "ബാച്ചിലർ പാർട്ടി എപ്പോഴാണ്"
  ];

  if (
    bachelorDateKeywords.some(keyword =>
      text.includes(keyword)
    )
  ) {

    return "ബാച്ചിലർ പാർട്ടി ഡിസംബർ 6 മുതൽ ഡിസംബർ 12 വരെയാണ്.";
  }


  // ----------------------------------------
  // BACHELOR PARTY LOCATION
  // ----------------------------------------

  const bachelorLocationKeywords = [

    "where is bachelor party",
    "where is the bachelor party",

    "bachelor party location",

    "bachelor party evide",
    "bachelor party evideya",

    "ബാച്ചിലർ പാർട്ടി എവിടെ",
    "ബാച്ചിലർ പാർട്ടി എവിടെയാണ്"
  ];

  if (
    bachelorLocationKeywords.some(keyword =>
      text.includes(keyword)
    )
  ) {

    return "ബാച്ചിലർ പാർട്ടി ആലപ്പുഴയിലെ ഒരു സ്വകാര്യ ബീച്ചിലാണ്.";
  }


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

  menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

  });
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


  // Convert Google Maps URL into clickable link
  if (
    typeof text === "string" &&
    text.includes("https://maps.app.goo.gl/")
  ) {

    const parts =
      text.split("https://maps.app.goo.gl/");

    message.textContent = parts[0];

    const link =
      document.createElement("a");

    link.href =
      "https://maps.app.goo.gl/" + parts[1];

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.textContent =
      "📍 Open Google Maps";

    message.appendChild(
      document.createElement("br")
    );

    message.appendChild(link);

  } else {

    message.textContent = text;

  }


  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}


// ==========================================
// ASK HAREESH AI USING JSONP
// ==========================================

function askHareeshAI(message) {

  return new Promise((resolve, reject) => {

    const callbackName =
      "hareeshAI_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 10000);


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


    window[callbackName] =
      function(data) {

        cleanup();


        if (data && data.error) {

          reject(
            new Error(data.error)
          );

          return;
        }


        if (data && data.reply) {

          resolve(data.reply);

          return;
        }


        reject(
          new Error(
            "Invalid AI response."
          )
        );
      };


    script.onerror =
      function() {

        cleanup();

        reject(
          new Error(
            "Unable to connect to Hareesh AI."
          )
        );
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


// ==========================================
// SEND MESSAGE
// ==========================================

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      if (!chatInput) return;


      const message =
        chatInput.value.trim();


      if (!message) return;


      // --------------------------------------
      // CHECK FIXED ANSWERS FIRST
      // --------------------------------------

      const fixedReply =
        getFixedAnswer(message);


      if (fixedReply) {

        addChatMessage(
          fixedReply,
          "bot"
        );


        // Remove URL before speaking
        const speechText =
          fixedReply
            .replace(
              /https?:\/\/\S+/g,
              ""
            )
            .trim();


        speakMalayalam(
          speechText
        );


        chatInput.value = "";

        return;
      }


      // --------------------------------------
      // SHOW USER MESSAGE
      // --------------------------------------

      addChatMessage(
        message,
        "user"
      );


      chatInput.value = "";


      // --------------------------------------
      // LOADING MESSAGE
      // --------------------------------------

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


      // --------------------------------------
      // ASK GOOGLE AI BACKEND
      // --------------------------------------

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


        // Speak AI reply
        speakMalayalam(
          reply
        );


      } catch (error) {

        console.error(
          "Hareesh AI Error:",
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
  .querySelectorAll(".quick-question")
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
            new Event("submit", {
              bubbles: true,
              cancelable: true
            })
          );

        }

      }
    );

  });


// ==========================================
// END OF SCRIPT
// ==========================================
