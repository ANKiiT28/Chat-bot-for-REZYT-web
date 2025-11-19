---
title: "Chat-bot-for-REZYT-web"
description: "Frontend-only REZYT chatbot using Fuse.js + curated Q&A dataset."
author: "Ankit Kumar"
license: "MIT"
---


<h1 align="center">🚀 Chat-bot-for-REZYT-web</h1>

<p align="center">A lightweight, frontend-only chatbot built for the REZYT web experience using Fuse.js and a curated Q&A dataset.</p>

<p align="center">
  <a href="https://chat-bot-for-rezyt-web.vercel.app/" target="_blank">
    <img alt="Live Demo"
         src="https://img.shields.io/badge/Live%20Demo-Open-brightgreen?style=for-the-badge&logo=vercel&color=2b2b2b"/>
  </a>
  &nbsp;
  <a href="#" target="_blank">
    <img alt="MIT License"
         src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/>
  </a>
  &nbsp;
  <a href="#">
    <img alt="Tech: JS HTML CSS"
         src="https://img.shields.io/badge/Tech-JS%20%7C%20HTML%20%7C%20CSS-orange?style=for-the-badge"/>
  </a>
</p>

---

## 📍 Live Preview

🔗 **Live App:** https://chat-bot-for-rezyt-web.vercel.app/

Click the preview below 👇

<p align="center">
  <a href="https://chat-bot-for-rezyt-web.vercel.app/">
    <img src="https://github.com/user-attachments/assets/1864499a-6a55-456e-b3a4-568c21fe439a"
         alt="REZYT Chatbot Preview"
         width="700">
  </a>
</p>

---

## ✨ Highlights

- 💯 **100% frontend-only** — Zero backend needed  
- 🤖 **AI-style responses** using Fuse.js fuzzy matching  
- 📦 **160+ curated Q&A** items (Users, Brands, Investors)  
- ⚡ Instant performance — works offline  
- 🎨 Clean, modern UI — easy to customize  
- 🧩 Fully open-source under MIT license  

---

## 📦 Project Structure

```text
Chat-bot-for-REZYT-web/
├── index.html          # Main UI
├── style.css           # Chat UI styling
├── script.js           # Chatbot logic + Fuse.js matching
├── fuse.js             # Fuzzy search engine
├── qa_data.js          # Curated Q&A dataset (160+ items)
├── enhance_qa.py       # (Optional) Auto-generate alternate phrasings
└── process_qa.py       # (Optional) Clean + convert QA into JS format
```

🚀 Quick Start
🔹 Option A — Double-click
Just open:
```text
Copy code
index.html
```
🔹 Option B — VS Code (Recommended)
Install Live Server extension

Right-click index.html → Open with Live Server

🧠 How It Works
qa_data.js loads all Q&A into the browser

Fuse.js indexes the questions with keywords & phrasings

User asks → fuzzy-search picks closest match

Chatbot replies instantly

If confidence is low → suggests similar questions

Everything happens inside the browser — no server.

🛠 Usage & Customization
🔹 Add/Edit Questions
Open qa_data.js and add:
```text
js
Copy code
{
  id: 161,
  category: "User",
  question: "How do I update my email?",
  answer: "Go to Profile → Settings → Update Email.",
  keywords: ["email", "update"],
  alternate_phrasings: ["Change email", "Modify email address"]
}
```
🔹 Change UI
Modify style.css to change:

Colors

Fonts

Layout

Add dark mode

Create floating widget

🔹 Improve Search Quality
Add more:

keywords

alternate_phrasings

intent field

This improves accuracy like ChatGPT.

🧰 Optional Helper Scripts
```text
#enhance_qa.py
#Auto-generates alternate question phrasings & keywords.
```
python
```text
Copy code
# enhance_qa.py
# Auto-generate alternate phrasings + extract keywords
process_qa.py
Cleans raw JSON & converts to frontend JS.
```
python
```
Copy code
# process_qa.py
# Converts enhanced JSON -> qa_data.js
```
💡 Features (What Makes It Smart)
🧠 Exact match “fast track”

🔍 Fuzzy search for typos and rephrasing

⚙️ Role-based boosting (User / Brand / Investor)

💬 Suggests related questions

⚡ Real-time responses

🔮 Future Enhancements
🎤 Voice input + speech reply

🧬 AI semantic search (embeddings)

💬 Floating widget embed for REZYT site

📊 Analytics for unanswered questions

🌙 Full dark/light theme modes

🧩 Contribution
```text
Copy code
1. Fork the repository
2. Create a new branch: feature/your-feature
3. Commit your changes
4. Push the branch
5. Open a Pull Request
Contributions are welcome!
```
📜 License
This project is licensed under the MIT License.

```java
Copy code
MIT License
Copyright (c) 2025 Ankit Kumar
(See LICENSE file for full text.)
```

👨‍💻 Author
Ankit Kumar
Creator of the REZYT Web Chatbot

If you need help, improvements, UI redesign, or advanced features — open an issue or message anytime.

<p align="center"><b>✨ Enjoy using the REZYT Chatbot — Upgrade it, Remix it, Make it yours! ✨</b></p>
yaml
Copy code

---





