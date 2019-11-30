'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiseaseSchema extends Schema {
  up () {
    this.table('diseases', (table) => {
      // alter table
      table.string('status',20) //draft, active
    })
  }
  down () {
    this.table('diseases', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DiseaseSchema
