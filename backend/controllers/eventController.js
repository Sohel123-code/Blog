const Event = require('../models/Event');
const EventImages = require('../models/EventImage');
const { cloudinary } = require('../middleware/upload');
const fs = require('fs');

exports.createEvent = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const organisers = JSON.parse(req.body.organisers);
        const timeline = JSON.parse(req.body.timeline);
        const timings = JSON.parse(req.body.timings);

        await Event.collection.insertOne({
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

        fs.unlinkSync(req.file.path);
        res.status(201).send("successful");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventsByType = async (request, response) => {
    try {
        const { type } = request.params;
        const data = await Event.find({ type: type });
        response.status(200).send(data);
    } catch (err) {
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
