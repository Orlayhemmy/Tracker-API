const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.route('/')
  .post(EventController.addEvent)
  .get(EventController.getAllEvents)

module.exports = router;
