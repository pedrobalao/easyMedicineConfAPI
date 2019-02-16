'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrugSchema extends Schema {
  up() {
    let that = this
    this.hasTable('drug').then(function (exists) {
      if (!exists) {
        return that.createTable('drug', function (t) {
          table.interger('Id').primary(),
          table.string('Name',200),
          table.string('ConterIndications',2000),
          table.string('SecondaryEfects',2000),
          table.string('ComercialBrands',2000),
          table.string('Obs',2000),
          table.string('Presentation',2000),
          table.timestamps()
        });
      }
      else {
        return that.table('drug', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down() {
    this.drop('drugs')
  }
}

module.exports = DrugSchema
