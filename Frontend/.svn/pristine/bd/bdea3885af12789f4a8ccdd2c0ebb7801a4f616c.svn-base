var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");
$(function() {
	init();
});
function init() {
	
	var car_obj = {
		"轿车" : {
			"内饰清洗" : "280",
			"座垫清洗" : "80",
			"玻璃除胶" : "80",
			"清洗虫胶" : "30",
			"手工打蜡" : "100",
			"深度清洗玻璃" : "30",
			"发动机舱清洗" : "80"
		},
		"SUV" : {
			"内饰清洗" : "280",
			"座垫清洗" : "80",
			"玻璃除胶" : "80",
			"清洗虫胶" : "30",
			"手工打蜡" : "120",
			"深度清洗玻璃" : "30",
			"发动机舱清洗" : "80"
		}
	};
	
	var car_type = $(".car-wrapper"),
	    parkArea = $("select[name='parkArea']"),
	    interior_type = $(".interior-wrapper"),
	    total = $(".total"),
	    plate = $("select[name='plate']"),
	    coupon = $("select[name='couponId']"),
		car_service = $(".car-service"),
		userCarPosition = $("input[name='userCarPosition']"),
		userCarStatus = $("input[name='userCarStatus']"),
		addCar = $("#add-car");;
	userCarPosition.val(parkArea.find("option:selected").text());
	priceCount();
	initCarInfo();
	plate.on("change", function() {
		initCarInfo();
	});
	car_type.on("click", function() {
		priceCount();
	});
	interior_type.on("click", function() {
		priceCount();
	});
	coupon.on("change", function() {
		priceCount();
	});
	parkArea.on("change", function() {
		userCarPosition.val(parkArea.find("option:selected").text());
	});
	userCarStatus.on("change", function() {
		if ($("input[name='userCarStatus']:checked").val() == 0) {
			$("select[name='userCarTime']").removeAttr("disabled");
		} else {
			$("select[name='userCarTime']").attr("disabled", "disabled");
		}
	});
	car_service.delegate(".count", "tap", function() {
		var service = $(this);
		var counts_num = service.siblings(".counts-num");
		var count = parseInt(counts_num.text());
		if (service.hasClass("minus-num")) {
			count -= 1;
			if (count < 1) {
				$(this).closest(".car-service").remove();
			} else {
				counts_num.text(count);
			}

		} else {
			count += 1;
			counts_num.text(count);
		}

		priceCount();
	});
	car_service.find();
	function priceCount() {
		var car_type_val = car_type.find("input:checked").val();
		var coupon_val = coupon.find("option:selected").attr("couponVal");
		
		var price = 0;
		for (var i = 0; i < $(".car-service").length; i++) {
			$(".car-service").eq(i).find(".price").text(car_obj[car_type_val][$(".car-service").eq(i).find(".service-name").text()]);
			price += parseInt(car_obj[car_type_val][$(".car-service").eq(i).find(".service-name").text()]) * parseInt($(".car-service").eq(i).find(".counts-num").text());

		}
		if (coupon_val != null&&coupon_val !="") {
			total.wrap("<strike></strike>");
			if (coupon_val > 1) {
				if(coupon_val > price) {
					coupon_price = 0;
				} else {
					coupon_price = price - parseFloat(coupon_val);
				}
			} else {
				coupon_price = price * payMonth_val * parseFloat(coupon_val);
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
		$("input[name='payPrice']").val(total.text());
	}
	
	function initCarInfo() {
		var carType = plate.find("option:selected").attr("carType");
		$("input[name='carType']").each(function() {
			if($(this).val() == carType) {
				$(this).prop("checked", "checked");
			}
		});
		var parkArea = plate.find("option:selected").attr("parkArea");
		$("select[name='parkArea'] [value=" + parkArea +"]").attr("selected", "selected");
		var carId = plate.find("option:selected").attr("carId");
		$("input[name='userCarId']").val(carId);
	}
	addCar.on("click", function() {
		var options = new Array();
		parkArea.find("option").each(function() {
			options.push({
				value : $(this).attr("value"),
				text : $(this).text()
			});
		});
		swal.withForm({
			title : '',
			text : '填写车辆信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'plate',
				placeholder: '请填写车牌号'
			}, {
				id : 'parkArea',
				type : 'select',
				options : options
			}, {
				id : 'carType',
				type: 'select',
				options : [{
					value : '轿车',
					text : '轿车'
				}, {
					value : 'SUV',
					text : 'SUV'
				}]
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if(this.swalForm.plate == "") {
					alert("车牌号必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/saveUserCar',
					type : 'POST',
					data : {
						plate : _this.plate,
						parkArea : _this.parkArea,
						carType : _this.carType,
						userId : $("input[name='userId']").val()
					},
					success: function(data) {
						if(data == -1) {
							alert("添加失败，请稍后再试");
						} else {
							alert("添加成功");
							location.reload();
						}
					},
					error: function(data) {
						alert("添加失败，请稍后再试");
					}
				});
			}
		});		
	});

	$('.submit').on("click", function() {
		var items = {};
		$(".car-service").each(function() {
			items[$(this).find(".service-name").text()] = $(this).find(".counts-num").text();
		});
		if ($("input[name='plate']").val() == "") {
			swal("", "车牌号需要填写", "warning");
			return;
		}
		if ($("input[name='mobile']").val() == "") {
			swal("", "联系方式需要填写", "warning");
			return;
		}
		if ($("input[name='serviceTime']").val() == "") {
			swal("", "请选择服务时间", "warning");
			return;
		} else {
			var inputDate = new Date($("input[name='serviceTime']").val().replace(/-/g, "/"));
			var nowDate = new Date();
			var hour = nowDate.getHours();
			if(hour > 17) {
				if (inputDate < nowDate) {
					swal("", "温馨提示：五点后只能选择明天的时间服务", "warning");
					return;
				}
			}
		}
		$.ajax({
			url : "/weixin/saveCarBeauty",
			type : "POST",
			async : false,
			data : $(".order-fill").serialize() + "&beautyType=" + encodeURIComponent(JSON.stringify(items)),
			success : function(data) {
				if (data != -1) {
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
							var orderNumer = data.orderNumber;
							$.ajax({
								url : "/weixin/updateCarBeautyOrder",
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
											"orderNo" : orderNumer,
											"openId" : $("#openId").val(),
											"orderType" : 5
										},
										success : function(wxData) {
											wx.config({
												appId : wxData.config.appid, // 必填，公众号的唯一标识
												timestamp : wxData.config.timestamp, // 必填，生成签名的时间戳
												nonceStr : wxData.config.noncestr, // 必填，生成签名的随机串
												signature : wxData.config.signature, // 必填，签名，见附录1
												jsApiList : ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
											});
											wx.ready(function() {
												wx.chooseWXPay({
													timestamp : wxData.finalPackage.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
													nonceStr : wxData.config.noncestr, // 支付签名随机串，不长于 32 位
													package : wxData.finalPackage.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
													signType : 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
													paySign : wxData.finalPackage.paySign, // 支付签名
													success : function(res) {
														location.href = "/weixin/pageCarBeautyDetail?orderId=" + data.id + "&villeage=" + $("input[name='villeageId']").val();
													},
													cancel : function(res) {
														location.href = "/weixin/pageCarBeautyDetail?orderId=" + data.id + "&villeage=" + $("input[name='villeageId']").val();
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
							var orderNumer = data.orderNumber;
							$.ajax({
								url : "/weixin/updateCarBeautyOrder",
								type : "POST",
								async : false,
								data : {
									"orderId" : orderId,
									"orderStatus" : 1 
								},
								success: function(data) {
									location.href = "/weixin/pageCarBeautyDetail?orderId=" + orderId + "&villeage=" + $("input[name='villeageId']").val();
								}
							});
						}
					});
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});
	});
}
