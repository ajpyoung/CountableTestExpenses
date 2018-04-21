# CountableTestExpenses
Exam Code for Countable

Bash testing using CURL:
Case 1 : Are the API’s available (status 200)
Case 2 : Are the numerical entries API only accept numbers (true or false)

DB MongoDB at local

API routes:

Major routes:
localhost/expense/report/[type]
localhost/expense/add

Expenses:
Route: /expenses/add
Method: POST

Standard json response:
{
    type:string, //”error”,”message”
    message:string, //explains data sent
    data:number, //0-no data, 1-has data
    dataType: string, //typeof dataSet
    dataSet: object //contains data
}

Standard json expense data
{
    mongoid:string,
    description:string,
    date:string,
    amount:number
}
