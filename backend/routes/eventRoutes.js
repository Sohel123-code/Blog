const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { upload } = require('../middleware/upload');

router.post('/newevent', upload.single('poster'), eventController.createEvent);
router.get('/allevents/:type', eventController.getEventsByType);
router.get('/all-events', eventController.getAllEvents);
router.get('/debug-types', eventController.getDistinctTypes);
router.post('/event-images', upload.single('images'), eventController.uploadGalleryImages);
router.post('/images-receive', eventController.getGalleryImages);

module.exports = router;
