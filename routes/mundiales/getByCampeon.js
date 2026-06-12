import * as mundial from "../../data/mundiales.js"

export const getByCampeon = (req, res) => {
  const items = mundial.getByCampeon(req.params.pais)
  if (!items.length) return res.status(404).json({ error: "No se encontraron mundiales para ese campeón" })
  res.json(items)
}
