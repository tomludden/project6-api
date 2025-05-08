const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Album = require('../../api/models/albums')
const Artist = require('../../api/models/artists')
const albums = require('../../data/albums')

const albumSeedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to MongoDB!')

    const collectionExists = await mongoose.connection.db
      .listCollections({ name: 'albums' })
      .toArray()
    if (collectionExists.length > 0) {
      await Album.collection.drop()
      console.log('Album collection dropped!')
    }

    const insertedAlbums = []

    for (let album of albums) {
      const artistDoc = await Artist.findOne({ artist: album.artistName })
      if (!artistDoc) {
        console.warn(`Artist not found for album: ${album.album}`)
        continue
      }

      const newAlbum = await Album.create({
        album: album.album,
        img: album.img,
        year: album.year,
        category: album.category,
        artist: artistDoc._id
      })

      insertedAlbums.push(newAlbum)

      await Artist.findByIdAndUpdate(artistDoc._id, {
        $addToSet: { albums: newAlbum._id }
      })
    }

    console.log('Albums inserted:', insertedAlbums.length)
    insertedAlbums.forEach((a) =>
      console.log(`- ${a.album}, ${a.year}, ${a.category}`)
    )

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB!')
  } catch (error) {
    console.error('Error seeding albums:', error)
    await mongoose.disconnect()
  }
}

albumSeedData()
