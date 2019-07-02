'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const uuid = use('uuid')

class User extends Model {
  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()

    const user = {
      id: uuid.v4()
    }

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('beforeCreate', async (userInstance) => {
      userInstance.id = user.id
    })

    this.addHook('afterCreate', async (userInstance) => {
      // userInstance.id = await user.id
      // await delete user.id
      user.id = await uuid.v4()
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
