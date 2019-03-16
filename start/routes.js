"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Route.on('/').render('welcome')
Route.group(() => {
  Route.post("/auth/register", "AuthController.register"),
    Route.post("/auth/login", "AuthController.login"),
    Route.get("/auth/user", "AuthController.user").middleware("auth"),
    Route.post("/auth/logout", "AuthController.logout").middleware("auth"),
    Route.resource("diseases", "DiseaseController").middleware("auth"),
    Route.resource("vias", "ViaController").middleware("auth"),
    Route.resource("unities", "UnityController").middleware("auth"),
    Route.resource("diseases.treatments", "TreatmentController").middleware(
      "auth"
    ),
    Route.resource("medicalcalculations", "MedicalCalculationController").middleware("auth"),
    Route.resource("treatments", "TreatmentController").middleware("auth"),
    Route.resource("variables", "VariableController").middleware("auth"),
    Route.resource('categories', 'DrugCategoryController').middleware('auth'),
    Route.resource("categories.subcategories", "DrugSubCategoryController").middleware(
      "auth"
    ),
    Route.get("drugs", "DrugController.index").middleware("auth"),
    Route.get("drugs/search", "DrugController.search").middleware("auth"),
    Route.get("drugs/:id", "DrugController.show").middleware("auth");


}).prefix("api/v1");
