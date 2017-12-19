var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");
var lastSel = '';
// 静态值类型初始化
initTypeGrid();
initTypeDialog();
initTypeMethod();
// 静态值初始化
initValGrid();
initConstDialog();
initConstMethod();

// 静态值类型检索
$("#search-btn").click(function() {
	var key = $("#desc").val();
	if (key != "") {
		var params = $('#type-jqgrid').jqGrid("getGridParam", "postData");
		$.extend(params, {
			replyName : key
		});
		$("#type-jqgrid").jqGrid("setGridParam", {
			postData : params
		}).trigger("reloadGrid");
	} else {
		$.smartFailure({
			content : "请输入检索关键字"
		});
	}
});
function initTypeGrid() {
	$('#type-jqgrid').jqGrid({
		url : '/business/findComplainByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : [ 'ID', '投诉内容', '投诉内容', '回复内容', '回复人姓名' ],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : 100,
			key : true,
			hidden : true
		}, {
			name : 'complainContent',
			index : 'complainContent',
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
			width : 60
		} ],
		rownumbers : true,// 添加左侧行号
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#type-pjqgrid',
		sortname : 'replyName',
		toolbarfilter : true,
		// 是否在浏览导航栏显示记录总数
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;投诉管理',
		// 是否多选
		multiselect : true,
		autowidth : false
	/*
	 * onSelectRow : function(id) { if (id && id !== lastSel) {
	 * $("#addConstForm").find("input[name=id]").val(id); lastSel = id; var
	 * params = $('#val-jqgrid').jqGrid("getGridParam", "postData");
	 * $.extend(params, { id : lastSel }); console.log(params);
	 * $("#val-jqgrid").jqGrid("setGridParam", { postData : params
	 * }).trigger("reloadGrid"); } }
	 */
	});

	$("#type-jqgrid").jqGrid('navGrid', "#type-pjqgrid", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});

	var btns = {
		gridFooter : "type-pjqgrid_left",
		btn : [ {
			id : 'delete_type',
			text : '测试群发',
			btnIcon : 'fa fa-times',
			btnCls : 'btn btn-sm btn-danger'
		}, {
			id : 'update_type',
			text : '投诉回复',
			btnIcon : 'fa fa-pencil',
			btnCls : 'btn btn-sm btn-primary'
		}, {
			id : 'add_type',
			text : '群发短信',
			btnIcon : 'fa fa-plus-circle',
			btnCls : 'btn btn-sm btn-primary'
		} ]
	};
	$.customGridBtn(btns);
	// var params = {
	// jqgridEl : 'type-jqgrid',
	// btns : [{
	// id : "refresh_type-jqgrid",
	// cls : "fa fa-refresh"
	// }]
	// };
	// $.smartGridCls(params);
	var params = [ {
		id : "refresh_type-jqgrid",
		cls : "fa fa-refresh"
	} ];
	$.customGrid(params, $("#gridt"), $("#type-jqgrid"), "type-pjqgrid");
}

