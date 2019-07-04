'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuid = use('uuid')

class Room extends Model {

  static get incrementing () {
    return false
  }

  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (roomInstance) => {
      let id = await uuid.v4()
      roomInstance.id = id
    })
  }

  sender () {
    return this.belongsTo('App/Models/User', 'sender_id', 'id')
  }

  receiver () {
    return this.belongsTo('App/Models/User', 'receiver_id', 'id')
  }

  chats () {
    return this.hasMany('App/Models/Message')
  }
}

module.exports = Room
