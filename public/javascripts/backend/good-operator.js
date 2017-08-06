var mySQLConfig = require('./mysqlconfig');
var mysql = require('mysql');
var pool = mysql.createPool(mySQLConfig.mysql);

var fs = require("fs");
var path = require("path");
var filePath = path.resolve('./public/images/shopping/goods');
var fileArr = [];
opt = {}

opt['add Goods'] = function (req, res, next) {
    var queryurl = {
        'name': req.body.name, 'price': req.body.price, 'oldprice': req.body.oldprice,
        'num': req.body.number, 'url': req.body.url, 'id': req.body.id
    };
    pool.getConnection(function (err, connection) {
        connection.query("insert into shopping set ?", queryurl, function (error, results, fields) {
            if (error) {
                res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                //res.write(JSON.stringify({a: 123}));
                res.write('添加商品失败！！！');
                connection.release();
                res.end();
            }
            res.json(results);
        });
    });
};

opt['get Pic'] = function (req, res) {
    fileArr = [];
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        (function iterator(index) {
            if (index === files.length) {
                res.json({'list': fileArr});
            }
            else
            {
                fs.stat(path.join(filePath, files[index]), function (err, stats) {
                    if (err) throw err;
                    if (stats.isFile()) {
                        var newUrl = files[index];
                        fileArr.push(newUrl);
                    }
                    iterator(index + 1);
                });
            }

        })(0);
    });

};
opt['delete Good'] = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("delete from shopping where id="+req.body.id, function (error, results, fields) {
            if (error) {
                res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                res.write('删除商品失败！！！');
                connection.release();
                res.end();
            }
            res.json({'result':'success'});
        });
    });
};

function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

module.exports = opt;
