'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {
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
