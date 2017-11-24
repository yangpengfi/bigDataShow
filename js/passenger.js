/**
 * Created by Admin on 2017/8/11.
 */

//地图线路绘制
function bMapDataFormat(sourceData) {
    return [].concat.apply([], $.map(sourceData, function(lines, index) {
        return {
            "name": lines.line_name,
            "coords":lines.line_path,
            "lineStyle":lines.lineStyle
        };
    }));
}
//客流统计
var bMapChart=echarts.init(document.getElementById('bMepChart'));
var bMapOption ={
    bmap:mapOption.bmap,
    /*tooltip: {
        trigger: 'item'
    },*/
    series:[{
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        //data: data,
        silent: true,
        lineStyle: {
            normal: {
                opacity: 0.3,
                width: 1
            }
        },
        progressiveThreshold: 500,
        progressive: 100
    }, {
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,//是否是多段线
        //data: data,
        lineStyle: {
            normal: {
                width: 0.02
            }
        },
        effect: {//线性特效配置
            constantSpeed: 40,//配置特效图形的移动动画是否是固定速度，单位像素/秒
            show: true,//是否显示
            trailLength: 0.02,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
            symbolSize: 2//特效标记的大小
        },
        zlevel: 1
    }]
};
bMapChart.setOption(bMapOption);


//leftChart
function getPsgArr(sourceData) {
    var psgArr=[[],[],[],[],[]];
    $.each(sourceData, function(key,val) {
        psgArr[0].push(val.forecast_psg);
        psgArr[1].push(val.psg);
        psgArr[2].push(val.time);
        psgArr[3].push(val.congestion_satisfaction);
        psgArr[4].push(val.waite_satisfaction);
    });
    return psgArr;
}

var sdChart=echarts.init(document.getElementById('sdChart'));
var sdOption={
    tooltip: {
        trigger: 'axis',
            axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },
    grid: {
        top:'10',
        left: '3%',
        right: '48%',
        bottom: '10',
        containLabel: true
    },
    yAxis: [{
        type: 'category',
        boundaryGap: false,
        min:'dataMin',
        max:'dataMax',
        axisLine: {
            lineStyle: {
                color: 'rgba(23,126,255,.3)'
            }
        },
        axisTick: {
            interval:'0',
            show: true
        },
        axisLabel: {
            textStyle: {
                color:'rgba(23,126,255,.6)',
                fontSize: 14
            }
        },
        //data: dates
    }],
    xAxis: [{
        type: 'value',
        name: '（人次）',
        min:'dataMin',
        max:'dataMax',
        //splitNumber:'3',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        axisLabel: {
            show:true,
            rotate:45,//倾斜度 -90 至 90 默认为0
            margin:2,
            textStyle:{
                color:'rgba(23,126,255,.6)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(23,126,255,.3)'
            }
        }
    }],
        series: [{
        name: '实际客流',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 3,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(29,125,248, 0.8)'
                }, {
                    offset: 0.8,
                    color: 'rgba(29,125,248, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(29,125,248)',
                borderColor: 'rgba(29,125,248,0.27)',
                borderWidth: 12

            }
        },
        //data:data1
    }, {
        name: '预测客流',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(236,91,159, 0.8)'
                }, {
                    offset: 0.8,
                    color: 'rgba(236,91,159, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(236,91,159)',
                borderColor: 'rgba(236,91,159,0.2)',
                borderWidth: 12

            }
        },
        //data: data2
    } ]
};
sdChart.setOption(sdOption);

function animal(data){
    var top=$('#contLeft>h2').height()+10;
    var height=$('#sdChart canvas').height();
    var n=top;
    var speed=1;
    var timeLine,k=data[0].length;
    function sync(n,i){//匹配同步
        switch (n){
            case top+parseInt((height-40)*i/(k-1)):
                animalNum(k-1-i);
                break;
        }
    }
    function animalChar(){//动画
        for(var i=0;i<k;i++){
            sync(n,i);
        }
        n+=speed;
        if(n>(top+height-40)){
            n=top;
            k=data[0].length;
        }

        $('.pointer').css('top',n);
    }
    function animalNum(k){//重置左右图表参数
        myOption.series[0].data=[data[3][k]];//拥挤
        myOption.series[1].data=[data[4][k]];//候车
        myCharts.setOption(myOption);
        $('.actual').html(data[0][k]+" 人");//预测客流量
        $('.prediction').html(data[1][k]+" 人");//实际客流量
        $('.psgTime').html(data[2][k]);//时间
    }
    timeLine=setInterval(animalChar,20);
    $('#sdChart').hover(function(){
        clearInterval(timeLine);
    },function(){
        timeLine=setInterval(animalChar,20);
    })
}

//rightChart
var myCharts=echarts.init(document.getElementById('klChart'));
var myOption={
    series: [{
        type: 'liquidFill',
        name:'拥挤情况',
        center: ['center', '23%'],
        itemStyle: {
            normal: {
                color: '#0ea67d',
                //opacity: 0.6
            }
        },
        backgroundStyle: {
            color: 'transparent'
        },
        outline: {
            itemStyle: {
                borderWidth: 5,
                borderColor: '#2e4461'
            }
        },
        label: {
            normal: {
                formatter:function(param) {
                    return param.value*100 + '%\n拥挤情况';
                },
                textStyle: {
                    fontSize: 20,
                    color:'#0ea67d'
                }
            }
        },
        radius: '80%'
    },{
        type: 'liquidFill',
        center: ['center', '66%'],
        itemStyle: {
            normal: {
                color: '#d5464c',
                //opacity: 0.6
            }
        },
        backgroundStyle: {
            color: 'transparent'
        },
        outline: {
            itemStyle: {
                borderWidth: 5,
                borderColor: '#2e4461'
            }
        },
        label: {
            normal: {
                formatter:function(param) {
                    return param.value*100 + '%\n候车时间';
                },
                textStyle: {
                    fontSize: 20,
                    color:'#d5464c'
                }
            }
        },
        radius: '80%'
    }]
};
//myOption.series[0].data=[0.6];
//myOption.series[1].data=[0.3];
myCharts.setOption(myOption);


//接收到消息的回调方法
websocket.onmessage = function (event) {
heartCheck.reset();
data=JSON.parse($.trim(event.data));
consoleMessage(data);
if(data.type==101){//线路轨迹
    //客流统计
    var lineData=bMapDataFormat(data.data);
    bMapOption.series[0].data=lineData;
    bMapOption.series[1].data=lineData;
    bMapChart.setOption(bMapOption);
    //获取echart中使用的bmap实例
    var map = bMapChart.getModel().getComponent('bmap').getBMap();
    //var point=new BMap.Point(114.499925,36.616841);
    map.disableDoubleClickZoom();
    map.centerAndZoom(point, setZoom);
}else if(data.type==104){//线路总客流
    $('.cunts').html(data.data.total_psg)
}else if(data.type==105){//实时、预测客流量、乘客满意度
    var dataArr=getPsgArr(data.data);
    animal(dataArr);
    //console.log(dataArr);
    sdOption.series[0].data=dataArr[1];//实际客流量
    sdOption.series[1].data=dataArr[0];//预测客流量
    sdOption.yAxis[0].data=dataArr[2];//时间
    sdChart.setOption(sdOption);
    //console.log(dataArr[3][0]);
    myOption.series[0].data=[dataArr[3][0]];//拥挤
    myOption.series[1].data=[dataArr[4][0]];//候车
    myCharts.setOption(myOption);
}
};