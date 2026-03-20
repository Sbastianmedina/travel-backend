const express = require("express")
const cors = require("cors")
const { connectDB } = require("./database") // conexión a base de datos

const bookingRoutes = require("./routes/bookingRoutes") // importa las rutas de reservas

const app = express()

app.use(cors())
app.use(express.json())

let db // variable para guardar la conexión a la base de datos


// conectar base de datos
connectDB().then((database) => {
  db = database
})


/*
este middleware permite que TODAS las rutas puedan usar la base de datos
la guardamos en req.db
*/
app.use((req, res, next) => {

  req.db = db

  next()

})


// lista de ciudades (sigue siendo local)
const cities = [
  {
    id: 1,
    name: "Cartagena",
    price: 450000,
    image: "/images/cartagena.jpg"
  },
  {
    id: 2,
    name: "San Andrés",
    price: 900000,
    image: "/images/sanandres.jpg"
  },
  {
    id: 3,
    name: "Santa Marta",
    price: 420000,
    image: "/images/santamarta.jpg"
  },
  {
    id: 4,
    name: "Barranquilla",
    price: 380000,
    image: "/images/barranquilla.jpg"
  },
  {
    id: 5,
    name: "Chocó",
    price: 500000,
    image: "/images/choco.jpg"
  },
  {
    id: 6,
    name: "Pasto",
    price: 300000,
    image: "/images/pasto.jpg"
  },
  {
    id: 7,
    name: "Bogotá",
    price: 350000,
    image: "/images/bogota.jpg"
  },
  {
    id: 8,
    name: "Medellín",
    price: 400000,
    image: "/images/medellin.jpg"
  },
  {
    id: 9,
    name: "Pereira",
    price: 320000,
    image: "/images/pereira.jpg"
  },
  {
    id: 10,
    name: "Neiva",
    price: 200000,
    image: "/images/neiva.jpg"
  },

]


// rutas de ciudades
app.get("/cities", (req, res) => {

  res.json(cities)

})


app.get("/cities/:id", (req, res) => {

  const cityId = parseInt(req.params.id)

  const city = cities.find(c => c.id === cityId)

  if (!city) {
    return res.status(404).json({ message: "Ciudad no encontrada" })
  }

  res.json(city)

})


// aquí activamos las rutas separadas de reservas
app.use(bookingRoutes)


// iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});