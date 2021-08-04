import axios from 'axios'

const userUrl = '/api/user'
const universeUrl = '/api/universe'

export default class API {
  static async getAllUsers() {
    const res = await axios.get(userUrl)
    return res.data
  }

  static async addNewUser(user) {
    const res = await axios.post(userUrl, user)
    return res.data
  }

  static async deleteUser(email) {
    const res = await axios.delete(`${userUrl}/${email}`)
    return res.data
  }

  static async getAllUniverses() {
    const res = await axios.get(universeUrl)
    return res.data
  }
}
