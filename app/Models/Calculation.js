'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Calculation extends Model {
    static get table() {
        return 'calculation'
    }
    static get primaryKey() {
        return 'Id'
    }
}

module.exports = Calculation
