# 📚 Minimal Library Management System

A clean, client-side Library Management System built with **React**, **Redux Toolkit Query**, and **TypeScript**. This minimalist system allows users to view, manage, and borrow books without authentication or payment integration, focusing purely on functionality and state management.

## 🚀 Project Overview

This is a minimal Library Management System (LMS) developed to demonstrate core CRUD operations, state management with **RTK Query**, and responsive UI design using **React** and **Tailwind CSS**.

**Goals:**

- Implement full CRUD functionality for books.
- Allow book borrowing with real-time stock validation.
- Summarize borrowed books via aggregation.
- Practice clean architecture and modular coding (backend MVC pattern).

---

## ✨ Features

### 1. Public Routes

- All pages are publicly accessible—no login required.

### 2. Book Management

- View books in a table: Title, Author, Genre, ISBN, Copies, Availability.
- Actions:
  - **Edit**: Pre-filled form to update book info.
  - **Delete**: Confirmation dialog before removal.
  - **Borrow**: Opens a form to initiate a borrow.
  - **Add New Book**: Form with fields like Title, Author, ISBN, etc.

### 3. Borrow Book

- Form includes quantity and due date.
- Quantity cannot exceed available copies.
- Auto-updates book availability.
- Redirect to summary page after success.

### 4. Borrow Summary

- Aggregated view of all borrowed books.
- Displays: Book Title, ISBN, Total Quantity Borrowed.

---

## 🗺️ Page Structure

| Route             | Description                         |
| ----------------- | ----------------------------------- |
| `/books`          | All books listed with actions       |
| `/create-book`    | Form to add a new book              |
| `/books`          | Book Modal detail view              |
| `/books`          | Edit book Modal information         |
| `/books`          | Borrow form Modal for selected book |
| `/borrow-summary` | View summary of all borrowed books  |

---

## 🎨 UI/UX Highlights

- Clean and minimalist UI
- Fully responsive (Mobile, Tablet, Desktop)
- Navigation bar and footer on all pages
- Intuitive form inputs and clear buttons

---

## ⚙️ Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React, TypeScript         |
| Styling    | Tailwind CSS / Plain CSS  |
| State Mgmt | Redux Toolkit + RTK Query |
| Backend    | Node.js, Express.js       |
| Database   | MongoDB, Mongoose         |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sadia492/library-management-client.git
cd library-management-client
```

### 2. Install dependencies

```bash
# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
```

### 3. Configure Environment

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library
```

---

## ▶️ Usage

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

Access the app at: `http://localhost:5000`

---

## 🔌 API Integration

- All API calls managed using **Redux Toolkit Query**.
- Strongly typed interfaces for API responses.
- Optimistic UI updates for enhanced UX.
- Separate endpoints for:

  - Book CRUD: `/api/books`
  - Borrow operations: `/api/borrows`

---

## 💡 Examples

- Add a new book → `/create-book`
- Borrow a book → Click "Borrow" on `/books`
- See all borrowed items → `/borrow-summary`

---
