'use strict'

class AuthController {
  async auth ({request, auth, response}) {
    const { username, password } = request.all()
    return auth.withRefreshToken().attempt(username, password)
  }
}

module.exports = AuthController
