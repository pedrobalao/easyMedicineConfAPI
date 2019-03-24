'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Indication extends Model {
    static get table() {
        return 'indication'
    }
    static get primaryKey() {
        return 'Id'
    }
    doses () {
        return this.hasMany('App/Models/Dose', 'Id', 'IndicationId')
    }
}

module.exports = Indication
