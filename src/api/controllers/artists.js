const Artist = require('../models/artists')

const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find().populate('albums')
    return res.status(200).json(artists)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

getArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const artist = await Artist.findById(id).populate('albums')
    return res.status(200).json(artist)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const postArtist = async (req, res, next) => {
  try {
    const newArtist = new Artist(req.body)
    const artistSaved = await newArtist.save()
    return res.status(201).json(artistSaved)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const newArtist = new Artist(req.body)
    newArtist._id = id

    const artistUpdated = await Artist.findByIdAndUpdate(id, newArtist, {
      new: true
    })

    return res.status(200).json(artistUpdated)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const artistDeleted = await Artist.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Artist eliminado' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getArtists,
  postArtist,
  updateArtist,
  deleteArtist,
  getArtist
}
