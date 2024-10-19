import mongoose from 'mongoose'

const TrafficCourtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  trafficCounty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrafficCounty',
    required: true,
  },
  trafficState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrafficState',
    required: true,
  },
  stateShortName: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.TrafficCourt || mongoose.model('TrafficCourt', TrafficCourtSchema);