// ==========================================
// HAREESH MOYALALI AI CHATBOT
// ==========================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";


// ==========================================
// MALAYALAM SPEECH
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

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "ml-IN";
    speech.rate = 0.88;
    speech.pitch = 0.82;
    speech.volume = 1;

    if (malayalamVoices.length > 0) {
      speech.voice = malayalamVoices[0];
    }

    window.speechSynthesis.speak(speech);
  };

  speak();

  // Some Android browsers load voices after the first call
  setTimeout(() => {

    if (!window.speechSynthesis.speaking) {
      speak();
    }

  }, 500);
}


// ==========================================
// NORMALIZE USER QUESTION
// ==========================================

function normalizeQuestion(message) {

  return message
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:'"’‘“”]/g, "")
    .replace(/\s+/g, " ");
}


// ==========================================
// FIXED ANSWERS
// ==========================================

function getFixedAnswer(message) {

  const text = normalizeQuestion(message);


  // ----------------------------------------
  // MARRIAGE DATE
  // ----------------------------------------

  const marriageWords = [
    "marriage",
    "wedding",
    "kalyanam",
    "kalyana",
    "കല്യാണം",
    "വിവാഹം"
  ];

  const dateWords = [
    "when",
    "eppo",
    "eppozha",
    "eppozhanu",
    "enna",
    "when is",
    "date",
    "എപ്പോൾ",
    "എന്നാ",
    "എപ്പോഴാണ്"
  ];

  const asksMarriageDate =
    marriageWords.some(word => text.includes(word)) &&
    dateWords.some(word => text.includes(word));

  if (
    asksMarriageDate ||
    text === "marriage" ||
    text === "wedding" ||
    text === "kalyanam"
  ) {

    return {
      text:
        "ആഹാ! ഹരീഷ് മൊയലാലിയുടെ കല്യാണം ഡിസംബർ 12-നാണ്. 💍",

      speech:
        "ആഹാ! ഹരീഷ് മൊയലാലിയുടെ കല്യാണം ഡിസംബർ പന്ത്രണ്ടാം തീയതിയാണ്."
    };
  }


  // ----------------------------------------
  // WEDDING LOCATION
  // ----------------------------------------

  if (
    text.includes("location") ||
    text.includes("where is marriage") ||
    text.includes("where is the marriage") ||
    text.includes("wedding location") ||
    text.includes("marriage location") ||
    text.includes("wedding venue") ||
    text.includes("marriage venue") ||
    text.includes("venue") ||
    text.includes("where wedding") ||
    text === "where" ||
    text === "where is it" ||
    text === "സ്ഥലം" ||
    text.includes("evide") ||
    text.includes("evideya") ||
    text.includes("kalyanam evide")
  ) {

    return {
      text:
        'Wedding location: <a href="https://maps.app.goo.gl/JmXvYvpREPR61rcu8" target="_blank" rel="noopener noreferrer">Open Google Maps 📍</a>',

      speech:
        "കല്യാണത്തിന്റെ സ്ഥലം ഗൂഗിൾ മാപ്പിൽ കാണാം."
    };
  }


  // ----------------------------------------
  // BACHELOR PARTY DATE
  // ----------------------------------------

  if (
    text.includes("bachelor party") &&
    (
      text.includes("when") ||
      text.includes("date") ||
      text.includes("eppo") ||
      text.includes("enna")
    )
  ) {

    return {
      text:
        "The bachelor party is from December 6 to December 12.",

      speech:
        "ബാച്ചിലർ പാർട്ടി ഡിസംബർ ആറാം തീയതി മുതൽ ഡിസംബർ പന്ത്രണ്ടാം തീയതി വരെയാണ്."
    };
  }


  // ----------------------------------------
  // BACHELOR PARTY LOCATION
  // ----------------------------------------

  if (
    text.includes("bachelor party") &&
    (
      text.includes("where") ||
      text.includes("location") ||
      text.includes("venue") ||
      text.includes("evide")
    )
  ) {

    return {
      text:
        "The bachelor party will be at a private beach in Alappuzha.",

      speech:
        "ബാച്ചിലർ പാർട്ടി ആലപ്പുഴയിലെ ഒരു സ്വകാര്യ ബീച്ചിലാണ്."
    };
  }


  // ----------------------------------------
  // WHO IS HAREESH MOYALALI
  // ----------------------------------------

  if (
    text.includes("who is hareesh") ||
    text.includes("who is moyalali") ||
    text.includes("who is hareesh moyalali") ||
    text.includes("hareesh moyalali aaranu") ||
    text.includes("hareesh aaranu") ||
    text.includes("moyalali aaranu") ||
    text.includes("aaranu hareesh") ||
    text.includes("ആരാണ് ഹരീഷ്")
  ) {

    return {
      text:
        "Hareesh Moyalali is the fictional central character of the Empire of Everything — a satirical AI character created for this website.",

      speech:
        "ഹരീഷ് മൊയലാലി എമ്പയർ ഓഫ് എവരിതിംഗ് എന്ന സാറ്റയർ ലോകത്തിലെ ഒരു സാങ്കൽപ്പിക കഥാപാത്രമാണ്."
    };
  }


  // ----------------------------------------
  // GREETING
  // ----------------------------------------

  if (
    text === "hello" ||
    text === "hi" ||
    text === "hey" ||
    text === "hai" ||
    text === "namaste" ||
    text === "ഹലോ"
  ) {

    return {
      text:
        "👋 Hello! I am Hareesh Moyalali AI. Ask me anything about the fictional Empire of Everything.",

      speech:
        "ഹലോ! ഞാൻ ഹരീഷ് മൊയലാലി എ ഐ ആണ്."
    };
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
// CHAT ELEMENTS
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

function addChatMessage(text, sender, allowHTML = false) {

  if (!chatMessages) return;

  const message =
    document.createElement("div");

  message.className =
    sender === "user"
      ? "chat-message user"
      : "chat-message bot";


  if (
    sender === "bot" &&
    allowHTML
  ) {

    message.innerHTML = text;

  } else {

    message.textContent = text;

  }


  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}


// ==========================================
// ASK BACKEND
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


    let finished = false;


    const timeout =
      setTimeout(() => {

        if (finished) return;

        finished = true;

        cleanup();

        reject(
          new Error(
            "AI request timed out."
          )
        );

      }, 30000);


    function cleanup() {

      clearTimeout(timeout);

      if (script.parentNode) {

        script.parentNode.removeChild(script);

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

        if (finished) return;

        finished = true;

        cleanup();


        if (
          data &&
          data.error
        ) {

          reject(
            new Error(data.error)
          );

          return;

        }


        if (
          data &&
          data.reply
        ) {

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

        if (finished) return;

        finished = true;

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
      encodeURIComponent(callbackName);


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


      const message =
        chatInput.value.trim();


      if (!message) return;


      // Show user's message FIRST
      addChatMessage(
        message,
        "user"
      );


      chatInput.value = "";


      // --------------------------------------
      // CHECK FIXED ANSWERS FIRST
      // --------------------------------------

      const fixedReply =
        getFixedAnswer(message);


      if (fixedReply) {

        addChatMessage(
          fixedReply.text,
          "bot",
          true
        );


        if (fixedReply.speech) {

          speakMalayalam(
            fixedReply.speech
          );

        }


        return;

      }


      // --------------------------------------
      // AI BACKEND
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


      try {

        const reply =
          await askHareeshAI(message);


        loading.remove();


        addChatMessage(
          reply,
          "bot"
        );


        // Speak AI answer in Malayalam
        speakMalayalam(reply);


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
// QUICK QUESTIONS
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
