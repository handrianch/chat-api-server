'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserRoom extends Model {
  static get table() {
    return 'user_room'
  }

  chats () {
    return this.hasMany('App/Models/v2/Chat')
  }

  users () {
    return this.belongsTo('App/Models/v2/User', 'user_id', 'id')
  }

  rooms () {
    return this.belongsTo('App/Models/v2/Room', 'room_id', 'id')
  }
}

module.exports = UserRoom
