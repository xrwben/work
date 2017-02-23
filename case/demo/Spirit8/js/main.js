$(document).ready(function(){
	
	$("body").scrollspy({
		target : "#ScrollListener"
	});
	
	$(window).scroll(function(){
		var topHeight = $("#header_nav").offset().top;
		if(topHeight > 500){
			$("#header_nav").addClass("on");
		}else{
			$("#header_nav").removeClass("on");
		}
	});
	
	$("#ScrollListener ul li a").click(function(e){
		var toTop = $($(this).attr("href")).offset().top;
		$("body,html").animate({
			scrollTop : toTop
		},900);
		e.preventDefault();
	});
	
})

$(".team_content.section_content").owlCarousel({
	navigation : false,
	slideSpeed : 300,
	paginationSpeed : 400,
	autoHeight : true,
	itemsCustom : [
		[0, 1],
        [450, 2],
        [600, 2],
        [700, 2],
        [1000, 4],
        [1200, 4],
        [1400, 4],
        [1600, 4]
	]
});

$(".clients_content.section_content").owlCarousel({
	navigation : false,
	slideSpeed : 300,
	paginationSpeed : 400,
	autoHeight : true,
	itemsCustom : [
		[0, 1],
        [450, 2],
        [600, 2],
        [700, 2],
        [1000, 4],
        [1200, 5],
        [1400, 5],
        [1600, 5]
	]
});

$(".testimonial_content.section_content").owlCarousel({
	navigation : false,
	slideSpeed : 300,
	paginationSpeed : 400,
	singleItem:true
});

$("#Portfolio .catagories-list li a").click(function(e){
	$(this).addClass("active").parent().siblings().children().removeClass("active");
	var selector = $($(this).attr("data-filter"));
	$(".portfolio_content").isotope({
		filter: selector,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
	})
	e.preventDefault();
})
