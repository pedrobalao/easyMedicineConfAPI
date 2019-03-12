'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Model = use('App/Models/Variable')
const VariableValue = use('App/Models/VariableValue')
const resourceName = 'Variable'
const LISTVALUES_TYPE = 'LISTVALUES'
const Database = use('Database')

/**
 * Resourceful controller for interacting with variables
 */
class VariableController {
  /**
   * Show a list of all variables.
   * GET variables
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const variables = await Model.all()

    response.json({
      variables
    })
  }


  /**
   * Create/save a new variable.
   * POST variables
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log('Create '+resourceName)
    const {Id, Description, IdUnit, Type, Values} = request.post()  

    const trx = await Database.beginTransaction()
    const result = await Model.create({Id, Description, IdUnit, Type}, trx )

    if(Values != null && Values.length > 0)
    {
      Values.forEach( (element, index) => {
        element.VariableId = result.Id
      })
      await VariableValue.createMany(Values, trx)
    }

    trx.commit()
    response.json({
      message: 'Successufully created a new '+resourceName,
      variable: result
    })
  }

  /**
   * Display a single variable.
   * GET variables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let variable = await Model.find(id)
    
    if(variable.Type === LISTVALUES_TYPE){
      let values = await variable.values().fetch()
      variable.Values = values
    }
    
    response.json({
      variable
    })
  }

  /**
   * Update variable details.
   * PUT or PATCH variables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {Description, IdUnit, Type, Values} = request.post()  
    let id = request.params.id

    const trx = await Database.beginTransaction()
    let affectedRows = await Model.query().where('Id', id).update({ Description, IdUnit, Type}, trx)

    await VariableValue.query().where('VariableId', id).delete(trx)

    
    if(Values != null && Values.length > 0)
    {
      Values.forEach( (element, index) => {
        element.VariableId = id
        delete element.created_at
        delete element.updated_at
      })
      console.log(Values)
      await VariableValue.createMany(Values, trx)
    }
    trx.commit()

    response.json({
      message: 'Successufully updated '
    })
  }

  /**
   * Delete a variable with id.
   * DELETE variables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let id = request.params.id
    const trx = await Database.beginTransaction()
    await VariableValue.query().where('VariableId', id).delete(trx)
    var affectedRows = await Model.query().where('Id', id).del()
    trx.commit()
    response.json({
      message: 'Successufully deleted '+affectedRows+' rows'
    })
  }
}

module.exports = VariableController
