
function getList(eleId, num) {
    $.ajax({
        url: 'http://127.0.0.1:3200/getGoods',
        type: 'get',
        success: function (res) {
            for (var i = res.length - 1; i >= 0; i--) {
                createGoodsList(res[i], eleId, 1);
            }
            
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function createGoodsList(data, eleId, num) {
     var listFromDBHtml =
         '<div class="goods-list">'
         + '<a href="javascript:void(0);" id=' + data.id + ' onclick=gotodetail('+data.id+')>'
         + '<div class="goods-list-img">'
         + '<img class="goods-list-img-goods" title="PRADA 普拉达" alt="PRADA 普拉达" src="' + data.url + '">'
         + '<span class="bot-sale"><img src="../../images/shopping/label/tag_cut.png"></span>'
         + '<span class="bot-label"><img src="../../images/shopping/label/tag_hot.png"></span>'
         + '</div>'
         + '<p class="goods-list-tit">'
         + '<span class="orange">2瓶装</span>'
         + '<i class="iconfont icon-line"></i>'
         + '<span class="b-tit">' + data.name + '</span>'
         + '</p>'
         + '<div class="goods-list-price">'
         + '<span class="curr-price">￥'
         + data.price
         + '</span>'
         + '<span class="market-price">￥'
         + data.oldprice
         + '</span>'
         + '</div>'
         + '</a> '
         + '</div>';
     $(eleId).append(listFromDBHtml);
     $(".goods-list").width(($(".goods-list").parent().width() - 31) / 2);
}
function gotodetail(id) {
    console.log(id);
    window.location.href = "../htmls/good-detail.html?goods_id=" + id;
}
