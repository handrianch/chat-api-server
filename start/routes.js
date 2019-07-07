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

/*Route.group(() => {
  Route.resource('/rooms', 'RoomController').apiOnly().except(['update'])
  Route.resource('/messages', 'MessageController').apiOnly().only(['store', 'destroy'])
  Route.get('/messages/room/:id', 'MessageController.show')
  Route.get('/profile', 'UserController.profile')
  Route.get('/contacts', 'ContactController.index')
}).prefix('api/v1').middleware('auth').namespace('v1')*/

Route.group(() => {
  Route.get('/profile', 'UserController.profile') // [ok]
  Route.get('/rooms', 'UserRoomController.index') // [ok]
  Route.get('/rooms/:id/chats', 'UserRoomController.showChats') // [ok]
  Route.get('/rooms/:id/members', 'UserRoomController.showMembers') // [ok]
}).prefix('api/v2').middleware('auth').namespace('v2')