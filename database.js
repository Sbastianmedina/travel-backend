const sqlite3 = require("sqlite3") // librería que permite usar sqlite
const { open } = require("sqlite") // permite usar async/await con sqlite

async function connectDB() {

  const db = await open({
    filename: "./database.db", // archivo donde se guardará la base de datos
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cityId INTEGER,
      name TEXT,
      people INTEGER
    )
  `) // crea la tabla bookings si aún no existe

  return db // devuelve la conexión para usarla en index.js
}

module.exports = { connectDB } // exporta la función para usarla en otros archivos