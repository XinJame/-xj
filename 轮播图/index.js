//获取元素
var box = my$('box');
var screen = box.children[0];
var ul = screen.children[0];
var ol = screen.children[1];



//获取箭头
var arr = my$('arr');
var arrLeft = my$('left');
var arrRight = my$('right');

//图片宽度
var imgWidth = screen.offsetWidth;

//1.动态生成右下角序号,通过图片的个数生成
var count = ul.children.length;
for (var i = 0; i < count; i++) {
  var li = document.createElement('li');
  ol.appendChild(li);
  setInnerText(li, i + 1);
  //2.点击序号 切换图片
  li.onclick = liClick;
  //纪录当前li索引
  li.setAttribute('index', i);
}

function liClick() {
  //2.1取消li高亮显示,当前li高亮显示
  for (var i = 0; i < ol.children.length; i++) {
    var li = ol.children[i];
    li.className = '';
  }
  this.className = 'current';
  //2.2点击序号,动画方式切换图片,获取自定义属性
  var liIndex = parseInt(this.getAttribute('index'));
  animate(ul, -liIndex * imgWidth);

  //全局变量index 和liIndex 一致
  index = liIndex;
}

//让序号1高亮显示
ol.children[0].className = 'current';


//3.鼠标放在盒子上显示箭头
box.onmouseenter = function () {
  arr.style.display = 'block';
  //清楚定时器
  clearInterval(timeId);
}

box.onmouseleave = function () {
  arr.style.display = 'none';
  //开启定时器
  timeId = setInterval(function () {
    arrRight.click();
  }, 2000);
}

//4.实现下一张的功能
var index = 0;
arrRight.onclick = function () {
  //判断是否是克隆的图片,count为5，是的话修改ul坐标，切换到第一张
  if (index === count) {
    ul.style.left = 0 + 'px';
    index = 0;
  }

  index++;
  if (index < count) {
    //模拟点击ol中的li
    ol.children[index].click();
  } else {
    //最后一张，移动到克隆的第一张,同时取消高亮显示，让第一序号高亮显示
    animate(ul, -index * imgWidth);
    for (var i = 0; i < ol.children.length; i++) {
      var li = ol.children[i];
      li.className = '';
    }
    ol.children[0].className = 'current';
  }
}

//4.1实现上一张功能
arrLeft.onclick = function () {
  //如果是第一张，ul切换到克隆的图片
  if (index === 0) {
    index = count
    ul.style.left = -index * imgWidth + 'px';
  }
  index--;
  ol.children[index].click();
}

//克隆图片
var firstLi = ul.children[0];
var cloneLi = firstLi.cloneNode(true);
ul.appendChild(cloneLi);
//5自动切换图片
var timeId = setInterval(function () {
  arrRight.click();
}, 2000);