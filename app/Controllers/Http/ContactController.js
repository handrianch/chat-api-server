'use strict'

const User = use('App/Models/User')

class ContactController {
  async index({request, response, auth}) {
    const user = await auth.getUser()
    return await User.query().where('id', '!=', user.id).fetch()
  }
}

module.exports = ContactController
