var player = (function(){


    function Player() {}

    /**
     * 
     * @param opts{
     * media  濯掍綋鎾斁鍏冪礌
     *  0 = NETWORK_EMPTY - 闊抽/瑙嗛灏氭湭鍒濆鍖�
        1 = NETWORK_IDLE - 闊抽/瑙嗛鏄椿鍔ㄧ殑涓斿凡閫夊彇璧勬簮锛屼絾骞舵湭浣跨敤缃戠粶
        2 = NETWORK_LOADING - 娴忚鍣ㄦ鍦ㄤ笅杞芥暟鎹�
        3 = NETWORK_NO_SOURCE - 鏈壘鍒伴煶棰�/瑙嗛鏉ユ簮
     *
     *
     * loop  寰幆鎾斁
     * }
     */
    Player.prototype.init = function(opts){
        this.switch=opts.switch//
        this.media = opts.media;
        this.loop=opts.loop;
        this.bindEvent(this.media);
        this.lyricURL = opts.lyricURL;
        this.lyricCT = opts.lyricCT;
        this.progressBar=opts.progressBar;
        this.volumeBar=opts.volumeBar;


        //闊抽噺婊戝潡
        this.volume = this.volumeBar.slider({
            maxValue:1,//鏈€澶у€�
            defaultValue:0.8,//榛樿鍊�
            direction:'x',//鏂瑰悜   x y all
            unit:0.1,//鍗曚綅姝ラ暱
            moveCallback:function (pos,utils) {
                $('.slider-range').width(pos*100+'%')
                //console.log(pos)
                player.setVolume(pos);
            }
        });

        //棰戦亾
        $.ajax({url:'http://api.jirengu.com/fm/getChannels.php', type:'get',
            success:function(data){
                $.each(JSON.parse(data).channels,function (i,e) {
                    $('.channel>ul').append('<li data-id='+ e.channel_id +'>'+ e.name+'<span class="bg"></span></li>')
                });
            },
            error:function(e){if(e)console.log('error',e);}
        });
        return this;
    }


    Player.prototype.bindEvent=function(media) {
        $('.music-ct').mousedown(function(e) {e.stopPropagation();})

        var self = this;
        //寮€鍏冲垏鎹�
        self.switch.on('click',function (e) {
            self.switch.hasClass('play') ? self.pause() : self.start();
        });

        //鍗曟洸寰幆 TODO
        //hide or show
        $('.music').on('click',function (e) {
            e.stopImmediatePropagation();
            var isMove = $(this).data('move');
            //鍒╃敤move鍜岃皭mousedown 鍜� click涔嬮棿鐨勫啿绐�
            if(isMove){
                $(this).removeData('move');
                return;
            }
            var target = $('.music-ct');
            target.toggleClass('cur');
            //target.hasClass('cur') ? target.addClass('display') : target.removeClass('display')
        });
        
        //FM鐨勬樉绀哄拰闅愯棌
        $('.open,.close').on('click',function (e) {
            $('.channel').toggleClass('active4channel')
            var info= localStorage.getItem('info');
            info = info && JSON.parse(info)
            if( info  && info.channelID){
               var text=  $('.channel>ul>li[data-id='+info.channelID+']').text()//.css({left:0})
                console.log(text)
                $('.channel>ul>li[data-id='+info.channelID+']').addClass('view').siblings().removeClass('view')
            }
        });
        //棰戦亾鐐瑰嚮
        $('.channel>ul').on('click','li',function (e) {
            $('.channel').toggleClass('active4channel')
            var channelID = $(e.target).attr('data-id');
            console.log(channelID)
            localStorage.setItem('info',JSON.stringify({channelID:channelID}));
            self.pause().setURL('http://api.jirengu.com/fm/getSong.php?channel='+channelID);//.start();
        });

        /**
         * 涓嬩竴鏇�
         */
        $('.next').on('click',function (e) {
            e.stopImmediatePropagation();
            self.next();
        });

        $('.display-Lyric').on('click',function (e) {
            e.stopPropagation();
            var $target = $(this).find('i'),$musicLyric=$('.music-lyric');
            $target.toggleClass('fa-toggle-on').toggleClass('fa-toggle-off')
            $target.hasClass('fa-toggle-off') ? $musicLyric.addClass('transparent').removeClass('opaque') : $musicLyric.addClass('opaque').removeClass('transparent');
        });
        $(self.media).on('timeupdate',function () {
            //闊充箰褰撳墠浣嶇疆
            var curr = Math.floor(media.currentTime);
            //闊充箰闀垮害
            var dur = Math.floor(media.duration);
            if(self.media.networkState!=3){
                $(".duration").text(formatTime(dur));
                $(".currentTime").text(formatTime(curr));
            }
            //console.log('timeupdate',self.media.networkState)
            //杩涘害鏉′綅缃�
            self.progress && self.progress.setVal(curr,function (pos) {
                $('.progress-range').width(pos)
            });
            
            rollLyric(self,curr);
            
        });
        //鎴愬姛鑾峰彇璧勬簮闀垮害, init
        $(self.media).on('loadedmetadata',function () {
            //console.log('loadedmetadata',self.media.networkState)
            //椤甸潰婊戝潡鍒濆鍖�--鎾斁杩涘害鏉�
            self.progress =self.progressBar.slider({
                maxValue:self.media.duration,//鏈€澶у€�
                defaultValue:0,//榛樿鍊�
                direction:'x',//鏂瑰悜   x y all  TODO
                unit:1,
                moveCallback:function (step,utils) {
                    $('.progress-range').width(step*utils.scalePerStep)
                    self.media.currentTime=step;
                }
            });

        });

        //鎾斁缁撴潫
        $(self.media).on('ended',function () {
               console.log('ended',self.loop);
               if(self.loop){
                   self.media.loop=self.loop;
                   self.start()
               } else{
                   self.next();
               }
        });
        //play浜嬩欢浼氳鏆傚仠鍚庣殑play鏂规硶浠庡ご鎾斁
        //    $(self.media).on('play',function () {
        //
        // });
    }
    //
    Player.prototype.setURL=function (url) {
        var self =this;
        var info= localStorage.getItem('info');
        info = info && JSON.parse(info)
        var  channelID='0'
        if( info  && info.channelID){
            channelID=info.channelID
        }
        $.ajax({url: 'http://api.jirengu.com/fm/getSong.php',type: 'get',
            data:{
                'app_name':'radio_android',
                'version':100,
                'channel':channelID,
                'type':'n'
            },
            success: function (data) {
                data= JSON.parse(data).song[0];
                $('.music-ct').css('background-image','url('+data.picture+')');
                $('.music-title').text(data.title)
                $('.singer').text(data.artist);
                $(self.media).attr('src',data.url);
                self.lyricURL='http://api.jirengu.com/fm/getLyric.php?sid='+data.sid+'&ssid='+data.ssid;
                //console.log('setURL',self.media.networkState)
                //if(self.media.networkState!=3){
                    $.post('http://api.jirengu.com/fm/getLyric.php',{ssid: data.ssid, sid:data.sid}).done(function(lyc){
                        if(lyc){
                            lyc = JSON.parse(lyc)
                            self.lyricContent=parseLyric(lyc.lyric);
                            //鍒濆鍖栨瓕璇�
                            //console.log('鍒濆鍖栨瓕璇�',self.lyricContent)
                            if(self.lyricContent){
                                renderLRC(self.lyricCT , self.lyricContent);
                            }
                        }else{
                            //TODO
                        }
                    });
                //}
                self.start();
            }
        });

        return  this;
    }

    Player.prototype.setVolume=function (volume) {
        this.media.volume=  1> volume >0 ?  volume :1;
    }

    Player.prototype.next=function () {
        var info= localStorage.getItem('info');
        info = info && JSON.parse(info)
        var url ='http://api.jirengu.com/fm/getSong.php';
        if( info  && info.channelID){
            url+=('?channel='+info.channelID);
        }
        $(this.lyricCT).empty();
        this.lyricContent=null;
        this.pause().setURL(url);
    }




    Player.prototype.setModel=function (model) {
        this.media.loop=this.loop;
        return this;
    }

    Player.prototype.start=function () {
        this.media.play();
        $(this.switch).removeClass('pause').removeClass('fa-pause-circle').addClass('play').addClass('fa-play-circle')
        return this;
    }

    Player.prototype.pause=function () {
        this.media.pause();
        $(this.switch).removeClass('play').removeClass('fa-play-circle').addClass('pause').addClass('fa-pause-circle')
        return this;
    }

    Player.prototype.getMedia=function () {
        return this.media;
    }



    


    function renderLRC($ele,lrc){
        $ele.empty();
        var lis=""; //TODO  lis 娌℃湁琚垵濮嬪寲锛屾墍浠ョ涓€娆″惊鐜細寰楀埌undefined
        for( var line in lrc ){
            lis+= '<li>'+lrc[line].text+'</li>';
        }
        $ele.append(lis);
    }
    
    function  rollLyric(self,cur) {
        var lyric =self.lyricContent;//姝岃瘝
        if(lyric){
            var ct4Lyric =  self.lyricCT;//瀹瑰櫒
            var content = lyric[cur];//褰撳墠鎾斁鐨勮
            var liH = ct4Lyric.find('li').eq(1).outerHeight();
            var top = liH;
            if(content){
                ct4Lyric.find('li').eq(content.lineNum).addClass('active').siblings().removeClass('active');
                ct4Lyric.css({'top':( 0-content.lineNum*liH)+'px'});
            }
        }
    }
    
    //闊充箰璁℃椂鏍煎紡
    function formatTime(time){
        var h=0,i=0,s=parseInt(time);
        if(s>60){
            i=parseInt(s/60);
            s=parseInt(s%60);
            if(i > 60) {
                h=parseInt(i/60);
                i = parseInt(i%60);
            }
        }
        var zero=function(v){
            return (v>>0)<10?"0"+v:v;
        };
        //return (zero(h)+":"+zero(i)+":"+zero(s));
        return (zero(i)+":"+zero(s));
    }

    /**
     * @param lrc 姝岃瘝
     * @returns {0: "浣犵殑姣忎竴娆″懠鍚� - 姘存湪骞村崕", 4: "(鐢靛奖銆婃€掓斁銆嬫彃鏇�)"......}
     */
    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        var x=0;
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /^\[.*?\]/g;///\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            var clause = lyric.replace(timeReg,'');
            if(!timeRegExpArr ||  !clause)continue;
            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                !!clause && (lrcObj[time] = {text:clause,lineNum:x++});
              // console.log(time,lrcObj[time].text,lrcObj[time].lineNum)
            }
        }

        return lrcObj;
    }

    var instance;

    if (!instance) {
        instance = new Player();
    }
    return instance;
}());