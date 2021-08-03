const Config = require('../models/config')

module.exports = class API {
  // fetch all users
  static async fetchAllUsers(req, res) {
    try {
      const user = await Config.findOne({ "_type": "user" })
      res.status(200).json(user)
    } catch (err) {
      res.status(404).status({ message: err.message })
    }
  }
}
