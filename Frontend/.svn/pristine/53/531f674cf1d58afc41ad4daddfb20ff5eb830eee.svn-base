var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("swiper/swiper-3.3.1.min.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");
$(function() {
	init();
});
function init() {

	var open_box = $(".open-box");
	$("#wash-record").on("click", function() {
		location.href = "/weixin/pageCalender";
	});
	$("#interiors-book").on("click", function() {
		swal.withForm({
			title : '',
			text : '选择下一次内饰清洗时间',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'washTime',
				type: 'datetime-local'
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var temp = this.swalForm.washTime.substring(0, this.swalForm.washTime.indexOf("."));
				var washTime = new Date(temp);
				var nowTime = new Date();
				if(washTime.getHours() > 19) {
					alert("温馨提示：只能选择当天19点之后的服务");
					return;
				}
				$.ajax({
					url : "/weixin/saveInsideWash",
					type : "POST",
					async : false,
					data : {
						"orderId" : $("#orderId").val(),
						"washTime" : washTime
					},
					success : function(data) {
						if (data != -1) {
							alert("内饰预约成功");
						} else {
							alert("内饰预约失败");
						}
					},
					error : function(data) {
						alert("内饰预约失败");
					}
				});
			}
		});
	});
	var pause_val = $("#pause").val();
	$("#order-state-wrapper input[type='radio'][value='" + pause_val +  "']").prop("checked", true);
	function getData() {
		$.ajax({
			url : "/weixin/findInsideWashByOrder",
			data : {
				"orderId" : $("#orderId").val()
			},
			type : "POST",
			success : function(data) {
				if(data && data.length > 0) {
					for(var i=0; i<data.length; i++) {
						var hasWash = "";
						if(data[i].washStatus == 0) {
							hasWash = "未清洗";
						} else {
							hasWash = "已清洗";
						}
						$(".open-box").find("ul").append("<li>" + formateDate(data[i].insideWashTime, "yyyy-MM-dd hh: mm: ss") + " : " + hasWash + "</li>");
					}
				} else {
					$(".open-box").find("ul").append("<li>暂无清洗记录</li>");
				}
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
	$("#order-state-wrapper input[type='radio']").on("click", function() {
		console.log($(this).val());
		if($(this).val() == 0) {
			var checkValue = $(this).val();
			swal({
				title : "",
				text : "每月只能免费暂停一次服务，是否确认暂停服务",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					var pauseMonth = $("#pauseMonth").text();
					if(pauseMonth) {
						var nowMonth = new Date().getMonth() + 1;
						if(parseInt(pauseMonth) == nowMonth) {
							swal("", "您当月已经暂停过一次服务了", "warning");
							return;
						}
					}
					$.ajax({
						url : "/weixin/updateWxMonthOrderPause",
						type : "POST",
						async : false,
						data : {
							"orderId" : $("#orderId").val(),
							"pause" : checkValue
						},
						success: function(data) {
							if(data == 1) {
								swal("", "设置成功", "success");
							} else {
								swal("", "设置成功", "success");
							}
						},
						error : function(data) {
							swal("", "系统异常请稍后再试", "error");
						}
					});
				} else {
					$("#order-state-wrapper input[type='radio'][value='1']").prop("checked", true);
				}
			});
		} else {
			$.ajax({
				url : "/weixin/updateWxMonthOrderPause",
				type : "POST",
				async : false,
				data : {
					"orderId" : $("#orderId").val(),
					"pause" : $(this).val()
				},
				success: function(data) {
					if(data == 1) {
						swal("", "设置成功", "success");
					} else {
						swal("", "设置成功", "success");
					}
				},
				error : function(data) {
					swal("", "系统异常请稍后再试", "error");
				}
			});
		}
		//告诉服务器暂停或者开始订单
		var state = $(this).val();
	});
}

function formateDate(date, format) {
	if(date) {
		tempDate = new Date(date);
	} else {
		tempDate = new Date();
	}
	var o = {   
		"M+" : tempDate.getMonth()+1,                 //月份   
		"d+" : tempDate.getDate(),                    //日   
		"h+" : tempDate.getHours(),                   //小时   
		"m+" : tempDate.getMinutes(),                 //分   
		"s+" : tempDate.getSeconds(),                 //秒   
		"q+" : Math.floor((tempDate.getMonth()+3)/3), //季度   
		"S"  : tempDate.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(format))   
		format = format.replace(RegExp.$1, (tempDate.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format))   
			format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	}
	return format;
};
