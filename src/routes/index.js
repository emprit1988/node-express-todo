require('dotenv').config();
const express = require('express')
const router = express.Router();
import * as promise from 'bluebird';

const options = {
    promiseLib:promise
}
const pgp = require('pg-promise')(options);
const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/express_todo`;
const db = pgp(connectionString);


router.get('/', (req, res) => {
    const { userContext } = req;
    if(userContext){    
        db.any('select * from tasks where user_id=$1',userContext.userinfo.given_name)
        .then(function (data) {
            res.render('index',{userContext:userContext,taskData:data});
        }).catch(function(err){
            console.log(err);
            res.render('index',{userContext});
        });
    }else{
        res.render('index');
    }
})

router.post('/addtask', (req, res) => {
    const { userContext } = req;
    if(userContext){
        req.body.status = 'Active';
        req.body.user_id = userContext.userinfo.given_name;
        db.none('insert into tasks(user_id, task_name, expiry_date, status)' +
      'values(${user_id}, ${task_name}, ${expiry_date}, ${status})',
    req.body)
    .then(function (flag) {
        res.redirect('/');
    }).catch(function(err){
        console.log(err);
        res.redirect('/');
    });
    }
});

module.exports = router