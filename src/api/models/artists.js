const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true, unique: true },
    img: { type: String },
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
  },
  { timestamps: true }
)

const Artist = mongoose.model('Artist', artistSchema, 'artists')

module.exports = Artist
