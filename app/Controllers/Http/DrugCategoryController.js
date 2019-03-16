'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Model = use('App/Models/DrugCategory')
const resourceName = 'DrugCategory'
const Database = use('Database')

/**
 * Resourceful controller for interacting with drugcategories
 */
class DrugCategoryController {
  /**
   * Show a list of all drugcategories.
   * GET drugcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const categories = await Model.all()
    response.json({
      categories
    })
  }

  

  /**
   * Create/save a new drugcategory.
   * POST drugcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log('Create '+resourceName)
    const {Description} = request.post()  

    const result = await Model.create({Description})

    response.json({
      message: 'Successufully created a new '+resourceName,
      category: result
    })
  }

  /**
   * Display a single drugcategory.
   * GET drugcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let category = await Model.find(id)
    
    response.json({
      category
    })
  }

  /**
   * Update drugcategory details.
   * PUT or PATCH drugcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {Description} = request.post()  
    let id = request.params.id

    let affectedRows = await Model.query().where('id', id).update({ Description})

    response.json({
      message: 'Successufully updated '+affectedRows
    })
  }

  /**
   * Delete a drugcategory with id.
   * DELETE drugcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    await Model.query().where('id', id).delete()
  }
}

module.exports = DrugCategoryController
