import dbConnect from '../../../utils/dbConnect';
import Violation from '../../../db-schemas/Violation';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const violations = await Violation.find({});
        res.status(200).json({ success: true, data: violations });
      } catch (error) {
        console.error('Error during retrieval:', error);
        res.status(400).json({ success: false, message: 'Failed to retrieve violations', error: error.message });
      }
      break;

    case 'POST':
      try {
        const violation = await Violation.create(req.body);
        res.status(201).json({ success: true, data: violation });
      } catch (error) {
        console.error('Error during creation :', error);
        if (error.code === 11000) {
          res.status(400).json({ success: false, message: 'A violation with this name already exists' });
        } else {
          res.status(400).json({ success: false, message: 'Failed to create violation', error: error.message });
        }
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}