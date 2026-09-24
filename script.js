// =====================================================
// HAREESH MOYALALI AI CHATBOT
// =====================================================

const CHATBOT_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";
// =====================================================
// MALAYALAM VOICE
// =====================================================

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
        utterance.rate = 0.95;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length) {
        speak();
    } else {
        window.speechSynthesis.onvoiceschanged = speak;
    }
}


// =====================================================
// LOCAL / FED DATA
// These answers work even if Google is unavailable.
// =====================================================

function getLocalAnswer(question) {

    const text = question.toLowerCase().trim();


    // -----------------------------
    // MARRIAGE DATE
    // -----------------------------

    if (
        text.includes("when is the marriage") ||
        text.includes("marriage date") ||
        text.includes("wedding date") ||
        text.includes("when is marriage") ||
        text.includes("കല്യാണം എപ്പോൾ") ||
        text.includes("കല്യാണം എപ്പോഴാണ്")
    ) {
        return {
            text: "ആഹാ! ഹരീഷ് മായലാലിയുടെ കല്യാണം ഡിസംബർ 12-നാണ്. 💍",
            speech: "ഹരീഷ് മായലാലിയുടെ കല്യാണം ഡിസംബർ പന്ത്രണ്ടിനാണ്."
        };
    }


    // -----------------------------
    // BACHELOR PARTY PLAN
    // -----------------------------

    if (
        text.includes("bachelor party plan") ||
        text.includes("plan for bachelor") ||
        text.includes("party plan") ||
        text.includes("what plan for bachelor") ||
        text.includes("party entha plan") ||
        text.includes("party plan entha") ||
        text.includes("ബാച്ചിലർ പാർട്ടി") ||
        text.includes("ബാച്ചിലർ")
    ) {
        return {
            text: "Da da ninne okke otha nerathe Shanku kanda atra! 😎🍻",
            speech: "ഡാ ഡാ, നിന്നെ ഒക്കെ ഒത്ത നേരത്തെ ശങ്കു കണ്ട അത്ര!"
        };
    }


    // -----------------------------
    // BACHELOR PARTY DATE
    // -----------------------------

    if (
        (
            text.includes("bachelor party") ||
            text.includes("bachelor")
        ) &&
        (
            text.includes("when") ||
            text.includes("date") ||
            text.includes("eppo") ||
            text.includes("എപ്പോൾ") ||
            text.includes("എന്നാണ്")
        )
    ) {
        return {
            text: "The bachelor party is from December 6 to December 12.",
            speech: "The bachelor party is from December 6 to December 12."
        };
    }


    // -----------------------------
    // WEDDING LOCATION
    // -----------------------------

    if (
        text.includes("wedding location") ||
        text.includes("marriage location") ||
        text.includes("marriage venue") ||
        text.includes("where is the wedding") ||
        text === "where" ||
        text === "where is it" ||
        text.includes("വേദി") ||
        text.includes("എവിടെയാണ് കല്യാണം") ||
        text.includes("കല്യാണം എവിടെ")
    ) {
        return {
            text:
                'Wedding location: <a href="https://maps.google.com/" target="_blank" rel="noopener">Open Google Maps 📍</a>',
            speech: "കല്യാണത്തിന്റെ സ്ഥലം ഗൂഗിൾ മാപ്പിൽ കാണാം."
        };
    }


    // -----------------------------
    // WHO IS HAREESH
    // -----------------------------

    if (
        text.includes("who is hareesh") ||
        text.includes("hareesh moyallali")
    ) {
        return {
            text:
                "Hareesh Moyalali is the fictional central character of this website and the imagined Empire of Everything.",
            speech:
                "ഹരീഷ് മായലാലി ഈ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക പ്രധാന കഥാപാത്രമാണ്."
        };
    }


    // -----------------------------
    // EMPIRE
    // -----------------------------

    if (
        text.includes("tell me about the empire") ||
        text.includes("what is the empire") ||
        text === "empire"
    ) {
        return {
            text:
                "The Empire of Everything is a fictional universe created for this website, built around the character Hareesh Moyalali.",
            speech:
                "ദി എംപയർ ഓഫ് എവരിതിംഗ് ഈ വെബ്സൈറ്റിനായി സൃഷ്ടിച്ച ഒരു സാങ്കൽപ്പിക ലോകമാണ്."
        };
    }


    // -----------------------------
    // MISSION AKHAND BHARAT
    // -----------------------------

    if (
        text.includes("mission akhand bharat") ||
        text.includes("akhand bharat")
    ) {
        return {
            text:
                "Mission Akhand Bharat is presented on this website as a fictional political-worldbuilding concept, not as a real political organisation or campaign.",
            speech:
                "മിഷൻ അഖണ്ഡ് ഭാരത് ഈ വെബ്സൈറ്റിൽ അവതരിപ്പിച്ചിരിക്കുന്ന ഒരു സാങ്കൽപ്പിക രാഷ്ട്രീയ ആശയമാണ്."
        };
    }


    // -----------------------------
    // MODI LOVER CHAPTER
    // -----------------------------

    if (
        text.includes("modi lover") ||
        text.includes("modi lover chapter")
    ) {
        return {
            text:
                "The Modi Lover chapter is part of the fictional world and character-building on this website.",
            speech:
                "മോദി ലവർ ചാപ്റ്റർ ഈ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക ലോകത്തിന്റെ ഭാഗമാണ്."
        };
    }


    return null;
}


