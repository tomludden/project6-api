const albums = require('../../data/albums')
const Album = require('../../api/models/albums')
const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://tomerin79:jXcTKUWxRlkP0Ndg@cluster0.vvdelu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    const allAlbums = await Album.find()

    if (allAlbums.length) {
      await Album.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Album.insertMany(albums)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))

  .finally(() => mongoose.disconnect())
