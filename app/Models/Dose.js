'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dose extends Model {
    static get table() {
        return 'dose'
    }
    static get primaryKey() {
        return 'Id'
    }
}
 
module.exports = Dose
