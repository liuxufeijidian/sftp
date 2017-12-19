var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");

$(function() {
	initMethod();
});

function initMethod() {
	$('.submit').on("click", function() {
		if($("select[name='petId']").find("option").length == 0) {
			swal("", "请新增一个宠物!" ,"warning");
			return;
		}
		if($("input[name='petName']").val() == "") {
			swal("", "宠物名需要填写!" ,"warning");
			return;
		}
		if($("input[name='userName']").val() == "") {
			swal("", "用户名需要填写!" ,"warning");
			return;
		}
		if($("input[name='mobile']").val() == "") {
			swal("", "手机号需要填写!" ,"warning");
			return;
		}
		if($("input[name='time']").val() == "") {
			swal("", "请选择服务时间", "warning");
			return;
		} else {
			var inputDate = new Date($("input[name='time']").val().replace(/-/g, "/"));
			var nowDate = new Date();
			if (inputDate < nowDate) {
				swal("", "服务时间必须大于当前时间", "warning");
				return;
			}
		}
		if($("input[name='address']").val() == "") {
			swal("", "地址需要填写!" ,"warning");
			return;
		}
		$.ajax({
			url : "/weixin/savePetOrder",
			type : "POST",
			async : false,
			data : $(".order-fill").serialize(),
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "预约成功，工作人员会尽快与您联系",
						type : "success",
						showCancelButton : false,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						cancelButtonText : "",
						closeOnConfirm : false,
						closeOnCancel : false
					}, function(isConfirm) {
						if (isConfirm) {
							location.href = "/weixin/pagePetOrderRecord?userId=" + $("input[name='userId']").val();
						}
					});
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});
	});
	$("#add-pet").click(function() {
		swal.withForm({
			title : '',
			text : '填写宠物信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'petName',
				placeholder: '请填写宠物名'
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if(this.swalForm.petName == "") {
					alert("宠物名必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/savePet',
					type : 'POST',
					data : {
						petName : _this.petName,
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
}
