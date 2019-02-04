'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Treatment extends Model {
    disease(){
        return this.belongsTo('App/Models/Disease')
    }
    
}

module.exports = Treatment
