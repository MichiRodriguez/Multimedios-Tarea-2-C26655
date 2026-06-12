import * as mundial from "../../data/mundiales.js"

export const getRandom = (req, res) => {
  res.json(mundial.getRandom())
}
