require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors());
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

// Models - RESTORED EXACTLY FROM FILES
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    organisers: [{ type: String, required: true }],
    timeline: [{ date: { type: String, required: true } }],
    timings: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    poster: { url: String, public_id: String }
});

const Event = mongoose.model("event", eventSchema, "events");

const eventPhotosSchema = new mongoose.Schema({
    poster: [
        {
            imageId: { type: String, default: uuidv4 },
            url: { type: String, required: true },
        }
    ]
});

const EventImages = mongoose.model("EventImages", eventPhotosSchema);

// Routes - RESTORED LOGIC

// 1. Create New Event
app.post('/newevent', upload.single('poster'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Poster is required");

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "vignan_events"
        });

        // Use exact logic from previous working state
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
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
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
        const data = await Event.find({ type: type }); // Exact match as requested
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 3. Get All Events
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

        const imageData = { url: result.secure_url };

        await EventImages.findByIdAndUpdate(
            id,
            { $push: { poster: imageData } },
            { new: true, runValidators: true, upsert: true }
        );

        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(201).send("added successfully");
    } catch (error) {
        console.error("Upload Error:", error);
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

// Health Check
app.get("/", (req, res) => res.json({ message: "API is live" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
