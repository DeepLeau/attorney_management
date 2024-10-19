import dbConnect from '../../../utils/dbConnect';
import TrafficCourt from '../../../db-schemas/TrafficCourt';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const trafficCourt = await TrafficCourt.findById(id);
        if (!trafficCourt) {
          return res.status(404).json({ success: false, message: 'Court not found' });
        }
        
        Object.assign(trafficCourt, req.body);
        await trafficCourt.save();
        
        res.status(200).json({ success: true, data: trafficCourt });
      } catch (error) {
        console.error('Error during update:', error);
        res.status(400).json({ success: false, message: 'Failed to update court', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedTrafficCourt = await TrafficCourt.findByIdAndDelete(id);
        if (!deletedTrafficCourt) {
          return res.status(404).json({ success: false, message: 'Court not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error during deletion:', error);
        res.status(400).json({ success: false, message: 'Failed to delete court', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}