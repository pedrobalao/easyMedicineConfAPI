'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Drug extends Model {
    static get table() {
        return 'drug'
    }
    static get primaryKey() {
        return 'Id'
    }
}

module.exports = Drug
