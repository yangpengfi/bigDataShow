/**
 * Created by Admin on 2017/8/11.
 */
var siteChart=echarts.init(document.getElementById('siteChart'));

//var uploadedDataURL = "./data/data-stopName.json";

function convertData(sourceData) {
    return [].concat.apply([], $.map(sourceData, function(stop, index) {
        return {
            name: stop.stationName,
            value: [stop.longitude, stop.latitude,(stop.psg)/10]
        };
    }));
}

var sitOption = {
    bmap:mapOption.bmap,
    tooltip: {
        trigger: 'item'
    },
    legend: {
        selectedMode: 'single',
        orient: 'vertical',
        bottom: 35,
        right: 55,
        data: ['当前热门出行站点'],
        textStyle: {
            color: '#e8e8e8',
            fontSize:16
        }
    },
    series: [{
        name: '当前热门出行站点',
        type: 'scatter',
        coordinateSystem: 'bmap',
        symbolSize: function(val) {
            return val[2] / 10;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#CE761E'
            }
        }
    }, {
        name: '当前热门出行站点',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        symbolSize: function(val) {
            return val[2] / 5;
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#FF8E1E',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        zlevel: 1
    }]
};

siteChart.setOption(sitOption);
//获取echart中使用的bmap实例
var map = siteChart.getModel().getComponent('bmap').getBMap();
//var point=new BMap.Point(114.499925,36.616841);
map.disableDoubleClickZoom();
map.centerAndZoom(point, setZoom);
/*$.getJSON(uploadedDataURL, function(rawData) {
    var data = convertData(rawData);
    sitOption.series[0].data = data;
    sitOption.series[1].data = data.sort(function(a, b) {
        return b.value[2] - a.value[2];
    }).slice(0, 10);
    sitOption.series[2].data = data;
    sitOption.series[3].data = data.sort(function(a, b) {
        return b.value[3] - a.value[3];
    }).slice(0, 10);
    siteChart.setOption(sitOption);
    //获取echart中使用的bmap实例
    var map = siteChart.getModel().getComponent('bmap').getBMap();
    map.disableDoubleClickZoom();
    map.centerAndZoom("佛山", 13);

});*/

/*左侧站点客流图表*/

function getStationData(staData){
    var stationTop10=[[],[]];
    $.each(staData,function(key,val){
        stationTop10[0].push(val.stationName);
        stationTop10[1].push(val.psg);
    })
    return stationTop10;
}
var zdkChart=echarts.init(document.getElementById('zdkChart'));
var zdkOption = {
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
        left: '1%',
        right: '25%',
        bottom: '1%',
        top:10,
        padding:'0 0 10 0',
        containLabel: true,
    },
    yAxis: [
        {
            type: 'category',
            boundaryGap: true,//坐标轴两边留白
            inverse: 'true',
            //data: ["站点1","站点2","站点3","站点4","站点5","站点6","站点7","站点8","站点9","站点10"],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin:15,
                textStyle: {
                    color: '#033c97',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                }
            },
            axisTick:{//坐标轴刻度相关设置。
                show: false,
            },
            axisLine:{
                show: false
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }
    ],
    xAxis: [
        {
            type: 'value',
            axisLabel: {
                show:false
            },
            axisLine:{
                show: false
            },
            axisTick:{
                show: false
            },
            splitLine: {
                show: false,
            }

        }
    ],
    series : [
        {
            name:'客流量',
            type:'bar',
            //data:[80000, 80152, 80345, 85246, 94512, 98452, 132554, 164572, 186429, 225549],
            barWidth: 10,
            barGap:0,//柱间距离
            label: {//图形上的文本标签
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c} 人',
                    textStyle: {
                        color: '#1468e9',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 16,
                    },
                },
            },
            itemStyle: {//图形样式
                normal: {
                    barBorderRadius: [5, 5, 5, 5],
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 1, color: '#033c97'
                    }, {
                        offset: 0, color:'#1468e9'
                    }], false),
                },
            },
        }

    ]
};
zdkChart.setOption(zdkOption);
/*右侧站点线路*/
var zdxChart=echarts.init(document.getElementById('zdxChart'));
var zdxOption = {
    series: [
        /*{
            type: 'pie',
            center: ['25%', '15%'],
            radius: ['30%', '40%'],
            data: [{
                value: 223,
                name: 'L>20',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\n{b}',
                        textStyle: {
                            color: '#A5A4A4',
                            fontSize: 14

                        }
                    }
                }
            }, {
                value: 777,
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
        },*/{
            type: 'pie',
            center: ['75%', '15%'],
            radius: ['30%', '40%'],
            data: [{
                value: 335,
                name: 'L>10',
                itemStyle: {
                    normal: {
                        color: '#00A638'
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
            }, {
                value: 665,
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
        /*{
            type: 'pie',
            center: ['25%', '45%'],
            radius: ['30%', '40%'],
            data: [{
                value: 421,
                name: '10≥L＞5',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\n{b}',
                        textStyle: {
                            color: '#A5A4A4',
                            fontSize: 14

                        }
                    }
                }
            }, {
                value: 579,
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
        },*/
        {
            type: 'pie',
            center: ['75%', '45%'],
            radius: ['30%', '40%'],
            data: [{
                value: 112,
                name: '10>L≥5',
                itemStyle: {
                    normal: {
                        color: '#00A638'
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
            }, {
                value: 888,
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
        /*{
            type: 'pie',
            center: ['25%', '75%'],
            radius: ['30%', '40%'],
            data: [{
                value: 421,
                name: '3≥L＞1',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\n{b}',
                        textStyle: {
                            color: '#A5A4A4',
                            fontSize: 14

                        }
                    }
                }
            }, {
                value: 579,
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
        },*/
        {
            type: 'pie',
            center: ['75%', '75%'],
            radius: ['30%', '40%'],
            data: [{
                value: 112,
                name: '5>L≥1',
                itemStyle: {
                    normal: {
                        color: '#00A638'
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
            }, {
                value: 888,
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
zdxChart.setOption(zdxOption);

//接收到消息的回调方法
websocket.onmessage = function (event) {
    heartCheck.reset();
    data=JSON.parse(event.data);
    consoleMessage(data);
    if(data.type==201){//线路轨迹
        //客流统计
        var stationData=convertData(data.data);
        sitOption.series[0].data = stationData;
        sitOption.series[1].data = stationData.sort(function(a, b) {
            return b.value[2] - a.value[2];
        }).slice(0, 10);
        siteChart.setOption(sitOption);
        //获取echart中使用的bmap实例
        /*var map = siteChart.getModel().getComponent('bmap').getBMap();
        map.disableDoubleClickZoom();
        map.centerAndZoom("邯郸站", 14);*/
    }else if(data.type==202){//站点top10
        var stationTopData=getStationData(data.data);
        zdkOption.yAxis[0].data=stationTopData[0];
        zdkOption.series[0].data=stationTopData[1];
        zdkChart.setOption(zdkOption);
    }else if(data.type==203){//站点统计
        var station=data.data;
        $('.siteNum').html(station.station_num);
        zdxOption.series[0].data[0].value=station.gt10;
        zdxOption.series[0].data[1].value=station.station_num-station.gt10;
        zdxOption.series[1].data[0].value=station.gt5le10;
        zdxOption.series[1].data[1].value=station.station_num-station.gt5le10;
        zdxOption.series[2].data[0].value=station.ge1le5;
        zdxOption.series[2].data[1].value=station.station_num-station.ge1le5;
        zdxChart.setOption(zdxOption);
    }
};