'use strict'

const Message = use('App/Models/Message')
const Room = use('App/Models/Room')
const Env  = use('Env')

class MessageController {
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

  async show ({request, response, params, auth}) {
    const user = await auth.getUser()
    let data = [], status = 200

    let count = await Room.query().whereRaw('sender_id = :id OR receiver_id = :id', {id: user.id}).count('* as total')

    if(!(count[0].total)) {
      return response.status(404).send({message: 'Chat Not Found'})
    }

    const {page}  = request.get('page')
    const start   =  parseInt(page) ? parseInt(page) : 1
    const limit   = 5

    try {
      const results = await Message.query()
                                   .with('user')
                                   .where('room_id', params.id)
                                   .paginate(start, limit)

      const next = start > results.lastPage ? start : start+ 1
      const prev = start < 0  ? 1 : start - 1
      const lastPage = results.pages.lastPage

      const link = {
        self: `${Env.get('APP_URL')}/api/v1/messages/room/ceb52b88-34a6-4025-ac13-1db075edc00f/?page=${start}`,
        first: `${Env.get('APP_URL')}/api/v1/messages/room/ceb52b88-34a6-4025-ac13-1db075edc00f/?page=1`,
        previous: `${Env.get('APP_URL')}/api/v1/messages/room/ceb52b88-34a6-4025-ac13-1db075edc00f/?page=${prev}`,
        next: `${Env.get('APP_URL')}/api/v1/messages/room/ceb52b88-34a6-4025-ac13-1db075edc00f/?page=${next}`,
        last: `${Env.get('APP_URL')}/api/v1/messages/room/ceb52b88-34a6-4025-ac13-1db075edc00f/?page=${lastPage}`
      }

      data = results
      data.rows._links = link
      console.log(data)
    } catch ( e ) {
      console.log(e)
      data = {message: `Chat With ${user.username} Not Exists`}
      status = 404
    }

    return response.status(status).send(data)
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
