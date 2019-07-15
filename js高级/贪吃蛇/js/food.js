//自调用函数开启局部作用域
(function() {
    
    //纪录上一次创建的事务，为了删除
    var position = 'absolute';
    var elements = [];
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
    }

//渲染食物

    Food.prototype.render = function(map) {
    //删除之前食物
        remove();
    //随机设置食物的x,y值
        this.x = Tools.getRandom(0,map.offsetWidth/this.width - 1) * this.width;
        this.y = Tools.getRandom(0,map.offsetHeight/this.height - 1) * this.height;
    //动态创建div 显示食物
        var div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);
    //设置div样式

        div.style.position = position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
    }

//删除函数
    function remove() {
    
        for (var i = 0; i<elements.length;i++){
    //删除div
            elements[i].parentNode.removeChild(elements[i]);
    //删除数组中元素,第一个参数从哪开始删，第二个参数删除几个元素
            elements.splice(i,1);
        }
    }


//将Food赋值给window
    window.Food = Food;
})()
