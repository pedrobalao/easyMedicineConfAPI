"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Drug = use("App/Models/Drug");
const SubCategory = use("App/Models/DrugSubCategory");
const resourceName = "Drug";

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
        .andWhere("CategoryId", request.params.categories_id )
        .first();
      const drugs = await subcategory.drugs().fetch()
      response.json({
        drugs
      });

    } else {
      const drugs = await Drug.all()
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
    let drug = await Drug.query().where('Id', id).with('indications.doses').first();

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
    
    let drugid = request.params.id;
    if (
      request.params.categories_id != null &&
      request.params.subcategories_id != null
    ) {
      
      let subcategory = await SubCategory.query()
        .where("Id", request.params.subcategories_id)
        .andWhere("CategoryId", request.params.categories_id )
        .first();

      await subcategory.drugs().attach([drugid])
    } else {
      // update drugs
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
        .andWhere("CategoryId", request.params.categories_id )
        .first();

      await subcategory.drugs().detach([drugid])
    } else {
      // update drugs
    }

  }
}

module.exports = DrugController;
