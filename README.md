
# Activity Booking API

Welcome to the **Activity Booking API**, a robust and scalable backend solution designed to streamline activity management and bookings. This project offers key features such as user authentication, activity listings, and booking management, making it ideal for event organizers, activity providers, or any platform that requires activity reservations.

---

## Features

### 🌟 Core Features
- **User Authentication**: Secure user signup and login with JWT-based authentication.
- **Activity Management**: Create, and get list of activities with details like title, description, date, time, and location.
- **Booking System**: Effortlessly book and manage activities, with real-time validations for user and activity availability.

### 🛡 Security Features
- **Rate Limiting**: Prevent abuse with IP-based request throttling.
- **Data Protection**: Password hashing with bcrypt and secure token handling.
- **HTTP Security**: Enhanced security with Helmet for secure HTTP headers.

### 📊 Additional
- **Error Handling**: Comprehensive error responses for better debugging and user feedback.
- **Database Integration**: Powered by MongoDB with Mongoose for efficient data management.
- **API Documentation**: Well-structured RESTful routes for seamless integration.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API (along with `express-validator` and `express-rate-limit`).
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **TypeScript**: Ensures type safety and maintainable code.
- **JWT**: Secure user sessions with JSON Web Tokens.
- **dotenv**: Easy management of environment variables.

---

## Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/matthew110703/Activity-Booking-API.git
   cd Activity-Booking-API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

---

## API Endpoints
- Base Url - https://activity-booking-api-8mhq.onrender.com (It might take some time to load. Please be patient;)
- [Postman API Collection](https://postman.co/workspace/My-Workspace~229148f6-58d6-4d8c-8791-3288c38be632/collection/32041108-2940ad66-1f63-47f7-9bcb-99807159ce69?action=share&creator=32041108) (If testing in localhost change the collection env variable `base_url` to `localhost:3000/api/v1`)

  
- `GET /api/v1` - Get the current status of the API.

### Authentication
- `POST /api/v1/auth/signup` - Register a new user.
- `POST /api/v1/auth/login` - Log in a user.
- `GET /api/v1/auth/me` - Get current user profile.

### Activities
- `GET /api/v1/activities` - Retrieve all activities. (Public)
- `POST /api/v1/activities` - Create a new activity (Logged-In user only).

### Bookings
- `POST /api/v1/bookings/:activityId` - Book an activity. (Logged-In user only)
- `GET /api/v1/bookings` - Get all bookings for the authenticated user.

---

## Project Structure

```plaintext
src/
├── config/           # Database connection and configuration
├── controllers/      # Business logic for API routes
├── middleware/       # Custom middlewares (auth, error handling)
├── models/           # Mongoose schemas for MongoDB
├── routes/           # API route definitions
├── lib/              # Utility functions and helpers
├── types/            # TypeScript type definitions
└── index.ts          # App/Server entry point
```


---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- **Author**: Matthew
- **GitHub**: [matthew110703](https://github.com/matthew110703)

---

Happy coding! 🎉
```

