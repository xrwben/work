$(document).ready(function(){
	//导航栏
	var navTop = $(document).scrollTop();
	if(navTop > 30){
		//console.log("大于20");
		$("#HeaderNav").addClass("fixedTop");
	}
	$(document).scroll(function(){
		var navTop = $(document).scrollTop();
		//console.log(navTop);
		if(navTop > 30){
			$("#HeaderNav").addClass("fixedTop");
		}else{
			$("#HeaderNav").removeClass("fixedTop");
		}
		if(navTop > $(".header").height()){
			$(".top").css({"display":"block"},500);
		}else{
			$(".top").css({"display":"none"},500);
		}
	});

	//锚点下滑
	/*
	$(".nav_con li a").click(function(){
		var target = $($(this).attr("href")).offset().top;
		$("html,body").animate({"scrollTop":target},1000);
		return false;
	})
	
	//点击首页向下按钮
	$(".arrow_down").click(function(){
		var headerHeight = $(".header").height(); 
		$("html,body").animate({"scrollTop":headerHeight},800);
	});*/
	//回到顶部
	$(".top i").click(function(){
		$("html,body").animate({"scrollTop":"0"},1000);
	})
	
	
	//响应式圆环插件
	var colors = [
		['#D3B6C6', '#4B253A'], 
		['#FCE6A4', '#EFB917'],
		['#BEE3F7', '#45AEEA'],
		['#F8F9B6', '#D2D558'],
		['#F4BCBF', '#D43A43']
	]; 
	var circles = [];
	for (var i = 1; i <= 4; i++) {
		var child = document.getElementById('circle_svg' + i);
		var percentage = 50 + (i * 10);

		circles.push(Circles.create({
			id: child.id,
			value: percentage,
			radius: 110,
			width: 12,
			colors: colors[i - 1],
			text : percentage + "%"

		}));
	}
})