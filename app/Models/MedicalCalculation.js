'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MedicalCalculation extends Model {
    static get table() {
        return 'medicalcalculation'
    }
    static get primaryKey() {
        return 'Id'
    }
    variables () {
        return this.belongsToMany('App/Models/Variable', 'MedicalCalculationId', 'VariableId', 'Id', 'Id').pivotTable('variablemedicalcalculation')
    }
}

module.exports = MedicalCalculation
