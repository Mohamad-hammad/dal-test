# DAL Assesment (Transactions Management App)

A simple transaction management app built with React and Node.js. Users can create and view their transactions with ease.

## Tech Stack Used

### Frontend
- React 19
- TypeScript
- React Router DOM
- Tailwind CSS
- Hero Icons

### Backend
- Node.js with Express
- TypeScript
- TypeORM for database operations
- Supabase (PostgreSQL as a Service)
- Environment variables management with dotenv

## Project Structure

```
dal-test/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static files
│   ├── .env.sample    # Sample environment variables
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js backend application
│   ├── src/          # Source code
│   ├── dist/         # Compiled JavaScript
│   ├── .env.sample   # Sample environment variables
│   └── package.json  # Backend dependencies
└── .gitignore        # Git ignore rules
```

The project follows a clear separation of concerns with frontend and backend in separate directories. This structure allows for:
- Independent development and deployment of frontend and backend
- Clear separation of client and server code
- Easy management of dependencies for each part
- Simplified testing and maintenance

## Live Demo
- Frontend: [https://dal-test-fe.vercel.app/](https://dal-test-fe.vercel.app/)
- Backend: [https://dal-test-c2fh.onrender.com](https://dal-test-c2fh.onrender.com)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Supabase account and project

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the sample environment file
   cp .env.sample .env
   ```
   Then edit the `.env` file with your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the sample environment file
   cp .env.sample .env
   ```
   Then edit the `.env` file with your API base URL.

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001