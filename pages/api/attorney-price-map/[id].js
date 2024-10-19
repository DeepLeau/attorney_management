import dbConnect from '@/utils/dbConnect';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const attorneyPriceMap = await AttorneyPriceMap.findById(id)
          .populate('attorney')
          .populate('court')
          .populate('county')
          .populate('violation')
          .lean();

        if (!attorneyPriceMap) {
          return res.status(404).json({ success: false, message: 'Price map not found' });
        }

        Object.keys(attorneyPriceMap).forEach(key => 
          (attorneyPriceMap[key] === null || attorneyPriceMap[key] === undefined) && delete attorneyPriceMap[key]
        );

        res.status(200).json({ success: true, data: attorneyPriceMap });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Retrieval failed' });
      }
      break;

    case 'PUT':
      try {
        const attorneyPriceMap = await AttorneyPriceMap.findById(id);
        if (!attorneyPriceMap) {
          return res.status(404).json({ success: false, message: 'Price map not found' });
        }
        
        Object.assign(attorneyPriceMap, req.body);
        await attorneyPriceMap.save();
        
        res.status(200).json({ success: true, data: attorneyPriceMap });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Update failed' });
      }
      break;

    case 'DELETE':
      try {
        const deletedAttorneyPriceMap = await AttorneyPriceMap.findByIdAndDelete(id);
        if (!deletedAttorneyPriceMap) {
          return res.status(404).json({ success: false, message: 'Price map not found' });
        }
        res.status(200).json({ success: true, message: 'Price map deleted' });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Deletion failed' });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}