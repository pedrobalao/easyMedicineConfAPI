'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Drug = use('App/Models/Drug')
const resourceName = 'Drug'

/**
 * Resourceful controller for interacting with drugs
 */
class DrugController {
  /**
   * Show a list of all drugs.
   * GET drugs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const drugs = await Drug.all()

    response.json({
      drugs
    })
  }

  /**
   * Search drugs by name.
   * GET drugs/search?drugname=:string
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async search ({ request, response }) {
    
    let searchstr = request.qs.drugname;
    searchstr = '%'+searchstr.toUpperCase().replace(' ','%')+'%'
    console.log(searchstr)
    const drugs = await Drug.query().select('Id', 'Name').whereRaw('UPPER(Name) like ?', searchstr).fetch()

    response.json({
      drugs
    })
  }
 

  /**
   * Create/save a new drug.
   * POST drugs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single drug.
   * GET drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let drug = await Drug.find(id)

    response.json({
      drug
    })
  }

  /**
   * Update drug details.
   * PUT or PATCH drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a drug with id.
   * DELETE drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DrugController
