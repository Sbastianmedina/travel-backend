// routes/bookingRoutes.js

const express = require("express")

const router = express.Router()

const bookingController = require("../controllers/bookingController")

router.get("/bookings", bookingController.getBookings)

router.post("/bookings", bookingController.createBooking)

router.delete("/bookings/:id", bookingController.deleteBooking)


module.exports = router