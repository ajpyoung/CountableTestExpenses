
const mongojs = require('mongojs');
/*
	add module
	params:
	expensesJSON - json data for the expenses
	{
		description:string,
		amount:number,
		date:string //mm/dd/yyyy

	}
	res - res from route
	returns - json data response
*/
const add = async function(expensesJSON,res){
	//console.log('exec add');

	let message = '';
	if(expensesJSON.description && expensesJSON.amount && expensesJSON.date)
	{
		//breakdown date
		var dateArray = expensesJSON.date.split('/');
		var dateInfo = new Date(dateArray[2],dateArray[0],dateArray[1]);//year, month, day
		let data = {
			description:expensesJSON.description,
			date:dateInfo,
			amount:expensesJSON.amount
		}
		console.log(data);
		global.db.expRec.insert(data,function(err){
			if(err)
			{
				message = {
					type:'error',
					message:err,
					data:0
				};
				res.json(message);
			}else{
				message = {
					type:'success',
					message:"Data Saved",
					data:0
				};
				res.json(message);
			}
		});
	}else{
		message = {
			type:'error',
			message:"Unknown expense form sent",
			data:0
		};
		res.json(message);
	}
}

/*
	edit module
	params:
	mongoID = record ID in string form
	returns - json data response
*/
const edit = async function(mongoID){
	let message = '';
	let findconst = {
		_id:mongojs.ObjectID(mongoID)
	};
	global.db.expRec.find(findconst, function(err,doc){
		if(err)
		{
			message = {
				type:'error',
				message:err,
				data:0
			};
			res.json(message);
		}else{
			message = {
				type:'success',
				message:'Data Found',
				data:1,
				dataSet:doc,
				dataType:typeof(doc)
			};
			res.json(message);
		}
	});
}

/*
	delete module
	params:
	mongoID = record ID in string form
	returns - json data response
*/
const del = async function(mongoID){
	let message = '';
	let findconst = {
		_id:mongojs.ObjectID(mongoID)
	};
	global.db.expRec.deleteOne(findconst, function(err,doc){
		if(err)
		{
			message = {
				type:'error',
				message:err,
				data:0
			};
			res.json(message);
		}else{
			message = {
				type:'success',
				message:'Data Deleted',
				data:0
			};
			res.json(message);
		}
	});
}


const requestData = require('./requestData');
/*
	read module
	params:
	requestJSON = data read request form
	{
		type:string, //single,week,month,year,last10
		identifier:number, //single - day of the month, week - week number of the year, month - month number, year - year number
		month:number, //single - month number
		year:number, //single - year number,week - year number, month - year number
	}
	returns - json data response
*/
const read = async function(requestJSON,res){
	let message = '';
	try{
		if(requestJSON.type)
		{
			let data;
			let type = requestJSON.type;
			switch(type.toUpperCase())
			{
				case 'SINGLE':
					data = await requestData.single(requestJSON.identifier,requestJSON.month,requestJSON.year,res);
				case 'WEEK':
					data = await requestData.week(requestJSON.identifier,requestJSON.year,res);
					break;
				case 'MONTH':
					data = await requestData.month(requestJSON.identifier,requestJSON.year,res);
					break;
				case 'YEAR':
					data = await requestData.year(requestJSON.identifier,res);
					break;
				case 'LAST10':
					data = await requestData.last10(res);
					break;
				default:
					message = {
						type:'error',
						message:'Unknown Read Request',
						data:0
					};
					res.json(message);
					break;
			}
		}
	}catch(err){
		message = {
			type:'error',
			message:err,
			data:0
		};
		res.json(message);
	}
}

module.exports = {
	add:add,
	edit:edit,
	del:del,
	read:read
};