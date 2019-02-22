'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiseaseSchema extends Schema {
  up () {
    this.table('diseases', (table) => {
      // alter table
      table.text('treatment_description')
    })
  }

  down () {
    this.table('diseases', (table) => {
      // reverse alternations
      
    })
  }
}

module.exports = DiseaseSchema
