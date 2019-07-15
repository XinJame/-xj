//自调用hanshu
(function() {
    //纪录游戏对象
    var that;
    //游戏逻辑构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        //1蛇和食物渲染
        this.food.render(this.map);
        this.snake.render(this.map);
        //2开始游戏逻辑
        //2.1让蛇移动
        runSnake();
        //2.2当蛇遇边界结束游戏
        //2.3通过键盘设置蛇的移动
        bindKey();
        //2.4当蛇遇到食物---snake的move中
    }

    //通过键盘移动蛇
    function bindKey() {
        document.addEventListener('keydown',function(e){
            switch (e.keyCode) {
                case 37: 
                  this.snake.direction = 'left';
                  break;
                case 38:
                  this.snake.direction = 'top';
                  break;
                case 39:
                  this.snake.direction = 'right';
                  break;
                case 40:
                  this.snake.direction = 'bottom';
                  break;
              }
        }.bind(that),false);
    }

    //让蛇移动
    function runSnake() {
        var timerId = setInterval(function () {

       // 让蛇走一格
       // 在定时器的function中this是指向window对象的
       // this.snake
       // 要获取游戏对象中的蛇属性
       this.snake.move(this.food, this.map);
       this.snake.render(this.map);
        // 2.2  当蛇遇到边界游戏结束
        // 获取蛇头的坐标
        var maxX = this.map.offsetWidth / this.snake.width;
        var maxY = this.map.offsetHeight / this.snake.height;
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        if (headX < 0 || headX >= maxX) {
          alert('Game Over');
          clearInterval(timerId);
        }

        if (headY < 0 || headY >= maxY) {
          alert('Game Over');
          clearInterval(timerId);
        }
     }.bind(that), 150);
        
    }


    //设置window.Game
    window.Game = Game;
})()