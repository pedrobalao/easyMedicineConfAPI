'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Disease = use('App/Models/Disease')
const resourceName = 'Disease'

/**
 * Resourceful controller for interacting with diseases
 */
class DiseaseController {
  
  
  
  /**
   * Show a list of all diseases.
   * GET diseases
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

    const diseases = await Disease.query().orderBy('description').paginate(page)

    response.json({
      diseases
    })
  }



  /**
   * Create/save a new disease.
   * POST diseases
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
      disease: result
    })
  }

  /**
   * Display a single disease.
   * GET diseases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let disease = await Disease.find(id)

    response.json({
      disease
    })
  }


  /**
   * Update disease details.
   * PUT or PATCH diseases/:id
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
   * Delete a disease with id.
   * DELETE diseases/:id
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

module.exports = DiseaseController
