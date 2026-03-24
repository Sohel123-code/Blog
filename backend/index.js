require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));
app.use(express.json());

// DIAGNOSTIC ROOT - If you see this, the backend is ALIVE
app.get('/', (req, res) => {
  res.json({ status: "ALIVE", service: "Vignan Events Backend", time: new Date().toISOString() });
});

// PROXY/DEBUG ROUTE
app.get('/ping', (req, res) => res.send('pong'));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const eventSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  details: String,
  venue: String,
  organisers: [String],
  timeline: [{ date: String }],
  timings: { start: String, end: String },
  createdBy: String,
  isActive: Boolean,
  poster: { url: String, public_id: String },
});

const Event = mongoose.model('event', eventSchema, 'events');

const eventImageSchema = new mongoose.Schema({
  _id: String,
  poster: [{ url: String }],
});

const EventImages = mongoose.model('eventimage', eventImageSchema, 'eventimages');

app.post('/newevent', upload.single('poster'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'vignan_events',
    });
    const newEvent = new Event({
      ...req.body,
      organisers: JSON.parse(req.body.organisers || '[]'),
      timeline: JSON.parse(req.body.timeline || '[]'),
      timings: JSON.parse(req.body.timings || '{}'),
      poster: { url: result.secure_url, public_id: result.public_id },
    });
    await newEvent.save();
    fs.unlinkSync(req.file.path);
    res.status(201).send('successful');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/allevents/:type', async (req, res) => {
  try {
    const data = await Event.find({ type: req.params.type });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/event-images', upload.single('images'), async (req, res) => {
  try {
    const { id } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'vignan_events',
    });
    const imageData = { url: result.secure_url };
    await EventImages.findByIdAndUpdate(
      id,
      { $push: { poster: imageData } },
      { new: true, upsert: true }
    );
    fs.unlinkSync(req.file.path);
    res.status(201).send('added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/images-receive', async (req, res) => {
  try {
    const { id } = req.body;
    const data = await EventImages.find({ _id: id });
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/all-events', async (req, res) => {
    try {
        const events = await Event.find({}, 'title type _id');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// CATCH-ALL 404 - If you see this, the app started but the route is wrong
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found on this backend", requestedUrl: req.url });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
