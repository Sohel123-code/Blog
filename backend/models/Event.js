const mongoose = require("mongoose");

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

module.exports = mongoose.model("event", eventSchema, "events");
