'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VariableValueSchema extends Schema {
  up () {
    let that = this
    this.hasTable('variablevalues').then(function(exists) {
      if (!exists) {
        return that.createTable('variablevalues', function(t) {
          table.increments('Id').primary(),
          table.string('VariableId',30).references('Id').on('variable'),
          table.string('Value', 50),
          table.timestamps()
        });
      }
      else {
        return that.table('variablevalues', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('variablevalues')
  }
}

module.exports = VariableValueSchema
