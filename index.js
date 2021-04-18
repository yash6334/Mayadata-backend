const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:"mayadata"
}
)

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("MYSQL Connected");
    }
})

const app = express()

app.get('/getdata', (req, res)=>{
    let sql = "select * from meetings"
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/delete', (req, res)=>{
    let sql = "delete from meetings where id = " + req.query.id;
    db.query(sql, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.send("DELETED");
        }
    })
})

app.get('/add', (req, res)=>{
    let sql = `Insert into meetings values ( ${req.query.name} , ${req.query.number}, ${req.query.date}, ${req.query.start}, ${req.query.end}, ${req.query.id} )`;

    db.query(sql, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Added");
        } 
    })
})

app.listen(3000);