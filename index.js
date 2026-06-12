import express from "express"
import { getAll }       from "./routes/mundiales/getAll.js"
import { getBySlug }    from "./routes/mundiales/getBySlug.js"
import { getByCampeon } from "./routes/mundiales/getByCampeon.js"
import { getRandom }    from "./routes/mundiales/getRandom.js"
import { search }       from "./routes/mundiales/search.js"

const app  = express()
const PORT = 4321

app.enable("strict routing")
app.use(express.static("public"))

app.get("/", (req, res) => res.json({
  nombre:      "API Copa Mundial FIFA",
  version:     "1.0.0",
  descripcion: "Últimas 6 ediciones de la Copa Mundial de la FIFA",
  rutas: [
    { metodo: "GET", path: "/mundiales",           descripcion: "Lista de ediciones (campos principales)" },
    { metodo: "GET", path: "/mundiales?include=full", descripcion: "Lista con todos los campos" },
    { metodo: "GET", path: "/mundial/:slug",        descripcion: "Detalle de una edición" },
    { metodo: "GET", path: "/campeon/:pais",        descripcion: "Slugs de ediciones ganadas por un país" },
    { metodo: "GET", path: "/random",               descripcion: "Edición aleatoria" },
    { metodo: "GET", path: "/search/:text",         descripcion: "Búsqueda por texto (mín. 3 caracteres)" },
    { metodo: "GET", path: "/imagenes/:archivo",    descripcion: "Imagen de una edición" },
  ],
}))

app.get("/mundiales",      getAll)
app.get("/mundial/:slug",  getBySlug)
app.get("/campeon/:pais",  getByCampeon)
app.get("/random",         getRandom)
app.get("/search/:text",   search)

app.use((req, res) => {
  res.status(404).json({ error: "Path not found" })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
