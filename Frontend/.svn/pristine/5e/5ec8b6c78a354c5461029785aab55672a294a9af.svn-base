var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");
$(function() {
	initMethod();
});

function initMethod() {
	$("input[name='userCarStatus']").change(function() {
		var checkedValue = $("input[name='userCarStatus']:checked").val();
		if (checkedValue == 0) {
			$("select[name='userCarTime']").removeAttr("disabled");
		} else {
			$("select[name='userCarTime']").attr("disabled", "disabled");
		}
	});
	$("input[name='userCarPosition']").val($("select[name='parkArea']").find("option:selected").text());
	initCarInfo();
	$("select[name='userCarId']").change(function() {
		initCarInfo();
	});
	$("select[name='parkArea']").change(function() {
		$("input[name='userCarPosition']").val($(this).find("option:selected").text());
	});
	$("#add-car").on("click", function() {
		var options = new Array();
		$("select[name='parkArea']").find("option").each(function() {
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
				placeholder : '请填写车牌号'
			}, {
				id : 'parkArea',
				type : 'select',
				options : options
			}, {
				id : 'carType',
				type : 'select',
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
				if (this.swalForm.plate == "") {
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
					success : function(data) {
						if (data == -1) {
							alert("添加失败，请稍后再试");
						} else {
							alert("添加成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("添加失败，请稍后再试");
					}
				});
			}
		});
	});

	$(".submit").on("click", function() {
		if ($("input[name='mobile']").val() == "") {
			swal("", "联系方式需要填写", "warning");
			return;
		}
		if ($("input[name='carPosition']").val() == "") {
			swal("", "车位需要填写", "warning");
			return;
		}
		console.log($("input[name='carType']").val());
		if($("input[name='orderCarType']").val() == "0") {
			if($("select[name='userCarId']").find("option:selected").attr("carType") == "SUV") {
				swal("", "次卡订单为轿车次卡订单，不能对SUV进行服务", "warning");
				return;
			}
		}
		if ($("input[name='serviceTime']").val() == "") {
			swal("", "请选择初次服务时间", "warning");
			return;
		} else {
			var inputDate = new Date($("input[name='serviceTime']").val().replace(/-/g, "/"));
			var nowDate = new Date();
			var hour = nowDate.getHours();
			if (hour > 17) {
				if (inputDate < nowDate) {
					swal("", "温馨提示：五点后只能选择明天的时间服务", "warning");
					return;
				}
			}
		}
		$.ajax({
			url : "/weixin/saveSingleOrder",
			type : "POST",
			async : false,
			data : $(".order-fill").serialize(),
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "预约成功!",
						type : "success",
						showCancelButton : false,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						cancelButtonText : "",
						closeOnConfirm : false,
						closeOnCancel : false
					}, function(isConfirm) {
						if (isConfirm) {
							location.href = "/weixin/pageCardOrderDetail?villeage=" + $("input[name=villeageId]").val() + "&orderId=" + $("input[name=cardOrder]").val();
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

function initCarInfo() {
	var carType = $("select[name='userCarId']").find("option:selected").attr("carType");
	$("input[name='carType']").each(function() {
		if ($(this).val() == carType) {
			$(this).prop("checked", "checked");
		}
	});
	var parkArea = $("select[name='userCarId']").find("option:selected").attr("parkArea");
	$("select[name='parkArea'] [value=" + parkArea + "]").attr("selected", "selected");
}

