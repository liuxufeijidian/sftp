var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
$(function() {
	init();
});
function init() {

	$(".service-group").on("tap", function(e) {
		e.stopPropagation()
		e.preventDefault();
		$(this).parent().find("ul").css({
			"webkitTransform" : "translateX(0px)"
		});
	});
	$('body').on("tap", function(e) {
		var target = e.target;
		
			$(this).find(".shopping-car ul").css({
				"webkitTransform" : "translateX(2000px)"
			});
	});
	$(".shopping-car ul li").on("tap",function(e){
		e.stopPropagation();
		e.preventDefault();
	})
}
