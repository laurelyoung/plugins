;
(function($) {

    var CircleProgressBar = function(element, options) {
        this.default = {
            id: element.attr('id'),
            x: 70,
            y: 70,
            radius: 50,
            barWidth: 18,
            barColor: '#f62',
            bgColor: '#8ec',
            value: 70,
            animate: true
        };
        this.settings = $.extend({}, this.default, options || {});
        this.$element = element;

        // 初始化
        this.init();
    };

    CircleProgressBar.prototype = {
        init: function() {
            this.id = this.settings.id; // 画布ID
            this.x = this.settings.x; // 圆心x坐标
            this.y = this.settings.y; // 圆心y坐标
            this.radius = this.settings.radius; // 圆的半径
            this.barWidth = this.settings.barWidth; // 进度条宽度
            this.barColor = this.settings.barColor; // 进度条颜色
            this.bgColor = this.settings.bgColor; // 背景颜色
            this.value = this.settings.value; // 进度条的值
            this.animate = this.settings.animate; // 是否动画

            var myCanvas = document.getElementById(this.id); // canvas画布
            this.ctx = myCanvas.getContext('2d'); // canvas上下文
            this.width = myCanvas.width; // canvas画布的宽度
            this.height = myCanvas.height; // canvas画布的高度

            console.log(this);
            console.log(this.$element);

            // 初始化mouseover事件
            this.initEvent();
            // 通过触发mouseover事件，初始化圆形进度条
            this.$element.trigger('mouseover');
        },

        draw: function(ctx, x, y, radius, barWidth, barColor, bgColor, progress) {
            // 清除之前的画布
            ctx.clearRect(0, 0, this.width, this.height);

            // 背景圆
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.lineWidth = barWidth;
            ctx.strokeStyle = bgColor;
            ctx.stroke();

            // 画出进度条
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, 2 * Math.PI * progress / 100, false);
            ctx.closePath();
            ctx.lineWidth = barWidth;
            ctx.strokeStyle = barColor;
            ctx.stroke();

            // 内部遮罩实体白色圆形
            ctx.beginPath();
            ctx.arc(x, y, radius - barWidth / 2, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.font = "bold 34px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = '#222';
            ctx.moveTo(x, y);
            var text = (progress < 10) ? '0' + progress + '%' : progress + '%';
            ctx.fillText(text, x, y);
        },

        initEvent: function() {
            var self = this;
            this.$element.on('mouseover', function() {
                console.log(111);
                if (self.animate) {
                    self.progress = 0;
                    self.timer = setInterval(function() {
                        // 为了防止多次mouseover导致陷入死循环
                        self.animate = false;
                        self.draw(self.ctx, self.x, self.y, self.radius, self.barWidth, self.barColor, self.bgColor, self.progress);
                        self.progress += 1;
                        if (self.progress > self.value) {
                            // 关闭循环
                            clearInterval(self.timer);
                            self.animate = true;
                        }
                    }, 2);
                } else {
                    self.draw(self.ctx, self.x, self.y, self.radius, self.barWidth, self.barColor, self.bgColor, self.value);
                }
            });
        }
    };

    $.fn.CircleProgressBar = function(options) {
        // 创建对象实例
        var circleProgressBar = new CircleProgressBar(this, options);
    }
})(jQuery);
