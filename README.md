# plugins
custom plugins


# 1.SliderBar

SliderBar is a jQuery plugin for easily and quickly creating a slider bar.

## Usage

```
$(selector).SliderBar(options);
```

## Options

```
renderTo: this.$element,         //滑动条添加的位置
barClassName: 'bar',             //全部滑动条css样式
completedClassName: 'completed', //已完成滑动条css样式
sliderClassName: 'slider',       //滑动块css样式
barWidth: 400,                   //滑动宽度
sliderWidth: 300,                //滑块宽度
onChanging: function() {},       //拖拽时触发的事件
onChanged: function() {}         //拖拽完成时触发的事件
```

