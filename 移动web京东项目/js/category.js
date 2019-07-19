window.onload = function () {
    var ct_cLeft = document.querySelector(".ct_cLeft");
    var leftHeight = ct_cLeft.offsetHeight;
    //滑动的列表
    var ulBox = ct_cLeft.querySelector("ul:first-of-type");
    var ulBoxHeight = ulBox.offsetHeight;

    /*获取所有li元素*/
    var lis = ulBox.querySelectorAll("li");

    /*设置静止状态下的最大top值*/
    var maxTop = 0;
    /*设置静止状态下的最小的top值*/
    var minTop = leftHeight - ulBoxHeight;
    /*设置滑动状态下的最大的top值*/
    var maxBounceTop = maxTop + 100;
    /*设置滑动状态下的最小top值*/
    var minBounceTop = minTop - 100;

    //实现滑动
    var startY = 0, moveY = 0, distanceY = 0, currentY = 0;

    //添加滑动事件
    ulBox.addEventListener("touchstart", function (e) {
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            console.log("超出范围啦");
            return;
        }
        ulBox.style.transition = "none";
        ulBox.style.top = (currentY + distanceY) + "px";
    });
    ulBox.addEventListener("touchend", function (e) {
        /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = minTop + "px";
        }
        else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            /*回到maxTop位置*/
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = maxTop + "px";
        }
        else {
            /*记录当前滑动的距离*/
            currentY += distanceY;
        }
    });

        /*为每一个li元素设置添加一个索引值*/
        for(var i=0;i<lis.length;i++){
            /*lis[i].setAttribute("index",i);*/
            lis[i].index=i;
        }
    
    // /*绑定移动端的tap事件*/
    // var li = e.target.parentNode;
    // itcast.tap(ulBox, function (e) {
    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].classList.remove("active");
    //     }
    //     /*为当前被单击的li元素添加样式*/

    //     li.classList.add("active");
    // });

        /*绑定fastclick*/
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
                FastClick.attach(document.body);
            }, false);
        }
        /*fastclick使用的时候就是来绑定添加click事件*/
        ulBox.addEventListener("click",function(e){
            /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
            for(var i=0;i<lis.length;i++){
                lis[i].classList.remove("active");
            }
            /*为当前被单击的li元素添加样式*/
            var li=e.target.parentNode;
            var liHeight=li.offsetHeight;
            li.classList.add("active");
    
            /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
            /*获取当前li元素的索引值*/
            var index=li.index;
            /*开启过渡*/
            ulBox.style.transition="top .5s";
            /*设置偏移*/
            if(-index*liHeight < minTop){
                /*只能偏移到minTop位置*/
                ulBox.style.top=minTop+"px";
                currentY=minTop;
            }
            else{
                ulBox.style.top=-index*liHeight+"px";
                currentY=-index*liHeight;
            }
        })

}
//获取回调函数事件元参数，function(e),获取当前被点击的元素e.target.parentNode
//删除所有li样式 lis[i].classList.remove("active");
//为元素添加样式  li.classList.add("active");
//为lis对象中每一个li元素添加索引  lis[i].index=i;
//单击事件后，ul的移动要重置courrentY