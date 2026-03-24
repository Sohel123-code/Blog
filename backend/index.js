require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

const allowedOrigins = [
    'https://blog-4-0dfs.onrender.com',
    'http://localhost:5173', // Vite default local
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Global Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/', eventRoutes); // Maintaining legacy paths without /api prefix

// Base Health Check
app.get("/", (req, res) => res.json({ message: "VIIT Events API is running", status: "online" }));
app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`running in port ${PORT}`);
});
