📌 Chat-bot-for-REZYT-web

A lightweight, browser-based chatbot for the REZYT website, built using JavaScript, Fuse.js, and a structured Q&A knowledge base.
This chatbot runs fully on the frontend, requires no backend, and answers questions for Users, Brands, and Investors using smart fuzzy search and alternate phrasings.

🌟 Features
🤖 AI-Style Chat Experience (No API Needed)

Uses Fuse.js fuzzy search to match user questions

Instant responses directly in the browser

Works offline (static HTML project)

🔍 Smart Matching

Matches questions using keywords, categories, and alternate phrasings

Suggests “Did you mean…?” when confidence is low

Supports roles: User, Brand, Investor (optional)

🧠 Built-in Q&A Knowledge Base

160+ curated questions & answers

Covers categories:

User

Brand

Investor

Technical

Policy

Security

App

General

Stored in a simple qa_data.js file (global variable)

🪄 Dataset Tools (Optional)

enhance_qa.py → auto-generates alternate phrasings & keywords

process_qa.py → cleans and converts JSON → JS format
These help make the chatbot smarter and more accurate.

📁 Project Structure
Chat-bot-for-REZYT-web/
│
├── index.html        # Main UI
├── style.css         # Chat UI styling
├── script.js         # Chat logic + Fuse.js matching
├── fuse.js           # Client-side fuzzy search engine
├── qa_data.js        # Main Q&A dataset (160+ entries)
│
├── enhance_qa.py     # Optional: auto-generate phrasings/keywords
└── process_qa.py     # Optional: clean + convert QA to JS

🚀 How to Run

You don’t need Node.js or any server.

✔ Method 1: Open Directly

Just double-click:

index.html


Your chatbot will open in your browser.

✔ Method 2: Use Live Server (Recommended)

If you use VS Code:

Install “Live Server” extension

Right-click index.html

Click Open with Live Server

This gives auto-reload & avoids file-load issues.

✨ How It Works

The chatbot works entirely in the browser:

qa_data.js loads your full Q&A dataset

script.js builds a Fuse.js search index

When the user asks something, Fuse.js finds the closest matching question

The chatbot returns the best answer or suggests related questions

No backend. No database. No hosting required.

🛠 Customize the Chatbot
Add More Questions

Open:

qa_data.js


Add entries inside the array:

{
    id: 161,
    category: "User",
    question: "How do I update my email?",
    answer: "Go to Profile → Settings → Update Email.",
    keywords: ["email", "update"],
    alternate_phrasings: ["Change email", "Update my email address"]
}

Change Chat UI

Modify:

style.css

Improve Data Quality

Use these optional scripts:

enhance_qa.py → add extra phrasings & keywords

process_qa.py → clean data + convert JSON → JS

📦 Future Enhancements

Typing animation

Better mobile UI

Voice input / voice playback

Floating widget version

Emoji + markdown support

Theme options (light/dark/system)

📄 License

MIT License — free to use, modify, and share.

👨‍💻 Author

Ankit Kumar
Creator of the REZYT Web Chatbot
