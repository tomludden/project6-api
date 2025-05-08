const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema(
  {
    album: { type: String, required: true },
    img: { type: String, required: true },
    year: { type: Number, required: true },
    category: [
      {
        type: String,
        required: true,
        enum: [
          'Pop',
          'Rock',
          'Hip-Hop/Rap',
          'Electronic/Dance',
          'R&B',
          'Jazz',
          'Classical',
          'Reggae',
          'Country',
          'Metal'
        ]
      }
    ]
    /* artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true
    } */
  },
  { timestamps: true }
)

const Album = mongoose.model('Album', albumSchema, 'albums')

module.exports = Album
