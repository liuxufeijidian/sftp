var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

var select2 = require("select2/select2");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");

initData();
initSelect();
initDialog();
initGrid();
initMethod();

function initData() {
	var userForm = angular.module('userForm', ['ui.router', 'ngCookies']);
	userForm.controller('roleList', function($scope, $http, $cookieStore) {
		$http({
			method: "POST",
			url: "/sys/findSmRoles"
		}).success(function(data, status) {
			$scope.roles = data;
		}).error(function(data, status){
			$.smartFailure({
				content : "初始化数据失败"
			});
		});
	}).controller('departList', function($scope, $http, $cookieStore) {
		$http({
			method: "POST",
			url: "/sys/findConstType"
		}).success(function(data, status) {
			$scope.types = data;
		}).error(function(data, status){
			$.smartFailure({
				content : "初始化数据失败"
			});
		});
	});
	angular.element(document).ready(function() {
		angular.bootstrap(document.getElementById('addUserWindow'), ['userForm']);
	});
}

function initSelect() {
	select2("#departData").select2();
}

function editInitData(){
	var roleHtml = ""; 
	$("#roleData option").each(function(){
		roleHtml = roleHtml + "<option value='" + $(this).val() +"'>" + $(this).text() + "</option>";
	});
	$("#roleId").html(roleHtml);
	var partnerHtml = ""; 
	$("#departData option").each(function(){
		partnerHtml = partnerHtml + "<option value='" + $(this).val() +"'>" + $(this).text() + "</option>";
	});
	$("#departId").html(partnerHtml);
	
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
	$("#addUserWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建用户信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addUserForm").parsley();
				$("#addUserForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addUserInfo",
						type : "POST",
						data : $("#addUserForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addUserWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addUserWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$.clearForm("addUserForm");
					$("#addUserForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
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
	$("#editUserWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改用户信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editUserForm").parsley();
				$("#editUserForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/updateUserInfo",
						type : "POST",
						data : $("#editUserForm").serialize(),
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
							$("#editUserWindow").dialog("close");
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$.clearForm("editUserForm");
					$("#editUserForm").find("input").each(function() {
						$(this).removeClass("parsley-success");
					});
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
		url : '/sys/findUserListByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['userId', '用户名称', '登录账号', '用户类型', '所属角色', '状态','创建时间','邮箱','手机号码','性别','登陆次数','最后登陆时间','所属合作商'],
		colModel : [{
			name : 'userId',
			index : 'userId',
			key : true,
			hidden : true
		}, {
			name : 'userName',
			index : 'userName',
			width : 60
		}, {
			name : 'loginCode',
			index : 'loginCode',
			width : 60
		}, {
			name : 'userType',
			index : 'userType',
			width : 60,
			formatter: function(cellvalue) {
				if(cellvalue == 1) {
					return "超级管理员";
				} else {
					return "普通用户";
				}
			}
		}, {
			name : 'roleId',
			index : 'roleId',
			width : 60,
			hidden : true
		}, {
			name : 'state',
			index : 'state',
			width : 60,
			formatter: function(cellvalue) {
				if(cellvalue == 1) {
					return "有效";
				} else {
					return "无效";
				}
			}
		}, {
			name : 'createTime',
			index : 'createTime',
			width : 60,
			formatter: function(cellvalue) {
				return $.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
			}
		}, {
			name : 'email',
			index : 'email',
			width : 60
		}, {
			name : 'mobile',
			index : 'mobile',
			width : 60
		}, {
			name : 'sex',
			index : 'sex',
			width : 60,
			formatter: function(cellvalue) {
				if(cellvalue == 1) {
					return "男";
				} else {
					return "女";
				}
			}
		}, {
			name : 'loginTimes',
			index : 'loginTimes',
			width : 60
		}, {
			name : 'lastTime',
			index : 'lastTime',
			width : 60,
			formatter: function(cellvalue) {
				return $.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
			}
		}, {
			name : 'departId',
			index : 'departId',
			width : 60,
			hidden : true
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
		caption : '<i class="fa fa-user"></i>&nbsp;系统用户维护',
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
		id : 'delete_user',
		text : '删除用户',
		btnIcon : 'fa fa-times',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'update_user',
		text : '修改用户',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-primary'
	}, {
		id : 'add_user',
		text : '增加用户',
		btnIcon : 'fa fa-plus-circle',
		btnCls : 'btn btn-sm btn-primary'
	}];
	$.addGridBtn(btns);
	var params = [{
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	}];
	$.customBtnCls(params);
}

function initMethod() {
	$("#add_user").click(function() {
		$("#addUserWindow").dialog("open");
	});
	$("#update_user").click(function(){
		editInitData();
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url: "/sys/getUserInfo",
				data:{"userId":id},
				type : "post",
				dataType : "json",
				async : false,
				success: function(data) {
					if(data){
						$("#userId").val(data.userId);
						$("#userName").val(data.userName);
						$("#partnerCode").val(data.partnerCode);
						$("#loginCode").val(data.loginCode);
						$("#loginPwd").val(data.loginPwd);
						$("#userType").val(data.userType);
						$("#roleId").find("option[value='"+ data.roleId +"']").attr("selected",true);
						$("#createTime").val(data.createTime);
						$("#email").val(data.email);
						$("#mobile").val(data.mobile);
						$("#sex").val(data.sex);
						$("#loginTimes").val(data.loginTimes);
						$("#lastTime").val(data.lastTime);
						// $("#departId").val(data.departId);
						$("#editUserWindow").dialog("open");
					}
				}
			});
		}else{
			alert("请选择修改的记录");
		}
	});
	$("#delete_user").click(function(){
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url : "/sys/deleteUserInfo",
				type : "POST",
				data:{"userId":id},
				async : false,
				success : function(data) {
					if (data == 1) {
						$('#jqgrid').jqGrid().trigger("reloadGrid");
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
		}else{
			$.smartFailure({
				content: "请选择要删除的记录" 
			});
		}
	});
}
