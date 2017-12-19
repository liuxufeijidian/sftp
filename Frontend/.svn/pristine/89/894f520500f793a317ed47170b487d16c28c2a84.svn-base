//jquery类依赖
var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("wizard/fuelux");
require("modules/base/js/plugin");
//验证依赖
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
//angular依赖
require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");
//配置类依赖
var base = require("modules/base/js/systemConfig");

initData();
initDialog();
initGrid();
initMethod();
initUI();

function initUI() {
	$("#buttonWidgetBody").css("min-height", 240);
}

function initData() {
	
	var menuWidgetApp = angular.module('menuWidget', ['ui.router', 'ngCookies']);
	menuWidgetApp.controller('menuList', function($scope, $http, $cookieStore) {
		$scope.loadMenu = function() {
			$http({
				method : "POST",
				url : "/sys/findMenuAuthInfo"
			}).success(function(data, status) {
				if(data && data.length == 0) {
					$scope.isNullArray = true;
				} else {
					$scope.isNullArray = false;
					$scope.menus = data;	
				}
			}).error(function(data, status) {
				$.smartFailure({
					content : "初始化数据失败"
				});
			});
		};
		$scope.loadMenu();
	});
	
	var buttonWidgetApp = angular.module('buttonWidget', ['ui.router', 'ngCookies']);
	buttonWidgetApp.controller("buttonList", function($scope, $http, $cookieStore) {
		$scope.loadButton = function() {
			var authId = $(angular.element(document)[0].all.menuId).val();
			$http({
				method : "POST",
				url : "/sys/findButtonAuthInfo",
				params : {
					menuId : authId
				}
			}).success(function(data, status) {
				console.log(data);
				$scope.buttons = data;
			}).error(function(data, status) {
				$.smartFailure({
					content : "初始化数据失败"
				});
			});
		};
	});
	
	angular.element(document).ready(function() {
		angular.bootstrap(document.getElementById('updateRoleWindow'), ['updateRoleForm']);
		angular.bootstrap(document.getElementById('menuWidget'), ['menuWidget']);
		angular.bootstrap(document.getElementById('buttonWidget'), ['buttonWidget']);
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
	$("#addRoleWindow").dialog({
		autoOpen : false,
		width : 1000,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建角色信息</h4></div>",
		close: function() {
			$.clearForm("addRoleForm");
			$("#addRoleForm").find("input").each(function() {
				$(this).closest("div.form-group").removeClass("has-success").removeClass("has-error");
			});
		},
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addRoleForm").parsley();
				var roleAuthId = "";
				$("#nestable3").find(".dd3-content.current").each(function() {
					roleAuthId += $(this).find(".authId").val() + ",";
				});
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addRoleInfo",
						type : "POST",
						data : $("#addRoleForm").serialize() + "&menuIds=" + roleAuthId,
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addRoleWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addRoleWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$('#jqgrid').jqGrid().trigger("reloadGrid");
					$(this).dialog("close");
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
	
	$("#updateRoleWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改角色信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#updateRoleForm").parsley();
				$("#updateRoleForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/updateRoleInfo",
						type : "POST",
						data : $("#updateRoleForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#updateRoleWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#updateRoleWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$.clearForm("updateRoleForm");
					$("#updateRoleForm").find("input").each(function() {
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
		url : '/sys/findRoleListByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['roleId', '角色名', '角色描述', '角色编码', '状态', '创建时间'],
		colModel : [{
			name : 'roleId',
			index : 'roleId',
			key : true,
			hidden : true
		}, {
			name : 'roleName',
			index : 'roleName',
			width : 60
		}, {
			name : 'roleDesc',
			index : 'roleDesc',
			width : 60
		}, {
			name : 'roleCode',
			index : 'roleCode',
			width : 60
		}, {
			name : 'status',
			index : 'status',
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
			width : 60
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
		caption : '<i class="fa fa-user"></i>&nbsp;系统角色维护',
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
		id : 'delete_role',
		text : '删除角色',
		btnIcon : 'fa fa-times',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'update_role',
		text : '修改角色',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-info'
	}, {
		id : 'add_role',
		text : '增加角色',
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
	$("#add_role").click(function() {
		$("#addRoleWindow").dialog("open");
		initWizard();
	});
	$("#update_role").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if(!selrow) {
			$.smartFailure({
				content: "请选择您需要修改的角色" 
			});
			return;
		}
		var roleObj = $("#jqgrid").jqGrid("getRowData", selrow);
		var roleForm = $("#updateRoleForm");
		roleForm.find("input[name='roleName']").val(roleObj.roleName);
		roleForm.find("input[name='roleDesc']").val(roleObj.roleDesc);
		roleForm.find("input[name='roleCode']").val(roleObj.roleCode);
		roleForm.find("input[name='roleId']").val(roleObj.roleId);
		$("#updateRoleWindow").dialog("open");
	});
	$("#allo_role").click(function() {
		var selrow = $("#jqgrid").jqGrid("getGridParam", "selrow");
		if(!selrow) {
			$.smartFailure({
				content: "请选择您需要分配权限的角色" 
			});
			return;
		}
	});
	
	$(document).on("click", ".dd-item", function(event) {
		if($(this).find(".dd3-content").eq(0).hasClass("current")) {
			$(this).find(".dd-handle").eq(0).removeClass("current");
			$(this).find(".dd3-content").eq(0).removeClass("current");
			return;
		}
		$(this).find(".dd-handle").eq(0).addClass("current");
		$(this).find(".dd3-content").eq(0).addClass("current");
		$("#menuId").val($(this).find(".dd3-content").eq(0).find(".authId").val()).trigger("change");
		$("#addMenuWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		$("#addButtonWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		$("#editButtonWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		event.stopPropagation();
	});
	
	$(document).on("click", ".table tbody tr", function() {
		$(this).addClass("current");
	});
}

function initWizard() {
	$('.wizard').on("actionclicked.fu.wizard", function(event, data) {
		var formId = parsley("#addRoleForm").parsley();
		$("#addRoleForm").find("input").each(function() {
			var $this = parsley(this);
			$this.parsley().on("field:error", function() {
				$this.closest("div.form-group").addClass("has-error");
			});
			$this.parsley().on("field:success", function() {
				$this.closest("div.form-group").addClass("has-success");
			});
		});
		formId.validate();
		if(!formId.isValid()) {
			return false;
		}
	}).wizard();
}

