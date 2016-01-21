/**
 * 鼠标滑轮滚动时图片切换
 * 思路：
 * 1.监听鼠标滑轮的滚动事件，记录滚动的wheelDelta值delta
 * 2.delta < 0时，向前一张
 * 3.delta > 0时，向后一张
 * Author: chenglong.yang
 * Date: 16-1-22
 * Time: 上午1:31
 */
$(function () {

    // 记录当前看得见的第一张图片的索引值
    var index = 0;

    // 控制是否可以切换的标志位，防止频繁滚动
    var canScroll = true;

    // 是否循环播放图片
    var loop = true;

    // 可视区域图片的张数
    var showNum = 5;

    // 包含ul的div标签
    var $box = $('.box');

    // 包含图片列表的ul标签
    var $items = $('.items');

    // 图片的张数
    var len = $items.find('.item').length;

    // 单个图片的宽度（包含padding,border）
    var w = $items.find('.item').eq(0).outerWidth();

    // 单个图片的高度（包含padding,border）
    var h = $items.find('.item').eq(0).outerHeight();

    // 图片之间的间距(margin-right值)
    var mr = parseInt($items.find('.item').eq(0).css('margin-right'));

    var _init = function () {
        $box.css({
            width: (w + mr) * showNum - mr + 'px',
            height: h
        });

        $items.css({
            width: (w + mr) * len + 'px',
            height: h
        });
    };

    // 初始化元素
    _init();

    var _scrollImage = function () {
        canScroll = false; //一旦进入滚动，必须等到这次滚动完成后，才能进行下一次滚动
        $('.items').animate(
            {left: index * (w + mr) + 'px'},
            100,
            'linear',
            function () {
                canScroll = true; //canScroll置为true，这时就可以进行下一次滚动
            });
    };

    /**
     * 向前滚动一张图片
     * @private
     */
    var _prev = function () {
        index--;
        if (index + len < showNum && loop) {
            index = 0;
        }
        console.log(index);
        _scrollImage();
    };

    /**
     * 向后滚动一张图片
     * @private
     */
    var _next = function () {
        index++;
        if (index > 0 && loop) {
            index = -(len - showNum);
        }
        console.log(index);
        _scrollImage();
    };

    $('.box').on('mousewheel DOMMouseScroll', function (e) {
        var delta = e.originalEvent.wheelDelta || e.originalEvent.detail;
        console.log('delta=' + delta);
        if (canScroll) {
            if (delta > 0) {
                _prev();
            } else if (delta < 0) {
                _next();
            }
        }
    });
});