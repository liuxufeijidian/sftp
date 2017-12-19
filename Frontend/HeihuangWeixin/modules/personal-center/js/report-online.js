var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");

$(".submit").click(function(e) {
	if ($("textarea[name='complainContent']").val() == '') {
		swal("", "请填写投诉内容", "warning");
		e.preventDefault();
		return;
	}
	swal("", "投诉成功", "success");
	e.preventDefault();
	$.ajax({
		url : "/weixin/addComplain",
		type : "POST",
		async : false,
		data : $('.edit-info').serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			location.href = "/weixin/selectComplainXianShi";
		}
	});
});
