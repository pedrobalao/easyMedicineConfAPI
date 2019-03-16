'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicalCalculationSchema extends Schema {
  up () {
    let that = this
    this.hasTable('medicalcalculation').then(function(exists) {
      if (!exists) {
        return that.createTable('medicalcalculation', function(t) {
          table.increments('Id').primary(),
          table.string('Description', 100).notNullable(),
          table.string('ResultUnitId',30).references('Id').on('unit'),
          table.string('Formula', 1000).notNullable(),
          table.string('Observation', 1000),
          table.integer('CalculationGroupId').references('Id').on('medicalcalculationgroup'),
          table.string('ResultType', 100),
          table.integer('Precision'),
          table.timestamps()
        });

        
      }
      else {
        return that.table('medicalcalculation', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('medicalcalculation')
  }
}

module.exports = MedicalCalculationSchema
