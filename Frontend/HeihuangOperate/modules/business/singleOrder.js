var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
var datetimepicker = require("/components/datetimepicker/bootstrap-datetimepicker.js");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

initDialog();
initDateTime();
initGrid();
initMethod();

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
	$("#updateUserCarWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 查看用户评价</h4></div>",		
	});
	$("#updateUserCarWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改用户车辆信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#updateUserCarForm").parsley();
				$("#updateUserCarForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					$.ajax({
						url : "/business/updateUserCar",
						type : "POST",
						data : $("#updateUserCarForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#updateUserCarWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#updateUserCarWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$("#updateUserCarForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("updateUserCarForm");
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
	
	$("#updateOrderWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改订单资料</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#updateOrderForm").parsley();
				$("#updateOrderForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					var ucStatus = $("#updateOrderForm").find("select[name=userCarStatus]").val();
					var params = {
						id: $("#updateOrderForm").find("input[name=id]").val(),
						orderStatus: $("#updateOrderForm").find("select[name=orderStatus]").val(),
						userCarStatus: ucStatus,
						serviceTime: $("#updateOrderForm").find("input[name=serviceTime]").val(),
						remark: $("#updateOrderForm").find("input[name=remark]").val()
					};
					if(ucStatus == 0) {
						params.userCarTime = $("#updateUserForm").find("select[name=userCarTime]").val();
					} else {
						params.userCarTime = "  ";
					}
					
					$.ajax({
						url : "/business/modifySingleOrder",
						type : "POST",
						data : $("#updateOrderForm").serialize(),
						async : false,
						success : function(data) {
							if (data.success) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#updateOrderWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#updateOrderWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$("#updateOrderForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("updateOrderForm");
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
}

function initDateTime() {
	datetimepicker('.form_datetime').datetimepicker({
		language:  'zh-CN',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		format : 'yyyy-mm-dd',
		todayHighlight : 1,
		startView : 2,
		minView : 2
	});
}

function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/business/pageSingleOrder',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '订单号', 'userId', '用户名', '手机', '性别', '小区ID', '小区', '房号', 'userCarId', '车牌号', '车位 ', '车型', '是否在库code', '是否在库', '在库时间', '车位', '支付金额', '订单状态', '清洗内饰', '备注', '服务时间', '创建时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'orderNumber',
			index : 'orderNumber',
			width : 60
		}, {
			name : 'userId',
			index : 'userId',
			width : 60,
			hidden : true
		}, {
			name : 'userName',
			index : 'userName',
			width : 30
		}, {
			name : 'mobile',
			index : 'mobile',
			width : 60
		}, {
			name : 'sex',
			index : 'sex',
			width : 30,
			hidden : true,
			formatter : function(value) {
				if (value == 0) {
					return "女";
				} else {
					return "男";
				}
			}
		}, {
			name : 'villeageId',
			index : 'villeageId',
			width : 50,
			hidden : true
		}, {
			name : 'villeage',
			index : 'villeage',
			width : 50
		}, {
			name : 'roomNo',
			index : 'roomNo',
			width : 50
			
		}, {
			name : 'userCarId',
			index : 'userCarId',
			width : 60,
			hidden : true
		}, {
			name : 'plate',
			index : 'plate',
			width : 40
		}, {
			name : 'parkArea',
			index : 'parkArea',
			width : 40,
			hidden : true
		}, {
			name : 'carType',
			index : 'carType',
			width : 20
		}, {
			name : 'userCarStatus',
			index : 'userCarStatus',
			hidden: true
		}, {
			name : 'userCarStatusName',
			index : 'userCarStatus',
			width : 60,
			formatter : function(cellvalue, options, rowObject) {
				var c = rowObject.userCarStatus;
				if(c == 0) {
					return "未在库";
				} else {
					return "在库";
				}
			}
		}, {
			name : 'userCarTime',
			index : 'userCarTime',
			width : 60
		}, {
			name : 'userCarPosition',
			index : 'userCarPosition',
			width : 40
		}, {
			name : 'payPrice',
			index : 'payPrice',
			width : 60
		}, {
			name : 'orderStatus',
			index : 'orderStatus',
			width : 60,
			formatter : function(cellvalue) {
				if(cellvalue == 0) {
					return "微信支付-未支付";
				} else if(cellvalue == 1) {
					return "现金支付-未支付";
				} else if(cellvalue == 2) {
					return "已支付";
				} else if(cellvalue == 3) {
					return "服务结束";
				} else if (cellvalue == 7) {
					return "已取消";
				}
			}
		}, {
			name : 'insideWash',
			index : 'insideWash',
			width : 40,
			formatter : function(cellvalue) {
				if(cellvalue == 0) {
					return "否";
				} else {
					return "是";
				}
			}
		}, {
			name : 'remark',
			index : 'remark',
			width : 30
		}, {
			name : 'serviceTime',
			index : 'serviceTime',
			width : 60,
			formatter : function(value) {
				if(value) {
					return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
				} else {
					return "未进行服务";
				}
			}
		}, {
			name : 'createTime',
			index : 'createTime',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
			}
		}],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'createTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-shopping-cart"></i>&nbsp;单次洗车管理',
		multiselect : false,
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
		id : 'view_evaluate',
		text : '查看用户评价',
		btnIcon : 'fa fa-bookmark',
		btnCls : 'btn btn-sm btn-success'
	}, {
		id : 'modify_single_order',
		text : '修改订单资料',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'modify_user_car',
		text : '修改车辆资料',
		btnIcon : 'fa fa-taxi',
		btnCls : 'btn btn-sm btn-info'
	}, {
		id : 'check_order_history',
		text : '查看订单历史状态',
		btnIcon : 'fa fa-file',
		btnCls : 'btn btn-sm btn-success'
	}];
	$.addGridBtn(btns);
	var params = [{
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	}];
	$.customBtnCls(params);
}

function initMethod() {
	$("#userCarStatus").change(function() {
		if($(this).val() == 0) {
			$("#carTimeSection").show();
		} else {
			$("#carTimeSection").hide();
		}
	});
	$("#modify_user_car").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改车辆的订单"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		$("#updateUserCarForm").find("input[name=plate]").val(rowData.plate);
		$("#updateUserCarForm").find("input[name=parkArea]").val(rowData.parkArea);
		$("#updateUserCarForm").find("input[name=carType]").val(rowData.carType);
		$("#updateUserCarForm").find("input[name=id]").val(rowData.userCarId);
		$("#updateUserCarForm").find("input[name=userId]").val(rowData.userId);
		var villeageId = rowData.villeageId;
		$.ajax({
			url : "/sys/findConstValueByTypeId",
			type : "POST",
			data : {
				"constTypeId" : villeageId
			},
			async : false,
			success : function(data) {
				if(data) {
					var option = "";
					$("#updateUserCarForm").find("select[name=parkArea]").html("");
					for(var i=0; i<data.length; i++) {
						option += "<option value='" + data[i].id + "'>" + data[i].constDesc + "</option>";
					}
					$("#updateUserCarForm").find("select[name=parkArea]").html(option);
				}
			}
		});
		$("#updateUserCarWindow").dialog("open");
	});
	$("#modify_single_order").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改车辆的订单"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		if(rowData.userCarStatus == 1) {
			$("#carTimeSection").hide();
		} else {
			$("#carTimeSection").show();
		}
		$("#updateOrderForm").find("input[name=id]").val(rowData.id);
		$("#updateOrderForm").find("input[name=serviceTime]").val(rowData.serviceTime);
		$("#updateOrderForm").find("input[name=remark]").val(rowData.remark);
		$("#updateOrderWindow").dialog("open");
	});
}
