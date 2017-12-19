var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
$(function() {
	init();
});
function init() {

	var photo_wrapper = $(".photo-wrapper");
	$("#files").on("change", function(evt) {
		var image = new Image();
		image.src = window.URL.createObjectURL(evt.target.files[0]);
		image.onload = function() {
			photo_wrapper.addClass("white-bg").find(".close").removeClass("no-display").end().append(image);
			photo_wrapper.find(".upload").addClass("no-display");
		};
	});
	$(".close").on("tap", function() {
		$(this).addClass("no-display");
		photo_wrapper.removeClass("white-bg").find(".upload").removeClass("no-display").end().find("img").remove();
		photo_wrapper.find("#files").val("");
	});
	$(".star").click(function() {
		var number = $(this).val();
		$(".star").prop("checked", false);
		$(".star").each(function(index) {
			if(index < number) {
				$(this).prop("checked", true);
			}
		});
	});
	$(".submit").click(function() {
		if($("input[name='serviceTime']").val() == '') {
			swal("", "请输入服务时间", "warning");
			return;
		}
		if($("input[name='remark']").val() == '') {
			swal("", "请输入评价", "warning");
			return;
		}
		swal({
			title : "",
			text : "评价成功，谢谢您的支持!",
			type : "success",
			showCancelButton : false,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "",
			closeOnConfirm : false,
			closeOnCancel : false
		}, function(isConfirm) {
			if (isConfirm) {
				var orderType = $("#orderType").val();
				var orderId = $("#orderId").val();
				if(orderType == 1) {
					location.href = "/weixin/pageSingleOrderDetail?orderId=" + orderId;
				} else if(orderType == 2) {
					location.href = "/weixin/pageMonthOrderDetail?orderId=" + orderId;
				} else if(orderType == 3) {
					location.href = "/weixin/pageCardOrderDetail?orderId=" + orderId + "&villeage=" + $("#villeage").val();
				} else if(orderType == 4) {
					location.href = "/weixin/pageCarBeautyDetail?orderId=" + orderId;
				} else if(orderType == 5) {
					location.href = "/weixin/pagePetOrderDetail?orderId=" + orderId;
				}
			}
		});
	});
}
