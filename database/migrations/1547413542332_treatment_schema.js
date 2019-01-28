'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TreatmentSchema extends Schema {
  up () {
    this.create('treatments', (table) => {
      table.increments('id')
      table.timestamps()
      table.integer('diseaseid').unsigned().notNullable()
      table.foreign('diseaseid').references('id').on('diseases').onDelete('cascade')
      table.string('treatmenttype', 30).notNullable().defaultTo('PHARMA')
      table.integer('drugid')
      table.foreign('drugid').references('drug.Id')
      table.string('description', 500).notNullable()
      table.string('idvia',30)
      table.foreign('idvia').references('via.Id')
      table.string('use', 500).notNullable()
      table.integer('order').notNullable()
      table.string('duration', 500)
      table.string('observation',4000)
    })
  }

  down () {
    this.drop('treatments')
  }
}

module.exports = TreatmentSchema