function initTypeDialog() {
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title : function(title) {
			if (!this.options.title) {
				title.html("&#160;");
			} else {
				title.html(this.options.title);
			}
		}
	}));
	$("#addTypeWindow")
			.dialog(
					{
						autoOpen : false,
						width : 450,
						resizable : false,
						modal : true,
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 发送短信</h4></div>",
						buttons : [
								{
									html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
									"class" : "btn btn-success",
									click : function() {
										var formId = parsley("#addTypeForm")
												.parsley();
										$("#addTypeForm")
												.find("input")
												.each(
														function() {
															parsley(this)
																	.parsley()
																	.on(
																			"field:error",
																			function() {
																				$(
																						this)
																						.addClass(
																								"parsley-error");
																			});
														});
										formId.validate();
										if (formId.isValid()) {
											$
													.ajax({
														url : "/business/sendsMessages",
														type : "POST",
														data : $("#addTypeForm")
																.serialize(),
														async : false,
														success : function(data) {
															if (data == 1) {
																$
																		.smartSuccess({
																			content : "保存成功"
																		});
															} else {
																$
																		.smartFailure({
																			content : "保存失败"
																		});
															}
															$("#addTypeWindow")
																	.dialog(
																			"close");
														},
														error : function(data) {
															$
																	.smartFailure({
																		content : "系统异常，请联系管理员"
																	});
														}
													});
											$.clearForm("addTypeForm");
											$("#addTypeForm")
													.find("input")
													.each(
															function() {
																$(this)
																		.removeClass(
																				"parsley-success");
															});
											$('#type-jqgrid').jqGrid().trigger(
													"reloadGrid");
										}
									}
								},
								{
									html : "<i class='fa fa-times'></i>&nbsp; 关闭",
									"class" : "btn bg-color-red txt-color-white",
									click : function() {
										$(this).dialog("close");
									}
								} ]
					});
	$("#editTypeWindow")
			.dialog(
					{
						autoOpen : false,
						width : 450,
						resizable : false,
						modal : true,
						// 标题
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 回复投诉</h4></div>",
						buttons : [
								{
									html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
									"class" : "btn btn-success",
									click : function() {
										var formId = parsley("#editTypeForm")
												.parsley();
										$("#editTypeForm")
												.find("input")
												.each(
														function() {
															parsley(this)
																	.parsley()
																	.on(
																			"field:error",
																			function() {
																				$(
																						this)
																						.addClass(
																								"parsley-error");
																			});
														});
										formId.validate();
										if (formId.isValid()) {
											$
													.ajax({
														url : "/business/updateComplain",
														type : "POST",
														data : $(
																"#editTypeForm")
																.serialize(),
														async : false,
														success : function(data) {
															if (data == 1) {
																$
																		.smartSuccess({
																			content : "修改成功"
																		});
															} else {
																$
																		.smartFailure({
																			content : "修改失败"
																		});
															}
															$("#editTypeWindow")
																	.dialog(
																			"close");
														},
														error : function(data) {
															$
																	.smartFailure({
																		content : "系统异常，请联系管理员"
																	});
														}
													});
											$.clearForm("editTypeForm");
											$("#editTypeForm")
													.find("input")
													.each(
															function() {
																$(this)
																		.removeClass(
																				"parsley-success");
															});
											$('#type-jqgrid').jqGrid().trigger(
													"reloadGrid");
										}
									}
								},
								{
									html : "<i class='fa fa-times'></i>&nbsp; 关闭",
									"class" : "btn bg-color-red txt-color-white",
									click : function() {
										$(this).dialog("close");
									}
								} ]
					});
}
// 菜单的点击事件
function initTypeMethod() {
	$("#add_type").click(function() {
		alert("不能使用");
		$("#addTypeWindow").dialog("open");
	});
	$("#delete_type").click(function() {
		 //var id = $('#type-jqgrid').jqGrid('getGridParam', 'selrow');
		// 获取所选行的id
		var ids= $('#type-jqgrid').jqGrid('getGridParam', 'selarrrow');
		alert(ids[1]);
		//var RowData=$("#type-jqgrid").jqGrid('getRowData','ids');
		var counts="";
		for(var i=0;i<ids.length;i++){
			var rowData=$("#type-jqgrid").jqGrid('getRowData',ids[i]);
			counts=counts.concat(rowData.id);
			
		}
				alert(counts+"end");
				
				alert(id);
		if (ids != null) {
			$.ajax({
				url : "/business/getRows",
				type : "POST",
				data : {
					ids:counts
				},
				async : false,
				success : function(data) {
					if (data == 1) {
						$('#type-jqgrid').jqGrid().trigger("reloadGrid");
						$.smartSuccess({
							content : "删除成功"
						});
					} else {
						$.smartFailure({
							content : "删除失败"
						});
					}
				},
				error : function(data) {
					$.smartFailure({
						content : "系统异常，请联系管理员"
					});
				}
			});
		} else {
			$.smartFailure({
				content : "请选择要删除的记录"
			});
		}
	});
	$("#update_type").click(function() {
		// 获取单个id
		var id = $('#type-jqgrid').jqGrid('getGridParam', 'selrow');
		if (id != null) {
			$.ajax({
				url : "/business/getComplain",
				data : {
					// 一行隐藏的主键id值
					"id" : id
				},
				type : "post",
				dataType : "json",
				async : false,
				// 成功返回的数据
				success : function(data) {
					if (data) {
						$("#complainContent").val(data.complainContent);
						$("#replyContent").val(data.replyContent);
						$("#replyName").val(data.replyName);
						$("#id").val(data.id);
						$("#editTypeWindow").dialog("open");
					}
				}
			});
		} else {
			alert("请选择修改投诉的内容");
		}
	});
}

