var mySQLConfig = require('./mysqlconfig');
var mysql = require('mysql');
var pool = mysql.createPool(mySQLConfig.mysql);
opt = {}

opt['get getGoodsCount'] = function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("select count(id) as count from shopping",
            function (error, results, fields) {
                if (error) {
                    res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                    res.write(JSON.stringify({a: 123}));
                    res.end();
                    return;
                }
                connection.release();
                res.json(results);
            });
    });
};

opt['get getGoods'] = function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("select * from shopping",
            function (error, results, fields) {
            if (error) {
                res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                res.write(JSON.stringify({a: 123}));
                res.end();
                return;
            }
            connection.release();
            res.json(results);
        });
    });
};

opt['get getPageGoods'] = function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("select * from shopping limit " +  req.query.start +','+ req.query.step,
            function (error, results, fields) {
                if (error) {
                    res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                    res.write(JSON.stringify({a: 123}));
                    res.end();
                    return;
                }
                connection.release();
                res.json(results);
            });
    });
};

opt['get goodInfo'] = function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("select * from shopping where id = ?;", req.query.id,
            function (error, results, fields) {
            if (error) {
                res.writeHeader(404, {'Content-Type': 'text/javascript;charset=UTF-8'})
                res.write('查询商品详情失败！！！');
                connection.release();
                res.end();
                return;
            }
            connection.release();
            res.json(results);
        });
    });
};

module.exports = opt;
