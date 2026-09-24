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

    const voices =
      window.speechSynthesis.getVoices();

    let voice =
      voices.find(v =>
        v.lang &&
        v.lang.toLowerCase().startsWith("ml")
      );

    if (!voice) {
      voice =
        voices.find(v =>
          v.lang &&
          v.lang.toLowerCase().startsWith("en-in")
        );
    }

    const utterance =
      new SpeechSynthesisUtterance(text);

    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang =
      voice ? voice.lang : "ml-IN";

    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  if (
    window.speechSynthesis.getVoices().length === 0
  ) {
    window.speechSynthesis.onvoiceschanged =
      speak;
  } else {
    speak();
  }
}
