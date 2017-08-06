startnum = 0;
step = 3;
goodscount = 0;
function uploadGoodsInfo() {
    $('#good_pic_table').hide();
    $('#goods-list').hide();
    $('#myform').css('display','block');
}
function postData() {
    var data = {};
    var tag = $('#myform').serializeArray();
    $.each(tag, function () {
        data[this.name] = this.value;
    });
    data.url = '../../images/shopping/goods/'+ data.pic;
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3200/addGoods",
        contentType: "application/json",
        dateType: "json",
        data: JSON.stringify(data),
        success: function () {
            alert('upload sucess...');
        },
        error :function (e) {
            alert(e.responseText);
        }
    });
}

function upPage() {
    if (startnum <= 0 || step <=0) {
        startnum  = 0;
    } else {
        startnum -=3;
    }
    getPageFromDB(startnum, step);
}

function downPage() {
    getNextPage(getPageFromDB);
}

function getPageFromDB() {
    var start = arguments[0] ? arguments[0] : 0;
    var end = arguments[1] ? arguments[1] : 3;
    url = 'http://127.0.0.1:3200/getPageGoods?start=' + start + '&step=' + end;
    $('#good_pic_table').hide();
    $('#myform').hide();
    $('#goods-list').show();
    $.ajax({
        url: url,
        type: 'get',
        success: function (res) {
            createGoodsList(res)
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function getNextPage(func) {
    url = 'http://127.0.0.1:3200/getGoodsCount';
    $.ajax({
        url: url,
        type: 'get',
        success: function (res) {
            goodscount = res[0].count;
            if (startnum + step >= goodscount) {
                func(startnum, step);
            } else {
                startnum +=3;
                func(startnum, step);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function createGoodsList(list) {
    $('#wifi_clients_table').empty();
    var listFromDBHtml = '<tr style="border: 1px solid;"> '
        +'<th>' +'商品名称'+'</th> '
        +'<th>' +'售卖价格'+'</th> '
        +'<th>' +'原始价格'+'</th> '
        +'<th>' +'商品数量'+'</th> '
        +'<th>' +'图片'+'</th> '
        +'<th>' +'编号'+'</th> '
        +'<th>' +'操作'+'</th> '
        +'</tr>';
    for (var i = 0; i < list.length; i++) {
        listFromDBHtml +=
            '<tr> '
            +'<td>' +list[i].name+'</td> '
            +'<td>' +list[i].price+'</td> '
            +'<td>' +list[i].oldprice+'</td> '
            +'<td>' +list[i].num+'</td> '
            +'<td>' +list[i].url.split('/goods/')[1]+'</td> '
            +'<td>' +list[i].id+'</td> '
            +'<td><div style="cursor: pointer;color: red;" onclick="delCurrentGood('+list[i].id+')">删除</div></td> '
            +'</tr>';
    }
    $('#wifi_clients_table').append(listFromDBHtml);
}

function delCurrentGood(id) {
    var data = {'id':id};
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3200/deleteGood",
        contentType: "application/json",
        dateType: "json",
        data: JSON.stringify(data),
        success: function () {
            getPageFromDB();
            alert('delete sucess...');
        },
        error :function (e) {
            alert(e.responseText);
        }
    });
}

function getPicFromDB() {
    $('#good_pic_table').show();
    $('#goods-list').hide();
    $('#myform').hide();
    $.ajax({
        url: 'http://127.0.0.1:3200/getPic',
        type: 'get',
        success: function (res) {
            createPicList(res.list)
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function createPicList(list) {
    $('#good_pic_table').empty();
    var listFromDBHtml = '<tr style="border: 1px solid;"> '
        +'<th>' +'商品图片信息'+'</th> '
        +'<th></th> '
        +'</tr>';

    for (var i = 0; i < parseInt(list.length/2); i++) {
        listFromDBHtml +=
            '<tr> '
            +'<td>' +list[i]+'</td> '
            +'<td>' +list[parseInt(list.length/2) + i]+'</td> '
            +'</tr>';
    }
    if(list.length%2!=0){
        listFromDBHtml += '<tr> '
            +'<td>' +list[list.length-1]+'</td> '
            +'<th></th> '
            +'</tr>';
    }
    $('#good_pic_table').append(listFromDBHtml);

}

// var table = document.getElementById("wifi_clients_table");
// var newRow = table.insertRow(); //创建新行
// for (var i = 0; i < list.length; i++) {
//     var tr = document.createElement('tr');
//     var td = document.createElement('td');
//     td.innerHTML = JSON.stringify(list[i]);
//     tr.appendChild(td);
//     table.appendChild(tr);
// }


// var form = document.getElementById('myform');
//   var elements = new Array();
//   var tagElements = form.getElementsByTagName('input');
//   for (var j = 0; j < tagElements.length; j++){
//      elements.push(tagElements[j]);
//   }
//     console.log(elements);
//   var test = $("form input:eq(0)").attr().value;
//   console.log(test);