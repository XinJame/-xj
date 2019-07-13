//获取父容器
var container = document.getElementById('container');

//创建方块对象用数组保存
var array = [];
for(var i = 0 ; i< 20; i++){
    var r = Tools.getRandom(0,255);
    var g = Tools.getRandom(0,255);
    var b = Tools.getRandom(0,255);
    var box = new Box(container,{
        backgroundColor : 'rgb('+r+','+g+','+b+')'
    });
    //加到数组中
    array.push(box);
}

setInterval(randomBox,500);

randomBox();

function randomBox() {
    for (var i = 0; i< array.length;i++){
        var box = array[i];
        box.random();
    }
}