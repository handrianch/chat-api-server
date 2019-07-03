'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.uuid('id').primary()
      table.text('chat')
      table.uuid('user_id').references('id').inTable('users')
      table.uuid('room_id').references('id').inTable('rooms')
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
