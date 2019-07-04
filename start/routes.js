'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/auth', 'AuthController.auth')

Route.group(() => {
  Route.resource('/rooms', 'RoomController').apiOnly()
  Route.get('/profile', 'UserController.profile')
  Route.get('/contacts', 'ContactController.index')
  Route.post('/messages', 'MessageController.store')
  Route.delete('/messages/:id', 'MessageController.destroy')
}).prefix('api/v1').middleware('auth')
