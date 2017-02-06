$(document).ready(function(){
	//广告特效
	$(".close").click(function(){
		$(".advertisement").slideUp();
	})
	
	//轮播图
	var _index=0;
	var nowTime=new Date();
	var W=$(".move ul.move_img li").width();
	$(".move ul.button li").hover(function(){
		_index=$(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".move ul.move_img").stop().animate({"left":-W*(_index+1)+"px"});
	});
	$(".next").click(function(){
		if(new Date()-nowTime>500){
			_index++;
			$(".move ul.button li").eq(_index%6).addClass("hover").siblings().removeClass("hover");
			$(".move ul.move_img").animate({"left":-W*(_index+1)+"px"},500,function(){
				if(_index>5){
					_index=0;
					$(".move ul.move_img").css({"left":"-820px"});
				}
			});
			nowTime=new Date();
		}
	});
	$(".pre").click(function(){
		if(new Date()-nowTime>500){
			_index--;
			$(".move ul.button li").eq(_index%6).addClass("hover").siblings().removeClass("hover");
			$(".move ul.move_img").animate({"left":-W*(_index+1)+"px"},500,function(){
				if(_index<0){
					_index=5;
					$(".move ul.move_img").css({"left":-W*(_index+1)+"px"});
				}
			});
			nowTime=new Date();
		}
	});
	$(".move").hover(function(){
		clearInterval(timer);
	},function(){
		autoPlay();
	})
	//自动轮播
	function autoPlay(){
		timer=setInterval(function(){
			_index++;
			$(".move ul.button li").eq(_index%6).addClass("hover").siblings().removeClass("hover");
			$(".move ul.move_img").animate({"left":-W*(_index+1)+"px"},500,function(){
				if(_index>5){
					_index=0;
					$(".move ul.move_img").css({"left":"-820px"});
				}
			});
		},5000);
	}
	autoPlay();
})