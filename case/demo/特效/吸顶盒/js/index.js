$(document).ready(function(){
	//广告特效
	$(".close").click(function(){
		$(".advertisement").slideUp();
	})
	function timer(){
		var i=10;
		setInterval(function(){
			i--;
			if(i==0){
				$(".advertisement").slideUp();
				return;
			}
			$(".time span").html(i);
		},1000)
	}
	timer();

	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		var _height = $(".header").height()+$(".advertisement").height();
		if(_top>_height){
			$(".nav_main").addClass("fixedTop");
		}else{
			$(".nav_main").removeClass("fixedTop");
		}
	})
	
	
	$(".nav_main ul li").not(".all").hover(function(){
		var _left = $(this).position().left;
		var _width = $(this).width();
		$(".bg").stop().css("width",_width).show().animate({left:_left},500);
		
	},function(){
		$(".bg").hide();
	})
})