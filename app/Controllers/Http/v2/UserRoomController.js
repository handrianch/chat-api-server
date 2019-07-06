'use strict'

const Room = use('App/Models/v2/Room')
const User = use('App/Models/v2/User')
const Chat = use('App/Models/v2/Chat')
const UserRoom = use('App/Models/v2/UserRoom')

class UserRoomController {
  async index ({request, response, auth}) {
    const user = await auth.getUser()
    const results = await user.rooms().fetch()
    response.status(200).send(results)
  }

  async show ({request, response, auth, params}) {
    const user = await auth.getUser()
    const results = Chat.query().fetch()
    return response.status(200).send(results)
  }

  async showChats ({request, response, auth, params}) {
    const user = await auth.getUser()
    // const results = await Chat.query().with('userRoom').where('user_room_id', params.id).fetch()
    const results = await Room.query().where('id', params.id).with('userRoom').fetch()
    // const results = await Chat.query().fetch()

    return response.status(200).send(results)
  }

  async showMembers ({request, response, params, auth}) {
    const user = await auth.getUser()
    const results = await user.rooms().with('users').fetch()

    return response.status(200).send(results)
  }
}

module.exports = UserRoomController
