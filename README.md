# 💸 Expense Tracker Dashboard

A modern full-stack **Expense Tracker Dashboard** built using **React (TypeScript)**, **Node.js**, **Express**, and **MongoDB**. It allows users to securely log, manage, and visualize their expenses through interactive charts and category breakdowns.

---

## 🚀 Tech Stack

### 🖥 Frontend
- [React](https://reactjs.org/) (with TypeScript)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) – for charts
- [React Toastify](https://fkhadra.github.io/react-toastify/) – notifications
- [Axios](https://axios-http.com/)

### 🛠 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) – authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) – password hashing

---

## 🧭 Application Routes

### 🔓 Public
| Route       | Description        |
|-------------|--------------------|
| `/auth`     | Login / Signup page |
| `/logout`   | Logout and redirect |

### 🔐 Protected (inside `MainLayout` + `PrivateRoute`)
| Route              | Component       | Description                            |
|--------------------|------------------|----------------------------------------|
| `/` or `/dashboard`| `Dashboard.tsx` | Interactive charts and summaries       |
| `/expenses`        | `Expenses.tsx`   | View, add, update and delete expenses |

---

## 📊 Dashboard Features

- **Time Filters**:
  - `weekly` (last 7 days)
  - `monthly` (last 30 days)
  - `6months` (last 6 months)

- **Type Filters**:
  - `expense`: Line chart view of expenses by date
  - `category`: Pie chart view of category-wise breakdown

- **Summary Section**: Total spending shown dynamically

---

## 📦 REST API Overview

> All routes require **JWT token** in the `Authorization: Bearer <token>` header (except login/signup).

### 🔐 Auth

| Method | Route         | Description         |
|--------|---------------|---------------------|
| POST   | `/auth/signup`| Register new user   |
| POST   | `/auth/login` | Login existing user |

---

### 💰 Expense

| Method | Route                  | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/expenses`            | Get all expenses (sorted)    |
| POST   | `/expenses`            | Add a new expense            |
| PATCH  | `/expenses/:id`        | Update expense by ID         |
| DELETE | `/expenses/:id`        | Delete expense by ID         |

---

### 📈 Summary (Analytics)

| Method | Route                                    | Description                                      |
|--------|-------------------------------------------|--------------------------------------------------|
| GET    | `/expenses/summary/by-date?range=...`     | Daily/Monthly/6-month summary (line chart)       |
| GET    | `/expenses/summary/by-category?range=...` | Category-wise summary (pie chart)                |

> `range` can be: `weekly`, `monthly`, or `6months`

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/ShimanshuChauhan/ExpenseTracker.git
cd ExpenseTracker
````

### 2. Install Dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

---

### 3. Configure Environment

Create a `config.env` file in the `/backend` directory:

```env
NODE_ENV=production
PORT=3000

DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_mongodb_password

JWT_SECRET=my-ultra-secret-and-ultra-long-secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

Replace your password in the MongoDB string with `<PASSWORD>` like this: .
```bash
mongodb+srv://shivanshuchauhan699:<PASSWORD>@cluster0.aquy4iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

---

## ▶️ Start the App

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3000`

---

## 📁 Folder Structure

```
ExpenseTracker/
│
├── backend/
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose models
│   ├── routes/             # Route handlers
│   ├── middleware/         # JWT/auth utilities
│   ├── utils/              # Error handling utils
│   ├── app.js
│   ├── server.js           # App entry point
│
├── frontend/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Main route pages (Dashboard, Expenses, Auth)
│   ├── layouts/            # Layout components (MainLayout)
│   ├── auth/               # Auth logic, context, private routes
│   ├── api/                # Axios instance config
│   ├── App.tsx             # React root
│
└── README.md
```

---

## 👨‍💻 Author

> Developed by **Shimanshu Chauhan**
> GitHub: [@ShimanshuChauhan](https://github.com/ShimanshuChauhan)
> Email: `shivanshuchuhan699@gmail.com`
> Made with ❤️ and clean code.

---
