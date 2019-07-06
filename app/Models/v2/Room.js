'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {
  users () {
    return this.belongsToMany('App/Models/v2/User').pivotModel('App/Models/v2/UserRoom')
  }
}

module.exports = Room