function initValGrid() {
	$('#val-jqgrid').jqGrid({
		url : '/sys/findConstValueByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : [ 'ID', '静态类型ID', '上级静态值', '静态值', '静态值描述', '排序', '数据取值' ],
		colModel : [ {
			name : 'id',
			index : 'id',
			key : true,
			width : 100,
			hidden : true
		}, {
			name : 'constTypeId',
			index : 'constTypeId',
			width : 100,
			hidden : true
		}, {
			name : 'upperValueId',
			index : 'upperValueId',
			width : 60,
			hidden : true
		}, {
			name : 'constValue',
			index : 'constValue',
			width : 60,
			hidden : true
		}, {
			name : 'constDesc',
			index : 'constDesc',
			width : 100
		}, {
			name : 'sort',
			index : 'sort',
			width : 60
		}, {
			name : 'dataValue',
			index : 'dataValue',
			hidden : true,
			width : 60
		} ],
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		pager : '#val-pjqgrid',
		sortname : 'sort',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;静态值维护',
		multiselect : false,
		autowidth : false
	});

	$("#val-jqgrid").jqGrid('navGrid', "#val-pjqgrid", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});

	var btns = {
		gridFooter : "val-pjqgrid_left",
		btn : [ {
			id : 'delete_val',
			text : '删除静态值',
			btnIcon : 'fa fa-times',
			btnCls : 'btn btn-sm btn-danger'
		}, {
			id : 'update_val',
			text : '修改静态值',
			btnIcon : 'fa fa-pencil',
			btnCls : 'btn btn-sm btn-primary'
		}, {
			id : 'add_val',
			text : '增加静态值',
			btnIcon : 'fa fa-plus-circle',
			btnCls : 'btn btn-sm btn-primary'
		} ]
	};
	$.customGridBtn(btns);
	// var params = {
	// jqgridEl : 'val-jqgrid',
	// btns : [{
	// id : "refresh_val-jqgrid",
	// cls : "fa fa-refresh"
	// }]
	// };
	// $.smartGridCls(params);
	var params = [ {
		id : "refresh_val-jqgrid",
		cls : "fa fa-refresh"
	} ];
	$.customGrid(params, $("#gridv"), $("#val-jqgrid"), "val-pjqgrid");
}

