// controllers/bookingController.js

const bookingModel = require("../models/bookingModel")

const getBookings = async (req, res) => {

  const bookings = await bookingModel.getBookings(req.db)

  res.json(bookings)

}

const createBooking = async (req, res) => {

  const { cityId, name, people } = req.body

  const id = await bookingModel.createBooking(
    req.db,
    cityId,
    name,
    people
  )

  res.json({
    message: "Reserva creada",
    id
  })

}

const deleteBooking = async (req, res) => {

  const id = parseInt(req.params.id)

  const changes = await bookingModel.deleteBooking(req.db, id)

  if (changes === 0) {
    return res.status(404).json({ message: "Reserva no encontrada" })
  }

  res.json({ message: "Reserva eliminada" })

}

module.exports = {
  getBookings,
  createBooking,
  deleteBooking
}