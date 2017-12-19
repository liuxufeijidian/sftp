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
			constTypeDesc : key
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
// 初始化菜单
function initTypeGrid() {
	$('#type-jqgrid').jqGrid(
			{
				url : '/sys/findConstTypeByParam',
				datatype : 'json',
				mtype : 'POST',
				height : '370',
				colNames : [ '静态类型ID', '静态值用途', '静态类型编码', '静态类型描述', '排序' ],
				colModel : [ {
					name : 'constTypeId',
					index : 'constTypeId',
					width : 100,
					key : true,
					hidden : true
				}, {
					name : 'constTypeUse',
					index : 'constTypeUse',
					width : 100,
					hidden : true
				}, {
					name : 'constTypeCode',
					index : 'constTypeCode',
					width : 100
				}, {
					name : 'constTypeDesc',
					index : 'constTypeDesc',
					width : 100
				}, {
					name : 'sort',
					index : 'sort',
					width : 60
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#type-pjqgrid',
				sortname : 'sort',
				toolbarfilter : true,
				viewrecords : true,
				sortorder : "desc",
				gridComplete : function() {
				},
				caption : '<i class="fa fa-user"></i>&nbsp;静态值类型维护',
				multiselect : false,
				autowidth : false,
				onSelectRow : function(id) {
					if (id && id !== lastSel) {
						$("#addConstForm").find("input[name=constTypeId]").val(
								id);
						lastSel = id;
						var params = $('#val-jqgrid').jqGrid("getGridParam",
								"postData");
						$.extend(params, {
							constTypeId : lastSel
						});
						console.log(params);
						$("#val-jqgrid").jqGrid("setGridParam", {
							postData : params
						}).trigger("reloadGrid");
					}
				}
			});
	// 刷新页面
	$("#type-jqgrid").jqGrid('navGrid', "#type-pjqgrid", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});
	// 菜单
	var btns = {
		gridFooter : "type-pjqgrid_left",
		btn : [ {
			id : 'delete_type',
			text : '删除类型',
			btnIcon : 'fa fa-times',
			btnCls : 'btn btn-sm btn-danger'
		}, {
			id : 'update_type',
			text : '修改类型',
			btnIcon : 'fa fa-pencil',
			btnCls : 'btn btn-sm btn-primary'
		}, {
			id : 'add_type',
			text : '增加类型',
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
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建静态值类型信息</h4></div>",
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
											$.ajax({
												url : "/sys/addConstType",
												type : "POST",
												data : $("#addTypeForm")
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
													$("#addTypeWindow").dialog(
															"close");
												},
												error : function(data) {
													$.smartFailure({
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
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改静态值类型信息</h4></div>",
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
														url : "http://192.168.30.115/sys/updateConstType",
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
// 类型菜单点击打开
function initTypeMethod() {
	$("#add_type").click(function() {
		$("#addTypeWindow").dialog("open");
	});
	$("#delete_type").click(function() {
		var id = $('#type-jqgrid').jqGrid('getGridParam', 'selrow');
		if (id != null) {
			$.ajax({
				url : "/deleteConstType",
				type : "POST",
				data : {
					"constTypeId" : id
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
		var id = $('#type-jqgrid').jqGrid('getGridParam', 'selrow');
		if (id != null) {
			$.ajax({
				url : "/sys/getConstType",
				data : {
					"constTypeId" : id
				},
				type : "post",
				dataType : "json",
				async : false,
				success : function(data) {
					if (data) {
						$("#constTypeId").val(data.constTypeId);
						$("#constTypeCode").val(data.constTypeCode);
						$("#constTypeDesc").val(data.constTypeDesc);
						$("#sort").val(data.sort);
						$("#editTypeWindow").dialog("open");
					}
				}
			});
		} else {
			alert("请选择修改的记录");
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