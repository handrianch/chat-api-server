'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User    = use('App/Models/User')
const Message = use('App/Models/Message')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    password: '12345'
  }
})

Factory.blueprint('App/Models/Room', async (faker) => {
  const users = await User.all()
  const rand = Math.floor(Math.random() * 3) + 1

  return {
    sender_id: users[rand].id,
    receiver_id: users[rand > 3 ? rand - 1 : rand + 1].id
  }
} )

Factory.blueprint('App/Models/Message', async (faker) => {
  const rooms = await Room.all()
  const rand  = Math.floor(Math.random() * 3) + 1

  return {
    chat: faker.sentence(),
    room_id: rooms[rand].id
  }
})