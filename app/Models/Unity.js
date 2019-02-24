'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unity extends Model {
    static get table() {
        return 'unity'
    }
    static get primaryKey() {
        return 'Id'
    }
    static get incrementing() {
        return false
    }
}

module.exports = Unity
