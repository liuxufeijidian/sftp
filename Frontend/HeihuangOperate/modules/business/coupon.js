var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
var datetimepicker = require("/components/datetimepicker/bootstrap-datetimepicker.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

initData();
initDatePicker();
initDialog();
initGrid();
initMethod();

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateMixed(n) {
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}
//检索需要发送的小区
$("#search-btn").click(function() {
	var key = $("#desc").val();
	if (key != "") {
		var params = $('#jqgrid').jqGrid("getGridParam", "postData");
		$.extend(params, {
			villeage : key
		});
		$("#jqgrid").jqGrid("setGridParam", {
			postData : params
		}).trigger("reloadGrid");
	} else {
		$.smartFailure({
			content : "请输入检索关键字"
		});
	}
});
function initData() {
	$.ajax({
		url : "/sys/findConstType",
		type : "POST",
		async : false,
		success : function(data) {
			if (data) {
				$("#villeageName").append("<option value='0'>全部小区</option>");
				for(var i=0; i<data.length; i++) {
					$("#villeage").append("<option value='" + data[i].constTypeId + "'>" + data[i].constTypeDesc + "</option>");
					$("#villeageName").append("<option value='" + data[i].constTypeId + "'>" + data[i].constTypeDesc + "</option>");
					$("#villeages").append("<option value='" + data[i].constTypeId + "'>" + data[i].constTypeDesc + "</option>");

				}
			}
		},
		error : function(data) {
			$.smartFailure({
				content : "数据初始化失败"
			});
		}
	});

}

function initDatePicker() {
	datetimepicker('.expireTime').datetimepicker({
		language : 'zh-CN',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		format : 'yyyy-mm-dd',
		todayHighlight : 1,
		startView : 2,
		minView : 2
	});
}

function initDialog() {
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title : function(title) {
			if (!this.options.title) {
				title.html("&#160;");
			} else {
				title.html(this.options.title);
			}
		}
	}));
	$("#addCouponWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 添加用户车辆信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addCouponForm").parsley();
				$("#addCouponForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					$.ajax({
						url : "/business/addCoupon",
						type : "POST",
						data : $("#addCouponForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addCouponWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addCouponWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$("#addCouponForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("addCouponForm");
					$('#jqgrid').jqGrid().trigger("reloadGrid");
				}
			}
		}, {
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});

	$("#allotWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 分配优惠券</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 提交",
			"class" : "btn btn-success",
			click : function() {
				$.ajax({
					url : "/business/allotCoupon",
					type : "POST",
					data : {
						"couponId" : $("#couponId").val(),
						"villeage" : $("#villeage").find("option:selected").val()
					},
					async : false,
					success : function(data) {
						if (data != -1) {
							$.smartSuccess({
								content : "分配成功"
							});
							$("#allotWindow").dialog("close");
						} else {
							$.smartFailure({
								content : "分配失败"
							});
							$("#allotWindow").dialog("close");
						}
					},
					error : function(data) {
						$.smartFailure({
							content : "系统异常，请联系管理员"
						});
					}
				});
				$.clearForm("allotCouponForm");
				$('#jqgrid').jqGrid().trigger("reloadGrid");
			}
		}, {
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
	//分配多张优惠券
	$("#allotWindows").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 分配多张优惠券</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 提交",
			"class" : "btn btn-success",
			click : function() {
				$.ajax({
					url : "/business/allotCoupons",
					type : "POST",
					data : {
						"couponIds" : $("#couponIds").val(),
						"villeage" : $("#villeages").find("option:selected").val()
					},
					async : false,
					success : function(data) {
						if (data != -1) {
							$.smartSuccess({
								content : "分配成功"
							});
							$("#allotWindows").dialog("close");
						} else {
							$.smartFailure({
								content : "分配失败"
							});
							$("#allotWindows").dialog("close");
						}
					},
					error : function(data) {
						$.smartFailure({
							content : "系统异常，请联系管理员"
						});
					}
				});
				$.clearForm("allotCouponForms");
				$('#jqgrid').jqGrid().trigger("reloadGrid");
			}
		}, {
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});

}



