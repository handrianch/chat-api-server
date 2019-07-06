'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoomSchema extends Schema {
  up () {
    this.create('user_room', (table) => {
      table.increments('id', 3)
      table.integer('user_id', 3).unsigned().references('id').inTable('users')
      table.integer('room_id', 3).unsigned().references('id').inTable('rooms')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_rooms')
  }
}

module.exports = UserRoomSchema
