/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jsonMask = require('json-mask');


module.exports = {
	find: find,
	findOne: findOne,
};

function find(req, res) {
	Cars.find(makeFindAllConditions(req))
		.then(handleQueryLimit(req, res))
		.then(handleQueryFields(req, res))
		.then(sendResponse(req, res))
		.catch(err => res.serverError(err));
}

function findOne(req, res) {
	Cars
		.find({ id: req.param('id') })
		.then(handleQueryFields(req, res))
		.then(sendResponse(req, res, true))
		.catch(err => res.serverError(err));
}

function makeFindAllConditions(req) {
	var query = {};

	try {
		query.where = JSON.parse(req.query.filter);
	} catch(e) {}

	return query;
}

function handleQueryFields(req, res) {
	return cars => {
		return cars.map(car => {
			return jsonMask(car, req.query.fields);
		});
	};
}

function handleQueryLimit(req, res) {
	return cars => {
		var offset = parseInt(req.query.offset || 0);
		var limit = parseInt(req.query.limit || cars.length) + offset;
		return cars.slice(offset, limit);
	};
}

function sendResponse(req, res, singleResult) {
	return cars => {
		if (cars.length) {
			if (singleResult) {
				res.send(cars.shift());
			} else {
				res.send(cars);
			}
		} else {
			res.notFound();
		}
	};
}
