const Event = require('../models/Event');
const EventImages = require('../models/EventImage');
const { cloudinary } = require('../middleware/upload');
const fs = require('fs');

exports.createEvent = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Poster image is required" });
        }

        console.log("Uploading poster to Cloudinary:", req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "vignan_events/posters"
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
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: error.message });
    }
};

exports.getEventsByType = async (request, response) => {
    try {
        const { type } = request.params;
        console.log(`Searching events for type: ${type}`);
        
        // Case-insensitive regex match
        const data = await Event.find({ 
            type: { $regex: new RegExp(`^${type}$`, 'i') } 
        });
        
        console.log(`Found ${data.length} events for type: ${type}`);
        response.status(200).send(data);
    } catch (err) {
        console.error("Error in getEventsByType:", err);
        response.status(500).send(err.message);
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({}, 'title type _id');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadGalleryImages = async (req, res) => {
    console.log("Gallery Upload Request Received for ID:", req.body.id);
    console.log("File received:", req.file ? "Yes" : "No");
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Event ID is required" });
        
        console.log("Found file at:", req.file.path);

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "vignan_events" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Stream Error:", error);
                        reject(error);
                    } else resolve(result);
                }
            );
            fs.createReadStream(req.file.path).pipe(stream);
        });

        console.log("Cloudinary Upload Success:", result.secure_url);

        const imageData = { url: result.secure_url };

        await EventImages.findByIdAndUpdate(
            id,
            { $push: { poster: imageData } },
            { new: true, runValidators: true, upsert: true }
        );

        res.status(201).send("added successfully");
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).send("internal server error");
    } finally {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.getGalleryImages = async (request, response) => {
    try {
        const { id } = request.body;
        console.log("Fetching images for event ID:", id);
        const data = await EventImages.find({ "_id": id });
        response.status(200).send({ data });
    } catch (err) {
        console.error("Error fetching images:", err);
        response.status(500).send(err.message);
    }
};

exports.getDistinctTypes = async (req, res) => {
    try {
        const types = await Event.distinct('type');
        const count = await Event.countDocuments();
        res.status(200).json({ 
            message: "Diagnostic data",
            totalEvents: count,
            existingTypes: types,
            note: "If this list is empty, your database connection is working but the collection is empty."
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
