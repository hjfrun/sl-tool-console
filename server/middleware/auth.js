const jwt = require('jsonwebtoken')
const assert = require('http-assert')

return async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  assert(token, 401, 'Please login first!')

  // extract token
  const username = jwt.verify(token, req.app.get('secret'))
  assert(username, 401, 'Please login first')

  await next()
}
