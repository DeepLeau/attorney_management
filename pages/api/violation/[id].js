import dbConnect from '../../../utils/dbConnect';
import Violation from '../../../db-schemas/Violation';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const violation = await Violation.findById(id);
        if (!violation) {
          return res.status(404).json({ success: false, message: 'Violation not found' });
        }
        
        Object.assign(violation, req.body);
        await violation.save();
        
        res.status(200).json({ success: true, data: violation });
      } catch (error) {
        console.error('Error during update:', error);
        if (error.code === 11000) {
          res.status(400).json({ success: false, message: 'A violation with this name already exists' });
        } else {
          res.status(400).json({ success: false, message: 'Failed to update violation', error: error.message });
        }
      }
      break;

    case 'DELETE':
      try {
        const deletedViolation = await Violation.findByIdAndDelete(id);
        if (!deletedViolation) {
          return res.status(404).json({ success: false, message: 'Violation not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Failed to delete violation:', error);
        res.status(400).json({ success: false, message: 'Failed to delete violation', error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}