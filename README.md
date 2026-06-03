
# AI Resume Builder

A web application that helps to create professional resumes with AI assistance.

## Features

- 🔐 User authentication with Clerk
- 📝 Create and manage multiple resumes
- 🤖 AI-powered content generation using Groq (Llama 3)
- 🎨 Custom theme colors
- 👀 Live resume preview
- 💾 Data stored in Strapi backend

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Authentication:** Clerk
- **Backend/Database:** Strapi (runs locally)
- **AI:** Groq API (free)
- **UI Components:** shadcn/ui

## Prerequisites

- Node.js installed
- Groq API key (free at https://console.groq.com)
- Clerk account (free at https://clerk.com)

## Setup Instructions

### 1. Clone and install frontend

```bash
git clone <your-repo>
cd AI-resume--main
npm install
```

### 2. Create Strapi backend

```bash
cd ..
npx create-strapi-app@latest my-strapi-backend --quickstart
```

### 3. Set up Strapi collection

After Strapi opens in browser at `http://localhost:1337/admin`:

1. Go to **Content-Type Builder → Create new collection type**
2. Name it `user-resume`
3. Add these fields:

| Field | Type |
|-------|------|
| Title | Text (Short) |
| UserEmail | Text (Short) |
| UserName | Text (Short) |
| firstName | Text (Short) |
| lastName | Text (Short) |
| jobTitle | Text (Short) |
| address | Text (Short) |
| Phone | Text (Short) |
| email | Text (Short) |
| themecolor | Text (Short) |
| Summary | Text (Long) |
| Experience | JSON |
| Education | JSON |
| Skills | JSON |
| resumeId | Text (Short) |

4. Click **Save**

### 4. Set permissions

1. Go to **Settings → Roles → Public**
2. Under `user-resume` check all: `create`, `find`, `findOne`, `update`, `delete`
3. Click **Save**

### 5. Get API token

1. Go to **Settings → API Tokens → Create new API Token**
2. Set type to **Full Access**
3. Copy the token

### 6. Configure environment variables

Create a `.env` file in the frontend folder:

```properties
VITE_GROQ_API_KEY=your_groq_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRAPI_API_KEY=your_strapi_api_token
VITE_API_BASE_URL=http://localhost:1337
```

### 7. Run the app

You need **two terminals** running at the same time:

**Terminal 1 — Start Strapi:**
```bash
cd my-strapi-backend
npm run develop
```

**Terminal 2 — Start React:**
```bash
cd AI-resume--main
npm run dev
```

Open `http://localhost:5173` in your browser.

## Usage

1. Sign up / log in with your account
2. Click **+** to create a new resume
3. Fill in your details step by step:
   - Personal Details
   - Summary (use AI to generate)
   - Experience (use AI to generate bullet points)
   - Education
   - Skills
4. Pick a theme color from the top bar
5. Download or share your resume

## Notes

- Strapi must be running whenever you use the app
- All data is stored locally in Strapi
- AI features require a valid Groq API key