# plugins
custom plugins


# 1.SliderBar

SliderBar is a jQuery plugin for easily and quickly creating a Slider Bar.

## Usage

```
$(selector).SliderBar(options);
```

## Options

``` javascript
renderTo: this.$element,         //滑动条添加的位置
barClassName: 'bar',             //全部滑动条css样式
completedClassName: 'completed', //已完成滑动条css样式
sliderClassName: 'slider',       //滑动块css样式
barWidth: 400,                   //滑动宽度
sliderWidth: 300,                //滑块宽度
onChanging: function() {},       //拖拽时触发的事件
onChanged: function() {}         //拖拽完成时触发的事件
```

## Example
``` javascript
$(function () {
    $('.btn').on('click', function () {
        $('#container').SliderBar({
            barWidth: 600,
            barClassName: 'bar-2',
            completedClassName: 'completed-2',
            sliderClassName: 'slider-2',
            onChanging: function (percentage) {
                $('#percentage').text((percentage * 100).toFixed(2) + '%');
            },
            onChanged: function (percentage) {
                $('#percentage').text((percentage * 100).toFixed(2) + '%');
            }
        });
    })
})
```



# 2.PopupWindow

PopupWindow is a jQuery plugin for easily and quickly creating a Popup Window.

## Usage

```
$(selector).SliderBar(options);
```

## Options

``` javascript
renderTo: $(document.body),
classNames: {                                            // 样式对象
    maskClassName: 'mask',                               // 遮罩层class
    popupWindowClassName: 'popupWindow',                 // 弹出框class
    popupWindowTitleClassName: 'popupWindowTitle',       // 弹出框标题class
    popupWindowContentClassName: 'popupWindowContent',   // 弹出框正文class
    okBtnClassName: 'okBtn',                             // 确定按钮class
    cancelBtnClassName: 'cancelBtn'                      // 取消按钮class
},
title: '标题',                                            // 标题（纯文本或者html）
content: '正文',                                          // 正文（纯文本或者html）
animate: false,                                          // 是否动画
okEvent: function () {                                   // 确定按钮按下后触发的事件函数
}
```

## Example
``` javascript
$(function(){
    $('.btn').on('click', function(){
        $('#container').PopupWindow({
            classNames: {
                okBtnClassName: 'btn okBtn',
                cancelBtnClassName: 'btn cancelBtn'
            }
        });
    });
});
```



# 3.CircleProgressBar

CircleProgressBar is a jQuery plugin for easily and quickly creating a Circular Progress Bar.

## Usage

```
$(selector).CircleProgressBar(options);
```

## Options

``` javascript
x: 70,                           // 圆心x坐标
y: 70,                           // 圆心y坐标
radius: 50,                      // 圆的半径
barWidth: 18,                    // 进度条宽度
barColor: '#f62',                // 进度条颜色
bgColor: '#8ec',                 // 背景颜色
value: 70,                       // 进度条的值
animate: true                    // 是否动画
```

## Example
``` javascript
$(function () {
    $('#myCanvas').CircleProgressBar({
        x: 80,
        y: 80,
        radius: 60,
        barWidth: 20,
        value: 60,
        animate: true
    });
});
```

## Effect
![CircleProgressBar](/CircleProgressBar/CircleProgressBar.gif)

