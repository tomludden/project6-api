const Artist = require('../models/artists')
const Album = require('../models/albums')

const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find().populate('albums')
    return res.status(200).json(artists)
  } catch (error) {
    return res.status(400).json({ message: "Can't get artists" })
  }
}

const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const artist = await Artist.findById(id).populate('albums')
    return res.status(200).json({ message: 'Artist found', artist })
  } catch (error) {
    return res.status(400).json({ message: "Can't get artist" })
  }
}

const postArtist = async (req, res, next) => {
  try {
    const { artist, img, albums: incomingAlbums = [] } = req.body
    const albumIds = incomingAlbums.map((id) => id.toString())

    const existingAlbums = await Album.find({ _id: { $in: albumIds } }).select(
      '_id'
    )
    const existingAlbumIds = existingAlbums.map((album) => album._id.toString())

    const newAlbums = albumIds.filter((id) => !existingAlbumIds.includes(id))

    const createdAlbums = await Promise.all(
      newAlbums.map(async (albumId) => {
        const newAlbum = new Album({
          title: `Album ${albumId}`,
          year: new Date().getFullYear()
        })
        await newAlbum.save()
        return newAlbum._id
      })
    )

    const allAlbumIds = Array.from(
      new Set([...existingAlbumIds, ...createdAlbums])
    )

    let existingArtist = await Artist.findOne({
      artist: { $regex: new RegExp(`^${artist}$`, 'i') }
    })

    if (existingArtist) {
      const currentAlbumIds = existingArtist.albums.map((id) => id.toString())
      const mergedAlbums = Array.from(
        new Set([...currentAlbumIds, ...allAlbumIds])
      )

      existingArtist.albums = mergedAlbums

      const updatedArtist = await existingArtist.save()
      return res.status(200).json({
        message: 'Artist updated with new albums',
        artist: updatedArtist
      })
    } else {
      const newArtist = new Artist({
        artist,
        img,
        albums: allAlbumIds
      })

      const artistSaved = await newArtist.save()
      return res.status(201).json({
        message: 'New artist created',
        artist: artistSaved
      })
    }
  } catch (error) {
    return res.status(400).json({
      message: "Can't post artist"
    })
  }
}

const updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const { artist, img, albums: newAlbums = [] } = req.body

    const existingArtist = await Artist.findById(id)
    if (!existingArtist) {
      return res.status(404).json({ message: 'Artist not found' })
    }

    const existingAlbums = existingArtist.albums.map((albumId) =>
      albumId.toString()
    )

    const incomingAlbums = newAlbums.map((albumId) => albumId.toString())

    const mergedAlbums = Array.from(
      new Set([...existingAlbums, ...incomingAlbums])
    )

    const validAlbums = await Album.find({ _id: { $in: mergedAlbums } }).select(
      '_id'
    )

    const validAlbumIds = validAlbums.map((album) => album._id.toString())

    const filteredAlbums = mergedAlbums.filter((albumId) =>
      validAlbumIds.includes(albumId)
    )

    if (artist) {
      const existingArtistName = await Artist.findOne({
        artist: { $regex: new RegExp(`^${artist}$`, 'i') }
      })

      if (existingArtistName && existingArtistName._id.toString() !== id) {
        return res.status(400).json({ message: 'Artist name already exists' })
      }

      existingArtist.artist = artist
    }
    if (img) existingArtist.img = img

    existingArtist.albums = filteredAlbums

    const updatedArtist = await existingArtist.save()

    return res.status(200).json(updatedArtist)
  } catch (error) {
    return res.status(400).json({ message: "Can't update artist" })
  }
}

const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params
    const artistDeleted = await Artist.findByIdAndDelete(id)
    return res.status(200).json(artistDeleted)
  } catch (error) {
    return res.status(400).json({ message: "Can't delete artist" })
  }
}

module.exports = {
  getArtists,
  postArtist,
  updateArtist,
  deleteArtist,
  getArtist
}
