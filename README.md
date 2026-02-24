# SwasthAI

A modern React + Vite frontend for **SwasthAI**, an AI-assisted personal and city health intelligence platform.

This project includes a public landing experience and an authenticated dashboard offering AI chat, symptom analysis, mental wellbeing tools, and city health intelligence features.

---

## 🚀 Tech Stack

- **Vite** — Fast development server and optimized production builds  
- **React** — Component-based UI library  
- **TypeScript** — Static typing for safer, scalable code  
- **React Router** — Client-side routing  
- **Tailwind CSS** — Utility-first styling system  
- **Framer Motion** — Animations and transitions  
- **Radix UI** — Accessible UI primitives  

---

## 📦 Prerequisites

Make sure the following are installed on your system:

- **Node.js** (LTS recommended — Node 18 or 20 tested)
- **npm** (comes with Node)

Verify installation:

```bash
node -v
npm -v
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd swasthai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will run locally at:

```
http://localhost:5173
```

(Port may vary depending on availability.)

---

## 📜 Available Scripts

The following scripts are defined in `package.json`:

| Command | Description |
|----------|------------|
| `npm run dev` | Starts Vite development server with HMR |
| `npm run build` | Builds the app for production (`tsc -b && vite build`) |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the project |

---

## 🗂️ Project Structure

```
swasthai/
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
│
└── src/
    ├── main.tsx
    ├── styles/
    │   ├── index.css
    │   └── theme.css
    │
    └── app/
        ├── App.tsx
        ├── routes.tsx
        │
        ├── pages/
        │   ├── Landing.tsx
        │   ├── Login.tsx
        │   ├── Signup.tsx
        │   └── app/
        │       ├── Dashboard.tsx
        │       ├── AIChat.tsx
        │       ├── SymptomScanner.tsx
        │       └── CityIntelligence.tsx
        │
        └── components/
            ├── GlassCard.tsx
            ├── PrimaryButton.tsx
            └── fig/
                └── ui/
```

### Key Files

- `index.html` — Root HTML file for Vite  
- `src/main.tsx` — React application entry point  
- `src/app/App.tsx` — Global layout and root wrapper  
- `src/app/routes.tsx` — Route configuration  
- `src/app/pages/` — Page-level components  
- `src/app/components/` — Shared UI components  
- `src/styles/` — Global styles and Tailwind configuration  

---

## 🎨 Styling & Theming

- Tailwind CSS is used with a custom theme configuration.
- Global styles are defined in `src/styles/index.css`.
- Custom theme tokens are defined in `src/styles/theme.css`.
- Restart the dev server if Tailwind config changes are made.

---

## 🌐 Deployment

To generate a production build:

```bash
npm run build
```

The optimized build will be generated inside the `dist/` directory.

You can deploy the `dist/` folder to:

- Vercel  
- Netlify  
- Firebase Hosting  
- Any static hosting provider  

For previewing the production build locally:

```bash
npm run preview
```

---

## 🤝 Contributing

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git commit -m "Add: short meaningful commit message"
   ```

3. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request for review.

Please ensure:
- Code is formatted properly
- No TypeScript errors
- ESLint passes before submitting PRs

---

## 📄 License

This project is currently private and maintained by the SwasthAI team.
