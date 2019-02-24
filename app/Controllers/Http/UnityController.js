'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Unity = use('App/Models/Unity')
const resourceName = 'Unity'

/**
 * Resourceful controller for interacting with unities
 */
class UnityController {
  /**
   * Show a list of all unities.
   * GET unities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const unities = await Unity.all()

    response.json({
      unities
    })
  }

  /**
   * Create/save a new unity.
   * POST unities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log('Create Unity')
    const {Id} = request.post()  
    const result = await Unity.create({Id})

    response.json({
      unity: result
    })
  }

  /**
   * Display a single unity.
   * GET unities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let res = await Unity.find(id)

    response.json({
      res
    })
  }

  /**
   * Update unity details.
   * PUT or PATCH unities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /*async update ({ params, request, response }) {
  }
  */
  /**
   * Delete a unity with id.
   * DELETE unities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    var affectedRows = await Unity.query().where('id', id).del()

    response.json({
      message: 'Successufully deleted '+affectedRows+' rows'
    })
  }
}

module.exports = UnityController
