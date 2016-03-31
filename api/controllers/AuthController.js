/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: login,
	logout: logout,
};

function login(req, res) {
	if (req.body.user === 'strossle') {
		req.session.authenticated = true;
		res.send('logged in');
	} else {
		req.session.authenticated = false;
		res.badRequest('login failed');
	}
}

function logout(req, res) {
	req.session.authenticated = false;
	res.send('logged out');
}
