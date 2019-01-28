'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Model = use('App/Models/Treatment')
const resourceName = 'Treatment'
/**
 * Resourceful controller for interacting with treatments
 */
class TreatmentController {
  /**
   * Show a list of all treatments.
   * GET treatments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let page = request.qs.page;
    if(page === undefined) {
      page = 1
    }

    const result = await Model.query().orderBy('description').paginate(page)

    response.json({
      message: 'Here are all the '+resourceName,
      data: result
    })
  }

  
  /**
   * Create/save a new treatment.
   * POST treatments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {description, author, indication, followup, example, bibliography, observation} = request.post()  
    debugger
    const result = await Disease.create({description, author, indication, followup, example, bibliography, observation})

    response.json({
      message: 'Successufully created a new '+resourceName,
      data: result
    })
  }

  /**
   * Display a single treatment.
   * GET treatments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let result = await Disease.find(id)

    response.json({
      message: 'Success',
      data: result
    })
  }

  

  /**
   * Update treatment details.
   * PUT or PATCH treatments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {description, author, indication, followup, example, bibliography, observation} = request.post()  
    
    let id = request.params.id
    var affectedRows = await Disease.query().where('id', id).update({ description, author, indication, followup, example, bibliography, observation})

    response.json({
      message: 'Successufully updated '+affectedRows+' rows'
    })
  }

  /**
   * Delete a treatment with id.
   * DELETE treatments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    var affectedRows = await Disease.query().where('id', id).del()

    response.json({
      message: 'Successufully deleted '+affectedRows+' rows'
    })
  }
}

module.exports = TreatmentController
