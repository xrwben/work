$(function(){
	$(".but img.imgface").click(function(e){
		$(".face").slideDown();
		e.stopPropagation();
	});
	$(document).click(function(){
		$(".face").slideUp();
	});

	$(".but span.msg_but").click(function(){
		var txt=$(".edit").html();
		if(txt==""){
			$(".edit").focus();
		}else{
			$(".MsgBox").append("<div class='MsgInfo'><dl><dt><img src='images/logo.png' width='50' height='50'/></dt><dd>小人物</dd></dl><div class='Con'>"+txt+"</div></div>");
			$(".edit").html("");
		}
	});
	$(".face ul li").click(function(){
		var img=$(this).find("img").clone();
		$(".edit").append(img);
	});
});
	
	