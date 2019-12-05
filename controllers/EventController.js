const Event = require('../models/Events');

module.exports = {
  addEvent: async ({ body }, res) => {
    let data = { ...body }

    const dateStart = new Date(body.start);
    dateStart.setTime(
      dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );
    data.start = dateStart;

    const dateEnd = new Date(body.end);
    dateEnd.setTime(
      dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );
    data.end = dateEnd;

    const existingEvent = await Event.findOne({
      $and: [
        {
          'location.latLng.lng': data.location.latLng.lng,
          'location.latLng.lat': data.location.latLng.lat,
        },
        { start: { $gte: data.start } },
        { end: { $lte: data.end } }
      ],
    });



    if (existingEvent) {
      return res.status(409).json({
        success: false,
        message: 'An Event already exist at this venue on this day',
      });
    } else {
      return Event.create(data)
        .then((event) => res.status(201).json({
          success: true,
          event,
        }))
        .catch((err) => res.status(500).json({
          success: false,
          message: 'An Error Occured, please try again later',
        }));
    }
  },
  getAllEvents: (req, res) => {
    Event.find()
      .then((events) => res.status(200).json({ success: true, events }))
      .catch((err) => res.status(500).json({
        success: false,
        message: 'An Error Occured, please try again later',
      }));
  },
};
