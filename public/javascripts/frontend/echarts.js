
function setChartMainLine() {
    //指定图标的配置和数据
    var option = {
        title: {
            text: 'ECharts 数据统计'
        },
        tooltip: {},
        legend: {
            data: ['用户来源']
        },
        xAxis: {
            data: ["Android", "IOS", "PC", "Ohter"]
        },
        yAxis: {},
        series: [{
            name: '访问量',
            type: 'line',
            data: [500, 200, 360, 100]
        }, {
            name: '访问量',
            type: 'line',
            data: [200, 100, 160, 80]
        }]
    };
    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartmainLine'));
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
    //初始化echarts实例
    option.series = [{
        name: '访问量',
        type: 'bar',
        data: [500, 200, 360, 100]
    }];
    var myChart = echarts.init(document.getElementById('chartmainBar1'));
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
}
function setChartMainBar2() {
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('类目' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    var option = {
        title: {
            text: '柱状图动画延迟'
        },
        legend: {
            data: ['bar', 'bar2'],
            align: 'left'
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [{
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'bar2',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartmainBar2'));
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
}
