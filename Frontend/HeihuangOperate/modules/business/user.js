var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

var postData = {};

initData();
initDialog();
initGrid();
initMethod();

function initData() {
	$.ajax({
		url : "/sys/findConstType",
		type : "POST",
		async : false,
		success : function(data) {
			if (data) {
				var option = "";
				for (var i = 0; i < data.length; i++) {
					option += "<option value='" + data[i].constTypeId + "'>" + data[i].constTypeDesc + "</option>";
				}
				$("#updateUserForm").find("select[name=villeage]").html(option);
			}
		},
		error : function(data) {
			$.smartFailure({
				content : "数据初始化失败"
			});
		}
	});
	$.ajax({
		url : "/business/findUseableCoupon",
		type : "POST",
		async : false,
		success : function(data) {
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var temp = "";
					if (data[i].discountType == 0) {
						temp = "现金:" + data[i].discountValue;
					} else {
						temp = "折扣:" + data[i].discountValue;
					}
					if (data[i].couponType == 0) {
						$("#couponList").append("<option value='" + data[i].id + "'>通用优惠券-" + temp + "</option>");
					} else if (data[i].couponType == 1) {
						$("#couponList").append("<option value='" + data[i].id + "'>单次洗车-" + temp + "</option>");
					} else if (data[i].couponType == 2) {
						$("#couponList").append("<option value='" + data[i].id + "'>包月洗车-" + temp + "</option>");
					} else if (data[i].couponType == 3) {
						$("#couponList").append("<option value='" + data[i].id + "'>次卡洗车-" + temp + "</option>");
					} else if (data[i].couponType == 4) {
						$("#couponList").append("<option value='" + data[i].id + "'>汽车美容-" + temp + "</option>");
					} else if (data[i].couponType == 5) {
						$("#couponList").append("<option value='" + data[i].id + "'>宠物管家-" + temp + "</option>");
					}
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
	$("#sendMsgWindow").dialog({
		autoOpen : false,
		width : 650,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 发送用户通知短信</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 发送",
			"class" : "btn btn-success",
			click : function() {
				if ($("#message").val() == "") {
					$.smartFailure({
						content : "短信内容不能为空"
					});
				}
				$.ajax({
					url : "/business/sendMessage",
					type : "POST",
					data : $("#sendMsgForm").serialize(),
					async : false,
					success : function(data) {
						if (data == 1) {
							$.smartSuccess({
								content : "发送成功"
							});
						} else {
							$.smartFailure({
								content : "发送失败"
							});
						}
						$("#sendMsgWindow").dialog("close");
					},
					error : function(data) {
						$.smartFailure({
							content : "发送失败"
						});
						$("#sendMsgWindow").dialog("close");
					}
				});
			}
		}, {
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#checkPetWindow").dialog({
		autoOpen : false,
		width : 650,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 查看用户宠物信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#addUserCouponWindow").dialog({
		autoOpen : false,
		width : 650,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 分配优惠券</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 发送",
			"class" : "btn btn-success",
			click : function() {
				$.ajax({
					url : "/business/sendMessageByUserCoupon",
					type : "POST",
					data : $("#addUserCouponForm").serialize(),
					async : false,
					success : function(data) {
						if (data == 1) {
							$.smartSuccess({
								content : "分配成功"
							});
						} else {
							$.smartFailure({
								content : "分配失败"
							});
						}
						$("#addUserCouponWindow").dialog("close");
					},
					error : function(data) {
						$.smartFailure({
							content : "分配失败"
						});
						$("#addUserCouponWindow").dialog("close");
					}
				});
			}
		}, {
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#checkUserCarWindow").dialog({
		autoOpen : false,
		width : 650,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 查看用户车辆信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-times'></i>&nbsp; 关闭",
			"class" : "btn bg-color-red txt-color-white",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#addUserCarWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 添加用户车辆信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addUserCarForm").parsley();
				$("#addUserCarForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					$.ajax({
						url : "/business/saveUserCar",
						type : "POST",
						data : $("#addUserCarForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addUserCarWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addUserCarWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$("#addUserCarForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("addUserCarForm");
					$('#userCarGrid').jqGrid().trigger("reloadGrid");
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
					$('#userCarGrid').jqGrid().trigger("reloadGrid");
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
	$("#addPetWindow").dialog({
		autoOpen : false,
		width : 350,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 添加宠物信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addPetForm").parsley();
				$("#addPetForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if (formId.isValid()) {
					$.ajax({
						url : "/business/savePet",
						type : "POST",
						data : $("#addPetForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addPetWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addPetWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
							$("#addPetWindow").dialog("close");
						}
					});
					$("#addPetForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
					$.clearForm("addPetForm");
					$('#petGrid').jqGrid().trigger("reloadGrid");
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
					$('#petGrid').jqGrid().trigger("reloadGrid");
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

	$("#checkUserCouponWindow").dialog({
		autoOpen : false,
		width : 650,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 查看用户优惠券信息</h4></div>",
		buttons : [{
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
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改用户信息</h4></div>",
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
					$.ajax({
						url : "/business/updateUser",
						type : "POST",
						data : $("#updateUserForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
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
				$.clearForm("updateUserForm");
				$(this).dialog("close");
			}
		}]
	});
}

function initGrid() {
	initUserGrid();
	initPetGrid();
	initUserCarGrid();
	initUserCouponGrid();
}

function initUserGrid() {
	$('#jqgrid').jqGrid({
		url : '/business/pageUser',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '用户名', '性别', '手机号', '用户余额(元)', '小区Id', '所在小区', '房号', '微信昵称', '关注状态', '关注时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'userName',
			index : 'userName',
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
			name : 'mobile',
			index : 'mobile',
			width : 60
		}, {
			name : 'money',
			index : 'money',
			width : 60
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
			name : 'nickName',
			index : 'nickName',
			width : 60
		}, {
			name : 'subscribe',
			index : 'subscribe',
			width : 60,
			formatter : function(value) {
				if (value == 1) {
					return "已关注";
				} else {
					return "取消关注";
				}
			}
		}, {
			name : 'subscribeTime',
			index : 'subscribeTime',
			width : 60,
			formatter : function(value) {
				return $.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
			}
		}],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'subscribeTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		onSelectRow : function(rowid) {
			var rowData = $("#jqgrid").jqGrid("getRowData", rowid);
			postData.userId = rowid;
			postData.villeageId = rowData.villeageId;
			$("#addUserCarForm").find("input[name=userId]").val(rowid);
			$("#updateUserCarForm").find("input[name=userId]").val(rowid);
			$("#addPetForm").find("input[name=userId]").val(rowid);
			$("#updatePetForm").find("input[name=userId]").val(rowid);
			$("#addUserCouponForm").find("input[name=userId]").val(rowid);
			$("#sendMsgForm").find("input[name=mobile]").val(rowData.mobile);

		},
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;用户管理',
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
		id : 'send_sms',
		text : '发送短信通知',
		btnIcon : 'fa fa-newspaper-o',
		btnCls : 'btn btn-sm btn-warning'
	}, {
		id : 'modify_user',
		text : '修改用户资料',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'check_user_car',
		text : '查看用户车辆',
		btnIcon : 'fa fa-taxi',
		btnCls : 'btn btn-sm btn-success'
	}, {
		id : 'check_user_pet',
		text : '查看用户宠物',
		btnIcon : 'fa fa-slideshare',
		btnCls : 'btn btn-sm btn-info'
	}, {
		id : 'check_user_coupon',
		text : '查看用户优惠券',
		btnIcon : 'fa fa-file',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}];
	$.addGridBtn(btns);
	var params = [{
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	}];
	$.customBtnCls(params);
}

function initPetGrid() {
	$('#petGrid').jqGrid({
		url : '/business/pagePet',
		datatype : 'json',
		mtype : 'POST',
		postData : {
			'userId' : 0
		},
		height : '370',
		colNames : ['id', '宠物名', '宠物年龄', '宠物类型', '攻击性', '宠物身体状况', '备注', '创建时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'petName',
			index : 'petName',
			width : 60
		}, {
			name : 'petAge',
			index : 'petAge',
			width : 60
		}, {
			name : 'petType',
			index : 'petType',
			width : 60
		}, {
			name : 'isAttack',
			index : 'isAttack',
			width : 60
		}, {
			name : 'petCondition',
			index : 'petCondition',
			width : 60
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
		pager : '#petGridFooter',
		sortname : 'createTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;用户宠物',
		multiselect : false,
		autowidth : false
	});

	$("#petGrid").jqGrid('navGrid', "#petGridFooter", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});
	var btns = [{
		id : 'delete_pet',
		text : '修改宠物信息',
		btnIcon : 'fa fa-times',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}, {
		id : 'update_pet',
		text : '修改宠物信息',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}, {
		id : 'add_pet',
		text : '添加宠物信息',
		btnIcon : 'fa fa-plus',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}];
	$.addCustomGridBtn("petGridFooter", btns);
}

function initUserCarGrid() {
	$('#userCarGrid').jqGrid({
		url : '/business/pageUserCar',
		datatype : 'json',
		mtype : 'POST',
		postData : {
			'userId' : 0
		},
		height : '370',
		colNames : ['id', '车牌号', '车位', '车型', '备注', '创建时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'plate',
			index : 'plate',
			width : 60
		}, {
			name : 'parkArea',
			index : 'parkArea',
			width : 60
		}, {
			name : 'carType',
			index : 'carType',
			width : 60
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
		pager : '#userCarFooter',
		sortname : 'createTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;用户车辆',
		multiselect : false,
		autowidth : false
	});

	$("#userCarGrid").jqGrid('navGrid', "#userCarFooter", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});
	var btns = [{
		id : 'delete_user_car',
		text : '删除用户车辆',
		btnIcon : 'fa fa-times',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}, {
		id : 'update_user_car',
		text : '修改用户车辆',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}, {
		id : 'add_user_car',
		text : '添加用户车辆',
		btnIcon : 'fa fa-plus',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}];
	$.addCustomGridBtn("userCarFooter", btns);
}

function initUserCouponGrid() {
	$('#userCouponGrid').jqGrid({
		url : '/business/pageUserCoupon',
		datatype : 'json',
		mtype : 'POST',
		postData : {
			'userId' : 0
		},
		height : '370',
		colNames : ['id', '优惠项目', '打折类型', '折扣数目', '最高折扣金额', '状态', '过期时间', '获取时间'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
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
			name : 'discountType',
			index : 'discountType',
			width : 60
		}, {
			name : 'discountValue',
			index : 'discountValue',
			width : 60
		}, {
			name : 'maxDiscount',
			index : 'maxDiscount',
			width : 80
		}, {
			name : 'couponStatus',
			index : 'couponStatus',
			width : 40
		}, {
			name : 'expireTime',
			index : 'expireTime',
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
		}],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#userCouponFooter',
		sortname : 'createTime',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-user"></i>&nbsp;用户优惠券',
		multiselect : false,
		autowidth : false
	});

	$("#userCouponGrid").jqGrid('navGrid', "#userCouponFooter", {
		edit : false,
		add : false,
		del : false,
		search : false,
		refresh : true,
		view : false
	});
	var btns = [{
		id : 'add_user_coupon',
		text : '分配优惠券',
		btnIcon : 'fa fa-plus',
		btnCls : 'btn btn-sm bg-color-greenLight txt-color-white'
	}];
	$.addCustomGridBtn("userCouponFooter", btns);
}

function initMethod() {
	$("#check_user_coupon").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要查看的用户"
			});
			return;
		}
		$("#checkUserCouponWindow").dialog("open");
		var userCouponParams = $('#userCouponGrid').jqGrid("getGridParam", "postData");
		$.extend(userCouponParams, postData);
		$("#userCouponGrid").jqGrid("setGridParam", {
			postData : userCouponParams
		}).trigger("reloadGrid");
		var params = [{
			id : "refresh_userCouponGrid",
			cls : "fa fa-refresh"
		}];
		$.customGrid(params, $("#checkUserCouponRow"), $("#userCouponGrid"));
	});
	$("#check_user_car").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要查看的用户"
			});
			return;
		}
		$("#checkUserCarWindow").dialog("open");
		var userCarParams = $('#userCarGrid').jqGrid("getGridParam", "postData");
		$.extend(userCarParams, postData);
		$("#userCarGrid").jqGrid("setGridParam", {
			postData : userCarParams
		}).trigger("reloadGrid");
		var params = [{
			id : "refresh_userCarGrid",
			cls : "fa fa-refresh"
		}];
		$.customGrid(params, $("#checkUserCarRow"), $("#userCarGrid"));
	});
	$("#add_pet").click(function() {
		$("#addPetWindow").dialog("open");
	});
	$("#check_user_pet").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要查看的用户"
			});
			return;
		}
		$("#checkPetWindow").dialog("open");
		var petParams = $('#petGrid').jqGrid("getGridParam", "postData");
		$.extend(petParams, postData);
		$("#petGrid").jqGrid("setGridParam", {
			postData : petParams
		}).trigger("reloadGrid");
		var params = [{
			id : "refresh_petGrid",
			cls : "fa fa-refresh"
		}];
		$.customGrid(params, $("#checkPetRow"), $("#petGrid"));
	});
	$("#check_user_coupon").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要查看的用户"
			});
			return;
		}
	});
	$("#modify_user").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的用户"
			});
			return;
		}
		var rowData = $("#jqgrid").jqGrid("getRowData", selrow);
		$("#userName").val(rowData.userName);
		$("#sex").val(rowData.sex);
		$("#mobile").val(rowData.mobile);
		$("#villeage").val(rowData.villeage);
		$("#roomNo").val(rowData.roomNo);
		$("#id").val(selrow);
		$("#updateUserWindow").dialog("open");
	});

	$("#add_user_car").click(function() {
		$.ajax({
			url : "/sys/findConstValueByTypeId",
			type : "POST",
			data : {
				"constTypeId" : postData.villeageId
			},
			async : false,
			success : function(data) {
				if (data) {
					var option = "";
					$("#addUserCarForm").find("select[name=parkArea]").html("");
					for (var i = 0; i < data.length; i++) {
						option += "<option value='" + data[i].id + "'>" + data[i].constDesc + "</option>";
					}
					$("#addUserCarForm").find("select[name=parkArea]").html(option);
				}
			}
		});
		$("#addUserCarWindow").dialog("open");
	});
	$("#update_user_car").click(function() {
		var selrow = $("#userCarGrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的车辆"
			});
			return;
		}
		var rowData = $("#userCarGrid").jqGrid("getRowData", selrow);
		$("#updateUserCarForm").find("input[name=plate]").val(rowData.plate);
		$("#updateUserCarForm").find("input[name=parkArea]").val(rowData.parkArea);
		$("#updateUserCarForm").find("input[name=carType]").val(rowData.carType);
		$("#updateUserCarForm").find("input[name=remark]").val(rowData.remark);
		$("#updateUserCarForm").find("input[name=id]").val(rowData.id);
		$("#updateUserCarWindow").dialog("open");
	});
	$("#delete_user_car").click(function() {
		var selrow = $("#userCarGrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要删除的车辆"
			});
			return;
		}
		var rowData = $("#userCarGrid").jqGrid("getRowData", selrow);
		$.ajax({
			url : "/business/deleteUserCar",
			type : "POST",
			async : false,
			data : {
				'carId' : rowData.id
			},
			success : function(data) {
				if (data != -1) {
					$.smartSuccess({
						content : "删除成功"
					});
					$('#userCarGrid').jqGrid().trigger("reloadGrid");
				} else {
					$.smartSuccess({
						content : "删除失败"
					});
				}
			},
			error : function(data) {
				$.smartFailure({
					content : "数据初始化失败"
				});
			}
		});
	});
	$("#update_pet").click(function() {
		var selrow = $("#petGrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要修改的宠物"
			});
			return;
		}
		var rowData = $("#petGrid").jqGrid("getRowData", selrow);
		$("#updatePetForm").find("input[name=petName]").val(rowData.petName);
		$("#updatePetForm").find("input[name=petAge]").val(rowData.petAge);
		$("#updatePetForm").find("input[name=petType]").val(rowData.petType);
		$("#updatePetForm").find("input[name=isAttack]").val(rowData.isAttack);
		$("#updatePetForm").find("input[name=petCondition]").val(rowData.petCondition);
		$("#updatePetForm").find("input[name=remark]").val(rowData.remark);
		$("#updatePetForm").find("input[name=id]").val(rowData.id);
		$("#updatePetWindow").dialog("open");
	});
	$("#delete_pet").click(function() {
		var selrow = $("#petGrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要删除的宠物"
			});
			return;
		}
		var rowData = $("#petGrid").jqGrid("getRowData", selrow);
		$.ajax({
			url : "/business/deletePet",
			type : "POST",
			async : false,
			data : {
				'petId' : rowData.id
			},
			success : function(data) {
				if (data != -1) {
					$.smartSuccess({
						content : "删除成功"
					});
					$('#petGrid').jqGrid().trigger("reloadGrid");
				} else {
					$.smartSuccess({
						content : "删除失败"
					});
				}
			},
			error : function(data) {
				$.smartFailure({
					content : "数据初始化失败"
				});
			}
		});
	});

	$("#search-btn").click(function(e) {
		var userParams = $('#jqgrid').jqGrid("getGridParam", "postData");
		var postData = {
			'mobile' : $("#userMobile").val(),
			'nickname' : $("#nickname").val()
		};
		$.extend(userParams, postData);
		$("#jqgrid").jqGrid("setGridParam", {
			postData : userParams
		}).trigger("reloadGrid");
		e.preventDefault();
	});

	$("#reset-btn").click(function(e) {
		$("#userMobile").val("");
		$("#nickname").val("");
		var userParams = $('#jqgrid').jqGrid("getGridParam", "postData");
		delete userParams.mobile;
		delete userParams.nickname;
		$("#jqgrid").jqGrid("setGridParam", {
			postData : userParams
		}).trigger("reloadGrid");
		e.preventDefault();
	});
	$("#send_sms").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要通知的用户"
			});
			return;
		}
		$("#sendMsgWindow").dialog("open");
	});
	$("#add_user_coupon").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if (!selrow) {
			$.smartFailure({
				content : "请选择您需要通知的用户"
			});
			return;
		}
		$("#addUserCouponWindow").dialog("open");
	});
}
