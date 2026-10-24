# 🎓 Intute — Your Live Teaching Assistant

**Learn interactively. Ask questions naturally. Understand concepts better.**

Intute is an AI-powered conversational visual learning assistant designed to make learning more engaging and accessible. Powered by Google's Gemini AI, the project aims to provide an interactive learning experience where users can explore topics, ask questions, and learn through AI-assisted conversations.

## ✨ Features

- 🤖 **AI-Powered Tutoring** — Conversational learning assistance powered by Gemini.
- 💬 **Interactive Conversations** — Ask questions and explore concepts through a conversational interface.
- 🎨 **Visual Learning Experience** — A user interface designed to support engaging, intuitive learning.
- ⚡ **Modern Web Application** — Built with React, TypeScript, and Vite.
- 🔌 **Gemini API Integration** — Connects the application to Google's generative AI capabilities.
- 📱 **Responsive Interface** — Designed for an accessible web-based learning experience.

*Specific capabilities, including live voice interaction and WebSocket behavior, depend on the implementation and configuration of the application.*

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe development |
| Vite | Development server and build tooling |
| Google Gemini API | AI-powered learning assistance |
| CSS | Styling and visual presentation |
| Node.js and npm | Development environment and dependency management |
| Vercel | Deployment platform |

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Nithinreddy3093/intute.git
cd intute
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

For local development, keep `GEMINI_API_KEY` in an ignored `.env.local` file. In Vercel, add it under **Project Settings → Environment Variables** for Production and Preview.

The browser requests a short-lived, single-use Gemini Live token from the server endpoint. The long-lived `GEMINI_API_KEY` stays on the server and must never be added as a `VITE_*` variable or embedded in the client bundle.

**Security:** Never commit API keys or private credentials to GitHub.

### 4. Run the Development Server

```bash
vercel dev
```

This runs the Vite app together with the `/api/live-token` serverless endpoint. Configure the local `GEMINI_API_KEY` before connecting to Gemini.

### 5. Build for Production

```bash
npm run build
```

Check `package.json` for the exact scripts supported by the current project.

## ☁️ Deployment on Vercel

The project README documents Vercel as a deployment option.

1. Import the GitHub repository into [Vercel](https://vercel.com/) and select the Vite preset.
2. Add `GEMINI_API_KEY` in the project's Production and Preview environment variables. The key is used only by `/api/live-token`, which issues short-lived, single-use tokens for browser Live API sessions.
3. Deploy the application and verify its main learning workflows.

## 📂 Project Structure

```text
intute/
├── components/       # Reusable UI components
├── contexts/         # Application contexts
├── hooks/            # Custom React hooks
├── lib/              # Shared application utilities
├── App.tsx           # Main application component
├── index.tsx         # Application entry point
├── index.css         # Global styles
├── DESIGN.md         # Design documentation
├── .env.example      # Environment variable template
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## 🔐 Security and Privacy

- Store API keys securely and never commit secrets to source control.
- Keep privileged API calls on the server where appropriate.
- Avoid sending personal or sensitive information to AI services unnecessarily.
- Validate inputs and handle API errors gracefully.
- Review the data sent to Gemini and the applicable provider privacy policies.

## 🔮 Future Enhancements

Potential improvements for Intute include:

- Personalized learning paths
- AI-generated quizzes and practice questions
- Progress tracking and learning history
- Multiple learning modes for different subjects
- Interactive diagrams and concept visualizations
- Session summaries and revision notes
- Accessibility improvements and multilingual learning

## 👨‍💻 Author

**Nithin Reddy**

- GitHub: [@Nithinreddy3093](https://github.com/Nithinreddy3093)
- Repository: [Intute](https://github.com/Nithinreddy3093/intute)

## 📄 License

This project is licensed under the **Apache License 2.0**. See the `LICENSE` file for details.

---

**Intute — Making learning easier, one conversation at a time.**
