const mongojs = require('mongojs');



const single = async function(dayOfMonth, month, year, res)
{
	let message = {
		type:'success',
		message:'Data Found',
		data:1,
		dataType:'',
		dataSet:[]
	};
	var date_start = new Date(year,month,dayOfMonth,0,0);
	var date_end = new Date(year, month, dayOfMonth,23,59);
	var query = {
		date:{
			$gte:date_start,
			$lte:date_end
		}
	};
	global.db.expRec.find(query,async function(err,docs){
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
				dataSet:docs,
				dataType:typeof(docs)
			};
			res.json(message);
		}
	});
}

const month = async function(numberMonth, year,res)
{
	let message = {
		type:'success',
		message:'Data Found',
		data:1,
		dataType:'',
		dataSet:[]
	};
	var date_start = new Date(year,month,1,0,0);
	var date_end = new Date(year, month+1, 1,23,59);
	var query = {
		date:{
			$gte:date_start,
			$lt:date_end
		}
	};
	global.db.expRec.find(query,async function(err,docs){
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
				dataSet:docs,
				dataType:typeof(docs)
			};
			res.json(message);
		}
	});
}

const year = async function(year,res)
{
	let message = {
		type:'success',
		message:'Data Found',
		data:1,
		dataType:'',
		dataSet:[]
	};
	var date_start = new Date(year,0,1,0,0);
	var date_end = new Date(year+1, 0, 1,0,0);
	var query = {
		date:{
			$gte:date_start,
			$lt:date_end
		}
	};
	global.db.expRec.find(query,async function(err,docs){
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
				dataSet:docs,
				dataType:typeof(docs)
			};
			res.json(message);
		}
	});
}

const last10 = async function(res)
{
	let message = {
		type:'success',
		message:'Data Found',
		data:1,
		dataType:'',
		dataSet:[]
	};
	console.log("requesting last 10");
	global.db.expRec.find({}).sort({$natural:1}).limit(10,function(err,docs){
		console.log("err",err);
		console.log("docs");
		console.log(docs);
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
				dataSet:docs,
				dataType:typeof(docs)
			};
			console.log("last10 message");
			console.log(message);
			res.json(message);
		}
	});
}

module.exports={
	single:single,
	month:month,
	year:year,
	last10:last10
};