'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VariableValue extends Model {
    static get table() {
        return 'variablevalues'
    }
    static get primaryKey() {
        return 'Id'
    }
    
}

module.exports = VariableValue
