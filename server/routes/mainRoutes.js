const expressRoute = require('./expenseRoutes');
//const defaultRoute = require('./defaultRoute');

/*

	central calling location for all configuration routine for the Router middleware in the Express module
	parameters:
	app - expressjs app declaration from start.js
	router - expressjs route declaration from start.js
	return: none
*/

const conf = async function(app,router)
{
	//configure all routes here
	expressRoute.conf(router);
	app.use(router);
}

module.exports = {
	conf:conf
};