'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Via extends Model {
    static get table() {
        return 'via'
    }
    static get primaryKey() {
        return 'Id'
    }
    static get incrementing() {
        return false
    }
}

module.exports = Via
