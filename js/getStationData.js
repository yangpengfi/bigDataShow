/**
 * Created by Admin on 2017/8/14.
 */
var websocket = null;
socketInit();
//连接发生错误的回调方法
websocket.onerror = function () {
    consoleMessage("WebSocket连接发生错误");
};
//连接成功建立的回调方法
websocket.onopen = function () {
    heartCheck.start();
    consoleMessage("WebSocket连接成功");
};
//连接关闭的回调方法
websocket.onclose = function () {
    consoleMessage("WebSocket连接关闭");
};
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};
//将消息显示在控制台上
function consoleMessage(msg) {
    console.log(msg)
}
//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}
//动态生成sessionId
function genSessionId(length){
    genSessionId.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var str = genSessionId.characters;
    if ( !"0"[0] ) { //fix IE67
        str = str.split("");
    }
    for(var i=0,id="",len = str.length;i < length;i++){
        id += str[Math.floor(Math.random() * len)];
    }
    return id;
}
//websocket初始化
function socketInit(){
    var SessionId=genSessionId(32);
    //var webUrl='ws://202.104.136.228:9001/lty-big-ws/stationWs';
    //var webUrl='ws://127.0.0.1:8085';
    //var webUrl='ws://10.1.10.169:8081/lty-big-websocket/stationWs';
    if ('WebSocket' in window) {
        websocket = new ReconnectingWebSocket(webUrl+"/stationWs?sessionID="+SessionId);
        websocket.timeoutInterval = 12000;//websocket握手超时时间
    }
    else if ('MozWebSocket' in window) {
        websocket =  new MozWebSocket(webUrl+"?sessionID="+SessionId);
    }
    else {
        websocket = new SockJS(webUrl+"?sessionID="+SessionId);
    }

}
//心跳包检测
var heartCheck = {
    timeout: 10000,//10秒发送一次心跳包
    serverTimeout:60000,//服务端60秒没有响应重连
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        this.start();
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            //发送心跳包
            websocket.send(JSON.stringify({"msg_type":100}));
            self.serverTimeoutObj = setTimeout(function(){
                //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                websocket.close();
                socketInit();
            }, self.serverTimeout);

        }, this.timeout);
    }
};