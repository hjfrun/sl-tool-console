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
    console.log(req.body)
    try {
      await Config.findOneAndUpdate({ "_type": "user" }, { $push: { users: { $each: [req.body], $position: 0 } } }, { new: true, strict: false })
      res.status(200).json({ message: 'Add new user successfully!' })
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }
}
