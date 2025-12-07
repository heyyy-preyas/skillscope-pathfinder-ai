# SkillScope - Start All Services

## All Services Status Check

Run this to verify all services are running:

### 1️⃣ Backend (Node.js) - Port 3000
```bash
cd backend
npm start
# Should show: "Server running on port 3000"
```

### 2️⃣ Frontend (React) - Port 5173
```bash
# In project root
npm run dev
# Should show: "Local: http://localhost:5173"
```

### 3️⃣ ML Service (Flask) - Port 5000
```bash
cd ml_service
py app.py
# Should show: "Running on http://127.0.0.1:5000"
```

## Quick Start (3 Terminals Required)

**Terminal 1 - Backend:**
```bash
cd "P:\SkillScope\Project file\skillscope-pathfinder-ai\backend"
npm start
```

**Terminal 2 - Frontend:**
```bash
cd "P:\SkillScope\Project file\skillscope-pathfinder-ai"
npm run dev
```

**Terminal 3 - ML Service:**
```bash
cd "P:\SkillScope\Project file\skillscope-pathfinder-ai\ml_service"
py app.py
```

## Access Points

- 🌐 **Website**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3000/api
- 🤖 **ML Service**: http://localhost:5000

## Verify Everything is Running

Open browser and check:
- Frontend: http://localhost:5173 (should see SkillScope homepage)
- Backend: http://localhost:3000/api (should see "SkillScope Backend is running")
- ML API: http://localhost:5000 (should see ML service status)

## Stop All Services

Press `Ctrl+C` in each terminal to stop services.