// =====================================================
// ADD MESSAGE TO CHAT
// =====================================================

function addMessage(text, type) {

    const messages = document.getElementById("chat-messages");

    if (!messages) return;

    const message = document.createElement("div");

    message.className = "chat-message " + type;

    message.innerHTML = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}


// =====================================================
// LOADING MESSAGE
// =====================================================

function showThinking() {

    const messages = document.getElementById("chat-messages");

    if (!messages) return;

    const thinking = document.createElement("div");

    thinking.className = "chat-message bot";
    thinking.id = "thinking-message";
    thinking.textContent = "Hareesh AI is thinking...";

    messages.appendChild(thinking);

    messages.scrollTop = messages.scrollHeight;
}


function removeThinking() {

    const thinking = document.getElementById("thinking-message");

    if (thinking) {
        thinking.remove();
    }
}


// =====================================================
// GOOGLE APPS SCRIPT
// =====================================================

async function askGoogle(question) {

    try {

        const url =
            CHATBOT_BACKEND_URL +
            "?question=" +
            encodeURIComponent(question);

        const response = await fetch(url, {
            method: "GET",
            redirect: "follow"
        });

        if (!response.ok) {
            throw new Error("Google server returned " + response.status);
        }

        const contentType =
            response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {

            const data = await response.json();

            return (
                data.answer ||
                data.text ||
                data.response ||
                data.message ||
                null
            );
        }

        const text = await response.text();

        if (text && text.trim()) {
            return text.trim();
        }

        return null;

    } catch (error) {

        console.error("Google AI error:", error);

        return null;
    }
}


// =====================================================
// MAIN CHAT FUNCTION
// =====================================================

async function handleQuestion(question) {

    question = question.trim();

    if (!question) return;


    // Show user question
    addMessage(question, "user");


    // First check local/fed answers
    const localAnswer = getLocalAnswer(question);

    if (localAnswer) {

        addMessage(localAnswer.text, "bot");

        if (localAnswer.speech) {
            speakMalayalam(localAnswer.speech);
        }

        return;
    }


    // If no local answer, ask Google backend
    showThinking();

    const googleAnswer = await askGoogle(question);

    removeThinking();


    if (googleAnswer) {

        addMessage(googleAnswer, "bot");

        // Only speak short answers
        if (googleAnswer.length < 500) {
            speakMalayalam(
                googleAnswer.replace(/<[^>]*>/g, "")
            );
        }

    } else {

        addMessage(
            "Sorry, Hareesh AI is temporarily unavailable. Please try again.",
            "bot"
        );
    }
}


// =====================================================
// CHAT FORM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("chat-form");

    const input = document.getElementById("chat-input");


    if (!form || !input) {

        console.error(
            "Chatbot error: chat-form or chat-input not found."
        );

        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const question = input.value.trim();

        if (!question) return;

        input.value = "";

        handleQuestion(question);

    });


    // =================================================
    // QUICK QUESTIONS
    // =================================================

    const quickQuestions =
        document.querySelectorAll(".quick-question");

    quickQuestions.forEach(function (button) {

        button.addEventListener("click", function () {

            const question =
                button.textContent.trim();

            handleQuestion(question);

        });

    });

});
