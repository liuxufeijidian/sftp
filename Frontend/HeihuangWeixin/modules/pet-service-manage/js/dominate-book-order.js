var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");

var options = new Array();

$(function() {
	initData();
	init();
});

function initData() {
	var orderStatus = $("#orderStatus").val();
	if (orderStatus == 1) {
		$("li").eq(0).find("a").addClass("selected");
	} else if (orderStatus == 2) {
		$("li").eq(1).find("a").addClass("selected");
	} else if (orderStatus == 3) {
		$("li").eq(2).find("a").addClass("selected");
	}
	$.ajax({
		url : "/weixin/findPetMaster",
		type : "POST",
		async : false,
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					options.push({
						text : data[i].userName,
						value : data[i].id
					});
				}
			}
		},
		error : function(data) {
			swal("", "初始化数据失败", "error");
		}
	});
}

function init() {
	var open_box = $(".open-box");
	var current_order;
	var order_total = $(".order-total");
	$(".cancel-order").on("click", function(e) {
		var parent_wrapper = $(this).parents(".order");
		var order_num = parent_wrapper.find(".orderId").val();
		cancel_order(order_num);
		e.preventDefault();
	});
	$(".assign").on("click", function(e) {
		var parent_wrapper = $(this).closest(".order-item");
		var order_num = parent_wrapper.find(".orderId").val();
		swal.withForm({
			title : '',
			text : '选择需要分配的师傅',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'masterId',
				type : 'select',
				options : options
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : "/weixin/assignMaster",
					type : "POST",
					async : false,
					data : {
						"masterId" : this.swalForm.masterId,
						"orderId" : order_num
					},
					success : function(data) {
						if (data != -1) {
							alert("分配订单成功");
							parent_wrapper.remove();
							$(".order-total").text(Number($(".order-total").text()) - 1);
						} else {
							alert("分配订单失败");
							swal("", "分配订单失败，请稍候再试", "error");
						}
					},
					error : function(data) {
						alert("分配订单失败");
					}
				});
			}
		});
		e.preventDefault();
	});

	$(".editOrder").on("click", function(e) {
		var parent_wrapper = $(this).closest(".order-item");
		var order_num = parent_wrapper.find(".orderId").val();
		swal.withForm({
			title : '',
			text : '编辑订单',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'serviceItem',
				placeholder : '请输入本次的服务项目'
			}, {
				id : 'payPrice',
				placeholder : '请输入服务金额',
				type : 'tel'
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : "/weixin/editPetOrder",
					type : "POST",
					async : false,
					data : {
						"orderId" : order_num,
						"petItem" : this.swalForm.serviceItem,
						"payPrice" : this.swalForm.payPrice
					},
					success : function(data) {
						if (data != -1) {
							alert("编辑订单成功");
						} else {
							alert("编辑订单失败");
						}
					},
					error : function(data) {
						alert("编辑订单失败");
					}
				});
			}
		});
	});

	$(".finish-order").on("click", function(e) {
		var parent_wrapper = $(this).closest(".order-item");
		var order_num = parent_wrapper.find(".orderId").val();
		swal({
			title : "",
			text : "确认完成该笔订单？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if(isConfirm) {
				$.ajax({
					url : "/weixin/finishPetOrder",
					type : "POST",
					async : false,
					data : {
						"orderId" : order_num
					},
					success : function(data) {
						if (data != -1) {
							swal({
								title : "",
								text : "订单已完成",
								type : "success",
								showCancelButton : false,
								confirmButtonColor : "#DD6B55",
								confirmButtonText : "确定",
								closeOnConfirm : true,
								closeOnCancel : false
							}, function(isConfirm) {
								if (isConfirm) {
									$(".finish-order").closest(".order-item").remove();
									$(".order-total").text(Number($(".order-total").text()) - 1);
								}
							});
						} else {
							swal("", "订单完成失败，请稍候再试", "error");
						}
					},
					error : function(data) {
						swal("", "系统异常请稍后再试", "error");
					}
				});
			}
		});
		e.preventDefault();
	});

	$(".reAssign").on("click", function(e) {
		var parent_wrapper = $(this).closest(".order-item");
		var order_num = parent_wrapper.find(".orderId").val();
		swal.withForm({
			title : '',
			text : '选择需要分配的师傅',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'masterId',
				type : 'select',
				options : options
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : "/weixin/assignMaster",
					type : "POST",
					async : false,
					data : {
						"masterId" : this.swalForm.masterId,
						"orderId" : order_num
					},
					success : function(data) {
						if (data != -1) {
							alert("分配订单成功");
							parent_wrapper.remove();
							$(".order-total").text(Number($(".order-total").text()) - 1);
						} else {
							alert("分配订单失败");
							swal("", "分配订单失败，请稍候再试", "error");
						}
					},
					error : function(data) {
						alert("分配订单失败");
					}
				});
			}
		});
		e.preventDefault();
	});

	function cancel_order(order_num) {
		$.ajax({
			url : "/weixin/cancelPetOrder",
			type : "POST",
			async : false,
			data : {
				"orderId" : order_num
			},
			success : function(data) {
				if (data != -1) {
					swal({
						title : "",
						text : "取消订单成功",
						type : "success",
						showCancelButton : false,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "确定",
						closeOnConfirm : true,
						closeOnCancel : false
					}, function(isConfirm) {
						if (isConfirm) {
							$(".cancel-order").closest(".order-item").remove();
							$(".order-total").text(Number($(".order-total").text()) - 1);
						}
					});
				} else {
					swal("", "取消订单失败，请稍候再试", "error");
				}
			},
			error : function(data) {
				swal("", "系统异常请稍后再试", "error");
			}
		});
	}

}
