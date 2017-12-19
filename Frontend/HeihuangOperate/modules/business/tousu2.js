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
	//更新
	$("#updateUserWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改回复信息</h4></div>",
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

//分页信息
function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/business/findComplainByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', 'userId','complainContent','replyContent','replyName'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'userId',
			index : 'userId',
			width : 100,
			hidden : true
		}, {
			name : 'complainContent',
			index : 'complainContent',
			width : 100
			
		}, {
			name : 'replyContent',
			index : 'replyContent',
			width : 100
		}, {
			name : 'replyName',
			index : 'replyName',
			width : 100
		
		}],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'replyName',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-shopping-cart"></i>&nbsp;投诉管理',
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
		text : '投诉回复',
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
	//投诉回复
	$("#modify_user").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的投诉"
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

