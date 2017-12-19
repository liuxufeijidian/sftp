var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");

$(function() {
	initMethod();
});

function initMethod() {
	$("#exchange").on("keydown", function(e) {
		if (e.keyCode == 13) {
			$.ajax({
				url : "/weixin/getCoupon",
				type : "POST",
				async : false,
				data : {
					userId : $("#userId").val(),
					couponCode : $("#exchange").val()
				},
				success : function(data) {
					if (data == -4) {
						alert("您已经领过该优惠券了");
					} else if (data == -1) {
						alert("优惠券已全被领取");
					} else if (data == -2) {
						alert("该优惠券已过期");
					} else if (data == -3) {
						alert("没有该优惠券");
					}  else if (data == null) {
						alert("领取失败，请稍后在试");
					} else {
						alert("恭喜您，获得优惠券");
					}
					location.reload();
				},
				error: function(data) {
					alert("系统异常，请稍后在试");
				}
			});
			return false;
		}
	});
}
