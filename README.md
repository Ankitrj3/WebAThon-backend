---

# WebAThon Backend Application

This is a Node.js backend application that runs on port `5000`. The app is designed to serve API endpoints for various functionalities and can be extended further to handle business logic and database interactions.

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)
8. [Technologies Used](#technologies-used)
9. [Troubleshooting](#troubleshooting)
10. [License](#license)

## Features
- RESTful API structure.
- Modularized codebase for scalability.
- Built with Express.js.
- Includes basic routing and middleware.
- Easily configurable for different environments.
  
## Prerequisites

Make sure you have the following installed:
- **Node.js** (v12.x or higher)
- **npm** (v6.x or higher) or **yarn** (v1.x or higher)

## Installation

### 1. Clone the repository:
```bash
https://github.com/rajvardhan05/WebAThon-backend.git

### 2. Navigate to the project directory:
```bash
cd WebAThon-backend
```

### 3. Install dependencies:
Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

## Running the Application

### 1. Start the development server:
```bash
node app.js
```


### 2. The app will be running on:
```
http://localhost:5000
```

### 3. For production, use:
```bash
node app.js
```


## Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration:

```env
MONGODB_URI=<DATABASE-LINK>
JWT_SECRET=<JWTTOKEN>

PORT=5000
```

You can modify these variables to suit your setup.

## API Endpoints

Here’s a list of the available endpoints and their functionalities:

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| POST   | `/api/auth/signup`   | Register a new user            |
| POST   | `/api/auth/login`    | User login                     |
| POSE   | `/api/posts/`        | Create Post (Auth needed)      |
| POST   | `/api/agent/scan`    | On-Demand Agent                |
| POST   | `/api/agent/chat`    | On-Demand Agent                |
| GET    | `api/posts/`         | Get All Post                   |
| GET    | `api/posts/:id`      | Get Post By ID                 |

- More endpoints can be added as per project requirements.

## Testing

If your app has tests set up, you can run them using:
```bash
npm test
```

You can also use Postman or curl to test the API endpoints manually.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database (if integrated).
- **JWT**: Authentication (if implemented).
- **dotenv**: For environment variable management.

## Troubleshooting

### Common issues:

1. **Port Already in Use:**
   - Make sure no other application is using port `5000` or modify the port in the `.env` file.

2. **Database Connection Errors:**
   - Ensure your MongoDB server is running and the `MONGO_URI` in the `.env` file is correct.

3. **App Crashes:**
   - Use `console.log` or a debugger like `nodemon` to identify the issue.

### Useful Commands:

- To restart the app on changes during development, use:
```bash
npm run dev
```
or
```bash
yarn dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This markdown file can be placed in a `README.md` file at the root of your project.
