'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    rooms () {
      return this.belongsTo('App/Models/Room', 'room_id', 'id')
    }

    user () {
      return this.belongsTo('App/Models/User')
    }
}

module.exports = Message
