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

    try {

        window.speechSynthesis.cancel();

        const speak = () => {

            const voices =
                window.speechSynthesis.getVoices();

            let voice =
                voices.find(v =>
                    v.lang &&
                    v.lang.toLowerCase().startsWith("ml")
                ) ||
                voices.find(v =>
                    v.lang &&
                    v.lang.toLowerCase().startsWith("en")
                );

            const utterance =
                new SpeechSynthesisUtterance(text);

            utterance.lang =
                voice ? voice.lang : "ml-IN";

            utterance.voice =
                voice || null;

            utterance.rate = 0.95;
            utterance.pitch = 1;

            window.speechSynthesis.speak(utterance);
        };

        if (
            window.speechSynthesis.getVoices().length
        ) {
            speak();
        } else {
            window.speechSynthesis.onvoiceschanged = speak;
        }

    } catch (error) {

        console.log("Voice error:", error);

    }
}


// =====================================================
// LOCAL ANSWERS
// =====================================================

function getLocalAnswer(question) {

    const text =
        question.toLowerCase().trim();


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
    // BACHELOR PARTY DATE
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
    // WEDDING LOCATION
    // =================================================

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
                'Wedding location: <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">Open Google Maps 📍</a>',

            speech:
                "കല്യാണത്തിന്റെ സ്ഥലം ഗൂഗിൾ മാപ്പിൽ കാണാം."

        };

    }


    // =================================================
    // WHO IS HAREESH
    // =================================================

    if (
        text.includes("who is hareesh") ||
        text.includes("who is hareesh moyalali") ||
        text.includes("who is moyalali") ||
        text.includes("hareesh moyalali")
    ) {

        return {

            text:
                "Hareesh Moyalali is the fictional central character of this website and the imagined Empire of Everything.",

            speech:
                "ഹരീഷ് മായലാലി ഈ വെബ്സൈറ്റിലെ സാങ്കൽപ്പിക പ്രധാന കഥാപാത്രമാണ്."

        };

    }


    // =================================================
    // EMPIRE
    // =================================================

    if (
        text.includes("tell me about the empire") ||
        text.includes("what is the empire") ||
        text === "empire" ||
        text.includes("empire of everything")
    ) {

        return {

            text:
                "The Empire of Everything is a fictional universe created for this website, built around the character Hareesh Moyalali.",

            speech:
                "ദി എംപയർ ഓഫ് എവരിതിംഗ് ഈ വെബ്സൈറ്റിനായി സൃഷ്ടിച്ച ഒരു സാങ്കൽപ്പിക ലോകമാണ്."

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

    if (!messages) return;

    const message =
        document.createElement("div");

    message.className =
        "chat-message " + type;

    message.innerHTML = text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;

}


// =====================================================
// THINKING MESSAGE
// =====================================================

function showThinking() {

    removeThinking();

    const messages =
        document.getElementById("chat-messages");

    if (!messages) return;

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
        document.getElementById("thinking-message");

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
            encodeURIComponent(question) +
            "&q=" +
            encodeURIComponent(question);


        console.log(
            "Sending question to Google:",
            question
        );


        console.log(
            "Google URL:",
            url
        );


        const controller =
            new AbortController();


        const timeout =
            setTimeout(
                () => controller.abort(),
                20000
            );


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
            await response.text();


        console.log(
            "Google raw response:",
            raw
        );


        if (!raw || !raw.trim()) {

            return null;

        }


        const cleaned =
            raw.trim();


        // =================================================
        // TRY JSON
        // =================================================

        try {

            const data =
                JSON.parse(cleaned);


            console.log(
                "Google JSON:",
                data
            );


            // JSON string

            if (typeof data === "string") {

                return data;

            }


            // answer

            if (data.answer) {

                return data.answer;

            }


            // response

            if (data.response) {

                return data.response;

            }


            // text

            if (data.text) {

                return data.text;

            }


            // result

            if (data.result) {

                return data.result;

            }


            // message

            if (data.message) {

                return data.message;

            }


        } catch (jsonError) {

            console.log(
                "Google response is not JSON."
            );

        }


        // =================================================
        // PLAIN TEXT FALLBACK
        // =================================================

        return cleaned;


    } catch (error) {

        console.error(
            "Google Apps Script error:",
            error
        );

        return null;

    }

}


