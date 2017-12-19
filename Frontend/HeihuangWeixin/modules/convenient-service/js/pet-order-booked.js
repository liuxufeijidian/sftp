var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");

$(function() {
	initMethod();
});

function initMethod() {
	$(".cancel-order").click(function() {
		$.ajax({
			url : "/weixin/cancelPetOrder",
			type : "POST",
			async : false,
			data : {
				orderId : $("#orderId").val()　　　　
			},
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "取消订单成功",
						type : "success",
						showCancelButton : false,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						closeOnConfirm : false,
						closeOnCancel : false
					}, function(isConfirm) {
						if (isConfirm) {
							location.href = "/weixin/pagePetOrderRecord?userId=" + $("#userId").val();
						} 
					});
				} else {
					swal("", "取消订单失败，请稍候再试", "error");
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});
	});
}
