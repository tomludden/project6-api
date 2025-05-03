# Music Artists & Albums API

## Project Overview

This project is a **REST API** for managing **music artists** and their **albums**. It allows users to:

- **Retrieve** a list of artists and albums.
- **Create, Read, Update, and Delete** artists and albums. **(CRUD)**
- Establish **relationships** between artists and their respective albums.

Technologies used **Node.js**, **Dotenv**, **Mongoose**, **Express**, and **MongoDB**.

## Installation & Setup

### _1 -- Clone the repository_

git clone https://github.com/tomludden/project6-api.git

### _2 -- Start the server_

### Commands (npm run)

"start": "node index.js",\
"dev": " nodemon index.js",

### Artists Routes

GET /api/v1/artists -- Get all artists\
GET /api/v1/artist/:id -- Get a specific artist\
POST /api/v1/artists -- Create a new artist\
PUT /api/v1/artists/:id -- Update an artist\
DELETE /api/v1/artists/:id -- Delete an artist

### Albums Routes

GET /api/v1/albums -- Get all albums\
GET /api/v1/album/:id -- Get a specific album\
POST /api/v1/albums -- Create a new album\
PUT /api/v1/albums/:id -- Update an album\
DELETE /api/v1/albums/:id -- Delete an album

### Artist-Album Relationship

GET /api/v1/artists/:id/albums -- Get albums for a specific artist\
GET /api/v1/albums/:id/artist -- Get artist for a specific album

### Seeds (npm run)

**"artistSeed"**: "node ./src/utils/seeds/artistSeed.js",\
**"albumSeed"**: "node ./src/utils/seeds/albumSeed.js"
