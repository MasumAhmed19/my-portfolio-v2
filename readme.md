# Masum's Portfolio

A full-stack **Next.js + Express** web application featuring a secure admin dashboard protected by **JWT / NextAuth** authentication.  
Deployed at **[masum-a-shanto.vercel.app](https://masum-a-shanto.vercel.app/)**.

---

## 📁 Project Structure

```

my-portfolio-v2/
├── client/   → Next.js frontend (portfolio + admin dashboard)
└── server/   → Express backend API (auth + data)

````

- **Client:** [`/client`](https://github.com/MasumAhmed19/my-portfolio-v2/tree/main/client)
- **Server:** [`/server`](https://github.com/MasumAhmed19/my-portfolio-v2/tree/main/server)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js (App Router), TypeScript, NextAuth, Axios |
| Backend | Express.js, TypeScript, JWT, CORS |
| Auth | JWT + optional NextAuth credentials provider |
| Deployment | Vercel (client) + Node/Express (server) |

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
````

### 2. Environment Variables

#### Client (`client/.env.local`)

```
NEXT_PUBLIC_BASE_URL=http://localhost:9000/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-nextauth-secret>
```

#### Server (`server/.env`)

```
PORT=9000
JWT_SECRET=<generate-jwt-secret>
```

Generate secrets:

```bash
openssl rand -base64 32
```

### 3. Run locally

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Client → `http://localhost:3000`
Server → `http://localhost:9000/api/v1`

---

## 🔐 Authentication Overview

* **Login (Admin)** → `POST /api/v1/auth/admin-login`

  * Returns `{ accessToken, refreshToken, user }`
* Client stores token → attaches to each request (`Authorization: Bearer <token>`)
* Middleware on both client & server protect dashboard and API routes.

---

## 🧰 Troubleshooting

| Issue           | Fix                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| Invalid token   | Ensure same `JWT_SECRET` on client/server and proper Bearer token format |
| CORS errors     | Set CORS before routes in Express                                        |
| NextAuth errors | Wrap app in `<SessionProvider />`                                        |
| Router error    | Add `"use client"` to components using `useRouter()`                     |

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit with clear messages
4. Open a PR

---

## 🗂️ Key Files

| Path                                        | Description                                 |
| ------------------------------------------- | ------------------------------------------- |
| `src/app/api/auth/[...nextauth]/route.ts`   | NextAuth credentials provider               |
| `src/middleware.ts`                         | Protects `/dashboard/*` routes              |
| `src/lib/apiClient.ts`                      | Axios instance with JWT interceptor         |
| `src/services/authService.ts`               | Handles login, token storage, and refresh   |
| `src/context/AuthProvider.tsx` *(optional)* | Custom auth context (if not using NextAuth) |

---

## 🔐 Authentication Flow

1. Admin logs in → backend returns `{ accessToken, refreshToken, user }`
2. Token saved in `localStorage` or managed by `next-auth` session
3. Axios adds `Authorization: Bearer <token>` header to API requests
4. Middleware (`/src/middleware.ts`) protects `/dashboard/:path*`

---

## 🧩 UI Notes

* Active sidebar link highlighted via `usePathname()`
* Mobile sidebar auto-closes via `useSidebar()`
* Truncate blog description using `truncateWords(text, 10)`

---

## 🧪 Common Issues

| Issue                        | Fix                                                          |
| ---------------------------- | ------------------------------------------------------------ |
| `useSession` error           | Wrap app in `<SessionProvider />`                            |
| `NextRouter was not mounted` | Add `"use client"` to file                                   |
| Token invalid                | Ensure same JWT secret and clean storage (no JSON.stringify) |

---

## 🧰 Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start local dev server |
| `npm run build` | Build for production   |
| `npm run start` | Run production build   |

---

## 🪄 Recommendations

* Pick **one** auth strategy (NextAuth **or** custom JWT)
* Keep `.env.local` in `.gitignore`
* Restart server after editing `.env.local`

---

## 📄 License

MIT © 2025 Masum Ahmed

````

---

## ⚙️ 3. Server — `server/README.md`

```markdown
# Server — Masum's Portfolio (Express API)

Backend API for **Masum’s Portfolio**, built with **Express.js + TypeScript**.  
Handles authentication, JWT issuance, and protected routes for the admin dashboard.

---

## 🛠️ Setup

```bash
cd server
npm install
````

Create `.env`:

```
PORT=9000
JWT_SECRET=<generate-jwt-secret>
```

Generate secret:

```bash
openssl rand -base64 32
```

Run in development:

```bash
npm run dev
```

Server available at → `http://localhost:9000/api/v1`

---

## 📁 Structure

| File                                    | Description                    |
| --------------------------------------- | ------------------------------ |
| `src/app.ts`                            | Express app configuration      |
| `src/middlewares/checkAuth.ts`          | JWT verification middleware    |
| `src/routes/authRoutes.ts`              | Admin login and auth endpoints |
| `src/utils/jwt.ts`                      | Token sign/verify helpers      |
| `src/middlewares/globalErrorHandler.ts` | Global error catcher           |

---

## 🔐 Auth Endpoints

### `POST /api/v1/auth/admin-login`

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "statusCode":200,
  "success":true,
  "message":"Login Success",
  "data": {
    "accessToken":"<jwt>",
    "refreshToken":"<refresh-jwt>",
    "user": { "id":1, "name":"Masum Ahmed" }
  }
}
```

---

## 🧱 Middleware

* **CORS:**

  ```ts
  app.use(cors({
    origin: ["http://localhost:3000", "https://masum-a-shanto.vercel.app"],
    credentials: true
  }));
  ```
* **checkAuth:** Verifies JWT from `Authorization: Bearer <token>`
* **globalErrorHandler:** Centralized error handling
* **notFound:** Handles unknown routes

---

## ⚙️ Token Logic

* JWT signed with `process.env.JWT_SECRET`
* Verify before protected routes
* Refresh flow optional (can be added to `/auth/refresh`)

---

## 🧰 Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start dev server with nodemon |
| `npm run build` | Compile TypeScript            |
| `npm start`     | Run built code                |

---

## 🧩 Troubleshooting

| Issue         | Fix                                      |
| ------------- | ---------------------------------------- |
| Invalid token | Ensure correct JWT secret                |
| CORS blocked  | Configure origins properly before routes |
| 404 route     | Check API prefix `/api/v1/...`           |

---

## 📄 License

MIT © 2025 Masum Ahmed

```

---

Would you like me to **generate these as actual `.md` files** (and package them into a ZIP for download)?  
That way you can drop them straight into your `/`, `/client`, and `/server` directories.
```
