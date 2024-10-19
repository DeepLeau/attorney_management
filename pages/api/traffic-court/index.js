import dbConnect from '../../../utils/dbConnect';
import TrafficCourt from '../../../db-schemas/TrafficCourt';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const trafficCourts = await TrafficCourt.find({})
          .populate('trafficCounty')
          .populate('trafficState');
        res.status(200).json({ success: true, data: trafficCourts });
      } catch (error) {
        console.error('Error during retrieval:', error);
        res.status(400).json({ success: false, message: 'Failed to retrieve courts' });
      }
      break;

    case 'POST':
      try {
        const trafficCourt = await TrafficCourt.create(req.body);
        res.status(201).json({ success: true, data: trafficCourt });
      } catch (error) {
        console.error('Error during creation:', error);
        res.status(400).json({ success: false, message: 'Failed to create court', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}