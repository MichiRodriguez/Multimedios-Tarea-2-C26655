import { DatabaseSync } from "./db.js"
import { cwd } from "node:process"
import { readFileSync } from "node:fs"

const DATABASE_FILE = `${cwd()}/data/mundiales.db`
const CREATE_SCRIPT  = `${cwd()}/data/CREATE.SQL`

const db  = new DatabaseSync(DATABASE_FILE)
const sql = readFileSync(CREATE_SCRIPT, "utf-8")
db.exec(sql)

const mundiales = [
  {
    nombre:      "Copa Mundial Corea-Japón 2002",
    anio:        2002,
    sede:        "Corea del Sur / Japón",
    campeon:     "Brasil",
    subcampeon:  "Alemania",
    goleador:    "Ronaldo",
    equipos:     32,
    imagen:      "corea-japon-2002.svg",
    slug:        "corea-japon-2002",
    resumen:     "Brasil conquista su quinto titulo con Ronaldo como figura indiscutible.",
    descripcion: "Primer Mundial co-organizado por dos paises y el primero celebrado en Asia; Brasil vencio 2-0 a Alemania en la final.",
  },
  {
    nombre:      "Copa Mundial Alemania 2006",
    anio:        2006,
    sede:        "Alemania",
    campeon:     "Italia",
    subcampeon:  "Francia",
    goleador:    "Miroslav Klose",
    equipos:     32,
    imagen:      "alemania-2006.svg",
    slug:        "alemania-2006",
    resumen:     "Italia conquista su cuarto titulo en una final decidida por penales ante Francia.",
    descripcion: "El torneo fue recordado por el cabezazo de Zidane a Materazzi en la final; Italia gano en tanda de penales.",
  },
  {
    nombre:      "Copa Mundial Sudáfrica 2010",
    anio:        2010,
    sede:        "Sudáfrica",
    campeon:     "España",
    subcampeon:  "Países Bajos",
    goleador:    "David Villa",
    equipos:     32,
    imagen:      "sudafrica-2010.svg",
    slug:        "sudafrica-2010",
    resumen:     "España gana su primer Mundial con un gol de Iniesta en la prorroga.",
    descripcion: "Primer Mundial celebrado en Africa; el gol de Iniesta en el minuto 116 le dio el titulo a La Roja.",
  },
  {
    nombre:      "Copa Mundial Brasil 2014",
    anio:        2014,
    sede:        "Brasil",
    campeon:     "Alemania",
    subcampeon:  "Argentina",
    goleador:    "James Rodríguez",
    equipos:     32,
    imagen:      "brasil-2014.svg",
    slug:        "brasil-2014",
    resumen:     "Alemania goleo 7-1 a Brasil en semifinales y se consagro en el Maracana.",
    descripcion: "El Mineirazo fue la mayor goleada en una semifinal mundialista; Gotze sello el titulo en la prorroga.",
  },
  {
    nombre:      "Copa Mundial Rusia 2018",
    anio:        2018,
    sede:        "Rusia",
    campeon:     "Francia",
    subcampeon:  "Croacia",
    goleador:    "Harry Kane",
    equipos:     32,
    imagen:      "rusia-2018.svg",
    slug:        "rusia-2018",
    resumen:     "Francia conquista su segundo titulo ante una sorpresiva Croacia.",
    descripcion: "Croacia llego por primera vez a una final mundialista; Francia gano 4-2 con Mbappe como figura.",
  },
  {
    nombre:      "Copa Mundial Qatar 2022",
    anio:        2022,
    sede:        "Qatar",
    campeon:     "Argentina",
    subcampeon:  "Francia",
    goleador:    "Kylian Mbappé",
    equipos:     32,
    imagen:      "qatar-2022.svg",
    slug:        "qatar-2022",
    resumen:     "Argentina campeon tras una final epica ante Francia que termino en penales.",
    descripcion: "Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo con Messi como figura.",
  },
  {
    nombre:      "Copa Mundial Canadá-México-USA 2026",
    anio:        2026,
    sede:        "Canadá / México / Estados Unidos",
    campeon:     "Por definir",
    subcampeon:  "Por definir",
    goleador:    "Por definir",
    equipos:     48,
    imagen:      "canada-mexico-usa-2026.svg",
    slug:        "canada-mexico-usa-2026",
    resumen:     "Primera edicion con 48 selecciones, co-organizada por tres paises de América del Norte.",
    descripcion: "Edicion expandida del Mundial con 104 partidos; se juega en 16 ciudades de Canada, Mexico y Estados Unidos.",
  },
]

const insert = db.prepare(`
  INSERT OR IGNORE INTO mundiales
    (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
  VALUES
    (@nombre, @anio, @sede, @campeon, @subcampeon, @goleador, @equipos, @imagen, @slug, @resumen, @descripcion)
`)

const insertAll = db.transaction((items) => {
  for (const item of items) insert.run(item)
})

insertAll(mundiales)
console.log(`Base de datos poblada con ${mundiales.length} ediciones del Mundial.`)
