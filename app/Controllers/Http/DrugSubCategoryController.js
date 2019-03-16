'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Model = use('App/Models/DrugSubCategory')
const Category = use('App/Models/DrugCategory')
const resourceName = 'DrugSubCategory'
const Database = use('Database')

/**
 * Resourceful controller for interacting with drugsubcategories
 */
class DrugSubCategoryController {
  /**
   * Show a list of all drugsubcategories.
   * GET drugsubcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let categories_id = request.params.categories_id
    console.log(categories_id)
    const category = await Category.find(categories_id)
    let subcategories = await category.subcategories().fetch()
    response.json({subcategories})
  }

  

  /**
   * Create/save a new drugsubcategory.
   * POST drugsubcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let CategoryId = request.params.categories_id
    const {Description} = request.post()  

    const result = await Model.create({Description,CategoryId})

    response.json({
      message: 'Successufully created a new '+resourceName,
      subcategory: result
    })
  }

  /**
   * Display a single drugsubcategory.
   * GET drugsubcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let CategoryId = request.params.categories_id
    console.log(CategoryId)
    let id = request.params.id
    console.log(id)
    let subcategory = await Model.query().where('Id', id).andWhere('CategoryId', CategoryId).first()
    
    response.json({
      subcategory
    })
  }

 

  /**
   * Update drugsubcategory details.
   * PUT or PATCH drugsubcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    
    const {Description} = request.post()  
    let id = request.params.id
    let CategoryId = request.params.categories_id

    let affectedRows = await Model.query().where('Id', id).andWhere('CategoryId', CategoryId).update({ Description})

    response.json({
      message: 'Successufully updated '+affectedRows
    })
  }

  /**
   * Delete a drugsubcategory with id.
   * DELETE drugsubcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    let CategoryId = request.params.categories_id
    await Model.query().where('Id', id).andWhere('CategoryId', CategoryId).delete()
  }
}

module.exports = DrugSubCategoryController
