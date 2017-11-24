/**
     * Created by Admin on 2017/8/17.
     */
    //创建和初始化地图函数：
    function initMap(id,point,zoom) {
            createMap(id,point,zoom);//创建地图
            setMapEvent();//设置地图事件
        }
    function createMap(id,point,zoom) {
            map = new BMap.Map(id); //建树Map实例
            map.centerAndZoom(point, zoom);// 建树点坐标,初始化地图,设置中心点坐标和地图级别。
            map.setMapStyle(mapOption.bmap.mapStyle);
        //点击地图，获取经纬度坐标
        map.addEventListener("click",function(e){
            console.log("经度坐标："+e.point.lng+" 纬度坐标："+e.point.lat);
        });
        }
    function setMapEvent() {
            map.enableScrollWheelZoom();//启用地图滚轮放大缩小
            map.enableKeyboard();//启用键盘上下左右键移动地图
            map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
            map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        }
    function addClickHandler(target, window) {
            target.addEventListener("mouseover", function() {
                   target.openInfoWindow(window);
            });
        }
    function frash(markers) {
            map.clearOverlays();//清空地图上标注点
            addMapOverlay(markers); //将marker点的信息显示在地图上
            markers.splice(0, markers.length);//清空数组
        }
    //设置点Icon
    function addMapOverlay(markers) {
            var u = map.getZoom(); // 定义地图缩放等级的变量
            if (u >= 8) {   // 如果缩放等级大于等于13
                    //把marker点的信息显示在地图上
                    for (var index = 0; index < markers.length; index++) {
                        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
                        var marker = new BMap.Marker(
                            point,
                            {
                                icon: new BMap.Icon("./images/angle/g_32_"+getImgUrl(markers[index].runAngle)+".png",
                                    new BMap.Size(32, 32))
                            });
                        var label = new BMap.Label(markers[index].title,{offset:new BMap.Size(32,5),position:point});
                        label.setStyle({
                            color : "#fff",
                            fontSize : "14px",
                            backgroundColor :"0.05",
                            border :"0"
                        });
                        var opts = {
                            width: 200,
                            title: "车辆编号:"+markers[index].title,
                            enableMessage: false

                        };
                        //console.log(markers[index].content);
                        var infoWindow = new BMap.InfoWindow(markers[index].content,
                            opts);
                        marker.setLabel(label);//显示地理名称
                        addClickHandler(marker, infoWindow);
                        map.addOverlay(marker);
                    }
        //地图缩放等级小于13不显示marker点
        }else{}
    }
function getImgUrl(runAngle){//根据偏向角获取图片
    runAngle=parseInt(runAngle);
    if(runAngle<=30){
        return '000';
    }else if(runAngle<=60){
        return '030';
    }else if(runAngle<=90){
        return '060';
    }else if(runAngle<=120){
        return '090';
    }else if(runAngle<=150){
        return '120';
    }else if(runAngle<=180){
        return '150';
    }else if(runAngle<=210){
        return '180';
    }else if(runAngle<=240){
        return '210';
    }else if(runAngle<=270){
        return '240';
    }else if(runAngle<=300){
        return '270';
    }else if(runAngle<=330){
        return '300';
    }else if(runAngle<=360){
        return '330';
    }
}
    var map;