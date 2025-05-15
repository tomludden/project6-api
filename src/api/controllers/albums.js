const Album = require('../models/albums')
const Artist = require('../models/artists')

const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find()
    return res.status(200).json(albums)
  } catch (error) {
    return res.status(400).json({ message: 'Albums not found' })
  }
}

const getAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const album = await Album.findById(id)
    return res.status(200).json(album)
  } catch (error) {
    return res.status(400).json({ message: 'Album not found' })
  }
}

const postAlbum = async (req, res, next) => {
  try {
    const { album, img, year, category, artist: artistName } = req.body

    if (!artistName) {
      return res.status(400).json({ message: 'Artist name is required' })
    }

    // Find the artist by name (case-insensitive)
    const foundArtist = await Artist.findOne({
      artist: { $regex: new RegExp(`^${artistName}$`, 'i') }
    })

    if (!foundArtist) {
      return res.status(404).json({ message: 'Artist not found' })
    }

    // Create the album with the artist's ObjectId
    const newAlbum = new Album({
      album,
      img,
      year,
      category,
      artist: foundArtist._id
    })

    const savedAlbum = await newAlbum.save()

    // Add the album to the artist's albums array if not already there
    if (!foundArtist.albums.includes(savedAlbum._id)) {
      foundArtist.albums.push(savedAlbum._id)
      await foundArtist.save()
    }

    return res.status(201).json(savedAlbum)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Album not saved', error: error.message })
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
    return res.status(400).json({ message: 'Album not updated' })
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const albumDeleted = await Album.findByIdAndDelete(id)
    return res.status(200).json(albumDeleted)
  } catch (error) {
    return res.status(400).json({ message: 'Album not deleted' })
  }
}

module.exports = {
  getAlbums,
  postAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbum
}
