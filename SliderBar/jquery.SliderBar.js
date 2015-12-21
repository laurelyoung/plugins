/**
 * 滑动条
 * 思路:
 * 1.css画出滑动条的三个组成部分:bar(全部滑动条),completed(已完成滑动条),slider(滑动块)
 * 2.实现slider的拖拽
 * 3.实现completed的实时更新
 * Created by laurel on 15/12/20.
 */
;(function ($) {
    var SliderBar = function (element, options) {
        this.$element = element;
        this.default = {
            renderTo: this.$element,//滑动条添加的位置
            barClassName: 'bar',
            completedClassName: 'completed',
            sliderClassName: 'slider',
            barWidth: 400,//滑动宽度
            sliderWidth: 300,//滑块宽度
            onChanging: function (percentage) {
            },// 拖拽时触发的事件
            onChanged: function (percentage) {
            }//拖拽完成时触发的时间
        };
        // 第一个参数为{},是为了避免破坏掉默认参数对象$.fn.SliderBar.default
        this.options = $.extend({}, this.default, options);
    };

    SliderBar.prototype = {
        init: function () {
            // 兼容jQuery对象和字符串. 如果是字符串,则将其转换成jQuery对象
            this.options.renderTo = ($.type(this.options.renderTo) == 'string' ? $(this.options.renderTo) : this.options.renderTo);
            // 创建滑动条3个组成部分
            var $bar = $('<div></div>').attr('class', this.options.barClassName).width(this.options.barWidth).appendTo(this.options.renderTo);
            var $completed = $('<div></div>').attr('class', this.options.completedClassName).appendTo($bar);
            var $slider = $('<div></div>').attr('class', this.options.sliderClassName).appendTo($bar);

            // 初始化拖拽事件
            this._initDragEvent($bar, $completed, $slider);
        },

        _initDragEvent: function ($bar, $completed, $slider) {
            var me = this;

            var sliderPageX = 0;// 鼠标在页面上的x轴坐标
            var sliderLeft = 0;// 滑动块距离父元素左边距离
            var enableDrag = false;// 控制滑块是否移动的标识
            var min = 0,
                max = $bar.width() - $slider.width();// 滑动块的移动范围

            $bar.on('mousedown', function (e) {
                e = e || window.event;
                sliderLeft = parseInt($slider.css('left'));
                sliderPageX = e.pageX;
                enableDrag = true;
                $slider.css('cursor', 'move');
            });

            $bar.on('mousemove', function (e) {
                e = e || window.event;
                if (enableDrag) {
                    // 给定滑动块的滑动区域(min ~ max),以免滑动滑到范围外
                    var l = Math.min(Math.max(e.pageX - sliderPageX + sliderLeft, min), max);
                    $slider.css('left', l + 'px');
                    $completed.css('width', l + 'px');
                    me.options.onChanging(l / max);
                }
            });

            $bar.on('mouseup', function () {
                enableDrag = false;
                me.options.onChanged(parseInt($slider.css('left')) / max);
            });
        }
    };

    $.fn.SliderBar = function (options) {
        var sliderBar = new SliderBar(this, options);
        sliderBar.init();
        console.log(sliderBar);
        return this.each(function () {

        });
    };
})(jQuery);