"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Drug = use("App/Models/Drug");
const SubCategory = use("App/Models/DrugSubCategory");
const Calculation = use("App/Models/Calculation");
const Variable = use("App/Models/Variable");
const resourceName = "Drug";
const Database = use("Database");

/**
 * Resourceful controller for interacting with drugs
 */
class DrugController {
  /**
   * Show a list of all drugs.
   * GET drugs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    if (
      request.params.categories_id != null &&
      request.params.subcategories_id != null
    ) {
      let subcategory = await SubCategory.query()
        .where("Id", request.params.subcategories_id)
        .andWhere("CategoryId", request.params.categories_id)
        .first();
      const drugs = await subcategory.drugs().fetch();
      response.json({
        drugs
      });
    } else {
      const drugs = await Drug.all();
      response.json({
        drugs
      });
    }
  }

  /**
   * Search drugs by name.
   * GET drugs/search?drugname=:string
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async search({ request, response }) {
    let searchstr = request.qs.drugname;
    searchstr = "%" + searchstr.toUpperCase().replace(" ", "%") + "%";
    console.log(searchstr);
    const drugs = await Drug.query()
      .select("Id", "Name")
      .whereRaw("UPPER(Name) like ?", searchstr)
      .fetch();

    response.json({
      drugs
    });
  }

  /**
   * Create/save a new drug.
   * POST drugs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // update drugs
    console.log("store");
    const {
      Name,
      ConterIndications,
      SecondaryEfects,
      ComercialBrands,
      Obs,
      Presentation,
      indications,
      variables,
      calculations
    } = request.post();

    const trx = await Database.beginTransaction();
    try {
      const drug = await Drug.create(
        {
          Name,
          ConterIndications,
          SecondaryEfects,
          ComercialBrands,
          Obs,
          Presentation
        },
        trx
      );

      console.log("calculations");
      // calculations
      if (calculations != null && calculations.length > 0) {
        console.log("before savemany");
        await drug.calculations().createMany(calculations, trx);
        console.log("after savemany");
      }

      console.log("indications");
      //indications
      if (indications != null && indications.length > 0) {
        for (const element of indications) {
          let IndicationText = element.IndicationText;
          const indic = await drug
            .indications()
            .create({ IndicationText }, trx);
          await indic.doses().createMany(element.doses, trx);
        }
      }

      if (variables != null && variables.length > 0) {
        variables.forEach(element => {
          variableIds.push(element.Id);
        });
        console.log("sync variables ");
        await drug.variables().attach(variableIds, null, trx);
        console.log("sync variables done");
      }

      if (
        request.params.categories_id != null &&
        request.params.subcategories_id != null
      ) {
        console.log("subcategory");

        await drug
          .subcategories()
          .attach([request.params.subcategories_id], null, trx);
      }
      trx.commit();
      response.json({
        message: "Successufully created a new " + resourceName,
        drug: drug
      });
    } catch (error) {
      console.log(error.message);
      trx.rollback();
      return response.status(500).send(error.message);
    }
  }

  /**
   * Display a single drug.
   * GET drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let id = request.params.id;
    let drug = await Drug.query()
      .where("Id", id)
      .with("indications.doses")
      .with("variables")
      .with("calculations")
      .first();

    response.json({
      drug
    });
  }

  /**
   * Update drug details.
   * PUT or PATCH drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    console.log("update");
    let drugid = request.params.id;
    if (
      request.params.categories_id != null &&
      request.params.subcategories_id != null
    ) {
      let subcategory = await SubCategory.query()
        .where("Id", request.params.subcategories_id)
        .andWhere("CategoryId", request.params.categories_id)
        .first();

      await subcategory.drugs().attach([drugid]);
    } else {
      // update drugs
      const {
        Name,
        ConterIndications,
        SecondaryEfects,
        ComercialBrands,
        Obs,
        Presentation,
        indications,
        variables,
        calculations
      } = request.post();

      const trx = await Database.beginTransaction();
      let affectedRows = await Drug.query()
        .where("Id", drugid)
        .update(
          {
            Name,
            ConterIndications,
            SecondaryEfects,
            ComercialBrands,
            Obs,
            Presentation
          },
          trx
        );

      const drug = await Drug.find(drugid);

      console.log("calculations");
      // calculations
      await drug.calculations().delete(trx);
      if (calculations != null && calculations.length > 0) {
        console.log("before savemany");
        await drug.calculations().createMany(calculations, trx);
        console.log("after savemany");
      }

      console.log("indications");
      //indications
      await drug.indications().delete(trx);

      if (indications != null && indications.length > 0) {
        for (const element of indications) {
          let IndicationText = element.IndicationText;
          const indic = await drug
            .indications()
            .create({ IndicationText }, trx);
          await indic.doses().createMany(element.doses, trx);
        }
      }

      //variables
      await drug.variables().detach(null,null,trx);

      if (variables != null && variables.length > 0) {
        let variableIds = [];
        variables.forEach(element => {
          variableIds.push(element.Id);
        });

        await drug.variables().attach(variableIds, null, trx);
      }

      trx.commit();

      response.json({
        message: "Successufully updated " + affectedRows
      });
    }
  }

  /**
   * Delete a drug with id.
   * DELETE drugs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let drugid = request.params.id;
    if (
      request.params.categories_id != null &&
      request.params.subcategories_id != null
    ) {
      let subcategory = await SubCategory.query()
        .where("Id", request.params.subcategories_id)
        .andWhere("CategoryId", request.params.categories_id)
        .first();

      await subcategory.drugs().detach([drugid]);
    } else {
      // update drugs
    }
  }
}

module.exports = DrugController;
