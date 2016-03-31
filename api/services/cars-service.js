
var jsonMask = require('json-mask');

module.exports = {
    makeFindAllConditions: makeFindAllConditions,
    handleQueryFields: handleQueryFields,
    sendResults: sendResults,
};

function makeFindAllConditions(req) {
	var query = {};

	if (req.query.limit) {
		query.limit = req.query.limit;
	}

	if (req.query.offset) {
		query.skip = req.query.offset;
	}

	try {
		query.where = JSON.parse(req.query.filter);
	} catch(e) {}

	return query;
}

function makeFindOneConditions(req) {
	return query = {
        id: req.param('id'),
    };
}

function handleQueryFields(req, res) {
	return cars => {
		return cars.map(car => {
			return jsonMask(car, req.query.fields);
		});
	};
}

function sendResults(req, res, singleResult) {
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
