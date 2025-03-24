# Drites - A Next.js Blogging Platform

A modern blogging platform built with Next.js, TypeScript, and PostgreSQL.

## Features

- User authentication and profiles
- Create and publish blog posts
- Comment, likes on posts
- Optimistic updates (from React)
- Markdown for writing posts
- Responsive design
- Proper SEO support

## Tech Stack

- **Frontend & Backend**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Prerequisites

- Node.js 18+ and pnpm
- Docker and Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd write
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example env file and update it with your own values:

```bash
cp example.env .env
```

Required environment variables:

- Database connection strings
- Clerk API keys (for authentication)

### 4. Set up the database with Docker

The project includes a Docker Compose configuration for PostgreSQL. Start the database with:

```bash
docker-compose up -d
```

This will:

- Start a PostgreSQL container
- Create a database named `mydb`
- Set up a user with username `user` and password `password`
- Expose the database on port `5432`

You can connect to the database using the following connection string:

```
postgresql://user:password@localhost:5432/mydb
```

### 5. Run database migrations

```bash
pnpm prisma migrate dev
```

### 6. Start the development server

```bash
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/src
  /app - Next.js application routes
  /components - React components
  /lib - Utility functions and shared code
/prisma - Prisma schema and migrations
/public - Static assets
```

## Deployment

This application can be deployed to platforms like Vercel or any platform that supports Next.js.

For the database, you can use:

- A managed PostgreSQL service (like Neon, Supabase, or Railway)
- Self-hosted PostgreSQL on a cloud provider

Update your `.env` file with production database credentials before deploying.
