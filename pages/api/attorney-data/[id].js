import dbConnect from '@/utils/dbConnect';
import Attorney from '@/db-schemas/Attorney';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; 

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const attorney = await Attorney.findByIdAndDelete(id);
        if (!attorney) {
          return res.status(404).json({ success: false, message: 'Attorney not found' });
        }
        res.status(200).json({ success: true, message: 'Attorney successfully deleted' });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Delete failed' });
      }
      break;

      case 'PUT':
        try {
          const attorney = await Attorney.findById(id);
          if (!attorney) {
            return res.status(404).json({ success: false, message: 'Attorney not found' });
          }
          
          Object.keys(req.body).forEach(key => {
            if (req.body[key] !== undefined) {
              attorney[key] = req.body[key];
            }
          });
          
          await attorney.save();
          
          res.status(200).json({ success: true, data: attorney });
        } catch (error) {
          console.error('Error during update:', error);
          res.status(400).json({ success: false, message: 'Failed to update attorney', error: error.message });
        }
      break;
  }
}
