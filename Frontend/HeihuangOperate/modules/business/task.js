var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
var datetimepicker = require("/components/datetimepicker/bootstrap-datetimepicker.js");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");
require("base64/jbase64");

initGrid();
initDateTime();
initMethod();

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
		url : '/business/pageTask',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '任务内容', '小区名', '房号', '停车位置', '在库时间', '用户名', '手机号', '车牌号', '完成状态','内饰清洗'],
		colModel : [{
			name : 'taskId',
			index : 'taskId',
			key : true,
			hidden : true
		}, {
			name : 'taskName',
			index : 'taskName',
			width : 60
		}, {
			name : 'villageName',
			index : 'villageName',
			width : 60
		}, {
			name : 'roomNo',
			index : 'roomNo',
			width : 60
		}, {
			name : 'position',
			index : 'position',
			width : 60
		}, {
			name : 'timeDetail',
			index : 'timeDetail',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == "" || cellvalue == null) {
					return "一直在库";
				} else {
					return cellvalue;
				}
			}
		}, {
			name : 'userName',
			index : 'userName',
			width : 60
		}, {
			name : 'mobile',
			index : 'mobile',
			width : 60
		}, {
			name : 'plate',
			index : 'plate',
			width : 60
		}, {
			name : 'finish',
			index : 'finish',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "未完成";
				} else {
					return "已完成";
				}
			}
		},{
			name : 'insideWash',
			index : 'insideWash',
			width : 60,
			formatter : function(cellvalue) {
				if (cellvalue == 0) {
					return "否";
				} else if(cellvalue == 1){
					return "是";
				}
			}
		}
		
		],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'taskId',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-shopping-cart"></i>&nbsp;洗车排班管理',
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
		id : 'set_finished',
		text : '设置已完成',
		btnIcon : 'fa fa-play',
		btnCls : 'btn btn-sm btn-info'
	}, {
		id : 'set_unfinished',
		text : '设置未完成',
		btnIcon : 'fa fa-stop',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'download_task',
		text : '下载排班信息',
		btnIcon : 'fa fa-taxi',
		btnCls : 'btn btn-sm btn-success'
	}, {
		id : 'generate_task',
		text : '生成排班信息',
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
	$("#generate_task").click(function() {
		$.ajax({
			url : "/business/generateTask",
			type : "POST",
			data : {
				generateDate: $.formatDate(new Date(), "yyyy-MM-dd")
			},
			async : false,
			success : function(data) {
				if (data == 1) {
					$.smartSuccess({
						content : "生成成功"
					});
					$('#jqgrid').jqGrid().trigger("reloadGrid");
				} else {
					$.smartSuccess({
						content : "生成失败"
					});
				}
			},
			error : function(data) {
				$.smartFailure({
					content : "生成错误"
				});
			}
		});
	});
	$("#generate-btn").click(function() {
		$.ajax({
			url : "/business/generateTask",
			type : "POST",
			data : {
				generateDate: $("#generateDate").val()
			},
			async : false,
			success : function(data) {
				if (data == 1) {
					$.smartSuccess({
						content : "生成成功"
					});
					$('#jqgrid').jqGrid().trigger("reloadGrid");
				} else {
					$.smartSuccess({
						content : "生成失败"
					});
				}
			},
			error : function(data) {
				$.smartFailure({
					content : "生成错误"
				});
			}
		});
	});
	$("#download_task").click(function() {
		window.open("/business/downloadTask");
	});

	$("#set_unfinished").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要设置的排班项"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		var taskId = rowData.taskId;
		$.ajax({
			url : "/business/updateTask",
			type : "POST",
			async : false,
			data : {
				taskId : taskId,
				status : 0
			},
			success : function(data) {
				$.smartSuccess({
					content : "设置成功"
				});
				$('#jqgrid').jqGrid().trigger("reloadGrid");
			},
			error : function(data) {
				$.smartFailure({
					content : "设置错误"
				});
			}
		});
	});

	$("#set_finished").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要设置的排班项"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		var taskId = rowData.taskId;
		$.ajax({
			url : "/business/updateTask",
			type : "POST",
			async : false,
			data : {
				taskId : taskId,
				status : 1
			},
			success : function(data) {
				$.smartSuccess({
					content : "设置成功"
				});
				$('#jqgrid').jqGrid().trigger("reloadGrid");
			},
			error : function(data) {
				$.smartFailure({
					content : "设置错误"
				});
			}
		});
	});
}

var createExcelFromGrid = function(gridID, filename) {
	var grid = $('#' + gridID);
	var rowIDList = grid.getDataIDs();
	var row = grid.getRowData(rowIDList[0]);
	var colNames = [];
	var i = 0;
	for (var cName in row) {
		colNames[i++] = cName;
		// Capture Column Names
	}
	var html = "";
	for (var j = 0; j < rowIDList.length; j++) {
		row = grid.getRowData(rowIDList[j]);
		// Get Each Row
		for (var i = 0; i < colNames.length; i++) {
			html += row[colNames[i]] + ';';
			// Create a CSV delimited with ;
		}
		html += '\n';
	}
	html += '\n';
	console.log(html);
	var a = document.createElement('a');
	a.id = 'ExcelDL';
	a.href = 'data:application/vnd.ms-excel;base64,' + window.btoa(unescape(encodeURIComponent(html)));
	console.log(a.href);
	a.download = filename ? filename + ".xls" : 'DataList.xls';
	document.body.appendChild(a);
	a.click();
	// Downloads the excel document
	document.getElementById('ExcelDL').remove();
}; 