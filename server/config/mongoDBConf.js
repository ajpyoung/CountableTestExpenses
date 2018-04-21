const mongojs = require('mongojs');

/*

	configuration routine for the mongojs module
	parameters:none
	return: mongojs db connector value
*/
const conf = function()
{
	var db = mongojs('expensePOCDB', ['expRec']);
	return db;
}

module.exports = {
	conf:conf
};