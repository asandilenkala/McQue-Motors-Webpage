# McQue-Motors-Webpage
# McQue-Motors-Webpage

# McQue Motors

## Overview
**McQue Motors** is a web-based platform designed for buying, selling, and renting vehicles. It provides a seamless experience for users to explore vehicle options, secure rentals, and for administrators to manage vehicle listings efficiently.

---

## Features

### For Users:
- Browse a wide range of vehicles with detailed descriptions, images, and pricing.
- Search and filter vehicles by type, price, and availability.
- Secure user registration and login functionality.
- Book vehicles for rentals with clear terms and conditions.

### For Admins:
- Login securely to access administrative features.
- Add, update, or delete vehicle listings (images, descriptions, and prices).
- Manage customer rental requests and inquiries.

---

## Technologies Used

### Frontend:
- React.js
- HTML, CSS, JavaScript

### Backend:
- Node.js, Express.js

### Database:
- MongoDB

### Authentication:
- JSON Web Tokens (JWT)

### Hosting:
- Deployment-ready for platforms like AWS, Heroku, or Vercel.

---

## Installation

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps:
1. Clone the repository:
   ```bash
   git clone git@github.com:username/mcque-motors.git
   cd mcque-motors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Access the application at `http://localhost:5000`.

---

## API Endpoints

### Public Endpoints:
- **`GET /api/vehicles`**: Fetch all vehicles.
- **`GET /api/vehicles/:id`**: Fetch details of a specific vehicle.

### Authentication Endpoints:
- **`POST /api/auth/register`**: Register a new user.
- **`POST /api/auth/login`**: Log in an existing user.

### Admin Endpoints:
- **`POST /api/admin/vehicles`**: Add a new vehicle.
- **`PUT /api/admin/vehicles/:id`**: Update vehicle details.
- **`DELETE /api/admin/vehicles/:id`**: Delete a vehicle.

---

## Roadmap
- Implement a payment gateway for secure transactions.
- Introduce advanced search filters (e.g., fuel type, year of manufacture).
- Add a customer review and rating system for vehicles.
- Enable push notifications for booking confirmations.

---

## Support
For any issues or inquiries, please contact us:
- **Email**: support@mcquemotors.com
- **Phone**: +27 123 456 789

---

## License
This project is licensed under the [MIT License](LICENSE).
