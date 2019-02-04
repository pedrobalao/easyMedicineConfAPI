'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TreatmentSchema extends Schema {
  up () {
    this.create('treatments', (table) => {
      table.increments('id')
      table.timestamps()
      table.integer('disease_id').unsigned().notNullable()
      table.foreign('disease_id').references('id').on('diseases').onDelete('cascade')
      table.string('treatmenttype', 30).notNullable().defaultTo('PHARMA')
      table.integer('drug_id')
      table.foreign('drug_id').references('drug.Id')
      table.string('description', 500).notNullable()
      table.string('via_id',30)
      table.foreign('via_id').references('via.Id')
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
