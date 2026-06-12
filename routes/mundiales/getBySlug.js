import * as mundial from "../../data/mundiales.js"

export const getBySlug = (req, res) => {
  const item = mundial.getBySlug(req.params.slug)
  if (!item) return res.status(404).json({ error: "Mundial no encontrado" })
  res.json(item)
}
