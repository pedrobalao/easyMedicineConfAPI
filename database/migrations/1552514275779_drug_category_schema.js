'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrugCategorySchema extends Schema {
  up () {
    let that = this
    this.hasTable('clinicalcategory').then(function(exists) {
      if (!exists) {
        return that.createTable('clinicalcategory', function(t) {
          table.increments('id').primary(),
          table.string('Description', 200).notNullable(),
          table.timestamps()
        });

        
      }
      else {
        return that.table('clinicalcategory', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('clinicalcategory')
  }
}

module.exports = DrugCategorySchema
