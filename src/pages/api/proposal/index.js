import dbConnect from '../../../lib/dbConnect'
import Proposal from '../../../models/Proposal'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'PUT' /* Edit a model by its ID */:
      try {
        const {id, ...data} = req.body.data
        const proposal = await Proposal.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        if (!proposal) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: proposal })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const proposal = await Proposal.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: proposal })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    
      default:
      res.status(400).json({ success: false })
      break
  }
}