function initConstDialog() {
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title : function(title) {
			if (!this.options.title) {
				title.html("&#160;");
			} else {
				title.html(this.options.title);
			}
		}
	}));
	$("#addContWindow")
			.dialog(
					{
						autoOpen : false,
						width : 450,
						resizable : false,
						modal : true,
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建静态值信息</h4></div>",
						buttons : [
								{
									html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
									"class" : "btn btn-success",
									click : function() {
										var formId = parsley("#addConstForm")
												.parsley();
										$("#addConstForm")
												.find("input")
												.each(
														function() {
															parsley(this)
																	.parsley()
																	.on(
																			"field:error",
																			function() {
																				$(
																						this)
																						.addClass(
																								"parsley-error");
																			});
														});
										formId.validate();
										if (formId.isValid()) {
											$.ajax({
												url : "/sys/addConstValue",
												type : "POST",
												data : $("#addConstForm")
														.serialize(),
												async : false,
												success : function(data) {
													if (data == 1) {
														$.smartSuccess({
															content : "保存成功"
														});
													} else {
														$.smartFailure({
															content : "保存失败"
														});
													}
													$("#addContWindow").dialog(
															"close");
												},
												error : function(data) {
													$.smartFailure({
														content : "系统异常，请联系管理员"
													});
												}
											});
											$.clearForm("addConstForm");
											$("#addConstForm")
													.find("input")
													.each(
															function() {
																$(this)
																		.removeClass(
																				"parsley-success");
															});
											$('#val-jqgrid').jqGrid().trigger(
													"reloadGrid");
										}
									}
								},
								{
									html : "<i class='fa fa-times'></i>&nbsp; 关闭",
									"class" : "btn bg-color-red txt-color-white",
									click : function() {
										$(this).dialog("close");
									}
								} ]
					});
	$("#editContWindow")
			.dialog(
					{
						autoOpen : false,
						width : 450,
						resizable : false,
						modal : true,
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改静态值信息</h4></div>",
						buttons : [
								{
									html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
									"class" : "btn btn-success",
									click : function() {
										var formId = $("#editConstForm")
												.parsley();
										$("#editConstForm")
												.find("input")
												.each(
														function() {
															$(this)
																	.parsley()
																	.on(
																			"field:error",
																			function() {
																				$(
																						this)
																						.addClass(
																								"parsley-error");
																			});
														});
										formId.validate();
										if (formId.isValid()) {
											$.ajax({
												url : "/sys/updateConstValue",
												type : "POST",
												data : $("#editConstForm")
														.serialize(),
												async : false,
												success : function(data) {
													if (data == 1) {
														$.smartSuccess({
															content : "修改成功"
														});
													} else {
														$.smartFailure({
															content : "修改失败"
														});
													}
													$("#editContWindow")
															.dialog("close");
												},
												error : function(data) {
													$.smartFailure({
														content : "系统异常，请联系管理员"
													});
												}
											});
											$.clearForm("editConstForm");
											$("#editConstForm")
													.find("input")
													.each(
															function() {
																$(this)
																		.removeClass(
																				"parsley-success");
															});
											$('#val-jqgrid').jqGrid().trigger(
													"reloadGrid");
										}
									}
								},
								{
									html : "<i class='fa fa-times'></i>&nbsp; 关闭",
									"class" : "btn bg-color-red txt-color-white",
									click : function() {
										$(this).dialog("close");
									}
								} ]
					});
}

function initConstMethod() {
	$("#add_val").click(function() {
		if (lastSel != "") {
			$("#constTypeId").val(lastSel);
			$("#addContWindow").dialog("open");
		} else {
			$.smartFailure({
				content : "请选择所属静态值类型"
			});
		}
	});
	$("#delete_val").click(function() {
		var id = $('#val-jqgrid').jqGrid('getGridParam', 'selrow');
		if (id != null) {
			$.ajax({
				url : "/sys/deleteConstValue",
				type : "POST",
				data : {
					"constValueId" : id
				},
				async : false,
				success : function(data) {
					if (data == 1) {
						$('#val-jqgrid').jqGrid().trigger("reloadGrid");
						$.smartSuccess({
							content : "删除成功"
						});
					} else {
						$.smartFailure({
							content : "删除失败"
						});
					}
				},
				error : function(data) {
					$.smartFailure({
						content : "系统异常，请联系管理员"
					});
				}
			});
		} else {
			$.smartFailure({
				content : "请选择要删除的记录"
			});
		}
	});
	$("#update_val").click(function() {
		var id = $('#val-jqgrid').jqGrid('getGridParam', 'selrow');
		if (id != null) {
			$.ajax({
				url : "/sys/getConstValue",
				data : {
					"constValueId" : id
				},
				type : "post",
				dataType : "json",
				async : false,
				success : function(data) {
					if (data) {
						$("#deviceId").val(data.deviceId);
						$("#id").val(data.id);
						$("#constValue").val(data.constValue);
						$("#constDesc").val(data.constDesc);
						$("#sort").val(data.sort);
						$("#editContWindow").dialog("open");
					}
				}
			});
		} else {
			alert("请选择修改的记录");
		}
	});
}