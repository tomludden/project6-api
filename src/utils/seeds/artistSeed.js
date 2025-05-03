const mongoose = require('mongoose')
const Artist = require('../models/artists')
const Album = require('../models/albums')

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const artists = await Artist.find()

    const albums = [
      {
        album: 'Future Nostalgia',
        img: 'https://example.com/future-nostalgia.jpg',
        year: 2020,
        category: ['Pop'],
        artistName: 'Dua Lipa'
      },
      {
        album: 'Fine Line',
        img: 'https://example.com/fine-line.jpg',
        year: 2019,
        category: ['Pop'],
        artistName: 'Harry Styles'
      },
      {
        album: 'Harry’s House',
        img: 'https://example.com/harrys-house.jpg',
        year: 2022,
        category: ['Pop'],
        artistName: 'Harry Styles'
      },
      {
        album: 'AM',
        img: 'https://example.com/am.jpg',
        year: 2013,
        category: ['Rock'],
        artistName: 'Arctic Monkeys'
      }
    ]

    for (let album of albums) {
      const artistDoc = await Artist.findOne({ artist: album.artistName })
      if (artistDoc) {
        const newAlbum = await Album.create({ ...album, artist: artistDoc._id })
        await Artist.findByIdAndUpdate(artistDoc._id, {
          $push: { albums: newAlbum._id }
        })
      }
    }

    console.log('Artists and Albums successfully linked!')
    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seedData()
