//��������Ч
	var d_value = $(".search input.txt").val();//��ȡtext��ֵ
	//��ý���
	$(".search input.txt").focus(function(){
		if($(this).val()==d_value){
			$(this).val("");
		}
	});
	//ʧȥ����
	$(".search input.txt").blur(function(){
		if($(this).val()==""){
			$(this).val(d_value);
		}
	});

//�������������˵���
	$(".three_left ul li").hover(function(){
		$(this).addClass("hover");
		$(this).find(".menu").show();
	},function(){
		$(this).removeClass("hover");
		$(this).find(".menu").hide();
	});

//ͼƬ�ֲ�
var _index=0;
$("#Pic .pic_button ul li").hover(function(){
	clearInterval(timePlay);//�崦��ʱ������
	$(this).addClass("hover").siblings().removeClass("hover");
	_index = $(this).index();
	$("#Pic .list").eq(_index).fadeIn().siblings("#Pic .list").fadeOut();;
},function(){
	autoPlay();
});
//�����Զ��ֲ�ͼƬ�ĺ���
function autoPlay(){
	//���ö�ʱ��
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
autoPlay();//���ú�ִ��

//��һ����ͼƬ�л���Ч
var _index_2=0;
var timeInterval=null;
$(".PartI_left ul.pic_button li").hover(function(){
	clearInterval(timeInterval);//�崦��ʱ������
	_index_2=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$("ul.pic_txt li").eq(_index_2).show().siblings("ul.pic_txt li").hide();
	$(".PartI_left_pic .pic_list img").eq(_index_2).show().siblings().hide();
},function(){
	autoPlay_2();
});

//�Զ��ֲ�
function autoPlay_2(){
	timeInterval=setInterval(function(){	
		_index_2++;//���кż�1
		if(_index_2==5){
			_index_2=0;
		}
		if(_index_2<=4){ 			
			$(".PartI_left ul.pic_button li").eq(_index_2).addClass("hover").siblings().removeClass("hover");//��ǰli��� class="hover" ����li�Ƴ�
			$(".PartI_left_pic .pic_list img").eq(_index_2).show().siblings().hide();
			$("ul.pic_txt li").eq(_index_2).show().siblings().hide();
			if(_index_2==4){_index_2=-1;}	
		}else{_index_2=-1;}
	},5000);
};
autoPlay_2();

//��һ�����ұ��Ƽ���Ч
var _index_3=0;
$("ul.xptj li").hover(function(){
	_index_3=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".con").eq(_index_3).show().siblings().hide();
});
//��һ����ͼƬ���ֻ���ȥЧ��
$("ul.img_list li").hover(function(){
	$(this).find("p").stop().animate({height:"41px"},200);	
},function(){
	$(this).find("p").stop().animate({height:"0px"},200);
});

//�������ֵ�������Ч
var _index_3=0;
$(".nav ul.nav_country li").hover(function(){
	_index_3=$(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$(".con_pic img").eq(_index_3).show().siblings().hide();
	$(".txt_content").eq(_index_3).show().siblings().hide();
});

//���Ĳ���ǩ֤��Ч
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

//�ײ����
$(window).scroll(function(){
	var Top=$(window).scrollTop();//�����ĸ߶�
	if(Top>1500){
		$("#Bottom_fixedBox").addClass("scrollDisplay");//���������߶ȴ���1000 �ͼ�����ʽ class="scrollDisplay"
	}else{
			$("#Bottom_fixedBox").removeClass("scrollDisplay");
	}
});

//�ײ�������ť
$(".scroll_Top").click(function(){
	$("body,html").animate({
		"scrollTop" : "0"
	})
});

//�Ҳ�����QQ��ѯ
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