'use strict'

const Room = use('App/Models/Room')
const { ModelNotFoundException } = require('@adonisjs/generic-exceptions')

class RoomController {

  async index ({ request, response, auth }) {
    const user = await auth.getUser()
    const rooms = Room.query()
                      .whereRaw('sender_id = :id OR receiver_id = :id', {id: user.id})
                      .with('sender')
                      .with('receiver')
                      .fetch()
    return rooms;
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, auth }) {
    const user = await auth.getUser()
    const rooms =  await Room.query()
                             .whereRaw('sender_id = :id OR receiver_id = :id', {id: user.id})
                             .where('id', params.id)
                             .with('chats', (builder) => builder.with('user'))
                             .fetch()

    if(rooms.rows.length === 0) {
      return response.status(404).send({
        message: `Room with id ${params.id} not found`
      })
    }

    return response.status(200).send(rooms)
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = RoomController
