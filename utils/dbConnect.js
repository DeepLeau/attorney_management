import mongoose from 'mongoose';
import '../db-schemas/Attorney';
import '../db-schemas/AttorneyPriceMap';
import '../db-schemas/TrafficCourt';
import '../db-schemas/TrafficCounty';
import '../db-schemas/Violation';

let isConnected;

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = db.connections[0].readyState;
}
