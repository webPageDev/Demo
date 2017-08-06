var express = require('express');
var router = express.Router();
var path = require('path');

var file = require('../backend/fileoperator');
var goods = require('../backend/getgoodslist');
var goodoperator = require('../backend/good-operator');

router.get('/', function (req, res, next) {
    var filepath = path.join(__dirname, '../htmls/homepage.html');
    res.sendFile(filepath);
});


router.all('/uploadfile', file['all uploadfile']);
router.get('/downloadfilerouter', file['get downloadfilerouter']);
router.post('/uploadfileTest', file['post uploadfileTest']);
router.get('/getGoods', goods['get getGoods']);
router.get('/getPageGoods', goods['get getPageGoods']);
router.get('/getGoodsCount', goods['get getGoodsCount']);
router.get('/goodinfor', goods['get goodInfo']);

router.post('/addGoods', goodoperator['add Goods']);
router.get('/getPic', goodoperator['get Pic']);
router.post('/deleteGood', goodoperator['delete Good']);



function onClickButton() {
    alert('click event......')
}
module.exports = router;
