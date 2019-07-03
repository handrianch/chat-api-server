'use strict'

/*
|--------------------------------------------------------------------------
| FakeDatumSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class FakeDatumSeeder {
  async run () {
    // await Factory.model('App/Models/User').createMany(3)
    await Factory.model('App/Models/Room').create(3)
    await Factory.model('App/Models/Message').create(5)
  }
}

module.exports = FakeDatumSeeder
