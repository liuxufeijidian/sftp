var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
$(function() {
	init();
});
function init() {

	var car_obj = {};
	// 这个obj记录用户选择了哪些服务以及服务的数量
	$(".service-group").on("tap", function(e) {
		e.stopPropagation()
		e.preventDefault();
		$(this).parent().find("ul").css({
			"webkitTransform" : "translateX(0px)"
		});
	});
	$('body').on("tap", function(e) {
		$(this).find(".shopping-car ul").css({
			"webkitTransform" : "translateX(2000px)"
		});
	});
	$(".shopping-car ul li").on("tap", function(e) {
		e.stopPropagation();
		e.preventDefault();
	})
	$("article").delegate("h2", "tap", function() {
		var orders = $(".orders");
		var orders_num = parseInt(orders.text());
		var items = $(this).find(">span:first-child").text();
		orders_num++;
		orders.text(orders_num).removeClass("no-display");
		if (car_obj[items]) {
			car_obj[items] += 1;
		} else {
			car_obj[items] = 1;
		}
	});
	$(".submit").on(
			"click",
			function() {
				if (JSON.stringify(car_obj) == null
						|| JSON.stringify(car_obj) == "") {
					alert("请选择美容项目");
					return;
				}
				location.href = "/weixin/pageCarBeautyFill?userId="
						+ $("#userId").val() + "&villeage="
						+ $("#villeage").val() + "&items="
						+ JSON.stringify(car_obj);
			});
}
