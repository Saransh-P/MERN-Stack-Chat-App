# BuzzUp - Chat App 💬

A real-time chat application built with the **MERN Stack**, **Socket.io**, and **TailwindCSS**, featuring user authentication, real-time messaging, and a modern UI.

- Live Demo: [Visit BuzzUp on Render](https://mern-stack-chat-app-6w6l.onrender.com/) 🚀


## Features

- 🔒 Authentication and Authorization using JWT
- ⚡ Real-time messaging powered by Socket.io
- 🟢 Online user status indicator
- 🌐 Global state management with Zustand
- 💅 Modern and responsive UI with TailwindCSS + DaisyUI
- 🌘 Built-in Dark Mode support
- 📱 Fully responsive layout (mobile-friendly)
- ⚠️ Robust error handling on both client and server
- 🔁 Auto-scroll to latest messages on chat updates
- ✅ Protected routes and secure APIs


## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS with DaisyUI for styling
- Zustand for state management
- Axios for API requests
- Socket.IO client for real-time communication

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Socket.IO for real-time functionality
- Cloudinary for image storage
- JWT for authentication
- CORS, dotenv, bcryptjs

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Saransh-P/MERN-Stack-Chat-App.git
cd MERN-Stack-Chat-App
```

2. Install dependencies for both frontend and backend
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
   - Create `.env` file in the backend directory
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   

4. Start the development servers

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5001`.

## Project Structure

```
MERN-Stack-Chat-App/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Application pages/routes
│   │   ├── store/      # Zustand store configurations
│   │   └── lib/        # Utility functions and configurations
│   └── public/         # Static assets
│
└── backend/           # Node.js backend application
    └── src/
        ├── controllers/  # Request handlers
        ├── models/      # Database models
        ├── routes/      # API routes
        ├── middleware/  # Custom middleware
        └── lib/         # Utility functions and configurations
```

## Features in Detail

- **Authentication**: Secure user authentication system with JWT
- **Real-time Chat**: Instant messaging with Socket.IO
- **Profile Management**: User profile customization with avatar support
- **Theme Settings**: Customizable UI themes
- **Image Sharing**: Support for sharing images in chats
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Upcoming Features

- **Group chats**
- **Typing indicator**
- **Message read receipts**
- **Chat deletion and archive**
- **Notifications**


## Deployment

- Deployed using Render
- Environment variables managed securely via Render dashboard


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

- Saransh Pathak
- linkedin: https://www.linkedin.com/in/saransh-pathak
- 📧 Email: saranshp510@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE file for details. 