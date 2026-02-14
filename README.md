# Workflow Builder Lite

A lightweight web application that allows users to create and run simple AI-powered workflows on text input.

## 🚀 Features

- Create workflows with 2–4 steps:
  - Clean Text
  - Summarize
  - Extract Key Points
  - Tag Category
- Run workflows on input text
- View output of each step
- View last 5 workflow runs
- System status page (Server, Database, LLM health)
- Basic input validation
- Backend error handling

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Groq API (LLaMA 3.1 model)

---

## 🧠 LLM Used

- Provider: Groq
- Model: `llama-3.1-8b-instant`
- Reason:
  - Fast inference
  - Free tier available
  - OpenAI-compatible API format

---

