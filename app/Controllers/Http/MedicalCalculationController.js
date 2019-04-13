'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Model = use('App/Models/MedicalCalculation')
const Variable = use('App/Models/Variable')
const resourceName = 'Medicalcalculation'
const Database = use('Database')
/**
 * Resourceful controller for interacting with medicalcalculations
 */
class MedicalCalculationController {
  /**
   * Show a list of all medicalcalculations.
   * GET medicalcalculations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const medicalcalculations = await Model.all()

    response.json({
      medicalcalculations
    })
  }

  

  /**
   * Create/save a new medicalcalculation.
   * POST medicalcalculations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    console.log('Create '+resourceName)
    const {Description, ResultUnitId, Formula, Observation, CalculationGroupId, ResultType, Precision, Variables} = request.post()  

    const trx = await Database.beginTransaction()
    const result = await Model.create({Description, ResultUnitId, Formula, Observation, CalculationGroupId, ResultType, Precision}, trx )

    
    console.log('Variables '+Variables.length)
    if(Variables != null && Variables.length > 0)
    {
       Variables.forEach( async (element) => {
       // const variab = await Variables.find(element.Id)
         await result.variables().attach(element.Id, trx)
         console.log('Variable '+element.Id)
       })
    }
    trx.commit()
    response.json({
      message: 'Successufully created a new '+resourceName,
      medicalcalculation: result
    })
  }

  /**
   * Display a single medicalcalculation.
   * GET medicalcalculations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let id = request.params.id
    let medicalcalculation = await Model.find(id)
    
    let variables = await medicalcalculation.variables().fetch()

    medicalcalculation.Variables = variables
    response.json({
      medicalcalculation
    })
  }

  

  /**
   * Update medicalcalculation details.
   * PUT or PATCH medicalcalculations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let id = request.params.id
    const {Description, ResultUnitId, Formula, Observation, CalculationGroupId, ResultType, Precision, Variables} = request.post()  

    const trx = await Database.beginTransaction()
    let affectedRows = await Model.query().where('Id', id).update({ Description, ResultUnitId, Formula, Observation, CalculationGroupId, ResultType, Precision}, trx)
    
    let mc = await Model.find(id)
    await mc.variables().detach()
    
    if(Variables != null && Variables.length > 0)
    {
      let varsId = []
       Variables.forEach( (element) => {
         console.log('Variable '+element.Id)
         varsId.push(element.Id)
       })
       console.log('attach Variable')
       await mc.variables().attach(varsId, trx)
    }

    
    trx.commit()
    response.json({
      message: 'Successufully updated '
    })
  }

  /**
   * Delete a medicalcalculation with id.
   * DELETE medicalcalculations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MedicalCalculationController