function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/business/pageCoupon',
		datatype : 'json',
		mtype : 'POST',
		postData : {
			'userId' : 0
		},
		height : '370',
		colNames : ['id', '优惠券兑换码', '优惠券类型', '适用小区', '打折类型', '折扣数目', '最高折扣金额', '状态', '数量', '过期时间', '获取时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'couponCode',
			index : 'couponCode',
			width : 60
		}, {
			name : 'couponType',
			index : 'couponType',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "通用优惠券";
				} else if (cellvalue == 1) {
					return "单次洗车";
				} else if (cellvalue == 2) {
					return "包月洗车";
				} else if (cellvalue == 3) {
					return "次卡洗车";
				} else if (cellvalue == 4) {
					return "汽车美容";
				} else if (cellvalue == 5) {
					return "宠物管家";
				}
			}
		}, {
			name : 'villeage',
			index : 'villeage',
			width : 60,
			formatter : function(cellvalue) {
				if(cellvalue == 0) {
					return "全部小区";
				} else {
					var val = "";
					$.ajax({
						url : "/sys/getConstType",
						type : "POST",
						data : {
							"constTypeId" : cellvalue 
						},
						async : false,
						success: function(data) {
							val = data.constTypeDesc;
						},
						error: function(data) {
							console.log(data);
						}
					});
					return val;
				}
			}
		}, {
			name : 'discountType',
			index : 'discountType',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "现金";
				} else if (cellvalue == 1) {
					return "打折";
				}
			}
		}, {
			name : 'discountValue',
			index : 'discountValue',
			width : 60,
			formatter : function(cellvalue, options, rowObjects) {
				if (rowObjects.discountType == 0) {
					return rowObjects.discountValue + "元";
				} else if (rowObjects.discountType == 1) {
					return Number(rowObjects.discountValue) + "折";
				}
			}
		}, {
			name : 'maxDiscount',
			index : 'maxDiscount',
			width : 80
		}, {
			name : 'couponStatus',
			index : 'couponStatus',
			width : 40,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "可兑换";
				} else {
					return "可兑换;可发放";
				}
			}
		}, {
			name : 'number',
			index : 'number',
			width : 40
		}, {
			name : 'expireTime',
			index : 'expireTime',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd');
			}
		}, {
			name : 'createTime',
			index : 'createTime',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
			}
		}],
		rownumbers : true,// 添加左侧行号
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'createTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;优惠券管理',
		multiselect : true,
		autowidth : false
	});
	$("#jqgrid").jqGrid('navGrid', "#pjqgrid", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});
	var btns = [{
		id : 'update_coupon',
		text : '分配单个优惠券',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}, {
		id : 'update_coupons',
		text : '分配多个优惠券',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	},
	{
		id : 'add_coupon',
		text : '添加优惠券',
		btnIcon : 'fa fa-plus',
		btnCls : 'btn btn-sm btn-info'
	}];
	$.addGridBtn(btns);
	var params = [{
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	}];
	$.customBtnCls(params);
}

function initMethod() {
	$("#add_coupon").click(function() {
		var couponCode = generateMixed(6);
		$("#addCouponForm").find(".couponCode").val(couponCode);
		$("#addCouponWindow").dialog("open");
	});
	//分配单个优惠券
	$("#update_coupon").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要分配的优惠券"
			});
			return;
		}
		//var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		//查询多条id
		//var rowData= $('#jqgrid').jqGrid('getGridParam', 'selarrrow');
		$("#couponId").val(selrow);
		$("#allotWindow").dialog("open");
	});
	//分配多个优惠券
	$("#update_coupons").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要分配的优惠券"
			});
			return;
		}
		//var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		//查询多条id
		var ids= $('#jqgrid').jqGrid('getGridParam', 'selarrrow')
//		var counts="";
//		for(var i=0;i<ids.length;i++){
//			var rowData=$("#jqgrid").jqGrid('getRowData',ids[i]);
//			counts=counts.concat(rowData.id+",");
//			
//		}
		$("#couponIds").val(ids);
		$("#allotWindows").dialog("open");
	});
	
	$("#addCouponForm").find(".discountType").change(function() {
		if ($(this).find("option:selected").val() == 1) {
			$("#addCouponForm").find(".maxDiscountSec").show();
		} else {
			$("#addCouponForm").find(".maxDiscountSec").hide();
		}
	});
}
