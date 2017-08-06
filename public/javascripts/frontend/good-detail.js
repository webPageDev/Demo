function setHeadMove() {
    var tablinewidth = $(".tab-line-nav").width();
    var pwidth = $(".tab-list-nav li:eq(0)").width();
    var poffsetleft = $(".tab-list-nav li:eq(0)").offset().left;
    $(".tab-line-nav").css("left", poffsetleft);
    $(".tab-list-nav li:eq(0)").addClass("active").siblings().removeClass("active");
    $(".tab-list-nav li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var pactivewidth = $(".tab-list-nav li.active").width();
        var pactiveoffsetleft = $(".tab-list-nav li.active").offset().left;
        $(".tab-line-nav").animate({
            'width': pactivewidth,
            'left': pactiveoffsetleft
        }, 300);
    });
}

function getGoodID() {
    var reg = new RegExp("(^|&)" + 'goods_id' + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    getGoodInformation(r[2]);
}

function getGoodInformation(id) {
    $.ajax({
        url: 'http://127.0.0.1:3200/goodinfor?id=' + id,
        type: 'get',
        success: function (res) {
            console.log(res);
            var listFromDBHtml = '<div style="text-align: center;"><img src="' + res[0].url + '"></div>';
            $('#good-detail').append(listFromDBHtml);
            listFromDBHtml = '<div class="priceinfo">' +
                '<p class="curr-price">￥' + res[0].price + '</p>' +
                '<p class="market-price">￥' + res[0].oldprice + '</p>' +
                '</div>';
            $('.detail-thumb').append(listFromDBHtml);
            $(".eva-img > a > img").attr({ src: res[0].url, alt: "Test Image" });
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function buyGoodLastTime() {
    var timeBuyDownTime = '8163';
    timeBuyCountDown(timeBuyDownTime);
}
function timeBuyLoad(s) {
    count(s);
    $("#timeBuyDown").html("距结束还剩:" + getZero(count(s).hour) + ":" + getZero(count(s).minute) + ":" + getZero(count(s).second));
}
// 补0方法
function getZero(i) {
    str = i < 10 ? "0" + i : i;
    return str;
}
// 换算时分秒
function count(s) {
    var day = Math.floor(s / 86400);
    var hour = Math.floor((s - day * 86400) / 3600);
    var minute = Math.floor((s - day * 86400 - hour * 3600) / 60);
    var second = s - day * 86400 - hour * 3600 - minute * 60;
    return {"day": day, "hour": hour, "minute": minute, "second": second};
}
function timeBuyCountDown(str) {
    var s = str;
    timeBuyLoad(s);
    var TimeInterval = setInterval(function () {
        console.log('timer');
        if (s == 0) {
            clearInterval(TimeInterval);
            TimeInterval = null;
        } else {
            s--;
            timeBuyLoad(s);
        }
    }, 1000);
}