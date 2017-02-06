(function($){
    /**
     * 鎷栨嫿
     * @param curTarget
     * @param callback   涓洪紶鏍囨斁涓嬫椂鐨勫洖鎺�
     * self.data('move',true); mousedown 鍜宑lick 涔嬮棿鍐茬獊锛屽埄鐢ㄥ彉閲忓拰璋愭鐜拌薄
     */
    $.fn.drag=function (curTarget,callback) {
        var self = this;
        curTarget = $(curTarget)
        var params = {
            target:curTarget,
            left:0,
            top:0,
            currentX: 0,
            currentY: 0,
            flag: false,
            init:function () {
                //鍒濆浣嶇疆
                params.left = curTarget.offset().left;
                params.top = curTarget.offset().top;
                return this;
            },
            bindEvent:function () {
                // 榧犳爣鎸夐挳琚寜涓�
                curTarget.on('mousedown', function(event){
                    params.flag = true;
                    //闃叉IE鏂囧瓧閫変腑       event = window.event;
                    // bar.onselectstart = function(){
                    //     return false;
                    // }
                    //鍒濆浣嶇疆  榧犳爣鎸変笅鐨勫簵鑷抽〉闈㈢殑璺濈
                    params.currentX  = event.clientX;
                    params.currentY  = event.clientY;
                    self.removeData('move');
                });

                //榧犳爣鎸夐敭琚澗寮€
                $(document).on('mouseup', function(e){
                    if(params.flag){
                        params.flag = false;
                        //绉诲姩鍚庤竟妗嗚窛鑷抽〉闈㈢殑璺濈,鏇存柊浣嶇疆淇℃伅
                        params.left = curTarget.offset().left;
                        params.top = curTarget.offset().top;
                        callback && typeof callback === "function" && callback.call(null,event.clientX-params.currentX,event.clientY-params.currentY);
                        //console.log('mouseup',params.left,params.top)
                    }
                });
                //榧犳爣琚Щ鍔�
                $(document).on('mousemove', function(e){
                    self.data('move',true);
                    //var e = event ? event: window.event;
                    if(params.flag){
                        //console.log('mousemove', e.pageX,e.pageY,params.left,params.top)
                        //榧犳爣涓€瀹氬悗鐨勫潗鏍囩偣  -  榧犳爣鎸変笅鐨勫潗鏍囩偣 =浣嶇Щ
                        var disX = e.pageX - params.currentX,//浣嶇Щ
                            disY = e.pageY - params.currentY;
                        curTarget.css({
                            left:params.left + disX + "px",
                            top:params.top + disY + "px"
                        });
                        //绉诲姩涓簨浠秇ere
                    }


                });
                return  this
            }
        };
        params.init().bindEvent();
        return params;
    }

    /**
     *  婊戝潡瀹炵幇
     * @param options={
            maxValue:1,//鏈€澶у€�
            defaultValue:1,//榛樿鍊�
            direction:'x',//鏂瑰悜   x y all   娌″疄鐜�
            unit:0.1,//鍗曚綅姝ラ暱瀵瑰簲鐨勫疄闄呭€�
            moveCallback:function (pos,utils) {
                $('.slider-range').width(pos*100+'%')
                $('.rightTip').css('display','block');
                $('.rightTip').text(pos)
                player.setVolume(pos);
            },//榧犳爣绉诲姩涓�
            lastCallBack:function (value,utils) {
                $('.slider .rightTip').css('display','none');
            }//榧犳爣鏉惧紑鏄皟鐢�
        }
     * @returns {*}
     */
    $.fn.slider=function (options) {
        //$.extend(defaultOptions, options);//copy鑷砫efaultOptions
        var utils;
        this.each(function() {
            var handleBtn = $(this);
            utils={
                currentValue:null,//绉诲姩姝ラ暱涓暟
                scalePerStep: 20,  //鍗曚綅姝ラ暱瀵瑰簲鍍忕礌
                stepSize:10,//姝ラ暱鐨勬€讳釜鏁�
                clickedOnCursor: false,//鏍囪瘑
                width:0,//婊戝潡鎵€鍦ㄥ鍣ㄥ搴�
                //setVal:null ,//鏍规嵁瀹為檯鍊艰绠楃Щ鍔ㄥ儚绱犳椂鐨勫洖璋冨嚱鏁帮紝涓虹獥鍙esize
                init:function () {
                    this.width=handleBtn.parent().width();
                    //console.log( this.width)
                    this.stepSize = options.maxValue / options.unit;//鏈€澶у€间腑鍖呭惈姝ラ暱鐨勬€讳釜鏁�
                    this.scalePerStep = utils.width / this.stepSize;
                    this.setValue((!!utils.currentValue ? utils.currentValue : options.defaultValue)/options.unit)
                    return this;
                },
                layout:function () {
                    this.width=handleBtn.parent().width();
                    this.scalePerStep = utils.width / this.stepSize;
                    //utils.setVal(utils.currentValue*utils.scalePerStep, utils.setView)
                },
                bindEvent:function () {
                    $(window).on('resize',function (e) {
                        utils.layout();
                    });

                    handleBtn.parent().on('click',function (e) {
                        e.stopPropagation();
                        var curPostion = $(handleBtn).offset().left+ ($(handleBtn).width())*0.5;
                        var posX =e.pageX - curPostion;
                        var left = $(handleBtn).position().left+ ($(handleBtn).width())*0.5;
                        var stepCunt = ( left+posX)/utils.scalePerStep;
                        utils.setValue(stepCunt);
                    });

                    $(document).mouseup(function() {//榧犳爣鎸夐敭琚澗寮€
                        if (utils.clickedOnCursor) {
                            options.lastCallBack && options.lastCallBack.call(this, utils.currentValue * options.unit,utils);
                            utils.clickedOnCursor=false
                        }
                    }).mousemove(function(e) {//榧犳爣琚Щ鍔�
                        e.preventDefault();
                        e.stopPropagation();
                        utils.handle(e);
                    });
                    handleBtn.mousedown(function(e) {// 榧犳爣鎸夐挳琚寜涓�
                        e.preventDefault();
                        e.stopPropagation();
                        utils.clickedOnCursor = true;
                    });
                    handleBtn.click(function (e) {
                        e.stopImmediatePropagation();
                    });
                    return this;
                },
                handle: function(e) {
                    if (utils.clickedOnCursor) {
                        var currentX = $(handleBtn).parent().offset().left;
                        if(e.pageX < currentX){
                            return ;
                        }
                        var pos = [];
                        pos[0] = e.pageX - currentX;
                        //鍦ㄥ搴︿负options.width鍖呭惈stepSize涓闀匡紝绉诲姩pos[0]鐩稿綋浜庡嚑涓闀�
                        var curStep = pos[0] * this.stepSize / utils.width //Math.floor();
                        //鎷栧姩瓒呭嚭鑼冨洿锛屽彇鏈€澶ф闀挎暟
                        this.currentValue = (curStep >= this.stepSize ? this.stepSize: curStep);
                        this.setValue(this.currentValue);
                    }
                },
                /**
                 * 鏍规嵁姝ラ暱绠楃Щ鍔ㄥ儚绱�
                 * @param currentValue  鍏卞灏戜釜姝ラ暱
                 */
                setValue: function(currentValue) {
                    options.moveCallback && options.moveCallback.call(this, currentValue * options.unit,utils);
                    $(handleBtn).css({
                        'left':  (currentValue * utils.scalePerStep)  + 'px'
                    });
                    utils.isCalled = false;
                },

                /**
                 * 鏍规嵁瀹為檯鍊艰绠楃Щ鍔ㄥ儚绱�
                 * @param currentValue N涓闀跨殑璺濈
                 */
                setVal: function(currentValue,setView) {
                    var lefPos = currentValue* this.width/options.maxValue ;
                    //var l2 = (currentValue/options.unit)*this.scalePerStep;// utils.width / this.stepSize
                    $(handleBtn).css({
                        'left':  lefPos + 'px'
                    });
                    utils.setView =setView;
                    utils.setView && utils.setView.call(utils,lefPos);

                }
            }
            utils.init().bindEvent();
        });
        return utils;
    }

})(jQuery)