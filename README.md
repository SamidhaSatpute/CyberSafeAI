# 🛡️ CyberSafe AI
### AI-Powered Cybersecurity Awareness & Scam Detection Website

CyberSafe AI is a web-based cybersecurity awareness platform designed to help users recognize potential online scams, understand common cyber threats, and practice safer digital habits. It combines an interactive learning experience with AI-powered message analysis and a cybersecurity assistant.

The project aims to make cybersecurity knowledge more accessible, practical, and easy to understand.

## 📌 Project Overview

Online scams, phishing messages, fake job offers, fraudulent shopping websites, and financial fraud are growing concerns in the digital world. Many users struggle to identify suspicious messages and recognize common warning signs.

CyberSafe AI helps address this problem by providing an educational platform where users can analyze suspicious text, learn about cyber threats, test their knowledge, and explore recommended safety practices.

## ✨ Features

- **AI Scam Analyzer:** Analyzes submitted messages for potential phishing, scam indicators, suspicious requests, and other warning signs.
- **AI Cybersecurity Assistant:** Answers cybersecurity-related questions in simple, understandable language.
- **Cyber Threat Awareness:** Provides educational information about common online threats and fraud techniques.
- **Cyber Safety Quiz:** Helps users test their knowledge of cybersecurity and safe online practices.
- **Emergency Help:** Provides guidance on responding to suspected cyber fraud and finding official reporting resources.
- **Responsive Interface:** Designed for a clear and accessible experience across different screen sizes.
- **Privacy-Conscious Design:** API credentials are intended to be stored in environment variables rather than exposed in frontend code.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend interactions and API requests |
| Node.js | Backend runtime |
| Express.js | Backend server and API routes |
| Ollama Cloud | AI-powered responses and message analysis |
| dotenv | Environment variable configuration |
| Git & GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
CyberSafeAI/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

**Folder and file descriptions:**

- `public/index.html` — Website page structure.
- `public/style.css` — Website styling and responsive design.
- `public/app.js` — Client-side functionality and API communication.
- `server.js` — Express backend and AI API integration.
- `package.json` — Project metadata, scripts, and dependencies.
- `.gitignore` — Specifies files and folders that should not be committed to Git.
- `.env` — Local environment configuration; this file should remain private and is not included in the public repository.

## ⚙️ Requirements

Before running the project locally, install:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- An Ollama Cloud account and an API key with access to the selected model

AI availability depends on the provider's current account permissions, usage limits, and plan.

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/SamidhaSatpute/CyberSafeAI.git
```

### 2. Open the project directory

```bash
cd CyberSafeAI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project's root directory, alongside `server.js` and `package.json`.

Add the following configuration:

```env
OLLAMA_API_KEY=your_actual_ollama_cloud_api_key
OLLAMA_MODEL=gpt-oss:120b-cloud
PORT=3000
```

Replace the example API key value with your own valid key. Use a model name supported by your Ollama Cloud account.

**Security notice:** Never commit `.env` or publish your API key. Keep `.env` listed in `.gitignore`.

### 5. Start the server

```bash
npm start
```

### 6. Open the website

Visit the following address in your browser:

http://localhost:3000

The website will run locally. AI-powered features require a working Ollama Cloud configuration and internet access.

## 🔍 API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Checks backend status and AI configuration status |
| `/api/analyze` | POST | Analyzes submitted text for potential scam indicators |
| `/api/chat` | POST | Processes cybersecurity assistant conversations |

These endpoints are intended to be accessed through the running backend.

## 🔐 Security and Responsible Use

- AI-generated scam assessments are informational and may not always be correct.
- A low-risk assessment does not guarantee that a message, link, or website is safe.
- Do not enter passwords, OTPs, UPI PINs, banking credentials, or other confidential information into the analyzer.
- Do not expose API keys in frontend JavaScript or public repositories.
- Verify suspicious requests through official channels before taking action.
- In India, suspected financial cyber fraud can be reported by calling **1930** or visiting the official [National Cyber Crime Reporting Portal](https://cybercrime.gov.in/).

CyberSafe AI is an educational tool and does not replace professional cybersecurity investigation or official reporting services.

## 🎯 Project Objectives

1. Increase awareness of common cyber threats and online scams.
2. Help users recognize suspicious message patterns.
3. Make cybersecurity education more interactive and accessible.
4. Demonstrate the integration of a web frontend, backend APIs, and a cloud-based AI service.
5. Encourage safer and more responsible digital behavior.

## 🔮 Future Scope

- Support for analyzing suspicious URLs and email headers using appropriate security services.
- Additional languages for wider accessibility.
- User progress tracking and expanded cybersecurity quizzes.
- More detailed learning modules and real-world scam examples.
- Integration with verified threat intelligence sources.
- Improved accessibility and usability across devices.

## 👩‍💻 Project Information

**Project Name:** CyberSafe AI  
**Category:** Web Development and Cybersecurity Awareness  
**Project Type:** Educational web application  
**AI Provider:** Ollama Cloud  
**Repository:** [CyberSafeAI on GitHub](https://github.com/SamidhaSatpute/CyberSafeAI)

## 📄 License

No open-source license has been added to this repository yet. Until a license is selected, others generally do not have permission to reuse, modify, or distribute the code beyond what copyright law permits.

---

**CyberSafe AI — Think Before You Click. Stay Alert. Stay CyberSafe.** 🛡️
