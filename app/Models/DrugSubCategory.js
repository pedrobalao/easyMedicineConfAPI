'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DrugSubCategory extends Model {
    static get table() {
        return 'subcategory'
    }
    static get primaryKey() {
        return 'Id'
    }
    drugs () {
        return this.belongsToMany('App/Models/Drug', 'SubCategoryId', 'DrugId', 'Id', 'Id').pivotTable('drugcategory')
    }
}

module.exports = DrugSubCategory
