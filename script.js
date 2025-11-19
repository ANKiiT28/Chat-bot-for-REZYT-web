document.addEventListener('DOMContentLoaded', () => {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatContainer = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Initialize Fuse.js
    const fuseOptions = {
        includeScore: true,
        keys: [
            { name: 'question', weight: 0.6 },
            { name: 'alternate_phrasings', weight: 0.5 },
            { name: 'keywords', weight: 0.4 },
            { name: 'category', weight: 0.2 }
        ],
        threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
        ignoreLocation: true,
        minMatchCharLength: 3
    };
    let fuse;

    // Wait for qaData to load
    if (typeof qaData !== 'undefined') {
        fuse = new Fuse(qaData, fuseOptions);
    } else {
        console.error("QA Data not loaded!");
    }

    // Toggle Chat Window
    chatToggleBtn.addEventListener('click', () => {
        chatContainer.classList.add('active');
        chatToggleBtn.style.display = 'none';
        if (chatMessages.children.length === 0) {
            // Initial greeting with some general suggestions
            const initialSuggestions = getSuggestions("General", -1);
            addBotMessage("Hello! Welcome to REZYT. Ask me about our mission, the 90-day promise, or how to partner with us!", initialSuggestions);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        chatToggleBtn.style.display = 'flex';
    });

    // Send Message on Button Click
    sendBtn.addEventListener('click', sendMessage);

    // Send Message on Enter Key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        processUserMessage(message);
        userInput.value = '';
    }

    function processUserMessage(message) {
        addUserMessage(message);

        // Simulate bot thinking delay
        setTimeout(() => {
            const result = getBotResponse(message);

            if (result.answer) {
                // High confidence match
                let suggestions = [];
                if (result.id) {
                    suggestions = getSuggestions(result.category, result.id);
                }
                addBotMessage(result.answer, suggestions);
            } else if (result.suggestions && result.suggestions.length > 0) {
                // Low confidence, show "Did you mean?"
                addBotMessage(result.message, result.suggestions);
            } else {
                // No match
                addBotMessage(result.message);
            }
        }, 500);
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text, suggestions = []) {
        const messageWrapper = document.createElement('div');
        messageWrapper.style.display = 'flex';
        messageWrapper.style.flexDirection = 'column';
        messageWrapper.style.alignItems = 'flex-start';
        messageWrapper.style.maxWidth = '85%';

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.style.maxWidth = '100%';
        messageDiv.innerHTML = text.replace(/\n/g, '<br>');

        messageWrapper.appendChild(messageDiv);

        // Add Suggestions if available
        if (suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.classList.add('suggestions-container');

            suggestions.forEach(item => {
                const chip = document.createElement('button');
                chip.classList.add('suggestion-chip');
                // If it's a "Did you mean" suggestion, item might be just {question, id}
                chip.textContent = item.question;
                chip.addEventListener('click', () => {
                    // If it's a direct suggestion click, we want to show the answer immediately
                    // Find the exact item
                    const exactItem = qaData.find(q => q.id === item.id);
                    if (exactItem) {
                        // Show user clicked question
                        addUserMessage(exactItem.question);
                        // Show answer
                        setTimeout(() => {
                            const related = getSuggestions(exactItem.category, exactItem.id);
                            addBotMessage(exactItem.answer, related);
                        }, 300);
                    } else {
                        processUserMessage(item.question);
                    }
                });
                suggestionsDiv.appendChild(chip);
            });

            messageWrapper.appendChild(suggestionsDiv);
        }

        chatMessages.appendChild(messageWrapper);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function computeConfidence(fuseScore, item) {
        // fuseScore is 0 (perfect) → 1 (worst). convert to 0..1 confidence
        let base = Math.max(0, 1 - fuseScore);

        // Boost for priority items
        const priorityBoost = (item.priority || 1) * 0.05;

        let confidence = Math.min(1, base + priorityBoost);
        return confidence;
    }

    function calculateJaccardSimilarity(str1, str2) {
        const set1 = new Set(str1.toLowerCase().split(/\s+/));
        const set2 = new Set(str2.toLowerCase().split(/\s+/));

        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }

    function getBotResponse(input) {
        if (!fuse) return { message: "System initializing..." };

        const lowerInput = input.toLowerCase();

        // 1. Exact Match Check (Optimization)
        const exact = qaData.find(q => q.question.toLowerCase() === lowerInput);
        if (exact) {
            return { answer: exact.answer, id: exact.id, category: exact.category, confidence: 1 };
        }

        // 2. Fuse Search
        const results = fuse.search(input);

        if (results.length === 0) {
            return {
                answer: null,
                message: "Sorry, I'm unable to find that. You can chat with our agent."
            };
        }

        // 3. Process Results
        const topResult = results[0];
        const fuseConfidence = computeConfidence(topResult.score, topResult.item);

        // Jaccard Similarity Check (Smart Verification)
        const jaccardScore = calculateJaccardSimilarity(input, topResult.item.question);

        console.log(`Query: "${input}" -> Top: "${topResult.item.question}" (Fuse: ${fuseConfidence.toFixed(2)}, Jaccard: ${jaccardScore.toFixed(2)})`);

        // Thresholds
        const HIGH_CONFIDENCE = 0.7;
        const JACCARD_THRESHOLD = 0.2; // Require at least some word overlap

        // Hybrid Condition: Must have high Fuse confidence AND decent word overlap
        if (fuseConfidence >= HIGH_CONFIDENCE && jaccardScore >= JACCARD_THRESHOLD) {
            return {
                answer: topResult.item.answer,
                id: topResult.item.id,
                category: topResult.item.category,
                confidence: fuseConfidence
            };
        } else {
            // Low confidence - return suggestions
            const suggestions = results.slice(0, 3).map(r => ({
                id: r.item.id,
                question: r.item.question
            }));

            return {
                answer: null,
                suggestions: suggestions,
                message: "Sorry, I'm unable to find that. You can chat with our agent."
            };
        }
    }

    function getSuggestions(category, currentId) {
        // Filter by category
        let related = qaData.filter(item => item.category === category && item.id !== currentId);

        // If not enough related in category, fill with others
        if (related.length < 3) {
            const others = qaData.filter(item => item.id !== currentId && !related.includes(item));
            related = related.concat(others);
        }

        // Shuffle and pick 3
        return related.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    // Live Search Suggestions
    const suggestionsBox = document.getElementById('suggestions-box');

    userInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // Hide suggestions if input is too short
        if (query.length < 2) {
            suggestionsBox.classList.remove('active');
            suggestionsBox.innerHTML = '';
            return;
        }

        // Search using Fuse.js
        if (!fuse) return;
        const results = fuse.search(query);

        // Show top 5 results
        if (results.length > 0) {
            const topResults = results.slice(0, 5);
            suggestionsBox.innerHTML = '';

            topResults.forEach(result => {
                const item = document.createElement('div');
                item.classList.add('suggestion-item');
                item.textContent = result.item.question;

                item.addEventListener('click', () => {
                    // Fill input and hide suggestions
                    userInput.value = result.item.question;
                    suggestionsBox.classList.remove('active');
                    suggestionsBox.innerHTML = '';
                    // Auto-send the message
                    sendMessage();
                });

                suggestionsBox.appendChild(item);
            });

            suggestionsBox.classList.add('active');
        } else {
            suggestionsBox.classList.remove('active');
            suggestionsBox.innerHTML = '';
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!userInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.classList.remove('active');
            suggestionsBox.innerHTML = '';
        }
    });
});
