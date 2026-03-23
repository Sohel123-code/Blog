const mongoose = require('mongoose');
require('dotenv').config();

async function checkTypes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const eventSchema = new mongoose.Schema({ type: String }, { strict: false });
        const Event = mongoose.model('event', eventSchema);
        const types = await Event.distinct('type');
        console.log('Unique event types in DB:', types);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkTypes();
