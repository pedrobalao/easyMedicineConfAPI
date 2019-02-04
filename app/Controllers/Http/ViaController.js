'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Via = use('App/Models/Via')
const resourceName = 'Via'

/**
 * Resourceful controller for interacting with vias
 */
class ViaController {
  /**
   * Show a list of all vias.
   * GET vias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    
    const vias = await Via.all()

    response.json({
      vias
    })
  }

  /**
   * Create/save a new via.
   * POST vias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {Id} = request.post()  
    debugger
    const result = await Via.create({Id})

    response.json({
      message: 'Successufully created a new '+resourceName,
      via: result
    })
  }

  /**
   * Display a single via.
   * GET vias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let via = await Via.find(id)

    response.json({
      via
    })
  }


  /**
   * Update via details.
   * PUT or PATCH vias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /* async update ({ params, request, response }) {
   
  } */

  /**
   * Delete a via with id.
   * DELETE vias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    var affectedRows = await Via.query().where('id', id).del()

    response.json({
      message: 'Successufully deleted '+affectedRows+' rows'
    })
  }
}

module.exports = ViaController
