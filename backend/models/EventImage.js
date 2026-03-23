const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const eventPhotosSchema = new mongoose.Schema({
    poster: [
        {
            imageId: { type: String, default: uuidv4 },
            url: { type: String, required: true },
        }
    ]
});

module.exports = mongoose.model("EventImages", eventPhotosSchema);
