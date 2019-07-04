'use strict'

const Message = use('App/Models/Message')

class MessageController {

  async index ({ request, response, view }) {
    return await Message.query().where().fetch()
  }

  async store ({ request, response, auth }) {
    const user = await auth.getUser()
    const {room_id, chat} = request.only(['room_id', 'chat'])
    const userData = {
      chat, room_id, user_id: user.id
    }

    try {
      const message = await Message.create(userData)
      return response.status(201).send(message)
    } catch(e) {
      return response.status(400).send({
        message: 'Bad Request'
      })
    }

  }

  async show ({ params, request, response, view }) {
    return await Message.query().where('room_id', params.room_id).fetch()
  }

  async destroy ({ params, request, response, auth }) {
    const user = await auth.getUser()
    const messageDeleted = await Message.query().where({ user_id: user.id, id: params.id }).delete()

    let status = 200
    let message = 'success'

    if(!messageDeleted) {
      status = 404
      message = 'Not found'
    }

    return response.status(status).send({message})
  }
}

module.exports = MessageController
