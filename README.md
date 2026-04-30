<<<<<<< HEAD
# GooseBumps - Next.js Full-Stack Application

A modern full-stack web application built with Next.js, featuring user authentication, database integration, and real-time capabilities.

## Features

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **ShadCN/UI** components
- **Responsive design**

### Backend
- **Next.js API Routes** for backend functionality
- **Prisma ORM** with SQLite database
- **NextAuth.js** for authentication
- **File upload** support
- **Real-time features** with Server-Sent Events
- **Search functionality** across posts, users, and books

### Database Models
- **Users** - User accounts with authentication
- **Posts** - Blog posts with comments and ratings
- **Comments** - User comments on posts
- **Ratings** - Star ratings for posts
- **Books** - Book catalog with reviews
- **Tags** - Tagging system for posts

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Configure environment variables:
   Copy `.env` and update the values:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Posts
- `GET /api/posts` - Get all posts (with pagination and search)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

### Comments
- `GET /api/posts/[id]/comments` - Get comments for a post
- `POST /api/posts/[id]/comments` - Add a comment to a post

### File Upload
- `POST /api/upload` - Upload files

### Search
- `GET /api/search?q=query&type=all` - Search across content

### Real-time
- `GET /api/sse` - Server-Sent Events for real-time updates

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/                # Database schema
├── public/                # Static assets
└── data/                  # Static data files
```

## Technologies Used

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **Database:** SQLite with Prisma
- **Authentication:** NextAuth.js
- **State Management:** TanStack Query
- **Validation:** Zod
- **Icons:** Lucide React

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client

## Deployment

This application can be deployed to Vercel, Netlify, or any platform supporting Next.js.

For production, make sure to:
1. Set secure `NEXTAUTH_SECRET`
2. Use a production database (PostgreSQL recommended)
3. Configure proper CORS settings
4. Set up file storage for uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
=======
# GooseBumpsUltimate
>>>>>>> c3d741616ef01e809b9e1bde46f1841e10494755
