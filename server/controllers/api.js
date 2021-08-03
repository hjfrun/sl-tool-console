const Config = require('../models/config')

module.exports = class API {
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
}
