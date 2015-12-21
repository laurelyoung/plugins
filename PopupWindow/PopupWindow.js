/**
 * 创建弹出框
 * 思路:
 * 1.创建遮罩层
 * 2.创建弹出框,添加到body
 * 3.创建弹出框标题和弹出框内容,添加到弹出框内
 * Created by laurel on 15/12/19.
 */
function PopupWindow(title, content, width, height, needAnimate, func) {
    title = title || '弹出框标题';
    content = content || '弹出框内容';
    width = width || 350;
    height = height || 180;
    needAnimate = needAnimate || false;

    // 添加遮罩层
    var mask = $('<div></div>');
    mask.appendTo(document.body);
    mask.css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.4)'
    });

    // 创建弹出框
    var popupWindowBox = $('<div id="PopupWindow"></div>');
    popupWindowBox.appendTo(document.body);

    // 设置弹出框的样式
    popupWindowBox.css({
        width: width,
        height: height,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fff',
        position: 'fixed',
        top: 150,
        left: '50%',
        transform: 'translate(-50%)',
        boxShadow: '0 2px 5px rgba(0,0,0,.5)'
    });

    // 创建弹出框标题
    var popupWindowTitleBox = $('<h1></h1>');
    popupWindowTitleBox.appendTo(popupWindowBox);// 标题框添加到弹出框内部
    popupWindowTitleBox.text(title);
    popupWindowTitleBox.css({
        color: '#fff',
        fontSize: 20,
        padding: '8px 10px',
        textAlign: 'center',
        backgroundColor: '#f60',
        borderBottom: '1px solid #ccc'
    });


    // 创建弹出框内容
    var popupWindowContentBox = $('<p></p>');
    popupWindowContentBox.appendTo(popupWindowBox);// 内容框添加到弹出框内部

    var infoBox = $('<p></p>');
    infoBox.text(content);
    infoBox.css({
        marginTop: 10,
        marginBottom: 30
    });
    infoBox.appendTo(popupWindowContentBox);

    popupWindowContentBox.css({
        fontSize: 14,
        lineHeight: 1.428,
        textAlign: 'center',
        paddingTop: 15
    });

    /**
     * 弹出框退出页面,并删除自身
     */
    function removePopupWindow() {
        popupWindowBox.animate({// 弹出框动画退出
            top: -1 * height - 10
        }, 300, 'easeOutQuad');
        mask.animate({// 遮罩层动画退出
            opacity: 0
        }, 300, 'easeInCubic', function () {
            popupWindowBox.remove();// 删除弹出框
            mask.remove();// 删除遮罩层
        });
    }

    // 创建确定和取消按钮
    var okBtn = $('<button></button>');
    var cancelBtn = $('<button></button>');

    okBtn.text('确 定');
    cancelBtn.text('取 消');

    okBtn.css({
        padding: '8px 25px',
        fontSize: 16,
        color: '#f60',
        cursor: 'pointer',
        borderRadius: 4,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        marginRight: 40
    });

    cancelBtn.css({
        padding: '8px 25px',
        fontSize: 16,
        color: '#666',
        cursor: 'pointer',
        borderRadius: 4,
        border: '1px solid #ccc',
        backgroundColor: '#fff'
    });

    // 确定和取消按钮添加到弹出内容框
    okBtn.appendTo(popupWindowContentBox);
    cancelBtn.appendTo(popupWindowContentBox);

    okBtn.on('click', function () {
        if (jQuery.isFunction(func)) {
            func();
        }
        removePopupWindow();
    });

    cancelBtn.on('click', function () {
        removePopupWindow();
    });


    if (needAnimate) {
        popupWindowBox.css('top', -10);
        popupWindowBox.animate({
            top: 150
        }, 600, 'easeOutCubic', function () {
            // 鼠标点击除了弹出框本身之外的任何地方,均可退出
            $('div:not(#PopupWindow)').on('click', function () {
                removePopupWindow();
            })
        });
    }


}