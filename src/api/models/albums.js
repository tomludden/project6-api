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
  },
  { timestamps: true }
)

const Album = mongoose.model('albums', albumSchema, 'albums')

module.exports = Album
