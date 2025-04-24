const {
  getAlbums,
  postAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbum
} = require('../controllers/albums')

const albumRouter = require('express').Router()

albumRouter.get('/:id', getAlbum)
albumRouter.get('/', getAlbums)
albumRouter.post('/', postAlbum)
albumRouter.put('/:id', updateAlbum)
albumRouter.delete('/:id', deleteAlbum)

module.exports = albumRouter
