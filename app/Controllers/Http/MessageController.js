'use strict'

const Message = use('App/Models/Message')

class MessageController {

  async index ({ request, response, view }) {
    return await Message.query().fetch()
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
    return await Message.query().where('room_id', params.id).fetch()
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = MessageController
