// ============================================================
// HAREESH MOYALALI AI CHATBOT
// ============================================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";


// ============================================================
// MALAYALAM VOICE
// ============================================================

function speakMalayalam(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speak = () => {
    const voices = window.speechSynthesis.getVoices();

    let voice =
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ml")) ||
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith("en"));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice ? voice.lang : "ml-IN";
    utterance.voice = voice || null;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();

  if (voices.length) {
    speak();
  } else {
    window.speechSynthesis.onvoiceschanged = speak;
  }
}


// ============================================================
// LOCAL / FEEDED ANSWERS
// ============================================================

function getLocalAnswer(question) {

  const text = question
    .toLowerCase()
    .trim();

  // ----------------------------------------------------------
  // MARRIAGE DATE
  // ----------------------------------------------------------

  if (
    text.includes("when is the marriage") ||
    text.includes("when is marriage") ||
    text.includes("marriage date") ||
    text.includes("wedding date") ||
    text.includes("when wedding") ||
    text.includes("കല്യാണം എപ്പോൾ") ||
    text.includes("വിവാഹം എപ്പോൾ")
  ) {
    return {
      text: "ആഹാ! ഹരീഷ് മായാലിയുടെ കല്യാണം ഡിസംബർ 12-നാണ്. 💍",
      speech: "ആഹാ! ഹരീഷ് മായാലിയുടെ കല്യാണം ഡിസംബർ 12-നാണ്."
    };
  }


  // ----------------------------------------------------------
  // WEDDING LOCATION
  // ----------------------------------------------------------

  if (
    text.includes("location") ||
    text.includes("where is the location") ||
    text.includes("wedding location") ||
    text.includes("marriage location") ||
    text.includes("marriage venue") ||
    text.includes("wedding venue") ||
    text.includes("venue") ||
    text.includes("where wedding") ||
    text === "where" ||
    text === "where is it" ||
    text.includes("വേദി") ||
    text.includes("കല്യാണം എവിടെ")
  ) {
    return {
      text:
        'Wedding location: <a href="https://maps.google.com/?q=Kerala" target="_blank" rel="noopener noreferrer">Open Google Maps 📍</a>',
      speech:
        "കല്യാണത്തിന്റെ സ്ഥലം ഗൂഗിൾ മാപ്പിൽ കാണാം."
    };
  }


  // ----------------------------------------------------------
  // BACHELOR PARTY PLAN
  // ----------------------------------------------------------

  if (
    text.includes("bachelor party plan") ||
    text.includes("plan for bachelor") ||
    text.includes("party plan") ||
    text.includes("party plan entha") ||
    text.includes("party entha plan") ||
    text.includes("what plan for bachelor") ||
    text.includes("what is the bachelor party plan") ||
    text.includes("ബാച്ചിലർ പാർട്ടി") ||
    text.includes("പാർട്ടി എന്താ പ്ലാൻ")
  ) {
    return {
      text:
        "Da da ninne okke otha nerathe Shanku kanda atra 😎",
      speech:
        "ഡാ ഡാ, നിന്നെ ഒക്കെ ഒത്ത നേരത്തെ ശങ്കു കണ്ട അത്ര."
    };
  }


  // ----------------------------------------------------------
  // BACHELOR PARTY DATE
  // ----------------------------------------------------------

  if (
    text.includes("when is the bachelor party") ||
    text.includes("bachelor party date") ||
    text.includes("when bachelor") ||
    text.includes("bachelor party when") ||
    text.includes("ബാച്ചിലർ പാർട്ടി എപ്പോൾ")
  ) {
    return {
      text:
        "The bachelor party is from December 6 to December 12.",
      speech:
        "ബാച്ചിലർ പാർട്ടി ഡിസംബർ 6 മുതൽ ഡിസംബർ 12 വരെയാണ്."
    };
  }


  // ----------------------------------------------------------
  // WHO IS HAREESH
  // ----------------------------------------------------------

  if (
    text.includes("who is hareesh") ||
    text.includes("who is hareesh moyali") ||
    text.includes("ഹരീഷ് ആരാണ്")
  ) {
    return {
      text:
        "Hareesh Moyalali is the fictional central character of this satirical website — the self-proclaimed Emperor of Everything.",
      speech:
        "ഹരീഷ് മൊയലാളി ഈ സാറ്റയർ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക പ്രധാന കഥാപാത്രമാണ്."
    };
  }


  // ----------------------------------------------------------
  // EMPIRE
  // ----------------------------------------------------------

  if (
    text.includes("tell me about the empire") ||
    text.includes("what is the empire") ||
    text.includes("empire")
  ) {
    return {
      text:
        "The Empire of Everything is the fictional world built around Hareesh Moyalali, mixing grand political satire, exaggerated ambitions and Kerala-style humour.",
      speech:
        "ദ എംപയർ ഓഫ് എവരിതിംഗ് ഹരീഷ് മൊയലാളിയെ ചുറ്റിപ്പറ്റിയുള്ള സാങ്കൽപ്പിക ലോകമാണ്."
    };
  }


  // ----------------------------------------------------------
  // MISSION AKHAND BHARAT
  // ----------------------------------------------------------

  if (
    text.includes("mission akhand bharat") ||
    text.includes("akhand bharat")
  ) {
    return {
      text:
        "Mission Akhand Bharat is presented on this fictional satire website as one of Hareesh Moyalali's exaggerated missions.",
      speech:
        "മിഷൻ അഖണ്ഡ് ഭാരത് ഹരീഷ് മൊയലാളിയുടെ സാറ്റയർ ലോകത്തിലെ ഒരു സാങ്കൽപ്പിക മിഷനാണ്."
    };
  }


  // ----------------------------------------------------------
  // MODI LOVER CHAPTER
  // ----------------------------------------------------------

  if (
    text.includes("modi lover") ||
    text.includes("modi lover chapter")
  ) {
    return {
      text:
        "The Modi Lover chapter is part of the fictional political-satire storyline of the website.",
      speech:
        "മോദി ലവർ ചാപ്റ്റർ ഈ സാങ്കൽപ്പിക രാഷ്ട്രീയ സാറ്റയർ കഥയുടെ ഭാഗമാണ്."
    };
  }


  return null;
}


