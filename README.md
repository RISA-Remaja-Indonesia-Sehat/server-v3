# 🌻 RISA API — Remaja Indonesia Sehat

Backend API for **RISA (Remaja Indonesia Sehat)**, an interactive reproductive health education platform for Indonesian teenagers.

This server manages authentication-related backend functionality, guardian and child relationships, parental consent, child profiles, and learning progress.

## ✨ Main Responsibilities

The RISA API currently handles:

* Guardian authentication verification
* Guardian and child relationships
* Parental consent requests
* Child profile creation
* Child login and logout
* Child session verification
* Chapter progress
* Post-test progress
* API health checks
* Login rate limiting

## 🛠️ Tech Stack

The backend is built with:

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Supabase
* bcryptjs
* cookie-parser
* CORS
* express-rate-limit
* jose

## 📁 Project Structure

```text
config/
controllers/
lib/
middleware/
prisma/
routes/
services/

app.ts
server.ts
prisma7.config.ts
```

### Main directories

* `config/` — Prisma, Supabase, and application configuration
* `controllers/` — request and response handlers
* `middleware/` — authentication and authorization middleware
* `prisma/` — database schema
* `routes/` — Express API routes
* `services/` — application and business logic
* `lib/` — shared backend utilities

## 🗄️ Database

RISA uses PostgreSQL with Prisma ORM.

The current database includes models for:

* Guardians
* Child profiles
* Guardian-child relationships
* Parental consent
* Consent requests
* Chapter progress
* Post-test progress

## 🔐 Authentication

Guardian authentication uses Supabase authentication.

Authenticated requests from guardians are verified using a Bearer token.

RISA also maintains a separate child authentication flow for child profiles.

## 👨‍👩‍👧 Parental Consent

RISA includes a parental consent workflow for creating child profiles.

Consent requests can have the following states:

```text
PENDING
APPROVED
CONSUMED
REJECTED
EXPIRED
```

This allows the backend to distinguish between a newly created consent request, an approved request, and a request that has already been used.

## 🛡️ Security

The backend includes several security-related features:

* Guardian token verification
* Child authentication middleware
* Password/PIN hashing
* HTTP-only session handling
* Login rate limiting
* Parental consent verification
* CORS configuration

Child login attempts are rate-limited to reduce repeated authentication attempts.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RISA-Remaja-Indonesia-Sehat/server-v3.git
cd server-v3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=your_postgresql_connection_string

SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key

PORT=5000
```

Do not commit `.env` files or secret credentials to GitHub.

### 4. Generate the Prisma client

```bash
npm run prisma:generate
```

### 5. Run database migrations

```bash
npm run prisma:migrate
```

### 6. Start the development server

```bash
npm run dev
```

By default, the API runs on:

```text
http://localhost:5000
```

## 📜 Available Scripts

```bash
npm run dev
```

Starts the development server using `tsx watch`.

```bash
npm run build
```

Generates the Prisma client and compiles TypeScript.

```bash
npm run start
```

Starts the server.

```bash
npm run prisma:generate
```

Generates the Prisma client.

```bash
npm run prisma:migrate
```

Runs Prisma development migrations.

## 🔌 API

Current API groups include:

```text
/api/health
/api/me
/api/consent
/api/child
```

Child-related endpoints currently include:

```text
POST /api/child/setup
POST /api/child/login
GET  /api/child/me
POST /api/child/logout
```

Some endpoints require guardian or child authentication.

## 🌐 Frontend Repository

The RISA frontend is maintained separately:

https://github.com/RISA-Remaja-Indonesia-Sehat/risa-v3

## ⚠️ Environment Security

The following values must remain private:

```text
DATABASE_URL
SUPABASE_SECRET_KEY
```

Never expose server-side secret keys through frontend environment variables or commit them to GitHub.

## 📌 Project Status

RISA is currently under active development.

The authentication, parental consent, progress tracking, and API architecture may continue to evolve as the project grows.

---

Backend API for **RISA — Remaja Indonesia Sehat** 