/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _findOne = require('../services/find-one');

module.exports = {
	findOne: findOne,
};

function findOne(req, res) {
	Cars
		.find(_findOne.makePayload(req, res))
		.then(_findOne.handleResults(req, res))
		.then(handleQueryFields(req, res))
		.then(_findOne.sendResults(req, res))
		.catch(err => res.serverError(err));
}

function handleQueryFields(req, res) {
    return () => {
        console.log('QUERY', req.query);
    };
}
