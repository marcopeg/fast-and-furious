
module.exports = {
    makePayload: makePayload,
    handleResults: handleResults,
    handleQueryFields: handleQueryFields,
    sendResults: sendResults,
};

function makePayload(req, res) {
	return {
		where: {
			id: req.param('id'),
		},
	};
}

function handleResults(req, res) {
	return data => {
		res.car = data.shift();
	};
}

// function handleQueryFields(req, res) {
//     return () => {
//         res.car.query = req.query.fields;
//     };
// }

function sendResults(req, res) {
	return () => {
		if (res.car) {
			res.send(res.car);
		} else {
			res.notFound();
		}
	};
}
