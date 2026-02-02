# BookStore - CRUD Backend

A full-fledged CRUD backend application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** following **Object-Oriented Programming (OOP)** principles.

## 📋 Features

- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ RESTful API design
- ✅ TypeScript for type safety
- ✅ MongoDB with Mongoose ODM
- ✅ Object-Oriented Programming architecture
- ✅ Proper error handling & validation
- ✅ Search and filter functionality
- ✅ Clean code structure with separation of concerns

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   Edit `.env` file (already created):
   ```env
   PORT=4000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```
   
   For MongoDB Atlas (cloud):
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
   ```

3. **Start MongoDB** (if using local)
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or start manually
   mongod
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```
   
   Server will start at: `http://localhost:4000`

### Verify Installation
```bash
curl http://localhost:4000/health
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/books` | Create a new book |
| **GET** | `/api/books` | Get all books |
| **GET** | `/api/books/:id` | Get a single book by ID |
| **PUT** | `/api/books/:id` | Update a book by ID |
| **DELETE** | `/api/books/:id` | Delete a book by ID |
| **GET** | `/api/books/search?q=query` | Search books by title or author |
| **GET** | `/api/books/genre/:genre` | Get books by genre |
| **GET** | `/api/books/stock/available` | Get in-stock books |

---

## 🧪 API Testing Examples

### 1. Create a Book (POST)
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "publishedYear": 2008,
    "genre": "Technology",
    "price": 42.99,
    "inStock": true
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "publishedYear": 2008,
    "genre": "Technology",
    "price": 42.99,
    "inStock": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Books (GET)
```bash
curl http://localhost:4000/api/books
```

### 3. Get Single Book (GET)
```bash
curl http://localhost:4000/api/books/507f1f77bcf86cd799439011
```

### 4. Update Book (PUT)
```bash
curl -X PUT http://localhost:4000/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "inStock": false
  }'
```

### 5. Delete Book (DELETE)
```bash
curl -X DELETE http://localhost:4000/api/books/507f1f77bcf86cd799439011
```

### 6. Search Books (GET)
```bash
curl "http://localhost:4000/api/books/search?q=Clean"
```

### 7. Filter by Genre (GET)
```bash
curl http://localhost:4000/api/books/genre/Technology
```

### 8. Get In-Stock Books (GET)
```bash
curl http://localhost:4000/api/books/stock/available
```

---

## 📦 Data Model

### Book Schema
```typescript
{
  title: string;          // Required, 1-200 characters
  author: string;         // Required, min 2 characters
  isbn: string;           // Required, unique, ISBN-10 or ISBN-13
  publishedYear: number;  // Required, 1000 to current year
  genre: string;          // Required, see valid genres below
  price: number;          // Required, >= 0
  inStock: boolean;       // Default: true
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-generated
}
```

### Valid Genres
`Fiction`, `Non-Fiction`, `Science`, `Technology`, `Biography`, `History`, `Fantasy`, `Mystery`, `Romance`, `Thriller`, `Other`

---

## 🏗️ Architecture

### Layered Structure
```
src/
├── schema/          # Database models and validation
├── services/        # Business logic layer
├── controllers/     # HTTP request/response handlers
├── routes/          # API route definitions
├── app.ts          # Application setup
└── server.ts       # Entry point
```

### OOP Design Patterns
1. **MVC Pattern** - Model-View-Controller separation
2. **Service Layer** - Business logic isolation
3. **Dependency Injection** - Loose coupling
4. **Interface Segregation** - Type-safe contracts

### Classes & Interfaces
- **App** - Application orchestrator
- **BookService** - Business logic (8 methods)
- **BookController** - HTTP handlers (8 methods)
- **BookRoutes** - Route organization
- **IBook, IApp, IBookService, IBookController** - Type interfaces

---

## 🛠️ Available Scripts

```bash
# Development mode (auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔒 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Or verify connection string in .env
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5000

# Or kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌟 Best Practices Implemented

1. ✅ TypeScript for type safety
2. ✅ Async/await for clean async code
3. ✅ Try-catch error handling
4. ✅ Multi-layer validation (schema + controller)
5. ✅ Consistent API response format
6. ✅ Environment variable configuration
7. ✅ Database indexing for performance
8. ✅ Clean code with meaningful names
9. ✅ Comprehensive JSDoc comments
10. ✅ RESTful API conventions

---

## 📝 Testing with Postman

1. Open Postman
2. Create a new collection "Book Store API"
3. Set base URL: `http://localhost:4000`
4. Add requests for each endpoint
5. For POST/PUT: Set `Content-Type: application/json` header
6. Test all CRUD operations

---

## 🎓 Learning Resources

### Code Structure
- `src/schema/book.schema.ts` - Learn data modeling
- `src/services/book.service.ts` - Learn business logic
- `src/controllers/book.controller.ts` - Learn HTTP handling
- `src/routes/book.routes.ts` - Learn routing
- `src/app.ts` - Learn app configuration

### Key Concepts
- OOP in Node.js/TypeScript
- RESTful API design
- MongoDB with Mongoose
- Error handling patterns
- Input validation strategies
