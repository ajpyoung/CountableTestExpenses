const mongojs = require('mongojs');

/*

	configuration routine for the mongojs module
	parameters:none
	return: mongojs db connector value
*/
const conf = function()
{
	global.db = mongojs('expensePOCDB', ['expRec']);
}

module.exports = {
	conf:conf
};