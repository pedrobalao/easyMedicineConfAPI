'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiseaseSchema extends Schema {
  up () {
    this.create('diseases', (table) => {
      table.increments('id')
      table.string('description', 500).notNullable()
      table.string('author', 100)
      table.text('indication')
      table.text('followup')
      table.text('example')
      table.text('bibliography')
      table.string('observation',4000)
      table.timestamps()
    })
  }

  down () {
    this.drop('diseases')
  }
}

module.exports = DiseaseSchema
