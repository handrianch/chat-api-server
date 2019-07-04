'use strict'

const Room = use('App/Models/Room')

class RoomController {
  async index ({ request, response, auth }) {
    const user  = await auth.getUser()
    const rooms = await Room.query()
                      .whereRaw('sender_id = :id OR receiver_id = :id', {id: user.id})
                      .with('sender')
                      .with('receiver')
                      .with('chats', (builder) => {
                        return builder.orderBy('created_at', 'DESC').limit(1)
                      })
                      .limit(1)
                      .fetch()

    return response.status(200).send(rooms);
  }

  async show ({ params, request, response, auth }) {
    const user  = await auth.getUser()
    const rooms =  await Room.query()
                             .whereRaw('sender_id = :id OR receiver_id = :id', {id: user.id})
                             .where('id', params.id)
                             .with('sender')
                             .with('receiver')
                             .with('chats', (builder) => builder.orderBy('created_at', 'ASC').with('user'))
                             .fetch()

    if(rooms.rows.length === 0) {
      return response.status(404).send({
        message: `Room with id ${params.id} not found`
      })
    }

    return response.status(200).send(rooms)
  }

  async store ({request, response, auth, params}) {
    const user = await auth.getUser()
    const {receiver_id} = request.post('receiver_id')
    let room = await Room.query().where('sender_id', user.id).where('receiver_id', receiver_id).fetch()

    if(room.rows.length === 0) {
      room = await Room.create({sender_id: user.id, receiver_id: receiver_id})
      console.log(room.id)
    }

    return response.status(201).send(room)
  }
}

module.exports = RoomController
