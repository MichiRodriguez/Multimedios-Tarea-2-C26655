import { DatabaseSync } from "./db.js"
import { cwd } from "node:process"

const db = new DatabaseSync(`${cwd()}/data/mundiales.db`)

export const getAll = () => {
  const query = db.prepare("SELECT slug, nombre, anio, sede, campeon, imagen FROM mundiales ORDER BY anio")
  return query.all()
}

export const getAllFull = () => {
  const query = db.prepare("SELECT * FROM mundiales ORDER BY anio")
  return query.all()
}

export const getBySlug = (slug) => {
  const query = db.prepare("SELECT * FROM mundiales WHERE slug = ?")
  return query.get(slug)
}

export const getByCampeon = (campeon) => {
  const query = db.prepare("SELECT slug FROM mundiales WHERE campeon = ? ORDER BY anio")
  return query.all(campeon)
}

export const getRandom = () => {
  const query = db.prepare("SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1")
  return query.get()
}

export const search = (text) => {
  const like = `%${text}%`
  const query = db.prepare(`
    SELECT * FROM mundiales
    WHERE nombre      LIKE ?
       OR sede        LIKE ?
       OR campeon     LIKE ?
       OR subcampeon  LIKE ?
       OR goleador    LIKE ?
       OR resumen     LIKE ?
       OR descripcion LIKE ?
    ORDER BY anio
  `)
  return query.all(like, like, like, like, like, like, like)
}
