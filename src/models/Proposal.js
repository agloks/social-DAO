import mongoose from 'mongoose'

/* ProposalSchema will correspond to a collection in your MongoDB database. */
const ProposalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide the text.'],
    maxlength: [3000, 'Text Name cannot be more than 60 characters'],
  }, 
  votes: {
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  }
}, {timestamps: true})

export default mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema)
