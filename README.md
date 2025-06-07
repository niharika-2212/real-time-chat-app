# Real-Time chat Application

A full-stack real-time chat application where users can:
- Log in and chat with others
- Send and receive messages and images in real-time
- View chat history
- Get notified when new message arrives

## Features

- User authentication (Firebase)
- Real-time messaging (Socket.IO)
- Message history (MongoDB)
- Image sharing via CDN (cloudinary)
- Toast notifications for new messages
- Clean and responsive UI (React)

## Tech-Stack
### Frontend
- React.js
- Axios
- Socket.IO Client
- Cloudinary
- React toastify
- Firebase auth
- dotenv

### Backend
- Node.js
- Express.js
- MongoDB
- Socker.IO server
- dotenv

## Setup instructions
### Backend
1. Clone the repository and navigate t the backend
```
git clone https://github.com/niharika-2212/real-time-chat-app.git
cd backend
npm install
```
2. Setup environment variables `env`
```
PORT = <port>
MONGODB_URI=<your-mongodb-URI>
```
3. Get firebase admin key file and paste in `lib` folder as firebaseAdmin.json
4. Start the server
```
npm run dev
```
### Frontend
1. Navigate to frontend and install dependencies
```
cd frontend
npm install
```
2. Setup environment variables env for cloudinary
```
VITE_UPLOAD_PRESET=<your-cloud-preset>
VITE_CLOUD_NAME=<your-cloud-name>
```
3. Get firebase config details, create a file in `src` as firebaseConfig.js and paste content there
4. Start the server
```
npm run dev
```
Visit your localhost as shown in your terminal: http://localhost:5173/
## Author
Niharika Manhar