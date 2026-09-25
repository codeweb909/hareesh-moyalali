// =====================================================
// HAREESH MOYALALI AI CHATBOT
// =====================================================

const CHATBOT_BACKEND_URL =
    "https://script.google.com/macros/s/AKfcyby6TUsDGIa00iGL5OWq4_IRGU5R5c7NwntxI798UcbpvODjaAIu0k2Vd-a73xKJQXwL/exec";


// =====================================================
// MALAYALAM VOICE
// =====================================================

function speakMalayalam(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    try {

        window.speechSynthesis.cancel();

        const speak = function () {

            const voices =
                window.speechSynthesis.getVoices();

            const voice =
                voices.find(function (v) {
                    return v.lang &&
                        v.lang.toLowerCase().startsWith("ml");
                }) ||
                voices.find(function (v) {
                    return v.lang &&
                        v.lang.toLowerCase().startsWith("en");
                });

            const utterance =
                new SpeechSynthesisUtterance(text);

            utterance.lang =
                voice ? voice.lang : "ml-IN";

            utterance.voice =
                voice || null;

            utterance.rate = 0.95;
            utterance.pitch = 1;

            window.speechSynthesis.speak(
                utterance
            );
        };

        if (
            window.speechSynthesis.getVoices().length > 0
        ) {

            speak();

        } else {

            window.speechSynthesis.onvoiceschanged =
                function () {

                    window.speechSynthesis.onvoiceschanged =
                        null;

                    speak();
                };
        }

    } catch (error) {

        console.log(
            "Voice error:",
            error
        );
    }
}


// =====================================================
// LOCAL CUSTOM ANSWERS
// =====================================================

function getLocalAnswer(question) {

    const text =
        String(question || "")
            .toLowerCase()
            .trim();


    // =================================================
    // MARRIAGE DATE
    // =================================================

    if (
        text.includes("when is the marriage") ||
        text.includes("marriage date") ||
        text.includes("wedding date") ||
        text.includes("when is marriage") ||
        text.includes("when is moyalali marriage") ||
        text.includes("when is hareesh marriage") ||
        text.includes("moyalali marriage") ||
        text.includes("കല്യാണം എപ്പോൾ") ||
        text.includes("കല്യാണം എപ്പോഴാണ്")
    ) {

        return {

            text:
                "ആഹാ! ഹരീഷ് മായലാലിയുടെ കല്യാണം ഡിസംബർ 12-നാണ്. 💍",

            speech:
                "ഹരീഷ് മായലാലിയുടെ കല്യാണം ഡിസംബർ പന്ത്രണ്ടിനാണ്."

        };
    }


    // =================================================
    // BACHELOR PARTY DATE
    // IMPORTANT: CHECK DATE BEFORE GENERAL PLAN
    // =================================================

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

            text:
                "The bachelor party is from December 6 to December 12.",

            speech:
                "The bachelor party is from December 6 to December 12."

        };
    }


    // =================================================
    // BACHELOR PARTY PLAN
    // =================================================

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

            text:
                "Da da ninne okke otha nerathe Shanku kanda atra! Lokam onnum ivde arum kandit illa",

            speech:
                "ഡാ ഡാ, നിന്നെ ഒക്കെ ഒത്ത നേരത്തെ ശങ്കു കണ്ട അത്ര! ലോകം ഒന്നും ഇവിടെ ആരും കണ്ടിട്ടില്ല."

        };
    }


    // =================================================
    // WEDDING LOCATION
    // =================================================

    if (
        text.includes("wedding location") ||
        text.includes("marriage location") ||
        text.includes("marriage venue") ||
        text.includes("wedding venue") ||
        text.includes("where is the wedding") ||
        text.includes("where is the marriage") ||
        text.includes("where is marriage") ||
        text.includes("kalyanam evide") ||
        text.includes("kalyanam evida") ||
        text.includes("kalyanam location") ||
        text.includes("കല്യാണം എവിടെ") ||
        text.includes("എവിടെയാണ് കല്യാണം") ||
        text.includes("വിവാഹം എവിടെ") ||
        text.includes("വേദി")
    ) {

        return {

            text:
                'Wedding location: <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">Open Google Maps 📍</a>',

            speech:
                "കല്യാണത്തിന്റെ സ്ഥലം ഗൂഗിൾ മാപ്പിൽ കാണാം."

        };
    }


    // =================================================
    // EMPIRE
    // =================================================

    if (
        text.includes("tell me about the empire") ||
        text.includes("what is the empire") ||
        text === "empire" ||
        text.includes("empire of everything") ||
        text === "tell me about the empire"
    ) {

        return {

            text:
                'The Empire of Everything is the fictional world featured on this website.',

            speech:
                "ദ എംപയർ ഓഫ് എവരിതിംഗ് ഈ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക ലോകമാണ്."

        };
    }


    // =================================================
    // WHO IS HAREESH
    // =================================================

    if (
        text.includes("who is hareesh") ||
        text.includes("who is hareesh moyalali") ||
        text.includes("who is moyalali")
    ) {

        return {

            text:
                "Hareesh Moyalali is the fictional central character of this website and the imagined Empire of Everything.",

            speech:
                "ഹരീഷ് മായലാലി ഈ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക പ്രധാന കഥാപാത്രമാണ്."

        };
    }


    // =================================================
    // MISSION AKHAND BHARAT
    // =================================================

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


    // =================================================
    // MODI LOVER CHAPTER
    // =================================================

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


    // =================================================
    // NO LOCAL ANSWER
    // =================================================

    return null;
}


// =====================================================
// ADD MESSAGE
// =====================================================

function addMessage(text, type) {

    const messages =
        document.getElementById("chat-messages");

    if (!messages) {

        console.error(
            "Hareesh AI ERROR: chat-messages not found."
        );

        return;
    }

    const message =
        document.createElement("div");

    message.className =
        "chat-message " + type;

    message.innerHTML =
        text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;
}


// =====================================================
// THINKING
// =====================================================

function showThinking() {

    removeThinking();

    const messages =
        document.getElementById("chat-messages");

    if (!messages) {
        return;
    }

    const thinking =
        document.createElement("div");

    thinking.className =
        "chat-message bot";

    thinking.id =
        "thinking-message";

    thinking.textContent =
        "Hareesh AI is thinking...";

    messages.appendChild(thinking);

    messages.scrollTop =
        messages.scrollHeight;
}


// =====================================================
// REMOVE THINKING
// =====================================================

function removeThinking() {

    const thinking =
        document.getElementById(
            "thinking-message"
        );

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
            "?message=" +
            encodeURIComponent(question);

        console.log(
            "Sending to Google:",
            question
        );

        console.log(
            "Google URL:",
            url
        );

        const controller =
            new AbortController();

        const timeout =
            setTimeout(function () {

                controller.abort();

            }, 20000);


        const response =
            await fetch(url, {

                method: "GET",

                redirect: "follow",

                cache: "no-store",

                signal: controller.signal

            });


        clearTimeout(timeout);


        console.log(
            "Google status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Google server returned HTTP " +
                response.status
            );
        }


        const raw =
            await response
