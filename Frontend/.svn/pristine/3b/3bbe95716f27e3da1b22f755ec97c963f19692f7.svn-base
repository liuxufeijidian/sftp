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
		var villeage = $("select[name='villeage']").find("option:selected").val();
		var plate = $("input[name='plate']").val();
		var roomNo = $("input[name='roomNo']").val();
		var mobile = $("input[name='mobile']").val();
		var orderRemark = $("textarea[name='orderRemark']").val();
		var carGarage = $("input[name='carGarage']").val();
		var carPosition = $("input[name='carPosition']").val();
		var serverTime=$("input[name='serverTime']").val();
		var endServiceTime=$("input[name='endServiceTime']").val();
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
		if ($("input[name='serverTime']").val() == "") {
			swal("", "请选择节前服务时间", "warning");
			return;
		} else {
			var inputDate = new Date($("input[name='serverTime']").val());
			var nowDate = new Date();
			var hour = nowDate.getHours();
			if(hour > 17) {
				if (inputDate < nowDate) {
					swal("", "温馨提示：五点后只能选择明天的时间服务", "warning");
					return;
				}
			}
		}
		if ($("input[name='endServiceTime']").val() == "") {
			swal("", "请选择节后服务时间", "warning");
			return;
		} 
		$.ajax({
			url : "/weixin/saveGuoQingActivity",
			type : "POST",
			async : false,
			data: $(".order-fill").serialize(),
			success : function(data) {
				if (data.id != null) {
					$("#id").val(data.id);
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
												$.ajax({
													url : "/weixin/weixinPay",
													type : "POST",
													data : {
														"url" : window.location.href,
														"orderNo" : $("#id").val(),
														"openId" : $("#openId").val(),
														"orderType" : 6
													},
													success : function(wxData) {
														wx.config({
															appId : wxData.config.appid, // 必填，公众号的唯一标识
															timestamp : wxData.config.timestamp, // 必填，生成签名的时间戳
															nonceStr : wxData.config.noncestr, // 必填，生成签名的随机串
															signature : wxData.config.signature, // 必填，签名，见附录1
															jsApiList : ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录
														});
														wx.ready(function() {
															wx.chooseWXPay({
																timestamp : wxData.finalPackage.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
																nonceStr : wxData.config.noncestr, // 支付签名随机串，不长于 32 位
																package : wxData.finalPackage.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
																signType : 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
																paySign : wxData.finalPackage.paySign, // 支付签名
																success : function(res) {
																	location.href = "/weixin/showCardGuoQingActivity?orderStatus=2";
																},
																cancel : function(res) {
																	//location.href = "/weixin/activityShow";
																}
															});
														});
													},
													error : function(data) {
														console.log(data);
													}
												});
											
										
									} else {
										$.ajax({
											url : "/weixin/updateGuoQingActivityOrder",
											type : "POST",
											async : false,
											data : {
												"orderId" : +$("#id").val(),
												"orderStatus" : 1
											},
											success : function(data) {
												location.href="/weixin/showCardGuoQingActivity?orderStatus=1";
											}
										});
									}
								});
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
