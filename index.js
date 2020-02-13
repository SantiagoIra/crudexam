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

//select all
app.get('/items',(req,res)=>{
    mysqlConnection.query('select * from items', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
}); 

//get 
app.get('/items/:id',(req,res)=>{
    mysqlConnection.query('select * from items where id = ?',[req.params.id] ,(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//delete
app.delete('/items/:id',(req,res)=>{
    mysqlConnection.query('delete from items where id = ?',[req.params.id] ,(err, rows, fields)=>{
        if(!err)
        res.send('Deleted Successfully');
        else
        console.log(err);
    })
});

//insert
app.post('/items',(req,res)=>{
    let emp = req.body;
    var sql = "set @id = ?; set @name = ?; set @qty = ?; set @amount = ?; \
    call ItemsAddOrEdit(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql,[emp.id, emp.name, emp.qty, emp.amount],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

