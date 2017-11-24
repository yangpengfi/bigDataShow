/**
 * Created by Admin on 2017/8/11.
 */
//地图线路绘制
function bMapDataFormats(sourceData) {
    return [].concat.apply([], $.map(sourceData, function(lines, index) {
        return {
            "name": lines.line_name,
            "coords":lines.line_path,
        };
    }));
}
function linesTop10(sourceData) {
    var lineTData=[[],[]];
    $.each(sourceData,function(key,val){
        lineTData[0].push(val.line_name);
        lineTData[1].push(val.total_psg);
    });
    return lineTData;
}
//线网分布
var netChart=echarts.init(document.getElementById('netChart'));
var netOption={
    bmap:mapOption.bmap,
    tooltip: {
        trigger: 'item'
    },
    series:{
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        //data: data,
        silent: true,
        lineStyle: {
            normal: {
                opacity: 0.8,
                width: 1
            }
        },
        progressiveThreshold: 500,
        progressive: 100
    }
};
netChart.setOption(netOption);

//leftChart
var xlChart=echarts.init(document.getElementById('xlChart'));
var xlOption = {
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
            data: ['25路', '68路', '105路', '215路', '8路', '905路', '211路', '685路', '135路','668路'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin:15,
                textStyle: {
                    color: '#03388E',
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
    series : {
            name:'客流量',
            type:'bar',
            data:[225549, 186429, 164572,132554,98452,94512, 85246, 80345, 80152, 80000],
            barWidth: 10,
            barGap:0,//柱间距离
            label: {//图形上的文本标签
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c} 人',
                    textStyle: {
                        color: '#1468E9',
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
                        offset: 1, color: '#03388E'
                    }, {
                        offset: 0, color:'#1468E9'
                    }], false),
                },
            },
        }
};
xlChart.setOption(xlOption);

//rightChart
var xwChart=echarts.init(document.getElementById('xwChart'));
var xwOption = {
    series: [
        {
            type: 'pie',
            center: ['25%', '25%'],
            radius: ['30%', '40%'],
            data: [{
                value: 223,
                name: 'L>40Km',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\nL>40Km',
                        textStyle: {
                            color: '#29c8cb',
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
        },{
            type: 'pie',
            center: ['75%', '25%'],
            radius: ['30%', '40%'],
            data: [{
                value: 335,
                name: '40L>30',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\n40≥L>30Km',
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
        },{
            type: 'pie',
            center: ['25%', '70%'],
            radius: ['30%', '40%'],
            data: [{
                value: 421,
                name: '30>=L>10Km',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\n30≥L>10Km',
                        textStyle: {
                            color: '#29c8cb',
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
        },
        {
            type: 'pie',
            center: ['75%', '70%'],
            radius: ['30%', '40%'],
            data: [{
                value: 112,
                name: 'L<10Km',
                itemStyle: {
                    normal: {
                        color: '#00A638'
                    }
                },
                label: {
                    normal: {
                        position: 'center',
                        formatter: '{c}\nL<10Km',
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
xwChart.setOption(xwOption);

//接收到消息的回调方法
websocket.onmessage = function (event) {
    heartCheck.reset();
    data=JSON.parse($.trim(event.data));
    consoleMessage(data);
    if(data.type==101){//线路轨迹
        //线网分布
        var lineDatas=bMapDataFormats(data.data);
        netOption.series.data=lineDatas;
        //netOption.series[1].data=lineDatas;
        netChart.setOption(netOption);
        //获取echart中使用的bmap实例
        var maps = netChart.getModel().getComponent('bmap').getBMap();
        //var point=new BMap.Point(114.499925,36.616841);
        maps.disableDoubleClickZoom();
        maps.centerAndZoom(point, setZoom);
    }else if(data.type==102){//线路统计信息：条数、总长、分类
        $('.numBs>span').html(data.data.line_num);
        $('.longs>span').html(data.data.total_km);
        xwOption.series[0].data[0].value=data.data.gt40;
        xwOption.series[0].data[1].value=data.data.line_num-data.data.gt40;
        xwOption.series[1].data[0].value=data.data.gt30le40;
        xwOption.series[1].data[1].value=data.data.line_num-data.data.gt30le40;
        xwOption.series[2].data[0].value=data.data.gt10le30;
        xwOption.series[2].data[1].value=data.data.line_num-data.data.gt10le30;
        xwOption.series[3].data[0].value=data.data.le10;
        xwOption.series[3].data[1].value=data.data.line_num-data.data.le10;
        xwChart.setOption(xwOption);
    }else if(data.type==103){//线路客流量top10
        var lineT10=linesTop10(data.data);
        xlOption.yAxis[0].data=lineT10[0];
        xlOption.series.data=lineT10[1];
        console.log(lineT10);
        xlChart.setOption(xlOption);
    }
}