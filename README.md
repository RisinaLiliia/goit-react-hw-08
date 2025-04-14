# 📒 Contact Book

A contact manager application with user registration, login, protected routes, and full CRUD functionality for managing personal contacts. This project is the final homework assignment for the **React** module at GoIT.

🔗 Live Demo: [goit-react-hw-08-lkwc.vercel.app](https://goit-react-hw-08-lkwc.vercel.app/)  
📁 Repository: [github.com/RisinaLiliia/goit-react-hw-08](https://github.com/RisinaLiliia/goit-react-hw-08)

---

## ⚙️ Tech Stack

- **React + Vite**
- **Redux Toolkit** + `redux-persist`
- **React Router v6**
- **React.lazy & Suspense** – for lazy loading pages
- **Formik + Yup** – for form handling and validation
- **CSS Modules** – scoped component styling
- **Material UI** – component library
- **React Hot Toast** – toast notifications
- **JWT Authentication**
- Public API: [connections-api.goit.global](https://connections-api.goit.global/)

---

## 🧩 Features

### 🔐 Authentication

- User registration and login with JWT
- Auto-refresh user session on page reload
- Persisted auth state using `redux-persist`
- Token handling and protected API calls
- Restricted and private route logic
- Logout with Redux state cleanup

### 📁 Contacts Management

- Fetch user-specific contact list
- Add, delete, and update contacts (PATCH support)
- Confirm contact deletion in a modal window
- Search contacts by name or phone number
- Toast notifications on success (add/delete/update)
- Edit existing contacts

### 🧭 Routing

- `/` – Home page with app or developer info
- `/register` – Public registration page with `RegistrationForm`
- `/login` – Public login page with `LoginForm`
- `/contacts` – Private page accessible only to logged-in users
- `PrivateRoute` and `RestrictedRoute` wrappers for route protection
- `Layout` component with shared `AppBar` across all routes

### 🗂 Redux Structure

- `redux/auth/` – authentication slice logic (slice, operations, selectors)
- `redux/contacts/` – contact list logic
- `redux/filters/` – contact filter logic
- `auth` slice structure:
```js
{
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false
}
