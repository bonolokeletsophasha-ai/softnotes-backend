# SoftNotes – Backend

## Project Overview

SoftNotes is a private note-taking application that allows users to securely create, manage and store personal notes.

The backend is responsible for handling authentication, protecting API routes, processing note-related requests and communicating with the Supabase database.

It uses Node.js and Express.js to provide REST API endpoints for the frontend application.

## Features

- User registration.
- User login and logout.
- Supabase authentication integration.
- HTTP-only authentication cookies.
- Authentication middleware for protected routes.
- Create new notes.
- Retrieve existing notes.
- Update notes.
- Move notes to Trash.
- Restore deleted notes.
- Permanently delete notes.
- Mark notes as favourites.
- User-specific note access.
- Supabase Row Level Security (RLS).

## Technologies Used

- Node.js – JavaScript runtime.
- Express.js – Backend framework.
- Supabase – Database and authentication.
- PostgreSQL – Relational database.
- Supabase JavaScript Client – Supabase integration.
- Cookie Parser – Reading authentication cookies.
- CORS – Managing cross-origin requests.
- dotenv – Environment variable management.
- Nodemon – Development server monitoring.

## Project Structure

```text
softnotes-backend/
│
├── src/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notesRoutes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/bonolokeletsophasha-ai/softnotes-backend.git
```

### 2. Navigate into the project folder

```bash
cd softnotes-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your Supabase configuration:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your actual Supabase project details.

**Important:** Never upload your `.env` file or expose your Supabase keys in a public repository.

### 5. Start the backend server

For development:

```bash
npm run dev
```

To start the server normally:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

## API Endpoints

All API endpoints are accessed through the backend server.

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Registers a new user. |
| POST | `/api/auth/login` | Logs in an existing user. |
| GET | `/api/auth/me` | Retrieves the authenticated user's session. |
| POST | `/api/auth/logout` | Logs out the authenticated user. |

### Notes Routes

All notes routes require authentication.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Retrieves the user's active notes. |
| GET | `/api/notes/trash` | Retrieves deleted notes. |
| POST | `/api/notes` | Creates a new note. |
| PUT | `/api/notes/:id` | Updates an existing note. |
| PATCH | `/api/notes/:id/favorite` | Updates a note's favourite status. |
| DELETE | `/api/notes/:id` | Moves a note to Trash. |
| PATCH | `/api/notes/:id/restore` | Restores a deleted note. |
| DELETE | `/api/notes/:id/permanent` | Permanently deletes a note. |

## Database

SoftNotes uses Supabase as its database and authentication provider.

The application stores notes in a PostgreSQL table named:

```text
public.notes
```

The notes table contains the following fields:

| Column | Description |
|---|---|
| `id` | Unique identifier for each note. |
| `user_id` | Identifies the owner of the note. |
| `title` | Title of the note. |
| `content` | Main note content. |
| `is_favorite` | Indicates whether a note is a favourite. |
| `is_deleted` | Indicates whether a note has been moved to Trash. |
| `created_at` | Date and time the note was created. |
| `updated_at` | Date and time the note was last updated. |

## Security

Security is an important part of SoftNotes.

The backend implements:

- Supabase authentication for user registration and login.
- HTTP-only cookies for storing authentication tokens.
- Authentication middleware to protect private API routes.
- Supabase Row Level Security (RLS) policies.
- User-specific database access.
- Environment variables for sensitive configuration.

Row Level Security ensures that users can only access notes associated with their own user ID.

## Authentication Flow

1. A user registers or logs in through the frontend.
2. The frontend sends the authentication request to the backend.
3. The backend communicates with Supabase Authentication.
4. Following successful login, the backend stores the access token in an HTTP-only cookie.
5. Protected requests are checked by authentication middleware.
6. Supabase RLS policies ensure that users can only access their own notes.

## Testing

The backend API endpoints were tested using Postman.

Testing included:

- User registration.
- User login.
- Authentication verification.
- Protected route access.
- Creating notes.
- Retrieving notes.
- Updating notes.
- Moving notes to Trash.
- Restoring deleted notes.
- Permanently deleting notes.
- Logging out.

## Author

**SoftNotes Project**

Backend developed using Node.js, Express.js and Supabase.