
<p align="center">
  <img src="<img width="1369" height="895" alt="image" src="https://github.com/user-attachments/assets/59811da2-d613-40f7-9846-c8bd7f421644" />" 
       alt="rezyt-chatbot" 
       width="100%" />
</p>

# 🚀 Chat-bot-for-REZYT-web

> A lightweight, **frontend-only** AI-style chatbot for the **REZYT** website.  
> Uses **Fuse.js** fuzzy search and a curated Q&A dataset to answer Users, Brands and Investors — *no back-end required*.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)  
[![Status](https://img.shields.io/badge/status-alpha-yellow.svg)](https://github.com/your-username/Chat-bot-for-REZYT-web)  
[![Tech](https://img.shields.io/badge/tech-JS%20%7C%20HTML%20%7C%20CSS-orange.svg)](#)

---

## 📋 Table of Contents

- [Highlights](#✨-highlights)
- [Demo](#🎯-demo-try-it-instantly)
- [Project structure](#📦-project-structure)
- [Quick start](#🚀-quick-start---open-in-30s)
- [How it works](#✨-how-it-works)
- [Usage & Customization](#🛠-usage--customization)
- [Features](#💡-features)
- [Optional helper scripts](#🧰-optional-helper-scripts)
- [Future ideas](#🔮-future-ideas)
- [Contributing](#🧩-contribution)
- [License](#📜-license)
- [Author](#👨‍💻-author)

---

## ✨ Highlights

- **Frontend-only** — run from `index.html` (no server required).  
- **Smart matching** with **Fuse.js** (fuzzy search + alternate phrasings).  
- **160+ curated Q&A** entries covering Users, Brands & Investors.  
- Fast, lightweight, and easy to customize — ideal for demos and prototypes.

---

## 🎯 Demo — Try it instantly

Open `index.html` in your browser or use VS Code **Live Server**.

> **Tip:** For best experience use Chrome or Edge and open with Live Server for auto-reload.

---

## 📦 Project structure



chat boat/
├── index.html # Main UI
├── style.css # Chat UI styling
├── script.js # Chat logic + Fuse.js matching
├── fuse.js # Client-side fuzzy search engine (local copy)
├── qa_data.js # Main Q&A dataset (160+ entries)
├── enhance_qa.py # (opt) generate alternate phrasings & keywords
└── process_qa.py # (opt) clean + convert QA to js/json


---

## 🌈 Visual Preview

Add a screenshot or GIF to `assets/chat-preview.gif` and it will appear here:

![Chat UI Preview](assets/chat-preview.gif)

> If you don't have an asset yet, create one with a quick screen-record (GIF) of the chat UI.

---

## 🚀 Quick start — open in 30s

### Option A — double-click
1. Clone or download this repo.  
2. Double-click `index.html` to open in your browser.

### Option B — VS Code (recommended)
1. Install the **Live Server** extension.  
2. Right-click `index.html` → **Open with Live Server**.

---

## ✨ How it works

1. `qa_data.js` exposes a `qaData` array containing the curated Q&A.  
2. `script.js` builds a **Fuse.js** index from `qaData`.  
3. When a user asks a question, Fuse finds the closest match (supports typos & rephrasing).  
4. The UI shows the best answer or friendly suggestions if confidence is low.

No server. No DB. All runs in the browser.

---

## 🛠 Usage & Customization

### Edit / Add Q&A
Open `qa_data.js` and add entries in this format:

```js
{
  id: 161,
  category: "User",
  question: "How do I update my email?",
  answer: "Go to Profile → Settings → Update Email.",
  keywords: ["email", "update"],
  alternate_phrasings: ["Change email", "Update my email address"]
}

Tweak the UI

Modify style.css to change colors, fonts, spacing or convert the layout into a floating chat widget.

Improve matching

Add alternate_phrasings (3–5 per question) to increase recall.

Add keywords and intent fields to better tune ranking weights in script.js.

💡 Features (what makes it smart)

Exact-match fast path — instant perfect answers for exact questions.

Fuzzy search — handles typos, synonyms and wording variations.

Role awareness (User / Brand / Investor) — optional role-based boosting.

Confidence & suggestions — if confidence is low, the bot suggests nearby Qs.

🧰 Optional helper scripts

enhance_qa.py — auto-generate alternate phrasings & extract keywords.

process_qa.py — clean the dataset and export qa_data.js for the frontend.

These scripts run locally with Python 3 and help keep your dataset clean and powerful.

🔮 Future ideas

Voice input & TTS replies

Semantic search with embeddings + vector DB for deeper understanding

Floating chat widget to embed on REZYT pages

Analytics for unanswered queries to guide dataset improvements

🧩 Contribution

Contributions are welcome!

Fork the repo

Create a branch (feature/your-feature)

Commit your changes and push

Open a Pull Request

Please keep changes focused and open an issue for larger features.

📜 License

This project is released under the MIT License — see LICENSE
 for details.

👨‍💻 Author

Ankit Kumar — creator of the REZYT Web Chatbot
If you want help or collaboration — open an issue or DM me.

🙌 What next?

I can also:

generate a README.html preview,

create a GIF/screenshot and add it to the README, or

produce a repo banner/logo SVG for the top of the file.

Which one should I do next?


If you want, I’ll:
- create a **banner.svg** (logo) and add it to `assets/`,  
- render a **GIF** of your chat component (I’ll give exact steps you can run locally), or  
- convert this README to a beautiful `README.html` for a project site.  

Which would you like me to generate now?
::contentReference[oaicite:0]{index=0}
