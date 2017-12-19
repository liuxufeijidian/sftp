var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("swiper/swiper-3.3.1.min.js");
$(function() {
	init();
});
function init() {
	$("#pay").click(function() {
		$.ajax({
			url : "/weixin/weixinPay",
			type : "POST",
			data : {
				"url" : window.location.href,
				"orderNo" : $("#orderNumber").val(),
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
							location.href = "/weixin/pageMonthOrderDetail?orderId=" + data.id;
						},
						cancel : function(res) {
							location.href = "/weixin/pageMonthOrderDetail?orderId=" + data.id;
						}
					});
				});
			},
			error : function(data) {
				console.log(data);
			}
		});
	});
}
