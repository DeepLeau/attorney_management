import mongoose from 'mongoose';

const AttorneySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this attorney.'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Attorney || mongoose.model('Attorney', AttorneySchema);
