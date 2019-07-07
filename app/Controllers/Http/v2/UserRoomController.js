'use strict'

const Env = use('Env')
const Chat = use('App/Models/v2/Chat')
const UserRoom = use('App/Models/v2/UserRoom')
const Database = use('Database')

class UserRoomController {
  async index ({request, response, auth}) {
    const user = await auth.getUser()
    const page = request.get('page').page || 1
    const limit = Env.get('PAGE_LIMIT')
    const results = await user.rooms().paginate(page, limit)

    return response.status(200).send(results)
  }

  async showChats ({request, response, auth, params}) {
    const user = await auth.getUser()
    const page = request.get('page').page || 1
    const limit = Env.get('PAGE_LIMIT')
    const roomId = params.id

    /*
      SELECT chats.*, users.username, users.name FROM chats INNER JOIN user_room ON chats.user_room_id = user_room.id INNER JOIN users ON user_room.user_id = users.id WHERE user_room.room_id = 1 ORDER BY chats.created_at ASC;
    */

    const results = await Database.select('chats.*', 'users.username', 'users.name')
                                  .from('chats')
                                  .innerJoin('user_room', 'chats.user_room_id', 'user_room.id')
                                  .innerJoin('users', 'user_room.user_id', 'users.id')
                                  .where('user_room.room_id', roomId)
                                  .orderBy('chats.created_at', 'ASC')
                                  .paginate(page, limit)
    return response.status(200)
                   .send(results)
  }

  async showMembers ({request, response, params, auth}) {
    const user = await auth.getUser()
    const results = await user.rooms().where('rooms.id', params.id).with('users').paginate(1, 5)

    return response.status(200).send(results)
  }
}

module.exports = UserRoomController
