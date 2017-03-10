window.onload = function () {
    var oWrap = document.getElementById("ad");
    var ads = document.getElementById("ad-show");
    var as = ads.getElementsByTagName("a");
    var order = document.getElementById("order");
    var aSpan = order.getElementsByTagName("span");
    var timer = null;
    var iNow = 0;

    timer = setInterval(move, 5000);

    oWrap.onmouseover = function () {
        clearInterval(timer);
    };
    oWrap.onmouseout = function () {
        timer = setInterval(move, 5000)
    };

    function move() {
        if (iNow == as.length - 1) {
            iNow = 0;
        } else {
            iNow++;
        }
        for (var j = 0; j < aSpan.length; j++) {
            aSpan[j].className = "";
        }
        aSpan[iNow].className = "active";
        startMove(ads, {
            top: -iNow * as[0].offsetHeight
        })
    }


    function startMove(obj, json, fn) {
        clearInterval(obj.iTimer);
        var iCur = 0;
        var iSpeed = 0;

        obj.iTimer = setInterval(function () {

            var iBtn = true;

            for (var attr in json) {

                var iTarget = json[attr];

                if (attr == 'opacity') {
                    iCur = Math.round(css(obj, 'opacity') * 100);
                } else {
                    iCur = parseInt(css(obj, attr));
                }

                iSpeed = ( iTarget - iCur ) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (iCur != iTarget) {
                    iBtn = false;
                    if (attr == 'opacity') {
                        obj.style.opacity = (iCur + iSpeed) / 100;
                        obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    } else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                }

            }

            if (iBtn) {
                clearInterval(obj.iTimer);
                fn && fn.call(obj);
            }

        }, 30);
    }

    function css(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }

    }
};