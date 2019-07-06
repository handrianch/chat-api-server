'use strict'

const Room = use('App/Models/v2/Room')

class RoomController {

  async index ({ request, response, view }) {
    let room = await Room.all()
    response.status(200).send(room)
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = RoomController