// ============================================================
// GOOGLE / AI BACKEND
// ============================================================

async function askGoogleBackend(question) {

  try {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000);


    const response = await fetch(CHATBOT_BACKEND_URL, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        question: question,
        prompt: question
      }),

      signal: controller.signal
    });


    clearTimeout(timeout);


    if (!response.ok) {
      throw new Error("Google backend HTTP error: " + response.status);
    }


    const raw = await response.text();

    console.log("Google backend response:", raw);


    if (!raw) {
      throw new Error("Empty response from Google backend");
    }


    let data;

    try {
      data = JSON.parse(raw);
    } catch (error) {
      // Sometimes Apps Script returns plain text
      return {
        text: raw,
        speech: raw
      };
    }


    // Support different response formats

    const answer =
      data.answer ||
      data.response ||
      data.text ||
      data.result ||
      data.message;


    if (!answer) {
      throw new Error("No answer field in Google response");
    }


    return {
      text: answer,
      speech: data.speech || answer
    };

  } catch (error) {

    console.error("Google backend error:", error);

    return null;
  }
}


// ============================================================
// CHAT UI
// ============================================================

function addMessage(text, type) {

  const messages = document.getElementById("chat-messages");

  if (!messages) {
    console.error("chat-messages element not found");
    return;
  }


  const message = document.createElement("div");

  message.className =
    "chat-message " + type;


  message.innerHTML = text;

  messages.appendChild(message);


  // Scroll chat to bottom

  messages.scrollTop = messages.scrollHeight;
}


// ============================================================
// THINKING MESSAGE
// ============================================================

function addThinkingMessage() {

  const messages = document.getElementById("chat-messages");

  if (!messages) return;


  const thinking = document.createElement("div");

  thinking.className = "
