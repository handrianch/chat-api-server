'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    console.log(error.name)

    let message = error.message
    let status = error.status

    if(error.name == 'HttpException') {
      message = 'Route Not Found'
      status = 404
    } else if(error.name == 'PasswordMisMatchException') {
      message = 'Invalid Password'
      status = 403
    } else if(error.name == 'UserNotFoundException') {
      message = 'Username Not found'
      status = 404
    } else if(error.name == 'InvalidJwtToken') {
      message = 'Authorization Failed'
      status = 403
    } else if(error.name == 'Error') {
      message = 'Internal Server Error'
      status = 500
    }

    return response.status(status).send({message})
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