// =====================================================
// HANDLE QUESTION
// =====================================================

async function handleQuestion(question) {

    if (!question) return;


    const cleanQuestion =
        question.trim();


    if (!cleanQuestion) return;


    // Show user message

    addMessage(
        cleanQuestion,
        "user"
    );


    // =================================================
    // CHECK LOCAL CUSTOM ANSWERS FIRST
    // =================================================

    const localAnswer =
        getLocalAnswer(cleanQuestion);


    if (localAnswer) {

        addMessage(
            localAnswer.text,
            "bot"
        );


        if (localAnswer.speech) {

            speakMalayalam(
                localAnswer.speech
            );

        }

        return;

    }


    // =================================================
    // GOOGLE AI
    // =================================================

    showThinking();


    const googleAnswer =
        await askGoogle(cleanQuestion);


    removeThinking();


    if (googleAnswer) {

        addMessage(
            googleAnswer,
            "bot"
        );

        speakMalayalam(
            googleAnswer
        );

        return;

    }


    // =================================================
    // ERROR / FALLBACK
    // =================================================

    addMessage(
        "Sorry, Hareesh AI could not connect right now. Please try again.",
        "bot"
    );

}


// =====================================================
// CHAT INITIALIZATION
// =====================================================

function initializeChat() {

    console.log(
        "Hareesh AI chat initializing..."
    );


    const form =
        document.getElementById("chat-form");


    const input =
        document.getElementById("chat-input");


    const quickButtons =
        document.querySelectorAll(
            ".quick-question"
        );


    // =================================================
    // CHAT FORM
    // =================================================

    if (form && input) {

        form.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                const question =
                    input.value.trim();


                if (!question) {

                    return;

                }


                // Disable button while processing

                const button =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                if (button) {

                    button.disabled = true;

                    button.textContent =
                        "Sending...";

                }


                input.value = "";


                try {

                    await handleQuestion(
                        question
                    );

                } catch (error) {

                    console.error(
                        "Chat error:",
                        error
                    );

                    removeThinking();

                    addMessage(
                        "Something went wrong. Please try again.",
                        "bot"
                    );

                }


                // Re-enable button

                if (button) {

                    button.disabled = false;

                    button.textContent =
                        "Send";

                }


                input.focus();

            }
        );

    }


    // =================================================
    // QUICK QUESTION BUTTONS
    // =================================================

    quickButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                async function() {

                    const question =
                        button.textContent.trim();


                    if (!question) return;


                    if (input) {

                        input.value =
                            question;

                        input.focus();

                    }


                    // Submit through the same
                    // chat handler

                    if (form) {

                        if (
                            typeof form.requestSubmit ===
                            "function"
                        ) {

                            form.requestSubmit();

                        } else {

                            handleQuestion(
                                question
                            );

                        }

                    } else {

                        handleQuestion(
                            question
                        );

                    }

                }
            );

        }
    );


    console.log(
        "Hareesh AI chat initialized successfully."
    );

}


// =====================================================
// YEAR
// =====================================================

function updateYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


// =====================================================
// MOBILE MENU
// =====================================================

function initializeMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const nav =
        document.querySelector(
            ".nav"
        );


    if (!menuToggle || !nav) {

        return;

    }


    menuToggle.addEventListener(
        "click",
        function() {

            nav.classList.toggle(
                "open"
            );

        }
    );


    // Close menu after clicking a link

    const links =
        nav.querySelectorAll("a");


    links.forEach(
        function(link) {

            link.addEventListener(
                "click",
                function() {

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


// =====================================================
// START EVERYTHING
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeChat();

        initializeMenu();

        updateYear();

    }
);
