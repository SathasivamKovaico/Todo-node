# ===========================================
# TODO CRUD API - Complete Guide
# ===========================================

A fully-documented RESTful CRUD API for managing TODO items, built with:
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Swagger** - API documentation

Every file and line is thoroughly commented to help you learn!

---

## 📁 Project Structure

```
todo-crud-api/
│
├── 📄 package.json          # Project metadata and dependencies
├── 📄 .env                   # Environment variables (DO NOT COMMIT!)
├── 📄 .gitignore             # Files to ignore in Git
├── 📄 README.md              # This documentation file
│
└── 📂 src/                   # Source code directory
    │
    ├── 📄 server.js          # Application entry point (starts the server)
    ├── 📄 app.js             # Express app configuration
    │
    ├── 📂 config/            # Configuration files
    │   ├── 📄 database.js    # MongoDB connection setup
    │   └── 📄 swagger.js     # Swagger/OpenAPI configuration
    │
    ├── 📂 models/            # Database models (schemas)
    │   └── 📄 todo.model.js  # Todo schema and model
    │
    ├── 📂 controllers/       # Business logic (request handlers)
    │   └── 📄 todo.controller.js
    │
    └── 📂 routes/            # API route definitions
        └── 📄 todo.routes.js
```

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/

2. **MongoDB** (local or Atlas)
   - Local: https://www.mongodb.com/try/download/community
   - Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Installation Steps

```bash
# 1. Navigate to the project directory
cd todo-crud-api

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Edit .env file with your MongoDB connection string

# 4. Start the server
npm run dev   # Development mode (auto-restart on changes)
# OR
npm start     # Production mode
```

### Verify Installation

Open your browser and visit:
- **API**: http://localhost:3000/
- **Swagger Docs**: http://localhost:3000/api-docs

---

## 📚 API Endpoints

### Base URL: `http://localhost:3000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all todos |
| GET | `/:id` | Get todo by ID |
| GET | `/stats` | Get todo statistics |
| POST | `/` | Create new todo |
| PUT | `/:id` | Update todo |
| PATCH | `/:id/toggle` | Toggle completion |
| DELETE | `/:id` | Delete todo |

---

## 📖 API Usage Examples

### Create a Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete the tutorial",
    "priority": "high"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Learn Node.js",
    "description": "Complete the tutorial",
    "completed": false,
    "priority": "high",
    "tags": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Todos

```bash
# Get all todos
curl http://localhost:3000/api/todos

# With filters
curl "http://localhost:3000/api/todos?completed=false&priority=high"

# With pagination
curl "http://localhost:3000/api/todos?limit=10&skip=0"
```

### Get Single Todo

```bash
curl http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

### Update a Todo

```bash
curl -X PUT http://localhost:3000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js (Updated)",
    "completed": true
  }'
```

### Toggle Completion

```bash
curl -X PATCH http://localhost:3000/api/todos/507f1f77bcf86cd799439011/toggle
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

### Get Statistics

```bash
curl http://localhost:3000/api/todos/stats
```

---

## 🔍 Understanding the Code

### Flow of a Request

```
┌─────────────┐     ┌─────────────┐     ┌────────────────┐     ┌─────────┐     ┌──────────┐
│   Client    │────▶│   Routes    │────▶│   Controller   │────▶│  Model  │────▶│ MongoDB  │
│  (Browser)  │◀────│ (Endpoint)  │◀────│(Business Logic)│◀────│(Schema) │◀────│(Database)│
└─────────────┘     └─────────────┘     └────────────────┘     └─────────┘     └──────────┘
```

1. **Client** sends HTTP request (GET /api/todos)
2. **Routes** match the URL pattern and forward to controller
3. **Controller** processes request, calls model methods
4. **Model** interacts with MongoDB, returns data
5. **Controller** formats response and sends back
6. **Client** receives JSON response

### Key Concepts Explained

#### 1. Middleware (app.js)
```javascript
app.use(cors());        // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
```

#### 2. Route Parameters (routes)
```javascript
router.get('/:id', getTodoById);
// :id is a parameter - /api/todos/123 → req.params.id = "123"
```

#### 3. Query Parameters (controller)
```javascript
const { completed, priority } = req.query;
// /api/todos?completed=true → req.query.completed = "true"
```

#### 4. Request Body (controller)
```javascript
const { title, description } = req.body;
// JSON in POST/PUT request → req.body = { title: "...", ... }
```

---

## 🧪 Testing with Swagger

1. Open http://localhost:3000/api-docs
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Fill in parameters/body
5. Click "Execute"
6. See the response!

---

## 📝 Todo Model Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| title | String | Yes | - | Todo title (max 200 chars) |
| description | String | No | - | Details (max 1000 chars) |
| completed | Boolean | No | false | Completion status |
| priority | String | No | medium | low/medium/high |
| dueDate | Date | No | - | Due date |
| tags | [String] | No | [] | Category tags |
| createdAt | Date | Auto | - | Creation timestamp |
| updatedAt | Date | Auto | - | Last update timestamp |

---

## 🛠 Development Tips

### Running in Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/todo_db
PORT=3000
NODE_ENV=development
```

### Common Issues

1. **MongoDB Connection Failed**
   - Make sure MongoDB is running
   - Check connection string in .env

2. **Port Already in Use**
   - Change PORT in .env
   - Or kill the process using that port

3. **Module Not Found**
   - Run `npm install` to install dependencies

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| express | Web framework for Node.js |
| mongoose | MongoDB ODM (Object Data Modeling) |
| cors | Enable Cross-Origin Resource Sharing |
| dotenv | Load environment variables from .env |
| swagger-jsdoc | Generate OpenAPI spec from JSDoc |
| swagger-ui-express | Serve Swagger UI |
| nodemon (dev) | Auto-restart server on changes |

---

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [REST API Design](https://restfulapi.net/)
- [OpenAPI/Swagger](https://swagger.io/specification/)

---

## 📄 License

MIT License - Feel free to use this code for learning!

---

**Happy Coding! 🚀**
