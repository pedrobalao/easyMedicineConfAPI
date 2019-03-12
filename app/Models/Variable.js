'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Variable extends Model {
    static get table() {
        return 'variable'
    }
    static get primaryKey() {
        return 'Id'
    }
    static get incrementing() {
        return false
    }
    values () {
        return this.hasMany('App/Models/VariableValue', 'Id', 'VariableId')
    }
}

module.exports = Variable
