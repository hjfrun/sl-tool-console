const express = require('express')

const router = express.Router()

const API = require('../controllers/api')

router.get('/user/', API.fetchAllUsers)
router.post('/user/', API.addNewUser)
router.delete('/user/:email', API.deleteUser)
router.get('/universe/', API.fetchAllUniverses)

module.exports = router
