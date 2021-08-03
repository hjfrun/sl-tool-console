const mongoose = require('mongoose')

const baseConfig = {
  discriminatorKey: "_type",
  collection: 'config'
}

module.exports = mongoose.model('Config', new mongoose.Schema({}, baseConfig))
