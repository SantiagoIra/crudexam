const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'inventory'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Connection Successful');
    else
    console.log('Connection failed' + JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('Express server is running at port 3000'));

app.get('/items',(req,res)=>{
    mysqlConnection.query('select * from items', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
}); 
