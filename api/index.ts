import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (req:VercelRequest, res:VercelResponse) => {
  res.status(200).json({
    talents: [] //Base path will return the list of talents
  })
}