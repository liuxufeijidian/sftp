var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
$(function() {
	init();
});
function init() {

	var car_obj = {
		"轿车" : ["258", "418", "228"],
		"SUV" : ["298", "488", "268"]
	};
	var total = $(".total"),
	    car_list_wrapper = $(".car-list"),
	    car_num = 0,
	    counts_wash_type = $("select[name='orderType']"),
	    coupon = $("select[name='couponId']"),
	    payPrice = $("input[name='payPrice']"),
	    carType = $("input[name='carType']");
	priceCount();
	car_list_wrapper.delegate(".car-wrapper", "click", function() {
		priceCount();
	});
	coupon.on("change", function() {
		priceCount();
	});
	counts_wash_type.on("change", function() {
		priceCount();
	});
	carType.on("change", function() {
		priceCount();
	});
	function priceCount() {
		var car_type_val = $("input[name='carType']:checked").val() == 0 ? '轿车' : 'SUV';
		var coupon_val = coupon.find("option:selected").attr("couponVal");
		var counts_wash_type_val = counts_wash_type.val();
		var coupon_type = coupon.find("option:selected").attr("couponType");
		var price = parseFloat(car_obj[car_type_val][counts_wash_type_val]);
		var coupon_price;
		if (coupon_val != null) {
			total.wrap("<strike></strike>");
			if(coupon_type == 0) {
				coupon_price = price - parseFloat(coupon_val);
				if(coupon_price < 0) {
					coupon_price = 0;
				}
			} else {
				coupon_price = price * parseFloat(coupon_val);
			}
			total.text(price.toFixed(2));
			total.parents('.align-right').find(".coupon-price").remove();
			total.parents('.align-right').append("<span class='coupon-price block'>" + coupon_price.toFixed(2) + "</span>");
		} else if (coupon_val == "1") {
			total.parents('.align-right').find(".coupon-price").remove();
			var total_parent = total.parent();
			if (total_parent[0].nodeName == "STRIKE")
				total.unwrap();
			total.text(price.toFixed(2));
		} else {
			total.text(price.toFixed(2));
		}
		if (coupon_price || coupon_price == 0) {
			payPrice.val(coupon_price.toFixed(2));
		} else {
			payPrice.val(price);
		}
	}


	$('.submit').on("click", function() {
		var villeage = $("input[name='villeage']").val();
		var plate = $("input[name='plate']").val();
		var roomNo = $("input[name='roomNo']").val();
		var mobile = $("input[name='mobile']").val();
		var orderRemark = $("textarea[name='orderRemark']").val();
		var carGarage = $("select[name='carGarage']").find("option:selected").val();
		var carPosition = $("input[name='carPosition']").val();
		if ($("input[name='mobile']").val() == "") {
			swal("", "联系方式需要填写", "warning");
			return;
		}
		if ($("input[name='roomNo']").val() == "") {
			swal("", "房号需要填写", "warning");
			return;
		}
		if ($("input[name='plate']").val() == "") {
			swal("", "车牌号号需要填写", "warning");
			return;
		}
		if ($("input[name='carGarage']").val() == "") {
			swal("", "车库需要填写", "warning");
			return;
		}
		if ($("input[name='carPosition']").val() == "") {
			swal("", "车位需要填写", "warning");
			return;
		}
		$.ajax({
			url : "/weixin/saveCardActivity",
			type : "POST",
			async : false,
			data: $(".order-fill").serialize(),
			success : function(data) {
				if (data != -1) {
					if (true) {
						swal({
							title : "",
							text : "下单成功",
							type : "success",
							showCancelButton : false,
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "确定",
							cancelButtonText : "取消",
							closeOnConfirm : false,
							closeOnCancel : false
						}, function(isConfirm) {
							if (isConfirm) {
								location.href ="/weixin/showCardActivity";
							}
						});
					} 
					
					
				}else{
					alert("尊敬的用户你已经使用了本次优惠，如需再次使用请下单");
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});

	});
}
