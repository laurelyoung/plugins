/**
 * 创建弹出框
 * 思路:
 * 1.创建遮罩层
 * 2.创建弹出框,添加到body
 * 3.创建弹出框标题和弹出框内容,添加到弹出框内
 * Created by laurel on 15/12/19.
 */
;(function ($) {
    var PopupWindow = function PopupWindow(element, options) {
        // 默认参数
        this.defaults = {
            renderTo: $(document.body),
            classNames: {
                maskClassName: 'mask',
                popupWindowClassName: 'popupWindow',
                popupWindowTitleClassName: 'popupWindowTitle',
                popupWindowContentClassName: 'popupWindowContent',
                okBtnClassName: 'okBtn',
                cancelBtnClassName: 'cancelBtn'
            },
            title: '标题',    // 纯文本或者html
            content: '正文',  // 纯文本或者html
            animate: false,
            okEvent: function () {
            }
        };
        this.settings = $.extend(true, {}, this.defaults, options);
        this.element = element;
    };


    PopupWindow.prototype = {
        init: function () {
            this.settings.renderTo = $.type(this.settings.renderTo) == 'string' ? $(this.settings.renderTo) : this.settings.renderTo;// 转化为jQuery对象
            // 创建遮罩层
            var mask = $('<div></div>').addClass(this.settings.maskClassName).appendTo(this.settings.renderTo);
            // 创建弹出框
            var popupWindow = $('<div></div>').addClass(this.settings.classNames.popupWindowClassName).appendTo(this.settings.renderTo);
            // 创建弹出框标题
            var popupWindowTitle = $('<h1></h1>').html(this.settings.title).addClass(this.settings.classNames.popupWindowTitleClassName).appendTo(popupWindow);
            // 创建弹出框正文
            var popupWindowContent = $('<div></div>').html('<p>' + this.settings.content + '</p>').addClass(this.settings.classNames.popupWindowContentClassName).appendTo(popupWindow);
            // 创建确定和取消按钮
            var okBtn = $('<button></button>').addClass(this.settings.classNames.okBtnClassName).text('确 定').appendTo(popupWindowContent);
            var cancelBtn = $('<button></button>').addClass(this.settings.classNames.cancelBtnClassName).text('取 消').appendTo(popupWindowContent);

            // 初始化按钮事件
            this.initEvent(okBtn, cancelBtn, mask, popupWindow);
        },

        // 删除弹出框
        removePopupWindow: function (mask, popupWindow) {
            // 弹出框动画退出
            popupWindow.animate({
                top: -1 * popupWindow.height() - 10
            }, 300, 'easeOutQuad');
            // 遮罩层动画退出
            mask.animate({
                opacity: 0
            }, 300, 'easeInCubic', function () {
                // 删除弹出框
                popupWindow.remove();
                // 删除遮罩层
                mask.remove();
            });
        },

        initEvent: function (okBtn, cancelBtn, mask, popupWindow) {
            var me = this;
            okBtn.on('click', function () {
                me.removePopupWindow(mask, popupWindow);
                me.settings.okEvent();
            });

            cancelBtn.on('click', function () {
                me.removePopupWindow(mask, popupWindow);
            });

            if (me.settings.animate) {
                popupWindow.css('top', -10);
                popupWindow.animate({
                    top: 150
                }, 600, 'easeOutCubic', function () {
                    // 鼠标点击除了弹出框本身之外的任何地方,均可退出
                    mask.not(popupWindow).on('click', function () {
                        me.removePopupWindow(mask, popupWindow);
                    });
                });
            }
        }
    };

    $.fn.PopupWindow = function (options) {
        var popupWindow = new PopupWindow(this, options);
        popupWindow.init();
    }
})
(jQuery);