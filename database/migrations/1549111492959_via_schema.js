'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ViaSchema extends Schema {
  up () {
    let that = this
    this.hasTable('via').then(function(exists) {
      if (!exists) {
        return that.createTable('via', function(t) {
          table.string('Id', 30).primary(),
          table.timestamps()
        });
      }
      else {
        return that.table('via', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('via')
  }
}

module.exports = ViaSchema
