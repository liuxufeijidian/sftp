var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

initGrid();
initMethod();
initDialog();

function initGrid() {
	$('#jqgrid').jqGrid(
			{
				url : '/business/pageCardOrder',
				datatype : 'json',
				mtype : 'POST',
				height : '370',
				colNames : [ 'id', '订单号', 'userId', '用户名', '手机', '性别',
						'购买车型', 'villeageId', '小区', '房号', '套餐类型', '剩余次数', '金额',
						'订单状态', '备注', '过期时间', '创建时间' ],
				colModel : [ {
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
					name : 'carType',
					index : 'carType',
					width : 60,
					formatter : function(value) {
						if (value == 0) {
							return "仅轿车";
						} else {
							return "SUV及轿车";
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
					name : 'orderType',
					index : 'orderType',
					width : 60,
					formatter : function(cellvalue) {
						if (cellvalue == 0) {
							return "半年10次";
						} else if (cellvalue == 1) {
							return "半年20次";
						} else {
							return "季度10次";
						}
					}
				}, {
					name : 'leftCount',
					index : 'leftCount',
					width : 60
				}, {
					name : 'payPrice',
					index : 'payPrice',
					width : 30
				}, {
					name : 'orderStatus',
					index : 'orderStatus',
					width : 40,
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
						} else if (cellvalue == 7) {
							return "已取消";
						}
					}
				}, {
					name : 'remark',
					index : 'remark',
					width : 60
				}, {
					name : 'endTime',
					index : 'endTime',
					width : 60,
					formatter : function(value) {
						return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
					}
				}, {
					name : 'createTime',
					index : 'createTime',
					width : 60,
					formatter : function(value) {
						return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
					}
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#pjqgrid',
				sortname : 'createTime',
				toolbarfilter : true,
				viewrecords : true,
				sortorder : "desc",
				gridComplete : function() {
				},
				caption : '<i class="fa fa-shopping-cart"></i>&nbsp;次卡洗车管理',
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
	var btns = [ {
		id : 'modify_user',
		text : '修改订单资料',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'check_user_car',
		text : '查看订单历史状态',
		btnIcon : 'fa fa-taxi',
		btnCls : 'btn btn-sm btn-success'
	}, {
		id : 'check_user_car',
		text : '查看订单清洗记录',
		btnIcon : 'fa fa-files-o',
		btnCls : 'btn btn-sm btn-info'
	} ];
	$.addGridBtn(btns);
	var params = [ {
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	} ];
	$.customBtnCls(params);
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
	$("#updateUserWindow")
			.dialog(
					{
						autoOpen : false,
						width : 350,
						resizable : false,
						modal : true,
						title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改订单信息</h4></div>",
						buttons : [
								{
									html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
									"class" : "btn btn-success",
									click : function() {
										var formId = parsley("#updateUserForm")
												.parsley();
										$("#updateUserForm")
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
											var params = {
												id : $("#updateUserForm").find(
														"input[name=id]").val(),
												orderStatus : $(
														"#updateUserForm")
														.find(
																"select[name=orderStatus]")
														.val()
											};
											$
													.ajax({
														url : "/business/modifyCardOrder",
														type : "POST",
														data : params,
														async : false,
														success : function(data) {
															if (data.success) {
																$
																		.smartSuccess({
																			content : "保存成功"
																		});
																$(
																		"#updateUserWindow")
																		.dialog(
																				"close");
															} else {
																$
																		.smartFailure({
																			content : "保存失败"
																		});
																$(
																		"#updateUserWindow")
																		.dialog(
																				"close");
															}
														},
														error : function(data) {
															$
																	.smartFailure({
																		content : "系统异常，请联系管理员"
																	});
														}
													});
											$("#updateUserForm")
													.find("input")
													.each(
															function() {
																$(this)
																		.removeClass(
																				"parsley-success");
															});
											$.clearForm("updateUserForm");
											$('#jqgrid').jqGrid().trigger(
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

function initMethod() {
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
		$("#updateUserWindow").dialog("open");
	});
}
