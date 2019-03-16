'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DrugCategory extends Model {
    static get table() {
        return 'clinicalcategory'
    }
    static get primaryKey() {
        return 'id'
    }
    subcategories () {
        return this.hasMany('App/Models/DrugSubCategory', 'id', 'CategoryId')
    }
}

module.exports = DrugCategory
