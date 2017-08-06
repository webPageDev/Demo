
window.onload = function(){
    //点击功能
    clickFunc();
    //移动端滑动功能,历史记录
    //swiperHistory();
};

function clickFunc(){

    /***********点击键盘***********/
    var keyBorders = document.querySelectorAll("#bottom span"),
        express = document.getElementById("express"),//计算表达式
        res =  document.getElementById("res"),  //输出结果
        keyBorde = null;        //键盘
    var preKey = "",            //上一次按的键盘
        isFromHistory = false;  //是否来自历史记录
    //符号
    var symbol = {"+":"+","-":"-","×":"*","÷":"/","%":"%","=":"="};

    /***********键盘按钮***********/
    for(var j=0; j <keyBorders.length; j++){
        keyBorde = keyBorders[j];

        keyBorde.onclick = function() {
            var number = this.dataset["number"];
            clickNumber(number);
        };
    }

    /**
     * 点击键盘进行输入
     * @param {string} number 输入的内容
     * */
    function clickNumber(number){
        var resVal = res.innerHTML;		//结果
        var exp = express.innerHTML;	//表达式
        //表达式最后一位的符号
        var expressEndSymbol = exp.substring(exp.length-1,exp.length);
        //点击的不是删除键和复位键时才能进行输入
        if(number !== "←" || number !== "C"){
            //是否已经存在点了，如果存在那么不能接着输入点号了,且上一个字符不是符号字符
            var hasPoint = (resVal.indexOf('.') !== -1)?true:false;
            if(hasPoint && number === '.'){
                //上一个字符如果是符号，变成0.xxx形式
                if(symbol[preKey]){
                    res.innerHTML = "0";
                }else{
                    return false;
                }
            }
            //转换显示符号
            if(isNaN(number)){
                number = number.replace(/\*/g,"×").replace(/\//g,"÷");
            }
            //点击的是符号
            //计算上一次的结果
            if(symbol[number]){
                //上一次点击的是不是符号键
                if(preKey !== "=" && symbol[preKey]){
                    express.innerHTML = exp.slice(0,-1) + number;
                }else{
                    if(exp == ""){
                        express.innerHTML = resVal + number;
                    }else{
                        express.innerHTML += resVal + number;
                    }
                    if(symbol[expressEndSymbol]){
                        exp = express.innerHTML.replace(/×/g,"*").replace(/÷/,"/");
                        res.innerHTML = eval(exp.slice(0,-1));
                    }
                }
            }else{
                //如果首位是符号，0
                if((symbol[number] || symbol[preKey] || resVal=="0") && number !== '.'){
                    res.innerHTML = "";
                }
                res.innerHTML += number;
            }
            preKey = number;
        }
    }

    /***********相等，计算结果***********/
    equals.onclick = function(){
        calcEques();
    };

    function calcEques(){
        var expVal = express.innerHTML, val = "";
        var resVal = res.innerHTML;
        //表达式最后一位的符号
        if(expVal){
            var expressEndSymbol = expVal.substring(expVal.length-1,expVal.length);
            try{
                if(!isFromHistory){
                    var temp = "";
                    if(symbol[expressEndSymbol] && resVal){
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                        temp = eval(temp.slice(0,-1)) + symbol[expressEndSymbol] + resVal;
                    }else{
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                    }
                    val = eval(temp);
                }else{
                    val = resVal;
                }
            }catch(error){
                val = "<span style='font-size:1em;color:red'>Erro：计算出错！</span>";
            }finally{
                express.innerHTML = "";
                res.innerHTML = val;
                preKey = "=";
                isFromHistory = false;
            }
        }
    }
    /***********复位操作***********/
    var resetBtn = document.getElementById("reset");       //复位按钮
    resetBtn.onclick = function(){
        res.innerHTML = "0";
        express.innerHTML = "";
    };
    /***********减位操作***********/
    remove.onclick = function(){
        var tempRes = res.innerHTML;
        if(tempRes.length>1){
            tempRes = tempRes.slice(0,-1);
            res.innerHTML = tempRes;
        }else{
            res.innerHTML = 0;
        }
    };
}