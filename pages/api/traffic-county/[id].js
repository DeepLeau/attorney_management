import dbConnect from '../../../utils/dbConnect';
import TrafficCounty from '../../../db-schemas/TrafficCounty';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const trafficCounty = await TrafficCounty.findById(id);
        if (!trafficCounty) {
          return res.status(404).json({ success: false, message: 'County not found' });
        }
        
        Object.assign(trafficCounty, req.body);
        await trafficCounty.save();
        
        res.status(200).json({ success: true, data: trafficCounty });
      } catch (error) {
        console.error('Error during update:', error);
        res.status(400).json({ success: false, message: 'Failed to update county', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedTrafficCounty = await TrafficCounty.findByIdAndDelete(id);
        if (!deletedTrafficCounty) {
          return res.status(404).json({ success: false, message: 'County not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error during deletion:', error);
        res.status(400).json({ success: false, message: 'Failed to delete county', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}