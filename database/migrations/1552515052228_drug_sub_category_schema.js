'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrugSubCategorySchema extends Schema {
  up () {
    let that = this
    this.hasTable('subcategory').then(function(exists) {
      if (!exists) {
        return that.createTable('subcategory', function(t) {
          table.increments('Id').primary(),
          table.string('Description', 200).notNullable(),
          table.integer('CategoryId').references('id').on('clinicalcategory'),
          table.timestamps()
        });

        
      }
      else {
        return that.table('subcategory', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('subcategory')
  }
}

module.exports = DrugSubCategorySchema
