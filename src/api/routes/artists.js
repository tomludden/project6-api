const {
  getArtists,
  postArtist,
  updateArtist,
  deleteArtist,
  getArtist
} = require('../controllers/artists')

const artistRouter = require('express').Router()

artistRouter.get('/:id', getArtist)
artistRouter.get('/', getArtists)
artistRouter.post('/', postArtist)
artistRouter.put('/:id', updateArtist)
artistRouter.delete('/:id', deleteArtist)

module.exports = artistRouter
