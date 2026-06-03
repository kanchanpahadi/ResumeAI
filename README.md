# AI Resume Builder

A web application for building professional resumes with AI assistance — generate summaries, experience bullet points, cover letters, and find real job matches, all from one place.

## Features

- 🔐 User authentication with Clerk
- 📝 Create and manage multiple resumes
- 📄 Import existing resume from PDF — AI auto-fills all fields
- 🤖 AI-powered content generation using Groq (Llama 3.3)
- ✉️ Cover letter generator — manual entry or paste a job description
- 💼 Real job matching — AI picks search queries from your resume and pulls live listings
- 🎨 Custom theme colors with live preview
- 🖼️ Multiple resume templates (Classic, Minimal, Modern, Executive)
- 👀 Live resume preview while editing
- 📊 Resume completion score
- 💾 Data stored in Strapi backend

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Authentication:** Clerk
- **Backend/Database:** Strapi (runs locally)
- **AI:** Groq API — Llama 3.3 70b (free)
- **Job Listings:** JSearch API via RapidAPI
- **UI Components:** shadcn/ui

## Prerequisites

- Node.js installed
- Groq API key — free at https://console.groq.com
- Clerk account — free at https://clerk.com
- RapidAPI key — free at https://rapidapi.com (for job matching feature)

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

After Strapi opens in the browser at `http://localhost:1337/admin`:

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
| template | Text (Short) |
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

### 5. Get Strapi API token

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
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_BASE_URL=http://localhost:5173
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

1. Sign up or log in with your account
2. Click **New Resume** to create from scratch or import an existing PDF
3. Fill in your details step by step:
   - Personal Details
   - Summary — use AI to generate based on your job title
   - Experience — use AI to generate bullet points per role
   - Education
   - Skills
   - Cover Letter — generate from your resume or paste a job description
   - Job Matches — AI finds real current listings that match your profile
4. Pick a theme color and template from the top bar
5. Download as PDF or share your resume link

## Notes

- Strapi must be running whenever you use the app
- All resume data is stored locally in your Strapi instance
- AI features require a valid Groq API key
- Job matching requires a RapidAPI key with JSearch enabled
- For best PDF output, use Chrome or Edge with Background graphics enabled in print settings