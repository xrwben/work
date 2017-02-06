$(document).ready(function(){
	//头部微信二维码显示
	$(".icon_weixin").hover(function(){
		$(".erweima").stop(true).fadeIn();
	},function(){
		$(".erweima").stop(true).fadeOut();
	});

	//头部导航栏显示
	var _index=0;
	$(".header_nav ul li").hover(function(){
		_index=$(this).index();
		$(".nav_content").eq(_index).stop().slideDown("slow");
	},function(){
		$(".nav_content").eq(_index).stop().slideUp(200);
	});
	$(".nav_content").hover(function(){
		$(this).stop();
	},function(){
		$(this).slideUp(200);
	});
	
	//头部导航栏吸顶盒
	var lastScroll=$(window).scrollTop();
	$(document).scroll(function(){
		var nowScroll=$(window).scrollTop();
		if(nowScroll-lastScroll<0){
			$(".hd_down").addClass("fixed_nav");
		}
		else{
			$(".hd_down").removeClass("fixed_nav");
		}
		if(nowScroll==0){
			$(".hd_down").removeClass("fixed_nav");
		}
		lastScroll=nowScroll;
	});

	//banner切换
	var i=0;
	var W=$(".banner ul.banner_con_ul").children().width();
	var timer;
	autoplay();
	$(".banner ul.banner_button li").click(function(){
		i=$(this).index();
		play_banner();
	});
	$(".banner .arrow_next").click(function(){
		if(new Date()-nowTime>500){
			i++;
			play_banner();
			nowTime=new Date();
		}
	});
	$(".banner .arrow_pre").click(function(){
		if(new Date()-nowTime>500){
			i--;
			play_banner();
			nowTime=new Date();
		}
	});
	$(".banner .banner_con").hover(function(){
		clearInterval(timer);
	},function(){
		autoplay();
	});
	function play_banner(){
		$(".banner ul.banner_con_ul").animate({"left":-(i*W)-2000+"px"},500,function(){
			$(".banner ul.banner_button li").eq(i%8).addClass("hover_smallBtn").siblings().removeClass("hover_smallBtn");
			if(i>7){
			i=0;
			$(".banner ul.banner_con_ul").css({"left":-(i*W)-2000+"px"});
			}
			if(i<0){
				i=7;
				$(".banner ul.banner_con_ul").css({"left":-(i*W)-2000+"px"});
			}
		});
	}
	function autoplay(){
		timer=setInterval(function(){
			i++;
			play_banner();
		},5000);
		
	}
	

	//轮播图切换
	//banner_play(".banner ul.banner_button li",".banner .arrow_next",".banner .arrow_pre",".banner .banner_con_ul",".banner .banner_con");
	banner_play(".invogue ul.banner_button li",".invogue .arrow_next",".invogue .arrow_pre",".invogue .banner_con_ul");
	banner_play(".shoes_Bags ul.banner_button li",".shoes_Bags .arrow_next",".shoes_Bags .arrow_pre",".shoes_Bags .banner_con_ul");
	banner_play(".discovery ul.banner_button li",".discovery .arrow_next",".discovery .arrow_pre",".discovery .banner_con_ul");
	banner_play(".fashion ul.banner_button li",".fashion .arrow_next",".fashion .arrow_pre",".fashion .banner_con_ul");
	banner_play(".features ul.banner_button li",".features .arrow_next",".features .arrow_pre",".features .banner_con_ul");
	banner_play(".skincare_beauty ul.banner_button li",".skincare_beauty .arrow_next",".skincare_beauty .arrow_pre",".skincare_beauty .banner_con_ul");
	banner_play(".people_party ul.banner_button li",".people_party .arrow_next",".people_party .arrow_pre",".people_party .banner_con_ul");
	banner_play(".jewelry_watch ul.banner_button li",".jewelry_watch .arrow_next",".jewelry_watch .arrow_pre",".jewelry_watch .banner_con_ul");
	banner_play(".vogue_living ul.banner_button li",".vogue_living .arrow_next",".vogue_living .arrow_pre",".vogue_living .banner_con_ul");
	
	function banner_play(button,next,pre,wrap){

		var i=0;
		var nowTime=new Date();
		var W=$(wrap).children().width();

		$(button).click(function(){
			i=$(this).index();
			play();			
		});
		$(next).click(function(){
			if(new Date()-nowTime>500){
				i++;
				play();
				nowTime=new Date();
			}
		});
		$(pre).click(function(){
			if(new Date()-nowTime>500){
				i--;
				play();
				nowTime=new Date();
			}
		});

		function play(){
			if(i>$(button).length-1){
				$(button).eq(0).addClass("hover_smallBtn").siblings().removeClass("hover_smallBtn");
			}else if(i<0){
				$(button).eq($(button).length-1).addClass("hover_smallBtn").siblings().removeClass("hover_smallBtn");
			}else{
				$(button).eq(i).addClass("hover_smallBtn").siblings().removeClass("hover_smallBtn");
			}

			$(wrap).animate({"left":-(i+1)*W+'px'},500,function(){
				if(i>$(button).length-1){
					i=0;
					$(this).css({"left":-(i+1)*W+'px'});
				}
				if(i<0){
					i=$(button).length-1;
					$(this).css({"left":-(i+1)*W+'px'});
				}
			});
		}
	}


	//时装发布3D轮播切换
	var init_index=0;
	var timer_3D;
	var nowTime=new Date();
	$(".shows_designers .arrow_next").click(function(){
		if(new Date()-nowTime>500){
			move(true);
			nowTime=new Date();
		}
	});
	$(".shows_designers .arrow_pre").click(function(){
		if(new Date()-nowTime>500){
			move(false);
			nowTime=new Date();
		}
	});
	
	$(".shows_designers .banner_con").hover(function(){
		clearInterval(timer_3D);
	},function(){
		autoplay_3D();
		//setInterval(autoplay_3D,5000);
	});
	function move(d){
		var arrW=[],arrH=[],arrT=[],arrL=[],arrO=[],arrZ=[];
		$(".shows_designers ul li").each(function(i){
			arrW[i]=$(this).css("width");
			arrH[i]=$(this).css("height");
			arrT[i]=$(this).css("top");
			arrL[i]=$(this).css("left");
			arrO[i]=$(this).css("opacity");
			arrZ[i]=$(this).css("zIndex");
		});
		$(".shows_designers ul li").each(function(i){
			var index_3d;
			if(d){
				index_3d=i-1;
				if(index_3d<0){index_3d=7;}
			}else{
				index_3d=i+1;
				if(index_3d>7){index_3d=0;}
			}
			$(this).css({"z-index":arrZ[index_3d]});
			$(this).animate({
				width:arrW[index_3d],
				height:arrH[index_3d],
				top:arrT[index_3d],
				left:arrL[index_3d],
				opacity:arrO[index_3d],
			},500);
		});
		if(d){
			init_index++;
			init_index%=8;
		}else{
			init_index--;
			if(init_index<0){init_index=7;}
		}
		$(".shows_designers .bottom_des").html(
			$(".shows_designers ul li").eq(init_index).attr("date-des")	
		);
	}
	function autoplay_3D(){
		timer_3D=setInterval(function(){
			move(true);
		},5000);
	}
	autoplay_3D();
	//timer_3D=setInterval(autoplay_3D,5000);

	//楼梯式导航
	$(".to-content").hover(function(){
		$(".channel").stop(true).fadeIn("slow");
	},function(){
		$(".channel").stop(true).fadeOut("slow");
	});

	$(".channel").hover(function(){
		$(this).stop();
	},function(){
		$(this).fadeOut("slow");
	});
 
	$(".one-channel").click(function(){
		var index_nav=$(this).index()/2;
		var navTop=$(".content-one").eq(index_nav).offset().top;
		//alert(navTop)
		$("html,body").animate({scrollTop:navTop},500);
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	$(document).scroll(function(){
		var dqtop=$(document).scrollTop();
	});
	

	$(".to-top").click(function(){
		$("html,body").animate({scrollTop:"0px"},1000);
	});
});