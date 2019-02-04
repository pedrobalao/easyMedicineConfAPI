'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Disease extends Model {
    treatments () {
        return this.hasMany('App/Models/Treatment')
    }
}

module.exports = Disease
