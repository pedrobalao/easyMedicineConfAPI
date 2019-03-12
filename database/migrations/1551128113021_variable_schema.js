'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VariableSchema extends Schema {
  up () {
    let that = this
    this.hasTable('variable').then(function(exists) {
      if (!exists) {
        return that.createTable('variable', function(t) {
          table.string('Id', 30).primary(),
          table.string('Description', 100),
          table.string('IdUnit', 30),
          table.foreign('IdUnit').references('Id').on('unity').onDelete('cascade'),
          table.string('Type', 30),
          table.timestamps()
        });
      }
      else {
        return that.table('variable', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('variables')
  }
}

module.exports = VariableSchema
