// models/bookingModel.js

const getBookings = async (db) => {
  return await db.all("SELECT * FROM bookings") // obtiene todas las reservas
}

const createBooking = async (db, cityId, name, people) => {

  const result = await db.run(
    "INSERT INTO bookings (cityId, name, people) VALUES (?, ?, ?)",
    [cityId, name, people]
  )

  return result.lastID // devuelve el id de la reserva creada
}

const deleteBooking = async (db, id) => {

  const result = await db.run(
    "DELETE FROM bookings WHERE id = ?",
    id
  )

  return result.changes
}

module.exports = {
  getBookings,
  createBooking,
  deleteBooking
}