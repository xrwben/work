//搜索框特效
	var d_value = $(".search input.txt").val();//获取text的值
	//获得焦点
	$(".search input.txt").focus(function(){
		if($(this).val()==d_value){
			$(this).val("");
		}
	});
	//失去焦点
	$(".search input.txt").blur(function(){
		if($(this).val()==""){
			$(this).val(d_value);
		}
	});

//顶部导航二级菜单栏
	$(".three_left ul li").hover(function(){
		$(this).addClass("hover");
		$(this).find(".menu").show();
	},function(){
		$(this).removeClass("hover");
		$(this).find(".menu").hide();
	});

//图片轮播
var _index=0;
$("#Pic .pic_button ul li").hover(function(){
	clearInterval(timePlay);//清处定时播放器
	$(this).addClass("hover").siblings().removeClass("hover");
	_index = $(this).index();
	$("#Pic .list").eq(_index).fadeIn().siblings("#Pic .list").fadeOut();;
},function(){
	autoPlay();
});
//构建自动轮播图片的函数
function autoPlay(){
	//设置定时器
	timePlay=setInterval(function(){
		_index++;
		if(_index<4){
			if(_index==3){
				_index=-1;
			} 
			$("#Pic .pic_button ul li").eq(_index).addClass("hover").siblings().removeClass("hover");
			$("#Pic .list").eq(_index).fadeIn().siblings("#Pic .list").fadeOut();
		}else{_index=-1;}
	},5000);	
};
autoPlay();//调用和执行

//第一部分图片切换特效
var _index_2=0;
var timeInterval=null;
$(".PartI_left ul.pic_button li").hover(function(){
	clearInterval(timeInterval);//清处定时播放器
	_index_2=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$("ul.pic_txt li").eq(_index_2).show().siblings("ul.pic_txt li").hide();
	$(".PartI_left_pic .pic_list img").eq(_index_2).show().siblings().hide();
},function(){
	autoPlay_2();
});

//自动轮播
function autoPlay_2(){
	timeInterval=setInterval(function(){	
		_index_2++;//序列号加1
		if(_index_2==5){
			_index_2=0;
		}
		if(_index_2<=4){ 			
			$(".PartI_left ul.pic_button li").eq(_index_2).addClass("hover").siblings().removeClass("hover");//当前li添加 class="hover" 其它li移除
			$(".PartI_left_pic .pic_list img").eq(_index_2).show().siblings().hide();
			$("ul.pic_txt li").eq(_index_2).show().siblings().hide();
			if(_index_2==4){_index_2=-1;}	
		}else{_index_2=-1;}
	},5000);
};
autoPlay_2();

//第一部分右边推荐特效
var _index_3=0;
$("ul.xptj li").hover(function(){
	_index_3=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".con").eq(_index_3).show().siblings().hide();
});
//第一部分图片文字滑上去效果
$("ul.img_list li").hover(function(){
	$(this).find("p").stop().animate({height:"41px"},200);	
},function(){
	$(this).find("p").stop().animate({height:"0px"},200);
});

//第三部分导航栏特效
var _index_3=0;
$(".nav ul.nav_country li").hover(function(){
	_index_3=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".con_pic img").eq(_index_3).show().siblings().hide();
	$(".txt_content").eq(_index_3).show().siblings().hide();
});

//第四部分签证特效
var _index_4 = 0;
$("#Part_IV ul.part4_top li").hover(function(){
	_index_4=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".con_4").eq(_index_4).show().siblings().hide();
});
$(".box_con").hover(function(){
	$(this).find("span").animate({
		"top":"0px"
	},200);
},function(){
	$(this).find("span").animate({
		"top":"-100%"
	},200);
})

//底部广告
$(window).scroll(function(){
	var Top=$(window).scrollTop();//滚动的高度
	if(Top>1500){
		$("#Bottom_fixedBox").addClass("scrollDisplay");//当他滚动高度大于1000 就加上样式 class="scrollDisplay"
	}else{
			$("#Bottom_fixedBox").removeClass("scrollDisplay");
	}
});

//底部到顶按钮
$(".scroll_Top").click(function(){
	$("body,html").animate({
		"scrollTop" : "0"
	})
});

//右侧悬浮QQ咨询
$(".close").click(function(){
	$(".qq_show").animate({"right":"-158px"},500,function(){
		$(".yc").animate({"left":"125px"},500);
	});
});
$(".yc").click(function(){
	$(".yc").animate({left:"158px"},500,function(){
		$(".qq_show").animate({right:"0px"},500);
	});
});