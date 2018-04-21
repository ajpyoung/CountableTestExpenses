const bodyParser = require('body-parser');
/*

	configuration routine for the Express module
	parameters:
	app - expressjs app declaration from start.js
	express - express constant from start.js
	return: none
*/

const conf =function(app, express){
	// Set our static directory for public assets like client scripts
	app.use(express.static('public'));

	// Parses the body on incoming requests
	app.use(bodyParser.json());
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// Pretty prints HTML output
	app.locals.pretty = true;
}

module.exports={
	conf:conf
};