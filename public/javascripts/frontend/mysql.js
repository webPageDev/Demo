var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mySQLConfig = require('./../backend/mysqlconfig');
var pool = mysql.createPool( mySQLConfig.mysql );
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }};
router.get('/', function(req, res, next){
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        connection.query("select * from websites;", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            //res.sendFile(__dirname + "/" + "/htmls/mysql.html");
        });
    });
});
function querymysql() {

}
module.exports = router;
