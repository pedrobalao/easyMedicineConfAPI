"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Disease = use("App/Models/Disease");
const Treatment = use("App/Models/Treatment");
const Database = use("Database");
const resourceName = "Disease";

/**
 * Resourceful controller for interacting with diseases
 */
class DiseaseController {
  /**
   * Show a list of all diseases.
   * GET diseases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let page = request.qs.page;
    if (page === undefined) {
      page = 1;
    }

    const diseases = await Disease.query()
      .orderBy("description")
      .paginate(page);

    response.json({
      diseases
    });
  }

  /**
   * Create/save a new disease.
   * POST diseases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const {
      description,
      author,
      indication,
      followup,
      example,
      bibliography,
      observation,
      treatments,
      treatment_description,
      status,
      treatment
    } = request.post();
    debugger;
    console.log(treatments);

    if (status == null) {
      status = "draft";
    }
    const trx = await Database.beginTransaction();

    const treatmentjson = JSON.stringify(treatment);
    const result = await Disease.create(
      {
        description: description,
        author: author,
        indication: indication,
        followup: followup,
        example: example,
        bibliography: bibliography,
        observation: observation,
        treatment_description: treatment_description,
        status: status,
        treatment: treatmentjson
      },
      trx
    );
    if (treatments != null && treatments.length > 0) {
      treatments.forEach((element, index) => {
        element.disease_id = result.id;
        element.order = index;
      });
      console.log(treatments);
      await Treatment.createMany(treatments, trx);
    }
    trx.commit();

    response.json({
      message: "Successufully created a new " + resourceName,
      disease: result
    });
  }

  /**
   * Display a single disease.
   * GET diseases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let id = request.params.id;
    let disease = await Disease.find(id);

    response.json({
      disease
    });
  }

  /**
   * Update disease details.
   * PUT or PATCH diseases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const {
        description,
        author,
        indication,
        followup,
        example,
        bibliography,
        observation,
        treatments,
        treatment_description,
        status,
        treatment
      } = request.post();
      let id = request.params.id;

      const treatmentjson = JSON.stringify(treatment);
      if (status == null) {
        status = "draft";
      }
      const trx = await Database.beginTransaction();
      let affectedRows = await Disease.query()
        .where("id", id)
        .update(
          {
            description: description,
            author: author,
            indication: indication,
            followup: followup,
            example: example,
            bibliography: bibliography,
            observation: observation,
            treatment_description: treatment_description,
            status: status,
            treatment: treatmentjson
          },
          trx
        );

      // delete all treatments and insert the new list

      await Treatment.query()
        .where("disease_id", id)
        .delete(trx);

      if (treatments != null && treatments.length > 0) {
        treatments.forEach((element, index) => {
          element.id = null;
          element.disease_id = id;
          element.order = index;
        });

        await Treatment.createMany(treatments, trx);
      }
      trx.commit();

      response.json({
        message: "Successufully updated "
      });
    } catch (error) {
      console.log("error - " + error);
      return response.status(500).json({ message: error });
    }
  }

  /**
   * Delete a disease with id.
   * DELETE diseases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let id = request.params.id;
    var affectedRows = await Disease.query()
      .where("id", id)
      .del();

    response.json({
      message: "Successufully deleted " + affectedRows + " rows"
    });
  }
}

module.exports = DiseaseController;
