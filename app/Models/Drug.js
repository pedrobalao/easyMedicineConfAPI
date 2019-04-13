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
    indications () {
        return this.hasMany('App/Models/Indication', 'Id', 'DrugId')
    }
    variables () {
        return this.belongsToMany('App/Models/Variable', 'DrugId', 'VariableId', 'Id', 'Id').pivotTable('variabledrug')
    }
    calculations () {
        return this.hasMany('App/Models/Calculation', 'Id', 'DrugId')
    }
    subcategories () {
        return this.belongsToMany('App/Models/DrugSubCategory', 'DrugId', 'SubCategoryId', 'Id', 'Id').pivotTable('drugcategory')
    }
}

module.exports = Drug
