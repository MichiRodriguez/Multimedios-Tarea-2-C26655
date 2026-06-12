import * as mundial from "../../data/mundiales.js"

export const getAll = (req, res) => {
  const full = req.query.include === "full"
  res.json(full ? mundial.getAllFull() : mundial.getAll())
}
