const expenseRoutine = require('../controllers/expenseRoutine');

/*

	configuration routine for the Router middleware in the Express module
	parameters:
	router - expressjs route declaration from start.js
	return: none
*/
const conf = async (router)=>
{
	//console.log('configure_router');
	router.route('/expenses/report/:type')
		.get(async(req,res)=>
		{
			let message = '';
			try{
				//console.log('Im here');
				if(typeof(req.params.type)=="string")
				{
					console.log(req.params);
					let type = req.params.type.toUpperCase();
					//console.log("type",type);
					switch(type)
					{
						case "SINGLE":
						case "MONTH":
						case "YEAR":
						case "LAST10":
							console.log("I'm in ",type);
							//const messages = await expenseRoutine.read(req.query);//await is not waiting
							expenseRoutine.read(req.query,res);
							break;
						default:
							//console.log("default");
							message = {
								type:'error',
								message:"Unknown Report Request",
								data:0
							};
							console.log(message);
							res.sendStatus(400);
							break;
					}
				}else{
					//console.log("new error");
					message = {
						type:'error',
						message:"Unidentified Report Request",
						data:0
					};
					console.log(message);
					res.sendStatus(400);
				}
			}catch(err){
				//console.log(err);
				message = {
					type:'error',
					message:err,
					data:0
				};
				console.log(message);
				res.sendStatus(400);
			}
		});
	router.route('/expenses/add')
		.post(async (req,res)=>
		{
			if(req.body)
			{
				//message = await expenseRoutine.add(req.body);//await not working
				//res.json(message);
				console.log("ReqBody");
				console.log(req.body);
				expenseRoutine.add(req.body,res);
			}else{
				message = {
					type:'error',
					message:"No Post Data for adding expenses",
					data:0
				};
				console.log(message);
				res.sendStatus(400);
			}
			
		});
}

module.exports={
	conf:conf
};