'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitySchema extends Schema {
  up () {
    let that = this
    this.hasTable('unity').then(function(exists) {
      if (!exists) {
        return that.createTable('unity', function(t) {
          table.string('Id', 30).primary(),
          table.timestamps()
        });
      }
      else {
        return that.table('unity', (table) => {
          // add new columns or remove existing
          table.timestamps()
        })
      }
    });
  }

  down () {
    this.drop('unity')
  }
}

module.exports = UnitySchema
