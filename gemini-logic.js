// gemini-logic.js

(function() { // IIFE
    // ... (Configurations: AI_CONTAINER_ID, DEFAULT_SYSTEM_PROMPT, NETLIFY_SITE_NAME etc. remain the same) ...
    // --- Configuration for the Injector ---
    const AI_CONTAINER_ID = 'naadirs-ai-assistant-container';

    // --- Default Configurations ---
    const DEFAULT_SYSTEM_PROMPT = `
You are "Naadir's AI Assistant," a highly professional and knowledgeable assistant dedicated to representing Naadir's skills, experience, and portfolio projects with utmost professionalism and accuracy. You must avoid any inappropriate content at all times.

Naadir is a highly employable tech professional with experience working in data teams and expertise in Excel, VBA, Python and Power BI. Your role is to assist users by providing clear, concise, and accurate information about Naadir's portfolio, skills, and projects. Your responses should be as concise and brief as possible, providing only the necessary information as applicable or appropriate.

Despite his skills with technology Naadir is employable in any profession as he is highly adaptable, can learn new systems quickly, thinks outside the box and is a hard worker, and willing to complete work at a very high standard. Naadir can be an assett to a business.

Portfolio Projects and Skills:

Python Desktop Applications:
- PyQt6 Financial Dashboard: An interactive finance KPIs dashboard with automated data importing using the PyQt Framework for Python.
- YouTube Viewer Analytics: A cross-platform PyQt6 dashboard integrating the YouTube Data API to visualize channel view-count trends.
- PyQt6 Health Dashboard: Utilizes OpenGL within a PyQt Health Dashboard for dynamic 3D model selection and dynamic metrics.
- Mortgage Overpayment and Amortization Tracker: A self-built mortgage amortization simulation tool with customizable overpayments analysis.

Python Automation:
- Python / ExtendScript Export Pipeline: Fully automated Illustrator export pipeline with Python.

AI Projects:
- CCMI Gen AI Chatbot: Custom ChatGPT built leveraging Gemini 1.5 flash model for team use.
- AI Quiz Bot: Engineered AI Quiz Bot with Google Gemini 1.5-Flash for interactive learning.

Web Projects:
- CCMI Team Website: Front-end site showcasing design and functionality for a professional data team.
- Rain Drops Arithmetics Game: Replica of Lumosity's brain training game Rain Drops.
- Hexamatch Fractions Game: Engaging game to develop intuitive understanding of fractions.
- AlgebraVerse Algebra Game: Progressive algebra challenges for relearning algebra.
- Logic Grid Boolean Game: Visualizes logic gates to improve Boolean reasoning.

Naadir's skills include Python development, automation, AI and generative AI, web development, data visualization, and Power BI.

Always maintain a professional tone, provide helpful and accurate responses, and emphasize Naadir's expertise and portfolio highlights when relevant.

If you are unsure about any information, clearly state that you cannot confirm or provide the details.

Remember, you are Naadir's AI Assistant, here to showcase his skills and projects with professionalism and clarity.
    `.trim();
    const DEFAULT_TYPING_SPEED_MS = 10; // Increased typing speed for faster output
    const DEFAULT_PLACEHOLDER_TEXT = "Ask Naadir's AI...";
    const DEFAULT_BUTTON_TEXT = "Send";
    const DEFAULT_INITIAL_MESSAGE = "Hello! How can I assist you today?";
    const DEFAULT_TITLE = "Naadir's AI Assistant";

    const NETLIFY_SITE_NAME = 'subtle-khapse-c232ff'; // <<<< YOUR NETLIFY SITE NAME
    const NETLIFY_FUNCTION_URL = `https://${NETLIFY_SITE_NAME}.netlify.app/.netlify/functions/gemini-proxy`;

    let parentContainer;
    let aiWidget;
    let togglerButton;
    let responseArea;
    let responseTextElement;
    let typingCursorElement;
    let userInputElement;
    let sendButtonElement;

    let conversationHistory = [];
    let isAITyping = false;
    let typingSpeedMs = DEFAULT_TYPING_SPEED_MS;
    let isExpanded = false;
    let firstOpen = true; // To handle initial message on first actual expansion

    function buildUI(container) {
        // ... (buildUI content remains the same as the previous version)
        const systemPrompt = DEFAULT_SYSTEM_PROMPT;
        typingSpeedMs = DEFAULT_TYPING_SPEED_MS;
        const placeholderText = DEFAULT_PLACEHOLDER_TEXT;
        const buttonText = DEFAULT_BUTTON_TEXT;
        const titleText = DEFAULT_TITLE;
        const uniqueSuffix = container.id || Math.random().toString(36).substring(7);

        conversationHistory = [{ role: "user", parts: [{ text: systemPrompt }] }];

        container.innerHTML = `
            <button class="ai-assistant-toggler" aria-expanded="false" aria-controls="ai-widget-content-${uniqueSuffix}">
                Naadir's AI Assistant
            </button>
            <div class="ai-assistant-widget" id="ai-widget-content-${uniqueSuffix}" style="display: none;"> 
                <div class="ai-widget-header">
                </div>
                <div class="ai-response-area-embed">
                    <span class="ai-response-text-embed"></span>
                    <span class="ai-typing-cursor-embed"></span>
                </div>
                <div class="ai-input-area-embed">
                    <input type="text" id="ai-user-input-embed-${uniqueSuffix}" placeholder="${placeholderText}">
                    <button id="ai-send-button-embed-${uniqueSuffix}" aria-label="Send query">${buttonText}</button>
                </div>
            </div>
        `;

        togglerButton = container.querySelector('.ai-assistant-toggler');
        aiWidget = container.querySelector('.ai-assistant-widget');
        responseArea = container.querySelector('.ai-response-area-embed');
        responseTextElement = container.querySelector('.ai-response-text-embed');
        typingCursorElement = container.querySelector('.ai-typing-cursor-embed');
        userInputElement = container.querySelector(`#ai-user-input-embed-${uniqueSuffix}`);
        sendButtonElement = container.querySelector(`#ai-send-button-embed-${uniqueSuffix}`);

        togglerButton.addEventListener('click', toggleWidget);
        sendButtonElement.addEventListener('click', handleUserQuery);
        userInputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserQuery();
            }
        });
    }

    function toggleWidget() {
        isExpanded = !isExpanded;
        togglerButton.setAttribute('aria-expanded', isExpanded.toString());
        const icon = togglerButton.querySelector('.toggler-icon');

        if (isExpanded) {
            togglerButton.classList.add('widget-expanded');
            aiWidget.style.display = 'flex'; // Make it visible to participate in layout for transition

            // Delay adding the class slightly to ensure 'display: flex' is applied
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { // Double requestAnimationFrame for more robustness on some browsers
                    aiWidget.classList.remove('collapsed-widget');
                    aiWidget.classList.add('expanded-widget');
                });
            });

            parentContainer.classList.add('expanded');
            // Removed icon.innerHTML update since we use text instead of SVG

            if (firstOpen && responseTextElement.textContent === '' && !isAITyping) {
                 typeResponse(DEFAULT_INITIAL_MESSAGE, true);
                 firstOpen = false; // Only trigger initial message once on first *actual* expansion
            }
            if (userInputElement) userInputElement.focus();

        } else {
            togglerButton.classList.remove('widget-expanded');
            // Directly trigger the transition by removing 'expanded' and adding 'collapsed'
            aiWidget.classList.remove('expanded-widget');
            aiWidget.classList.add('collapsed-widget'); // This class has max-height: 0, opacity: 0

            parentContainer.classList.remove('expanded');
            // Removed icon.innerHTML update since we use text instead of SVG

            // Listen for the transition to end on the widget before setting display: none
            const handleTransitionEnd = (event) => {
                // Ensure the transition is for max-height or opacity to avoid premature hiding
                if (event.propertyName === 'max-height' || event.propertyName === 'opacity') {
                    if (!isExpanded) { // Check the state again, in case of rapid toggles
                        aiWidget.style.display = 'none';
                    }
                    aiWidget.removeEventListener('transitionend', handleTransitionEnd);
                }
            };
            aiWidget.addEventListener('transitionend', handleTransitionEnd);
        }
    }

    async function typeResponse(text, isInitial = false) {
        // ... (typeResponse logic largely the same, ensure checks for element existence)
        if (!responseTextElement || !typingCursorElement || !sendButtonElement || !userInputElement || !responseArea) return;
        // Only type if expanded OR if it's an initial message and the widget is about to open
        if (!isExpanded && !(isInitial && firstOpen)) return;


        isAITyping = true;
        if(sendButtonElement) sendButtonElement.disabled = true;
        if(userInputElement) userInputElement.disabled = true;
        if(typingCursorElement) typingCursorElement.style.display = 'inline-block';
        if(responseTextElement) responseTextElement.textContent = '';

        for (let i = 0; i < text.length; i++) {
            if(responseTextElement) responseTextElement.textContent += text[i];
            // Removed truncation to allow full scrollable response
            /*
            if (responseTextElement && responseArea && responseTextElement.offsetWidth > responseArea.clientWidth - 30) {
                responseTextElement.textContent = responseTextElement.textContent.slice(0, -2) + '…';
                break;
            }
            */
            await new Promise(resolve => setTimeout(resolve, typingSpeedMs));
        }

        if(typingCursorElement) typingCursorElement.style.display = 'none';
        isAITyping = false;
        if(sendButtonElement) sendButtonElement.disabled = false;
        if(userInputElement) userInputElement.disabled = false;
        if(isExpanded && userInputElement) userInputElement.focus();

        if (!isInitial) {
            addMessageToHistory("model", text);
        }
    }

    async function handleUserQuery() {
        // ... (handleUserQuery logic largely the same, ensure checks for element existence)
        if (isAITyping || !userInputElement || !responseArea || !responseTextElement || !isExpanded) return;

        const userText = userInputElement.value.trim();
        if (!userText) return;

        addMessageToHistory("user", userText);
        userInputElement.value = '';

        if (responseTextElement.textContent.length > 0) {
            responseArea.classList.add('fade-out-embed');
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        responseArea.classList.remove('fade-out-embed');
        if(responseTextElement) responseTextElement.textContent = '';
        typeResponse("Processing...", true);

        try {
            const response = await fetch(NETLIFY_FUNCTION_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: conversationHistory }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Server error: ${response.status}`);
            }
            const data = await response.json();
            if (data.text) {
                if(responseTextElement && responseTextElement.textContent.includes("Processing...")) {
                    responseArea.classList.add('fade-out-embed');
                    await new Promise(resolve => setTimeout(resolve, 50));
                    responseArea.classList.remove('fade-out-embed');
                    if(responseTextElement) responseTextElement.textContent = '';
                }
                typeResponse(data.text);
            } else if (data.error) { throw new Error(data.error); }
            else { throw new Error("Empty response from AI."); }
        } catch (error) {
            console.error('AI Responder Error:', error);
            if(responseArea) responseArea.classList.remove('fade-out-embed');
            typeResponse(`Error: ${error.message}`, true);
            if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length -1].role === 'user') {
                conversationHistory.pop();
            }
        }
    }

    function addMessageToHistory(role, text) {
        conversationHistory.push({ role: role, parts: [{ text: text }] });
    }

    function initWhenReady() {
        parentContainer = document.getElementById(AI_CONTAINER_ID);
        if (parentContainer) {
            buildUI(parentContainer);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhenReady);
    } else {
        initWhenReady();
    }

})();