module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')

  return async (req, res, next) => {
    try {
      const token = String(req.headers.authorization || '').split(' ').pop()
      assert(token, 401, 'Please login first!')

      // extract token
      const username = jwt.verify(token, 'OWSOCIAL_TOOL_CONSOLE')
      assert(username, 401, 'Please login first')
      await next()
    } catch (err) {
      res.status(err.statusCode || 500).send({ message: err.message })
    }
  }
}
