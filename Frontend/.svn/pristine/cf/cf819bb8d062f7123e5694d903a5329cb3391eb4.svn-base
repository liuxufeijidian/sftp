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
initGrid();
initMethod();
initDateTime();

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
	
	$("#updateUserWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改订单信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#updateUserForm").parsley();
				$("#updateUserForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					var ucStatus = $("#updateUserForm").find("select[name=userCarStatus]").val();
					var params = {
						id: $("#updateUserForm").find("input[name=id]").val(),
						orderStatus: $("#updateUserForm").find("select[name=orderStatus]").val(),
						userCarStatus: ucStatus,
						serviceTime: $("#updateUserForm").find("input[name=serviceTime]").val()
					};
					if(ucStatus == 0) {
						params.userCarTime = $("#updateUserForm").find("select[name=userCarTime]").val();
					} else {
						params.userCarTime = "  ";
					}
					$.ajax({
						url : "/business/modifyCarBeauty",
						type : "POST",
						data : params,
						async : false,
						success : function(data) {
							if (data.success) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#updateUserWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#updateUserWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$("#updateUserForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("updateUserForm");
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


function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/business/pageCarBeauty',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '订单号', 'userId', '用户名', '手机', '性别', '小区id', '小区', '房号', 'userCarId', '车牌号', '车位 ', '是否在库code', '车型', '是否在库', '在库时间', '服务时间', '订单车位', '支付金额', '美容项目', '订单状态code', '订单状态', '备注', '创建时间'],
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
			width : 60
		}, {
			name : 'mobile',
			index : 'mobile',
			width : 60
		}, {
			name : 'sex',
			index : 'sex',
			width : 60,
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
			width : 60,
			hidden : true
		}, {
			name : 'villeage',
			index : 'villeage',
			width : 60
		}, {
			name : 'roomNo',
			index : 'roomNo',
			width : 60
		}, {
			name : 'userCarId',
			index : 'userCarId',
			width : 60,
			hidden : true
		}, {
			name : 'plate',
			index : 'plate',
			width : 60
		}, {
			name : 'parkArea',
			index : 'parkArea',
			width : 60,
			hidden : true
		}, {
			name : 'carType',
			index : 'carType',
			width : 60
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
			name : 'serviceTime',
			index : 'serviceTime',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd');
			}
		}, {
			name : 'userCarPosition',
			index : 'userCarPosition',
			width : 60
		}, {
			name : 'payPrice',
			index : 'payPrice',
			width : 60
		}, {
			name : 'beautyType',
			index : 'beautyType',
			width : 60
		}, {
			name : 'orderStatus',
			index : 'orderStatus',
			hidden: true
		}, {
			name : 'orderStatusName',
			index : 'orderStatus',
			width : 60,
			formatter : function(cellvalue, options, rowObject) {
				var c = rowObject.orderStatus;
				if(c == 0) {
					return "微信支付-未支付";
				} else if(c == 1) {
					return "现金支付-未支付";
				} else if(c == 2) {
					return "已支付";
				} else if(c == 3) {
					return "服务结束";
				}else if (c == 7) {
					return "已取消";
				}
			}
		}, {
			name : 'remark',
			index : 'remark',
			width : 60
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
		id : 'modify_user',
		text : '修改订单资料',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'modify_user_car',
		text : '修改车辆信息',
		btnIcon : 'fa fa-taxi',
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
	
	$("#updateUserForm").find("select[name=userCarStatus]").change(function() {
		var userCarStatus = $(this).val();
		if(userCarStatus == 1) {
			$("#userCarTimeSec").hide();
		} else {
			$("#userCarTimeSec").show();
		}
	});
	
	$("#modify_user").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的订单"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		$("#updateUserForm").find("select[name=userCarStatus]").find("option[value=" + rowData.userCarStatus + "]").attr("selected", true);
		if(rowData.userCarStatus == 1) {
			$("#userCarTimeSec").hide();
		} else {
			$("#userCarTimeSec").show();
		}
		$("#updateUserForm").find("input[name=id]").val(rowData.id);
		$("#updateUserForm").find("input[name=serviceTime]").val(rowData.serviceTime);
		$("#updateUserWindow").dialog("open");
	});
}

