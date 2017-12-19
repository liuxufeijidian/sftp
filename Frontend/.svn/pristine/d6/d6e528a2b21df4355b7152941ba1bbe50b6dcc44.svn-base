var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
require("bootstrap/js/bootstrap.min");
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

initUI();
initDialog();
initData();
initMethod();

function initUI() {
	$(".widget-body").eq(0).height($(".dd").height() + 237);
	$(".widget-body").eq(1).height($(".dd").height() + 233);
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
	$("#addMenuWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建菜单信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addMenuForm").parsley();
				$("#addMenuForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addAuth",
						type : "POST",
						data : $("#addMenuForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addMenuWindow").dialog("close");
								$("#addMenuWindow").find("input").each(function() {
									$(this).removeClass("parsley-success");
								});
								$("#refreshMenu").trigger("click");
								$.clearForm("addMenuForm");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addMenuWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					
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
	
	$("#editMenuWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建菜单信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editMenuForm").parsley();
				$("#editMenuForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/updateAuth",
						type : "POST",
						data : $("#editMenuForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "修改成功"
								});
								$("#editMenuWindow").dialog("close");
								$("#editMenuForm").find("input").each(function() {
									$(this).removeClass("parsley-success");
								});
								$("#refreshMenu").trigger("click");
							} else {
								$.smartFailure({
									content : "修改失败"
								});
								$("#editMenuWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					
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
	
	$("#addButtonWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建按钮信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addButtonForm").parsley();
				$("#addButtonForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addAuth",
						type : "POST",
						data : $("#addButtonForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addButtonWindow").dialog("close");
								$("#addButtonWindow").find("input").each(function() {
									$(this).removeClass("parsley-success");
								});
								$("#refreshButton").trigger("click");
								$.clearForm("addButtonForm");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addButtonWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					
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
	
	
	$("#editButtonWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改按钮信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editButtonForm").parsley();
				$("#editButtonForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/updateAuth",
						type : "POST",
						data : $("#editButtonForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#editButtonWindow").dialog("close");
								$("#editButtonWindow").find("input").each(function() {
									$(this).removeClass("parsley-success");
								});
								$("#refreshButton").trigger("click");
								$.clearForm("editButtonForm");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#editButtonWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					
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
		angular.bootstrap(document.getElementById('buttonWidget'), ['buttonWidget']);
	});
}

function initMethod() {
	$(document).on("click", ".dd-item", function(event) {
		$(".dd3-item").each(function() {
			if ($(".dd-list").find(".dd-handle").hasClass("current")) {
				$(".dd-list").find(".dd-handle").removeClass("current");
				$(".dd-list").find(".dd3-content").removeClass("current");
			}
		});
		$(this).find(".dd-handle").eq(0).addClass("current");
		$(this).find(".dd3-content").eq(0).addClass("current");
		$("#menuId").val($(this).find(".dd3-content").eq(0).find(".authId").val()).trigger("change");
		$("#addMenuWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		$("#addButtonWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		$("#editButtonWindow").find("input[name='upperAuthId']").val($(this).find(".dd3-content").eq(0).find(".authId").val());
		event.stopPropagation();
	});
	
	
	$("#addMenu").click(function() {
		$("#addMenuWindow").dialog("open");
	});
	
	$("#editMenu").click(function(event) {
		if($(".dd3-item").find(".current").length <= 0) {
			$.smartFailure({
				content : "请选中需要修改的菜单"
			});
			return;
		} else if($(".dd3-item").length == 0) {
			$.smartFailure({
				content : "当前还没有菜单，使用新增按钮创建一个菜单吧！"
			});
			return;
		}
		var editForm = $("#editMenuForm");
		var currentMenu = $("#nestable3").find(".dd3-content.current");
		editForm.find("input[name='authName']").val(currentMenu.find(".authName").text());
		editForm.find("input[name='authCode']").val(currentMenu.find(".authCode").val());
		editForm.find("input[name='authCode']").val(currentMenu.find(".authCode").val());
		editForm.find("input[name='authDesc']").val(currentMenu.find(".authDesc").val());
		editForm.find("input[name='authUrl']").val(currentMenu.find(".authUrl").val());
		editForm.find("input[name='upperAuthId']").val(currentMenu.find(".upperAuthId").val());
		editForm.find("input[name='authId']").val(currentMenu.find(".authId").val());
		editForm.find("input[name='sort']").val(currentMenu.find(".sort").val());
		editForm.find("input[name='state'][value='" + currentMenu.find(".state").val() + "']").attr("checked", "checked");
		$("#editMenuWindow").dialog("open");
	});
	$("#checkMenu").click(function() {
		if($(".dd3-item").length > 0) {
			$(".dd3-item").each(function() {
				if (!$(".dd-list").find(".dd-handle").hasClass("current")) {
					$.smartFailure({
						content : "请选中需要查看的菜单"
					});
					return false;
				}
			});
		} else {
			$.smartFailure({
				content : "当前还没有菜单，使用新增按钮创建一个菜单吧！"
			});
		}
	});
	$("#disableMenu").click(function() {
		if($(".dd3-item").length > 0) {
			$(".dd3-item").each(function() {
				if (!$(".dd-list").find(".dd-handle").hasClass("current")) {
					$.smartFailure({
						content : "请选中需要禁用的菜单"
					});
				}
			});
		} else {
			$.smartFailure({
				content : "当前还没有菜单，使用新增按钮创建一个菜单吧！"
			});
		}
	});
	$("#addButton").click(function() {
		if($(".dd3-item").find(".current").length <= 0) {
			$.smartFailure({
				content : "请选中需要新增按钮的菜单"
			});
			return;
		} else if($(".dd3-item").length == 0) {
			$.smartFailure({
				content : "当前还没有菜单，使用新增按钮创建一个菜单吧！"
			});
			return;
		}
		$("#addButtonWindow").dialog("open");
	});
	
	$("#editButton").click(function() {
		if($(".table tbody").find(".current").length <= 0) {
			$.smartFailure({
				content : "请选中需要修改的按钮"
			});
			return;
		}
		var editForm = $("#editButtonForm");
		var currentMenu = $(".table tbody").find(".current");
		editForm.find("input[name='authName']").val(currentMenu.find(".authName").html());
		editForm.find("input[name='authCode']").val(currentMenu.find(".authCode").text());
		editForm.find("input[name='authDesc']").val(currentMenu.find(".authDesc").text());
		editForm.find("input[name='authUrl']").val(currentMenu.find(".authUrl").text());
		editForm.find("input[name='authId']").val(currentMenu.find(".authId").text());
		editForm.find("input[name='sort']").val(currentMenu.find(".sort").text());
		editForm.find("input[name='state'][value='" + currentMenu.find(".state").attr("state") + "']").attr("checked", "checked");
		$("#editButtonWindow").dialog("open");
	});
	
	$(document).on("click", ".table tbody tr", function() {
		$(".table tbody tr").each(function() {
			if($(this).hasClass("current")) {
				$(this).removeClass("current");
			}
		});
		$(this).addClass("current");
	});
}
