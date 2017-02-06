$(document).ready(function(){
	//����������������
	$(document).scroll(function(){
		var _height = $(window).scrollTop();
		if(_height>680){
			$(".topNav").css({"display":"block"})
		}else{
			$(".topNav").css({"display":"none"})	
		}
	});

	//��������򽹵��¼�
	Search(".topNav .right_search input");
	Search(".header .search_txt");
	function Search(search_input){
		var search_value = $(search_input).val();
		$(search_input).focus(function(){
			if($(search_input).val()==search_value){
				$(search_input).val("");
			}
		});
		$(search_input).blur(function(){
			if($(search_input).val()==""){
				$(search_input).val(search_value);
			}
		});
	}
	
	//���ֲ�ͼ����
	var _index=0;
	$(".big_carousel ul.big_pic li").eq(_index).fadeIn().siblings().fadeOut();
	$(".main_bar ul.button_list li").hover(function(){
		_index=$(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".big_carousel ul.big_pic li").eq(_index).fadeIn().siblings().fadeOut();
	})
	$(".button_right").click(function(){
		_index++;
		$(".main_bar ul.button_list li").eq(_index%8).addClass("on").siblings().removeClass("on");
		$(".big_carousel ul.big_pic li").eq(_index%8).fadeIn().siblings().fadeOut();
		$(".small_carousel .small_wrapper ul").eq(_index%5).fadeIn().siblings().fadeOut();
	})
	$(".button_left").click(function(){
		_index--;
		$(".main_bar ul.button_list li").eq(_index%8).addClass("on").siblings().removeClass("on");
		$(".big_carousel ul.big_pic li").eq(_index%8).fadeIn().siblings().fadeOut();
		$(".small_carousel .small_wrapper ul").eq(_index%5).fadeIn().siblings().fadeOut();
	})
	//�Զ��ֲ�
	function autoPlay(){
		timer=setInterval(function(){
			_index++;
			$(".main_bar ul.button_list li").eq(_index%8).addClass("on").siblings().removeClass("on");
			$(".big_carousel ul.big_pic li").eq(_index%8).fadeIn().siblings().fadeOut();
			$(".small_carousel .small_wrapper ul").eq(_index%5).fadeIn().siblings().fadeOut();
		},5000);
	}
	autoPlay();
	$(".carousel").hover(function(){
		clearInterval(timer);
	},function(){
		autoPlay();
	})

	//�ֲ�ͼ
	Tab(".sideTwo ul.side_title li",".sideTwo .info_notice .tab","hover");
	Tab(".sideThree ul.side_title li",".sideThree .tabs .tab","hover");
	Tab(".floor_today .con_left .con_title ul li",".floor_today .con_left .taday_tabs .tab","todayHover");
	Tab(".floor_today .con_right .con_title ul li",".floor_today .con_right .taday_tabs .tab","todayHover");
	//ͼ�顤ͯ�顤������
	Tab(".floor_book ul.title_ul li",".floor_book .nav_con .nav_tab","navHover");
	//Ůװ����������
	Tab(".floor_women ul.title_ul li",".floor_women .nav_con .nav_tab","navHover");
	//��װ���ֱ��۾�
	Tab(".floor_man ul.title_ul li",".floor_man .nav_con .nav_tab","navHover");
	//Ьѥ�����
	Tab(".floor_shoesBag ul.title_ul li",".floor_shoesBag .nav_con .nav_tab","navHover");
	//�˶����⡤��е
	Tab(".floor_sports ul.title_ul li",".floor_sports .nav_con .nav_tab","navHover");
	//ͯװ��ͯЬ������ר��
	Tab(".floor_pregnant ul.title_ul li",".floor_pregnant .nav_con .nav_tab","navHover");
	//ĸӤ����ߡ�ͯ��
	Tab(".floor_MyWjTs ul.title_ul li",".floor_MyWjTs .nav_con .nav_tab","navHover");
	//��ױ���鱦
	Tab(".floor_mZzB ul.title_ul li",".floor_mZzB .nav_con .nav_tab","navHover");
	//ʳƷ
	Tab(".floor_food ul.title_ul li",".floor_food .nav_con .nav_tab","navHover");
	//������
	Tab(".floor_family ul.title_ul li",".floor_family .nav_con .nav_tab","navHover");
	//���롤�ҵ�
	Tab(".floor_digital ul.title_ul li",".floor_digital .nav_con .nav_tab","navHover");
	//�ƹ���Ʒ
	Tab(".floor_extend .con_left .con_title ul li",".floor_extend .con_left .taday_tabs .tab","todayHover");
	function Tab(sideTitle,sideTab,hover){
		$(sideTab).eq(_index).show().siblings().hide();
		$(sideTitle).hover(function(){
			_index=$(this).index();
			//console.log(_index);
			$(this).addClass(hover).siblings().removeClass(hover);
			$(sideTab).eq(_index).show().siblings().hide();
		})
	}

	//��ƷС�ֲ�
	function S_banner(button,wrap,pre,next){
		
	}
	var $index=0;
	var nowTime=new Date();
	var W=$(".floor_book .pic_list").children().width();
	$(".floor_book .carousel_btns li").click(function(){
		$index=$(this).index();
		small_play();
	})
	$(".btn_r").click(function(){
		if(new Date()-nowTime>500){
			$index++;
			small_play();
			nowTime=new Date();
		}
	})
	$(".btn_l").click(function(){
		if(new Date()-nowTime>500){
			$index--;
			small_play();
			nowTime=new Date();
		}
	})
	function small_play(){
		if($index>$(".floor_book .tab1 .carousel_btns li").length-1){
			$(".floor_book .tab1 .carousel_btns li").eq(0).addClass("curr").siblings().removeClass("curr");
		}else if($index<0){
			$(".floor_book .tab1 .carousel_btns li").eq($(".floor_book .tab .carousel_btns li").length-1).addClass("curr").siblings().removeClass("curr");
		}else{
			$(".floor_book .tab1 .carousel_btns li").eq($index).addClass("curr").siblings().removeClass("curr");
		}
		$(".floor_book .tab1 .pic_list").animate({"left":-W*($index+1)+"px"},500,function(){
			if($index>$(".floor_book .tab1 .carousel_btns li").length-1){
				$index=0;
				$(this).css({"left":-W*($index+1)+"px"});
			}
			if($index<0){
				$index=$(".floor_book .tab1 .carousel_btns li").length-1;
				$(this).css({"left":-W*($index+1)+"px"});
			}
		});
	}
})