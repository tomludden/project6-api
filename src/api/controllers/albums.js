const Album = require('../models/albums')

const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find()
    return res.status(200).json(albums)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const album = await Album.findById(id)
    return res.status(200).json(album)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const postAlbum = async (req, res, next) => {
  try {
    const newAlbum = new Album(req.body)
    const albumSaved = await newAlbum.save()
    return res.status(201).json(albumSaved)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const newAlbum = new Album(req.body)
    newAlbum._id = id

    const albumUpdated = await Album.findByIdAndUpdate(id, newAlbum, {
      new: true
    })

    return res.status(200).json(albumUpdated)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const albumDeleted = await Album.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Album eliminado' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAlbums,
  postAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbum
}
