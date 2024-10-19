import dbConnect from '@/utils/dbConnect';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
  try {
    console.log('GET request received for attorney-price-maps');
    const attorneyPriceMaps = await AttorneyPriceMap.find({})
      .populate('attorney')
      .populate('court')
      .populate('county')
      .populate('violation');
    console.log('Attorney price maps fetched:', attorneyPriceMaps);
    res.status(200).json({ success: true, data: attorneyPriceMaps });
  } catch (error) {
    console.error('Error fetching attorney price maps:', error);
    res.status(400).json({ success: false, error: error.message });
  }
  break;

    case 'POST':
      try {
        const attorneyPriceMap = await AttorneyPriceMap.create(req.body);
        res.status(201).json({ success: true, data: attorneyPriceMap });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}