const albums = require('../../data/albums')
const Album = require('../../api/models/albums')
const mongoose = require('mongoose')

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect(
    'mongodb+srv://tomerin79:jXcTKUWxRlkP0Ndg@cluster0.vvdelu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    // Buscamos todas las películas de nuestra colección
    const allAlbums = await Album.find()

    // Si existen películas previamente, dropearemos la colección
    if (allAlbums.length) {
      await Album.collection.drop() //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    // Una vez vaciada la colección de las películas, usaremos el array movies de nuestra carpeta data
    // para llenar nuestra base de datos con todas las películas.
    await Album.insertMany(albums)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect())
