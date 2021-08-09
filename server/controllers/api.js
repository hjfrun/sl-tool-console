const assert = require('http-assert')
const Config = require('../models/config')

const admin_password_hash = require('bcrypt').hashSync(process.env.PASSWORD || 'owsocial', 10)


module.exports = class API {
  // user login
  static async login(req, res) {
    try {
      const { username, password } = req.body
      // handle user not exist
      assert(username === process.env.USERNAME, 422, 'Please enter the correct username!')

      // invalid password
      const isValid = require('bcrypt').compareSync(password, admin_password_hash)
      assert(isValid, 422, 'Please enter the correct password!')

      // return token
      const token = require('jsonwebtoken').sign({ id: username }, process.env.TOKEN_SECRET, { expiresIn: '10800s' })
      res.send({ token })
    } catch (err) {
      res.status(err.statusCode || 500).send({ message: err.message })
    }
  }

  // fetch all users
  static async fetchAllUsers(req, res) {
    try {
      const user = await Config.findOne({ "_type": "user" })
      res.status(200).json(user)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  // insert a new user
  static async addNewUser(req, res) {
    try {
      await Config.findOneAndUpdate({ "_type": "user" }, { $push: { users: { $each: [req.body], $position: 0 } } }, { new: true, strict: false })
      res.status(201).json({ message: 'Add new user successfully!' })
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  // delete user in db
  static async deleteUser(req, res) {
    try {
      await Config.findOneAndUpdate({ "_type": "user" }, { $pull: { users: { email: req.params.email } } }, { strict: false })
      res.status(200).json({ message: 'User deleted successfully!' })
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  // fetch all universes
  static async fetchAllUniverses(req, res) {
    try {
      const universes = await Config.find({ "_type": "data_universe", "status": "existing" }, { name: 1, universe_updated_time: 1, data_volume: 1, 'access_control.owner': 1 })
      res.status(200).json(universes)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }
}
