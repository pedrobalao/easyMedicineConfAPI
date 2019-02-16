'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Treatement = use('App/Models/Treatment')
const Disease = use('App/Models/Disease')
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
  async index({ request, response, view }) {
    
    let disease_id = request.params.diseases_id
    console.log(disease_id)

    const disease = await Disease.find(disease_id)
    // const treatments = await disease.treatments().fetch()
    const treatments = await Treatement.query().where('disease_id', disease_id).orderBy(['order']).fetch()

    response.json({treatments})
  }


  /**
   * Create/save a new treatment.
   * POST treatments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */



  async store({ request, response }) {
    const { treatmenttype, drug_id, description, via_id, use, order, duration, observation } = request.post()
    let disease_id = request.params.diseases_id
    console.log(disease_id)

    const result = await Treatement.create({ treatmenttype, disease_id, drug_id, description, via_id, use, order, duration, observation })

    response.json({
      message: 'Successufully created a new ' + resourceName,
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
  async show({ params, request, response, view }) {
    
    let id = request.params.id
    let disease_id = request.params.diseases_id
    console.log(params)

    const treatment = await Treatement.query().where('disease_id', disease_id).andWhere('id', id).first()

    response.json({
      message: 'Success',
      data: treatment
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
  async update({ params, request, response }) {
    const { treatmenttype, disease_id, drug_id, description, via_id, use, order, duration, observation} = request.post()

    let id = request.params.id
    var affectedRows = await Treatement.query().where('id', id).update({ treatmenttype, disease_id, drug_id, description, via_id, use, order, duration, observation })

    response.json({
      message: 'Successufully updated ' + affectedRows + ' rows'
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
  async destroy({ params, request, response }) {
    let id = request.params.id
    var affectedRows = await Treatement.query().where('id', id).del()

    response.json({
      message: 'Successufully deleted ' + affectedRows + ' rows'
    })
  }
}

module.exports = TreatmentController
