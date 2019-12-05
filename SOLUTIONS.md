Corrections
* Remove `start` and `end` filter object used in the `$and` filter in the EventController file line 24, from the array and pass them directly as `objects`

* In the Events model file, change the export variable to `EventSchema` and pass it to `mongoose.model` method to make a copy of the schema compile it into a model and create a collection.

* In the events route file, reference the right methods in the EventController. Change `addJobsEvent` - `addEvent` and `getEvents` - `getAllEvents`

* In the index.js file, declare `app`

* Export `router` from the `route` file and connect it to the `index` using `app.use`

* In he `EventController` Change `Event.make` on line 37 to a Mongoose method, `Event.create` because that's the method needed to add new event entries into the `db`

* On line 39 of `EventController` change the `statusCode` from `500` to `201` because its the code that corresponds to the action performed which is `created`

* Declare a variable `data` and pass `req.body` into the variable instead of mutating `req.body`

* On line 50, change `Event.see` to a Mongoose method, `Event.find` for fetching data from db and add a `statusCode` of `200`


