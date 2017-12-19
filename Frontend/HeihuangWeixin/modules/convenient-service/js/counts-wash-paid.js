var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
$(function() {
	init();
});
function init() {
	var open_box = $(".open-box"),
		booking = $("#booking");
	$("#wash-record").on("tap", function() {
		open_box.removeClass("no-display");
		//getData();
	});
	function getData(url) {
		$.ajax({
			url : url,
			success : function(data) {
				//把数据append到open-box里的ul里。。。。。。

			}
		});
	}


	open_box.on("tap", function(e) {
		var target = e.target;
		if (e.target.classList.contains('scroll-y')) {

		} else {
			$(this).addClass("no-display").find("ul").empty();
		}
	});
	booking.on("tap", function() {
		location.href = "/weixin/pageCardOrderBook?orderId=" + $("#orderId").val() + "&villeage=" + $("#villeage").val();
	});
}
