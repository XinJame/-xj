//自调用函数
(function () {
    var position = 'absolute';
    var elements = [];
    //蛇构造函数
    function Snake(options) {
        options = options || {};
        //蛇大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        //蛇移动方向
        this.direction = options.direction || 'right';
        //蛇身和蛇头
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
    }


    //蛇的渲染方法
    Snake.prototype.render = function (map) {
        //删除之前的蛇
        remove();
        //把每一节蛇渲染地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            //蛇节
            var object = this.body[i]
            //创建div
            var div = document.createElement('div');
            map.appendChild(div);
            //push div
            elements.push(div);

            //设置样式
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }

    }

    //控制蛇的移动方法
    Snake.prototype.move = function (food,map) {
        //蛇身移动到前一个蛇节位置
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断蛇头移动
        //判断蛇移动方向
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;

        }
        //判断蛇头是否和食物坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            }
            )

            //随机生成食物
            food.render(map);
        }
    }

    //删除函数
    function remove() {
        //删除div
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中元素
            elements.splice(i, 1);
        }
    }
    //设置window属性接收构造函数
    window.Snake = Snake;

})()