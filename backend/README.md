Blog API

A REST API for a blog system built with NestJS, using Clean Architecture, DDD, Repository Pattern, and CQRS.

Setup





Install Dependencies:

npm install



Set Environment Variables: Create a .env file:

DATABASE_URL=postgres://user:password@localhost:5432/blog
JWT_SECRET=secret



Run with Docker:

docker-compose up



Run Locally:

npm run start:dev

API Documentation





Swagger: Available at http://localhost:3000/api/docs

Architecture





Clean Architecture: Separates domain, application, infrastructure, and presentation layers.



CQRS: Commands for writes, queries for reads.



Repository Pattern: Abstracts database operations.



Features: User auth (JWT), post CRUD, comments, role-based access, rate limiting, input validation.

Endpoints





POST /auth/register: Register a user.



POST /auth/login: Login and get JWT.



POST /posts: Create a post (authenticated).



GET /posts: Get all posts.



GET /posts/:id: Get a post with comments.



PUT /posts/:id: Update a post (authenticated, author only).



DELETE /posts/:id: Delete a post (authenticated, author or admin).



POST /posts/:postId/comments: Add a comment (authenticated).



GET /posts/:postId/comments: Get comments for a post.

Testing





Run tests: npm run test



Includes unit tests for services and integration tests for controllers.