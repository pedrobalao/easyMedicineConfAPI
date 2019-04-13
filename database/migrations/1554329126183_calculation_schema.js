'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalculationSchema extends Schema {
  up () {
    let that = this
    this.hasTable('calculation').then(function(exists) {
      if (!exists) {
        return that.createTable('calculation', function(t) {
          table.increments('Id').primary(),
          table.integer('DrugId').references('Id').on('drug'),
          table.string('Type',30),
          table.string('Function',4000),
          table.string('ResultDescription',100),
          table.string('ResultIdUnit',30).references('Id').on('unity'),
          table.string('Description',100),
          table.timestamps()
        });
      }
      else {
        return that.table('calculation', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('dose')
  }
}

module.exports = CalculationSchema
