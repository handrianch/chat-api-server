'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  userRoom() {
    return this.belongsTo('App/Models/v2/UserRoom')
  }
}

module.exports = Chat
