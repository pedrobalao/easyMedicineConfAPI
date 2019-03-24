'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndicationSchema extends Schema {
  up () {
    let that = this
    this.hasTable('indication').then(function(exists) {
      if (!exists) {
        return that.createTable('indication', function(t) {
          table.increments('Id').primary(),
          table.integer('DrugId').references('Id').on('drug'),
          table.string('IndicationText', 1000).notNullable(),
          table.timestamps()
        });
      }
      else {
        return that.table('indication', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('indication')
  }
}

module.exports = IndicationSchema
