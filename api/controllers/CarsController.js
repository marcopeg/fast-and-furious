/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var carsService = require('../services/cars-service');

module.exports = {
	find: find,
	findOne: findOne,
};

function find(req, res) {
	var query = carsService.makeFindAllConditions(req);
	sails.log.info('cars/search', query);

	Cars.find(query)
		.then(carsService.handleQueryFields(req, res))
		.then(carsService.sendResults(req, res))
		.catch(err => res.serverError(err));
}

function findOne(req, res) {
	var query = carsService.makeFindOneConditions(req);
	sails.log.info('cars/search', query);

	Cars.find(query)
		.then(carsService.handleQueryFields(req, res))
		.then(carsService.sendResults(req, res))
		.catch(err => res.serverError(err));
}
