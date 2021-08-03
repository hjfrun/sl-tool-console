const express = require('express')

const router = express.Router()

const API = require('../controllers/api')

router.get('/', API.fetchAllUsers)
router.post('/', API.addNewUser)

module.exports = router
