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

            const voice =
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

            window.speechSynthesis.speak(
                utterance
            );
        };

        if (
            window.speechSynthesis.getVoices().length
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
        question
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
        text.includes("wedding venue") ||
        text.includes("where is the wedding") ||
        text.includes("where is the marriage") ||
        text.includes("where is marriage") ||
        text.includes("where is the wedding location") ||
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
        text.includes("empire of everything")
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
        document.getElementById(
            "chat-messages"
        );

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

    messages.appendChild(
        message
    );

    messages.scrollTop =
        messages.scrollHeight;
}


// =====================================================
// THINKING
// =====================================================

function showThinking() {

    removeThinking();

    const messages =
        document.getElementById(
            "chat-messages"
        );

    if (!messages) return;

    const thinking =
        document.createElement("div");

    thinking.className =
        "chat-message bot";

    thinking.id =
        "thinking-message";

    thinking.textContent =
        "Hareesh AI is thinking...";

    messages.appendChild(
        thinking
    );

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


            // ---------------------------------------------
            // SIMPLE STRING RESPONSE
            // ---------------------------------------------

            if (typeof data === "string") {

                return data;
            }


            // ---------------------------------------------
            // APPS SCRIPT RETURNS { reply: "..." }
            // ---------------------------------------------

            if (data.reply) {

                return data.reply;
            }


            // ---------------------------------------------
            // OTHER POSSIBLE RESPONSE FIELDS
            // ---------------------------------------------

            if (data.answer) {

                return data.answer;
            }

            if (data.response) {

                return data.response;
            }

            if (data.text) {

                return data.text;
            }

            if (data.result) {

                return data.result;
            }

            if (data.message) {

                return data.message;
            }


            // ---------------------------------------------
            // ERROR FROM APPS SCRIPT
            // ---------------------------------------------

            if (data.error) {

                console.error(
                    "Google Apps Script error:",
                    data.error
                );

                return null;
            }

        } catch (jsonError) {

            console.log(
                "Google response is plain text."
            );
        }


        // =================================================
        // PLAIN TEXT FALLBACK
        // =================================================

        return cleaned;

    } catch (error) {

        console.error(
            "Google connection error:",
            error
        );

        return null;
    }
}


// =====================================================
// HANDLE QUESTION
// =====================================================

async function handleQuestion(question) {

    const cleanQuestion =
        question.trim();

    if (!cleanQuestion) {

        return;
    }


    // =================================================
    // SHOW USER QUESTION
    // =================================================

    addMessage(
        cleanQuestion,
        "user"
    );


    // =================================================
    // LOCAL CUSTOM ANSWER FIRST
    // =================================================

    const localAnswer =
        getLocalAnswer(
            cleanQuestion
        );

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
        await askGoogle(
            cleanQuestion
        );

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
    // ERROR
    // =================================================

    addMessage(
        "Sorry, Hareesh AI could not connect right now. Please try again.",
        "bot"
    );
}


// =====================================================
// SEND QUESTION
// =====================================================

async function sendQuestion() {

    const input =
        document.getElementById(
            "chat-input"
        );

    if (!input) {

        console.error(
            "Hareesh AI ERROR: chat-input not found."
        );

        return;
    }

    const question =
        input.value.trim();

    if (!question) {

        input.focus();

        return;
    }

    input.value = "";

    await handleQuestion(
        question
    );

    input.focus();
}


// =====================================================
// INITIALIZE CHAT
// =====================================================

function initializeChat() {

    console.log(
        "Hareesh AI chat initializing..."
    );


    const form =
        document.getElementById(
            "chat-form"
        );

    const input =
        document.getElementById(
            "chat-input"
        );


    // =================================================
    // FORM
    // =================================================

    if (form) {

        form.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();

                event.stopPropagation();

                const button =
                    form.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );

                if (button) {

                    button.disabled =
                        true;

                    if (
                        button.tagName.toLowerCase() ===
                        "input"
                    ) {

                        button.value =
                            "Sending...";

                    } else {

                        button.textContent =
                            "Sending...";
                    }
                }


                try {

                    await sendQuestion();

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


                if (button) {

                    button.disabled =
                        false;

                    if (
                        button.tagName.toLowerCase() ===
                        "input"
                    ) {

                        button.value =
                            "Send";

                    } else {

                        button.textContent =
                            "Send";
                    }
                }

            }
        );

    } else {

        console.error(
            "Hareesh AI ERROR: chat-form not found."
        );
    }


    // =================================================
    // ENTER KEY
    // =================================================

    if (input) {

        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    if (form) {

                        if (
                            typeof form.requestSubmit ===
                            "function"
                        ) {

                            form.requestSubmit();

                        } else {

                            form.dispatchEvent(
                                new Event(
                                    "submit",
                                    {
                                        bubbles: true,
                                        cancelable: true
                                    }
                                )
                            );
                        }

                    } else {

                        sendQuestion();
                    }
                }

            }
        );

    } else {

        console.error(
            "Hareesh AI ERROR: chat-input not found."
        );
    }


    // =================================================
    // QUICK QUESTION BUTTONS
    // =================================================

    const quickButtons =
        document.querySelectorAll(
            ".quick-question"
        );

    console.log(
        "Quick buttons found:",
        quickButtons.length
    );

    quickButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                async function(event) {

                    event.preventDefault();

                    event.stopPropagation();

                    const question =
                        button.textContent.trim();

                    if (!question) return;

                    if (input) {

                        in
