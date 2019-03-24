'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoseSchema extends Schema {
  up () {
    let that = this
    this.hasTable('dose').then(function(exists) {
      if (!exists) {
        return that.createTable('dose', function(t) {
          table.increments('Id').primary(),
          table.integer('IndicationId').references('Id').on('indication'),
          table.string('IdVia',30).references('Id').on('via'),
          table.string('PediatricDose',50),
          table.string('IdUnityPediatricDose',30).references('Id').on('unity'),
          table.string('AdultDose',50),
          table.string('IdUnityAdultDose',30).references('Id').on('unity'),
          table.string('TakesPerDay',10),
          table.string('MaxDosePerDay',50),
          table.string('IdUnityMaxDosePerDay',30).references('Id').on('unity'),
          table.string('Obs', 2000),
          table.timestamps()
        });
      }
      else {
        return that.table('dose', (table) => {
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

module.exports = DoseSchema
