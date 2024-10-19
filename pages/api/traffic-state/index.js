import dbConnect from '@/utils/dbConnect'
import TrafficState from '@/db-schemas/TrafficState'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const trafficStates = await TrafficState.find({})
        res.status(200).json({ success: true, data: trafficStates })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const trafficState = await TrafficState.create(req.body)
        res.status(201).json({ success: true, data: trafficState })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}