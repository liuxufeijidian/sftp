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
		var obj = {};
		obj.villeage = $("input[name='villeage']").val();
		obj.villeageId = $("input[name='villeageId']").val();
		obj.roomNo = $("input[name='roomNo']").val();
		obj.orderType = $("select[name='orderType']").find("option:selected").val();
		obj.mobile = $("input[name='mobile']").val();
		obj.orderRemark = $("textarea[name='orderRemark']").val();
		obj.couponId = $("select[name='couponId']").val();
		obj.userId = $("input[name='userId']").val();
		obj.payPrice = $("input[name='payPrice']").val();
		obj.carType = $("input[name='carType']:checked").val();
		if ($("input[name='mobile']").val() == "") {
			swal("", "联系方式需要填写", "warning");
			return;
		}
		if ($("input[name='roomNo']").val() == "") {
			swal("", "房号需要填写", "warning");
			return;
		}
		$.ajax({
			url : "/weixin/saveCardOrder",
			type : "POST",
			async : false,
			data : {
				cardOrderStr : JSON.stringify(obj)
			},
			success : function(data) {
				if (data != -1) {
					console.log(payPrice.val());
					if (parseInt(Number(payPrice.val())) == 0) {
						swal({
							title : "",
							text : "购买成功",
							type : "success",
							showCancelButton : false,
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "确定",
							cancelButtonText : "取消",
							closeOnConfirm : false,
							closeOnCancel : false
						}, function(isConfirm) {
							if (isConfirm) {
								location.href = "/weixin/pageCardOrderDetail?orderId=" + data.id + "&villeage=" + $("input[name='villeageId']").val();
							}
						});
					} else {
						swal({
							title : "",
							text : "购买成功，请选择支付方式",
							type : "success",
							showCancelButton : true,
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "微信支付",
							cancelButtonText : "现金支付",
							closeOnConfirm : false,
							closeOnCancel : false
						}, function(isConfirm) {
							if (isConfirm) {
								var orderId = data.id;
								var orderNumber = data.orderNumber;
								$.ajax({
									url : "/weixin/updateCardOrder",
									type : "POST",
									async : false,
									data : {
										"orderId" : orderId,
										"orderStatus" : 0 
									},
									success: function(data) {
										$.ajax({
											url : "/weixin/weixinPay",
											type : "POST",
											data : {
												"url" : window.location.href,
												"orderNo" : orderNumber,
												"openId" : $("#openId").val(),
												"orderType" : 3
											},
											success : function(wxData) {
												wx.config({
													appId : wxData.config.appid, // 必填，公众号的唯一标识
													timestamp : wxData.config.timestamp, // 必填，生成签名的时间戳
													nonceStr : wxData.config.noncestr, // 必填，生成签名的随机串
													signature : wxData.config.signature, // 必填，签名，见附录1
													jsApiList : ['chooseWXPay']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
													//debug: true
												});
												wx.ready(function() {
													wx.chooseWXPay({
														timestamp : wxData.finalPackage.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
														nonceStr : wxData.config.noncestr, // 支付签名随机串，不长于 32 位
														package : wxData.finalPackage.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
														signType : 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
														paySign : wxData.finalPackage.paySign, // 支付签名
														success : function(res) {
															location.href = "/weixin/pageCardOrderDetail?orderId=" +orderId+ "&villeage=" + $("input[name='villeageId']").val();
														},
														cancel : function(res) {
															location.href = "/weixin/pageCardOrderDetail?orderId=" +orderId+ "&villeage=" + $("input[name='villeageId']").val();
														}
													});
												});
											},
											error : function(data) {
												console.log(data);
											}
										});
									}
								});
							} else {
								var orderId = data.id;
								$.ajax({
									url : "/weixin/updateCardOrder",
									type : "POST",
									async : false,
									data : {
										"orderId" : orderId,
										"orderStatus" : 1 
									},
									success: function(data) {
										location.href = "/weixin/pageCardOrderDetail?orderId=" + orderId + "&villeage=" + $("input[name='villeageId']").val();;
									}
								});
							}
						});
					}
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});

	});
}
