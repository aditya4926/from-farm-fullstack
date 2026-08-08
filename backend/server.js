// const dns = require("dns");
// const http = require("http");
// const { Server } = require("socket.io");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// dotenv.config();

// connectDB();

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://from-farm-fullstack.vercel.app",
// ];

// // Middleware
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/", (req, res) => {
//   res.send("Farm Connect API Running");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/admin", adminRoutes);

// const PORT = process.env.PORT || 5000;

// // HTTP Server
// const server = http.createServer(app);

// // Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// let onlineUsers = {};

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join", (userId) => {
//     socket.join(userId);

//     onlineUsers[userId] = socket.id;

//     io.emit("onlineUsers", Object.keys(onlineUsers));
//   });

//   socket.on("sendMessage", (data) => {
//     io.to(data.receiverId).emit("receiveMessage", data);
//   });

//   socket.on("disconnect", () => {
//     let disconnectedUser = null;

//     for (const userId in onlineUsers) {
//       if (onlineUsers[userId] === socket.id) {
//         disconnectedUser = userId;
//         delete onlineUsers[userId];
//         break;
//       }
//     }

//     io.emit("onlineUsers", Object.keys(onlineUsers));

//     console.log("User disconnected:", disconnectedUser);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const dns = require("dns");
const http = require("http");
const { Server } = require("socket.io");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://from-farm-fullstack.vercel.app",
  "https://from-farm-frontend.vercel.app",
];

// =========================
// Express CORS
// =========================

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Farm Connect API Running");
});

// =========================
// Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// =========================
// Server
// =========================

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// =========================
// Socket.IO
// =========================

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins
  socket.on("join", (userId) => {
    socket.join(userId);

    onlineUsers[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // Send message
  socket.on("sendMessage", (data) => {
    io.to(data.receiverId).emit("receiveMessage", data);
  });

  // Disconnect
  socket.on("disconnect", () => {
    let disconnectedUser = null;

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        disconnectedUser = userId;
        delete onlineUsers[userId];
        break;
      }
    }

    io.emit("onlineUsers", Object.keys(onlineUsers));

    console.log("User disconnected:", disconnectedUser);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});