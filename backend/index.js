require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const app = express();

// Middleware
app.use(cors()); // Restored to open CORS as per user request
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration
const upload = multer({ dest: 'uploads/' });

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected Automatically"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Models
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    venue: { type: String, required: true },
    organisers: [{ type: String }],
    timeline: [{ stage: String, date: String }],
    timings: { start: String, end: String },
    createdBy: { type: String },
    isActive: { type: Boolean, default: true },
    poster: { url: String, public_id: String }
});

const Event = mongoose.model("event", eventSchema, "events");

const eventImageSchema = new mongoose.Schema({
    _id: String,
    poster: [{ url: String }]
});

const EventImages = mongoose.model("eventimage", eventImageSchema, "eventimages");

// Routes

// 1. Create New Event
app.post('/newevent', upload.single('poster'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Poster is required");

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "vignan_events"
        });

        const organisers = JSON.parse(req.body.organisers || "[]");
        const timeline = JSON.parse(req.body.timeline || "[]");
        const timings = JSON.parse(req.body.timings || "{}");

        const newEvent = new Event({
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            details: req.body.details,
            venue: req.body.venue,
            organisers,
            timeline,
            timings,
            createdBy: req.body.createdBy,
            isActive: req.body.isActive === "true",
            poster: { url: result.secure_url, public_id: result.public_id }
        });

        await newEvent.save();
        fs.unlinkSync(req.file.path);
        res.status(201).send("successful");
    } catch (error) {
        console.error("Create Event Error:", error);
        res.status(500).send(error.message);
    }
});

// 2. Get Events by Type
app.get('/allevents/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const data = await Event.find({ type: type }); // Restored exact match
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 3. Get All Events (Simplified)
app.get('/all-events', async (req, res) => {
    try {
        const events = await Event.find({}, 'title type _id');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 4. Upload Gallery Images
app.post('/event-images', upload.single('images'), async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || !req.file) return res.status(400).send("ID and Image are required");

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "vignan_events" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            fs.createReadStream(req.file.path).pipe(stream);
        });

        await EventImages.findByIdAndUpdate(
            id,
            { $push: { poster: { url: result.secure_url } } },
            { upsert: true }
        );

        fs.unlinkSync(req.file.path);
        res.status(201).send("added successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 5. Get Gallery Images
app.post('/images-receive', async (req, res) => {
    try {
        const { id } = req.body;
        const data = await EventImages.find({ "_id": id });
        res.status(200).send({ data });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Health Checks
app.get("/", (req, res) => res.json({ message: "VIIT Events API is running", status: "online" }));
app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
