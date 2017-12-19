var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
$(function() {
	init();
});
function init() {

	if ($("#orderType").val() == 4) {
		$("#petManage").addClass("selected");
		$("#carManage").removeClass("selected");
	} else {
		$("#carManage").addClass("selected");
		$("#petManage").removeClass("selected");
	}
	$(".nav>ul>li a").on("tap", function() {
		if ($(this).parent().find("ul").hasClass("no-display")) {
			$(this).parent().find("ul").removeClass("no-display");
		} else {
			$(this).parent().find("ul").addClass("no-display");
		}

	});
	$(".nav .hidden-ul li a").on("click", function() {
		$(this).parent().parent().addClass("no-display");
	});

	$(".paySingle").click(function(e) {
		var orderId = $(this).closest(".order").find(".orderId").val();
		var orderNo = $(this).closest(".order").find(".orderNo").val();
		$.ajax({
			url : "/weixin/weixinPay",
			type : "POST",
			data : {
				"url" : window.location.href,
				"orderNo" : orderNo,
				"openId" : $("#openId").val(),
				"orderType" : 1
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
							location.href = "/weixin/pageSingleOrderDetail?orderId=" + orderId;
						},
						cancel : function(res) {
							location.href = "/weixin/pageSingleOrderDetail?orderId=" + orderId;
						}
					});
				});
			},
			error : function(data) {
				console.log(data);
			}
		});
		e.preventDefault();
	});
	$(".payMonth").click(function(e) {
		var orderId = $(this).closest(".order").find(".orderId").val();
		var orderNo = $(this).closest(".order").find(".orderNo").val();
		$.ajax({
			url : "/weixin/weixinPay",
			type : "POST",
			data : {
				"url" : window.location.href,
				"orderNo" : orderNo,
				"openId" : $("#openId").val(),
				"orderType" : 2
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
							location.href = "/weixin/pageMonthOrderDetail?orderId=" + orderId;
						},
						cancel : function(res) {
							location.href = "/weixin/pageMonthOrderDetail?orderId=" + orderId;
						}
					});
				});
			},
			error : function(data) {
				console.log(data);
			}
		});
		e.preventDefault();
	});

	$(".payCard").click(function(e) {
		var orderId = $(this).closest(".order").find(".orderId").val();
		var orderNo = $(this).closest(".order").find(".orderNo").val();
		$.ajax({
			url : "/weixin/weixinPay",
			type : "POST",
			data : {
				"url" : window.location.href,
				"orderNo" : orderNo,
				"openId" : $("#openId").val(),
				"orderType" : 3
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
							location.href = "/weixin/pageCardOrderDetail?orderId=" + orderId;
						},
						cancel : function(res) {
							location.href = "/weixin/pageCardOrderDetail?orderId=" + orderId;
						}
					});
				});
			},
			error : function(data) {
				console.log(data);
			}
		});
		e.preventDefault();
	});

	$(".payBeauty").click(function(e) {
		var orderId = $(this).closest(".order").find(".orderId").val();
		var orderNo = $(this).closest(".order").find(".orderNo").val();
		$.ajax({
			url : "/weixin/weixinPay",
			type : "POST",
			data : {
				"url" : window.location.href,
				"orderNo" : orderNo,
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
							location.href = "/weixin/pageCarBeautyDetail?orderId=" + orderId;
						},
						cancel : function(res) {
							location.href = "/weixin/pageCarBeautyDetail?orderId=" + orderId;
						}
					});
				});
			},
			error : function(data) {
				console.log(data);
			}
		});
		e.preventDefault();
	});

	$(".cancelSingle").click(function() {
		var _this = $(this);
		swal({
			title : "",
			text : "确认取消该订单吗？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确认",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/updateSingleOrder',
					type : 'POST',
					data : {
						orderId : _this.closest(".order").find(".orderId").val(),
						orderStatus : 7
					},
					success : function(data) {
						if (data == 1) {
							swal("", "取消成功", "success");
						} else {
							swal("", "取消失败", "warining");
						}
						location.reload();
					},
					error : function(data) {
						console.log(data);
					}
				});
			}
		});
	});

	$(".cancelMonth").click(function() {
		var _this = $(this);
		swal({
			title : "",
			text : "确认取消该订单吗？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确认",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/updateMonthOrder',
					type : 'POST',
					data : {
						orderId : _this.closest(".order").find(".orderId").val(),
						orderStatus : 7
					},
					success : function(data) {
						if (data == 1) {
							swal("", "取消成功", "success");
						} else {
							swal("", "取消失败", "warining");
						}
						location.reload();
					},
					error : function(data) {
						console.log(data);
					}
				});
			}
		});
	});

	$(".cancelCard").click(function() {
		var _this = $(this);
		swal({
			title : "",
			text : "确认取消该订单吗？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确认",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/updateCardOrder',
					type : 'POST',
					data : {
						orderId : _this.closest(".order").find(".orderId").val(),
						orderStatus : 7
					},
					success : function(data) {
						if (data == 1) {
							swal("", "取消成功", "success");
						} else {
							swal("", "取消失败", "warining");
						}
						location.reload();
					},
					error : function(data) {
						console.log(data);
					}
				});
			}
		});
	});

	$(".cancelCarBeauty").click(function() {
		var _this = $(this);
		swal({
			title : "",
			text : "确认取消该订单吗？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确认",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/updateCarBeautyOrder',
					type : 'POST',
					data : {
						orderId : _this.closest(".order").find(".orderId").val(),
						orderStatus : 7
					},
					success : function(data) {
						if (data == 1) {
							swal("", "取消成功", "success");
						} else {
							swal("", "取消失败", "warining");
						}
						location.reload();
					},
					error : function(data) {
						console.log(data);
					}
				});
			}
		});
	});

	$(".cashPay").click(function() {
		var _this = $(this);
		$.ajax({
			url : "/weixin/updatePetOrderPayWay",
			type : "POST",
			async : false,
			data : {
				"orderId" : _this.closest(".order").find(".orderId").val(),
				"payWay" : 1
			},
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "修改支付方式成功",
						type : "warning",
						showCancelButton : false,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						cancelButtonText : "取消",
						closeOnConfirm : false,
						closeOnCancel : true
					}, function(isConfirm) {
						location.reload();
					});
				}
			},
			error : function(data) {
				console.log(data);
			}
		});
	});
	$(".weixinPay").click(function() {
		var _this = $(this);
		$.ajax({
			url : "/weixin/updatePetOrderPayWay",
			type : "POST",
			async : false,
			data : {
				"orderId" : _this.closest(".order").find(".orderId").val(),
				"payWay" : 0
			},
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "修改支付方式成功，现在支付吗？",
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						cancelButtonText : "取消",
						closeOnConfirm : false,
						closeOnCancel : true
					}, function(isConfirm) {
						if (isConfirm) {
							$.ajax({
								url : "/weixin/weixinPay",
								type : "POST",
								data : {
									"url" : window.location.href,
									"orderNo" : _this.closest(".order").find(".orderNo").val(),
									"openId" : $("#openId").val(),
									"orderType" : 4
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
												swal("", "支付成功，支付结果会在1分钟内更新!", "success");
											},
											cancel : function(res) {
												location.reload();
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
				}
			},
			error : function(data) {
				console.log(data);
			}
		});
	});
}
