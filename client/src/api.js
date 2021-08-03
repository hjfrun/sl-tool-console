import axios from 'axios'

const url = '/api/user'

export default class API {
  static async getAllUsers() {
    const res = await axios.get(url)
    return res.data
  }

  static async addNewUser(user) {
    const res = await axios.post(url, user)
    return res.data
  }
}
