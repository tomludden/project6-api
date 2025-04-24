const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true },
    img: { type: String, required: true },
    albums: [{ type: mongoose.Types.ObjectId, ref: 'albums' }]
  },
  { timestamps: true }
)

const Artist = mongoose.model('artists', artistSchema, 'artists')

module.exports = Artist
