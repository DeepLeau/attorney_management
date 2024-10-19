import dbConnect from '../../../utils/dbConnect';
import TrafficState from '../../../db-schemas/TrafficState';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const trafficState = await TrafficState.findById(id);
        if (!trafficState) {
          return res.status(404).json({ success: false, message: 'State not found' });
        }
        
        Object.assign(trafficState, req.body);
        await trafficState.save();
        
        res.status(200).json({ success: true, data: trafficState });
      } catch (error) {
        console.error('Error during update:', error);
        if (error.code === 11000) {
          res.status(400).json({ success: false, message: 'A state with this short or long name already exists' });
        } else {
          res.status(400).json({ success: false, message: 'Failed to update state', error: error.message });
        }
      }
      break;

    case 'DELETE':
      try {
        const deletedTrafficState = await TrafficState.findByIdAndDelete(id);
        if (!deletedTrafficState) {
          return res.status(404).json({ success: false, message: 'State not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error during deletion:', error);
        res.status(400).json({ success: false, message: 'Failed to delete state', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}