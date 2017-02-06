$(document).ready(function(){
	//导航栏
	var navTop = $(document).scrollTop();
	if(navTop > 20){
		$(".navbar").addClass("fixedTop");
	}
	$(document).scroll(function(){
		var navTop = $(document).scrollTop();
		//console.log(navTop);
		if(navTop > 20){
			$(".navbar").addClass("fixedTop");
		}else{
			$(".navbar").removeClass("fixedTop");
		}
		if(navTop > $(".header").height()){
			$(".top").css({"display":"block"},500);
		}else{
			$(".top").css({"display":"none"},500);
		}
	});
	//懒加载

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
})