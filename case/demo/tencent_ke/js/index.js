
$(document).ready(function(){
	var mark = false;
	$(".mainPage .header a").click(function(){
		if(mark==false){
			$(".mainPage").animate({left:"60%"},500);
			mark = true;
		}else{
			$(".mainPage").animate({left:"0"},500);
			mark = false;
		}
	});
	
	var _index = 0;
	$(".video_con ul li").click(function(){
		_index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".con_tabs .tab").eq(_index).show().siblings().hide();
	})
});