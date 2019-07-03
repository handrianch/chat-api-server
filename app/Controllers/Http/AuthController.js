'use strict'

class AuthController {
  async auth ({request, auth, response}) {
    const { username, password } = request.only(['username', 'password'])
    return auth.withRefreshToken().attempt(username, password)
  }
}

module.exports = AuthController
