# DevTrack | Developer Task Management Dashboard

A full-stack, relational task management dashboard engineered specifically for developers. DevTrack is designed as a streamlined, lightweight alternative to tools like Jira, Linear, and Trello, enabling users to organize projects, manage engineering tickets, and track development workflows with a clean and efficient interface.

---

## 👨‍💻 Developer

**Amit Mohanty ~**

---

## 🚀 Tech Stack

### Frontend
- React
- TypeScript
- Framer Motion

### Styling
- Pure Semantic CSS
- Custom 3D Minimalist Design System

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB Atlas
- Mongoose ODM

---

## ✨ Features

### Relational Data Architecture
Implements a strict one-to-many relationship using Mongoose, linking multiple tasks to their parent projects through `ObjectId` references.

### Full CRUD Operations
Perform complete task management through RESTful API endpoints:

- Create tasks
- View tasks
- Update task status
- Delete tasks

### Premium Minimalist UI
Built with a clean SaaS-inspired design featuring:

- Pure white canvas
- Warm 3D drop shadows
- Bespoke color palette:
  - Linen
  - Smoky Rose
  - Dusty Rose
  - Taupe
  - Pale Oak

### Custom React Modal System
Replaces native browser prompts with a custom in-app modal experience for creating projects and managing user interactions.

### Smooth Hardware-Accelerated Animations
Combines Framer Motion animations with CSS optimization techniques such as `will-change: transform` for responsive, GPU-accelerated interactions.

### End-to-End Type Safety
Strict TypeScript interfaces ensure consistency across the entire application:

- `ITask`
- `IProject`

This approach minimizes runtime errors and guarantees reliable data flow between frontend and backend systems.

### Automated Timestamp Management
Uses Mongoose's built-in:

```ts
{ timestamps: true }
````

to automatically track creation and modification dates without additional backend logic.

---

## 📂 Project Architecture

The application follows a modular and scalable architecture designed for maintainability and future growth.

### Frontend

#### App.tsx (Data Controller)

Responsible for:

* Global state management
* Project selection
* Task management
* API communication using Axios

#### UI Components

Reusable components include:

* `Sidebar.tsx`
* `TaskCard.tsx`

This separation keeps business logic isolated from presentation logic and promotes clean code practices.

### Backend

#### Models

Database schemas are organized independently:

```text
models/
├── Project.ts
└── Task.ts
```

#### Server & Routes

Network routing and API logic remain separated from data definitions:

```text
src/
└── server.ts
```

---

## 📁 Project Structure

```text
devtrack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   └── TaskCard.tsx
│   │   └── App.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Project.ts
│   │   │   └── Task.ts
│   │   └── server.ts
│   │
│   └── package.json
│
└── README.md
```

---

## 🛠️ Getting Started

To run the application locally, open two terminal windows—one for the backend and one for the frontend.

### 1. Start the Backend API

```bash
cd backend
npm install
npx ts-node-dev src/server.ts
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

The backend API will run on:

```text
http://localhost:5001
```

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will launch at:

```text
http://localhost:5173
```

---

## 🔗 API Overview

### Projects

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| GET    | `/projects` | Fetch all projects   |
| POST   | `/projects` | Create a new project |

### Tasks

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/tasks/:projectId` | Get tasks for a project |
| POST   | `/tasks`            | Create a task           |
| PATCH  | `/tasks/:id`        | Update task status      |
| DELETE | `/tasks/:id`        | Delete a task           |

---

## 🎯 Design Philosophy

DevTrack was built around three core principles:

* **Speed** – Fast interactions and minimal UI clutter.
* **Clarity** – Focus on tasks and projects without unnecessary complexity.
* **Developer Experience** – Strong typing, modular architecture, and maintainable code.

```
```
