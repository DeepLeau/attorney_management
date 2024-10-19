import dbConnect from '../../../utils/dbConnect';
import TrafficCounty from '../../../db-schemas/TrafficCounty';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const trafficCounties = await TrafficCounty.find({}).populate('trafficState');
        res.status(200).json({ success: true, data: trafficCounties });
      } catch (error) {
        console.error('Error during retrieval:', error);
        res.status(400).json({ success: false, message: 'Failed to retrieve counties' });
      }
      break;

    case 'POST':
      try {
        const trafficCounty = await TrafficCounty.create(req.body);
        res.status(201).json({ success: true, data: trafficCounty });
      } catch (error) {
        console.error('Error during creation:', error);
        res.status(400).json({ success: false, message: 'Failed to create county', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}