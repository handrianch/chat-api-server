'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuid = use('uuid')

class Message extends Model {
  static get incrementing () {
    return false
  }

  static boot() {
    super.boot()

    const message = {
      id: uuid.v4()
    }

    this.addHook('beforeCreate', async (userInterface) => {
      userInterface.id = message.id
    })

    this.addHook('afterCreate', async (userInterface) => {
      message.id = uuid.v4()
    })
  }

  rooms () {
    return this.belongsTo('App/Models/Room', 'room_id', 'id')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Message
