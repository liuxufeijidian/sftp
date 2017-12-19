var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

initDialog();
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
	$("#updatePetWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改宠物信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#updatePetForm").parsley();
				$("#updatePetForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					$.ajax({
						url : "/business/updatePet",
						type : "POST",
						data : $("#updatePetForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#updatePetWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#updatePetWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
							$("#updatePetWindow").dialog("close");
						}
					});
					$("#updatePetForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("updatePetForm");
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
					var params = {
						id: $("#updateUserForm").find("input[name=id]").val(),
						orderStatus: $("#updateUserForm").find("select[name=orderStatus]").val(),
						petItem: $("#updateUserForm").find("input[name=petItem]").val(),
						payPrice: $("#updateUserForm").find("input[name=payPrice]").val()
					};
					$.ajax({
						url : "/business/modifyPetOrder",
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
		url : '/business/pagePetOrder',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '订单号', 'userId', '用户名', '手机', '性别', '地址', '时间', 'petId', '宠物名', '宠物编号', '宠物年龄', '宠物类型', '攻击性', '宠物身体状况', '洗护项目', '费用', '订单状态', '备注', '创建时间'],
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
			name : 'address',
			index : 'address',
			width : 60
		}, {
			name : 'time',
			index : 'time',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
			}
		}, {
			name : 'petId',
			index : 'petId',
			width : 60,
			hidden : true
		}, {
			name : 'petName',
			index : 'petName',
			width : 60
		}, {
			name : 'petNumber',
			index : 'petNumber',
			width : 60,
			formatter : function(cellvalue, options, rowObject) {
				return rowObject.id;
			}
		}, {
			name : 'petAge',
			index : 'petAge',
			width : 60,
			hidden : true
		}, {
			name : 'petType',
			index : 'petType',
			width : 60
		}, {
			name : 'isAttack',
			index : 'isAttack',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "没有攻击性";
				} else {
					return "具有攻击性";
				}
			}
		}, {
			name : 'petCondition',
			index : 'petCondition',
			width : 60
		}, {
			name : 'petItem',
			index : 'petItem',
			width : 60
		}, {
			name : 'payPrice',
			index : 'payPrice',
			width : 60
		}, {
			name : 'orderStatus',
			index : 'orderStatus',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "微信支付-未支付";
				} else if (cellvalue == 1) {
					return "现金支付-未支付";
				} else if (cellvalue == 2) {
					return "已支付";
				} else if (cellvalue == 3) {
					return "服务结束";
				} else if (cellvalue == 4) {
					return "服务暂停";
				} else if (cellvalue == 5) {
					return "已接单";
				} else if (cellvalue == 6) {
					return "已预约";
				} else if (cellvalue == 7) {
					return "已取消";
				} else if (cellvalue == 8) {
					return "待支付";
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
		caption : '<i class="fa fa-shopping-cart"></i>&nbsp;宠物洗护管理',
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
		id : 'check_user_pet',
		text : '修改宠物资料',
		btnIcon : 'fa fa-slideshare',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'check_user_car',
		text : '查看订单历史状态',
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
	$("#check_user_pet").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的宠物"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		$("#updatePetForm").find("input[name=petName]").val(rowData.petName);
		$("#updatePetForm").find("input[name=petAge]").val(rowData.petAge);
		$("#updatePetForm").find("input[name=petType]").val(rowData.petType);
		$("#updatePetForm").find("input[name=isAttack]").val(rowData.isAttack);
		$("#updatePetForm").find("input[name=petCondition]").val(rowData.petCondition);
		$("#updatePetForm").find("input[name=remark]").val(rowData.remark);
		$("#updatePetForm").find("input[name=userId]").val(rowData.userId);
		$("#updatePetForm").find("input[name=id]").val(rowData.petId);
		$("#updatePetWindow").dialog("open");
	});
	
	$("#modify_user").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改车辆的订单"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		$("#updateUserForm").find("input[name=id]").val(rowData.id);
		$("#updateUserForm").find("input[name=petItem]").val(rowData.petItem);
		$("#updateUserForm").find("input[name=payPrice]").val(rowData.payPrice);
		$("#updateUserWindow").dialog("open");
	});
}
