'use strict'

const Message = use('App/Models/Message')

class MessageController {

  async index ({ request, response, view }) {
    return Message.query().with('rooms.chats').fetch()
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
    // return Message.find(params)
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = MessageController
