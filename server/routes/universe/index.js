const express = require('express')

const router = express.Router()

const API = require('../../controllers/api')

router.get('/', API.fetchAllUniverses)

module.exports = router
