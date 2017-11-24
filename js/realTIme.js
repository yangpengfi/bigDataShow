/**
 * Created by Admin on 2017/8/11.
 */

// 百度地图API功能
var markers=[];
//var point=new BMap.Point(114.499925,36.616841);

initMap("realChart",point,setZoom);



/*var map = new BMap.Map("realChart");
map.centerAndZoom("邯郸站",14);*/
//map.setMapStyle(mapOption.bmap.mapStyle);
/*var latitude=36.6093079285,
    longitude=114.482693932;
function speeds(){
    latitude+=0.00001;
    longitude+=0.00001;
}
function setBus(gps){
    map.clearOverlays();
    var pt = new BMap.Point(gps.longitude,gps.latitude);
    var myIcon = new BMap.Icon("./images/angle/g_32_000.png", new BMap.Size(32,32));
    var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
}*/

//setInterval(speeds,10);
//setInterval(setBus,10);

/*左侧车辆构成图*/

function getBusData(sourceData) {
    return [].concat.apply([], $.map(sourceData, function(stop, index) {
        return {
            name: stop.deptName,
            value: stop.bus_num,
            itemStyle: {
                normal: {
                    color: '#7bb640'
                }
            },
            label: {
                normal: {
                    position: 'center',
                    formatter: '{c}\n{b}',
                    textStyle: {
                        color: '#29c8cb',
                        fontSize: 14

                    }
                }
            }
        };
    }));
}
var busChart=echarts.init(document.getElementById('busChart'));
var busOption = {
    series: [
        {
            type: 'pie',
            center: ['25%', '15%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 777,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        },
        {
            type: 'pie',
            center: ['25%', '45%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 579,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        },
        {
            type: 'pie',
            center: ['25%', '75%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 579,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        },
        {
            type: 'pie',
            center: ['75%', '15%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 777,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        },
        {
            type: 'pie',
            center: ['75%', '45%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 579,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        },
        {
            type: 'pie',
            center: ['75%', '75%'],
            radius: ['30%', '40%'],
            data: [{},
                {
                //value: 579,
                tooltip: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(18,18,19,.9)'
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    },
                    emphasis:{
                        show:false
                    }
                }
            }]
        }]
};
busChart.setOption(busOption);
/*右侧平均速度*/
function getSpeed(speedDatas){
    var speedData=[[],[]];
    $.each(speedDatas,function(key,val){
        speedData[0].push(val.time);
        speedData[1].push(val.svg_speed);
    });
    return speedData;
}
var speedChart=echarts.init(document.getElementById('speedChart'));
var speedOption = {
    title: {
        text: '速度变化',
        right: '3%',
        top: '13%',
        textStyle: {
            color: '#e8e8e8',
            fontWeight:400
        }
    },
    tooltip: { //提示框组件
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            label: {
                backgroundColor: '#6a7985'
            }
        },
    },
    grid: {
        left: '3%',
        right: '5%',
        bottom: '20%',
        top:'30%',
        padding:'0 0 10 0',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            name:'时间',
            boundaryGap: false,//坐标轴两边留白
            inverse: 'true',
            "axisLine": {
                lineStyle: {
                    color: 'rgba(23,126,255,.3)'
                }
            },
            axisTick: {
                show: false
            },
            //data: ["06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00"],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin:15,
                textStyle: {
                    color: 'rgba(23,126,255,.6)',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                }
            }
        }
    ],
    yAxis: [{
        type: 'value',
        name: '（Km/h）',
        min:'0',
        max:'50',
        nameTextStyle:{
            color:'rgba(23,126,255,.6)',
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 5,
            textStyle: {
                color:'rgba(23,126,255,.6)',
                fontSize: 14
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color:'rgba(23,126,255,.3)'
            }
        }
    }],
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
            start: 0,
            end: 30,
            handleSize: 5,
            height: '10',
            borderColor:'rgba(39,63,96,.5)',
            borderRadius:5
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty',
            start: 0,
            end: 30
        }
    ],
    series : [{
        name: '平均速度',
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
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(71,196,197, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(27,174,97, .4)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(71,196,197, .4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(27,174,97, .4)'
                }], false),
                borderColor:'rgba(71,196,197, .2)',
                borderWidth: 4

            }
        },
        //data:[35, 25, 20, 35, 40, 35, 30, 25]
    }]
};
speedChart.setOption(speedOption);

//接收到消息的回调方法
websocket.onmessage=function (event) {
    heartCheck.reset();
    data=JSON.parse(event.data);
    consoleMessage(data);
    if(data.type==301){//车辆统计
        $('.busNum').html(data.data.total_bus_num);
        var busData=getBusData(data.data.item);
        for(var i= 0;i<busData.length;i++){
            busOption.series[i].data[0]=busData[i];
            busOption.series[i].data[1].value=data.data.total_bus_num-busData[i].value;
        }
        busChart.setOption(busOption);
    }else if(data.type==302){//实时在线车辆
        var gpsData=data.data;
        /*for(var i=0;i<gpsData.length;i++){
            setBus(gpsData[i]);
        }*/

        $.each(gpsData, function(i, d) {
            markers[i] = {
                content : "<table><tr><td><span>线路名称:</span>"+ d.line_name+"</td></tr>"
                +         "<tr><td><span>车辆速度:</span>"+ d.speed+"Km/h</td></tr>"
                +         "<tr><td><span>车上人数:</span>"+ d.total_person+"人</td></tr></table>",
                title : d.bus_no,
                position : {
                    lat : d.latitude,
                    lng : d.longitude
                },
                runAngle: d.runAngle
            };
        });
        frash(markers);
    }else if(data.type==303){//最高、最低速度线路以及平均速度
        $('.highest').html(data.data.max_speed_line_name+" : <span>"+data.data.max_speed+"</span> Km/h");
        $('.lowest').html(data.data.min_speed_line_name+" : <span>"+data.data.min_speed+"</span> Km/h");
        $('.average').html("<span>"+data.data.svg_speed+" </span> Km/h");
    }else if(data.type==304){//平均速度图表数据
        var speedData=getSpeed(data.data);
        speedOption.xAxis[0].data=speedData[0];
        speedOption.series[0].data=speedData[1];
        speedChart.setOption(speedOption);
    }
};
