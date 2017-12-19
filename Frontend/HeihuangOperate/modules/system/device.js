var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
require("jquery-form/jquery.form.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");

initDialog();
initGrid();
initData();
initMethod();

//immi码检索
$("#search-btn").click(function(){
	var key = $("#imeiCardTxt").val();
	if(key != ""){
		var params = $('#jqgrid').jqGrid("getGridParam", "postData");
        $.extend(params, {imeiCard: key});  
        $("#jqgrid").jqGrid("setGridParam", { postData: params }).trigger("reloadGrid");
	}else{
		$.smartFailure({
			content : "请输入检索关键字"
		});
	}
});
function initData() {
	var deviceFormApp = angular.module('deviceForm', ['ui.router', 'ngCookies']);
	deviceFormApp.controller('partnerList', function($scope, $http, $cookieStore) {
		$http({
			method: "POST",
			url: "/sys/findPartnerInfo"
		}).success(function(data, status) {
			$scope.partners = data;
		}).error(function(data, status){
			$.smartFailure({
				content : "初始化数据失败"
			});
		});
	});
	
	var importDeviceApp = angular.module('importDeviceApp', ['ui.router', 'ngCookies']);
	importDeviceApp.controller('importDevice', function($scope, $http, $cookieStore) {
		$http({
			method: "POST",
			url: "/sys/findPartnerInfo"
		}).success(function(data, status) {
			$scope.partners = data;
		}).error(function(data, status){
			$.smartFailure({
				content : "初始化数据失败"
			});
		});
		
		$scope.changePartner = function(partnerId) {
			$http({
				method: "POST",
				url: "/sys/findProductModelByPartnerId",
				params : {
					parnerId: partnerId
				}
			}).success(function(data, status) {
				$scope.productId = data;
			}).error(function(data, status){
				$.smartFailure({
					content : "初始化数据失败"
				});
			});
		};
	});
	
	angular.element(document).ready(function() {
		angular.bootstrap(document.getElementById('importDeviceWindow'), ['importDeviceApp']);
	});
}
function editInitData(){
	var partnerHtml = ""; 
	$("#departData option").each(function(){
		partnerHtml = partnerHtml + "<option value='" + $(this).val() +"'>" + $(this).text() + "</option>";
	});
	$("#partnerId").html(partnerHtml);
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
	$("#addDeviceWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建设备信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addDeviceForm").parsley();
				$("#addDeviceForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addDeviceInfo",
						type : "POST",
						data : $("#addDeviceForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addDeviceWindow").dialog("close");
								$('#jqgrid').jqGrid().trigger("reloadGrid");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addDeviceWindow").dialog("close");
							}
							$.clearForm("addDeviceForm");
							$("#addDeviceForm").find("input").each(function() {
								$(this).removeClass("parsley-success");
							});
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
	$("#editDeviceWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建设备信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editDeviceForm").parsley();
				$("#editDeviceForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/updateDeviceInfo",
						type : "POST",
						data : $("#editDeviceForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$('#jqgrid').jqGrid().trigger("reloadGrid");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
							}
							$("#editDeviceWindow").dialog("close");
							$.clearForm("editDeviceForm");
							$("#editDeviceForm").find("input").each(function() {
								$(this).removeClass("parsley-success");
							});
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
	
	$("#importDeviceWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 导入设备信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#importDeviceForm").parsley();
				$("#importDeviceForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$("#importDeviceForm").ajaxSubmit({
						success: function(responseText) {
							var obj = JSON.parse(responseText);
							if(obj && obj.status == "success") {
								$.smartSuccess({
									content : obj.message
								});
								$('#jqgrid').jqGrid().trigger("reloadGrid");
								$("#importDeviceWindow").dialog('close');
							} else if(obj && obj.status == "error") {
								$.smartFailure({
									content : obj.message
								});
								$('#jqgrid').jqGrid().trigger("reloadGrid");
								$("#importDeviceWindow").dialog('close');
							} else {
								$.smartFailure({
									content : "系统异常"
								});
								$("#importDeviceWindow").dialog('close');
							}
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

function initMethod() {
	$("#add_device").click(function() {
		$("#addDeviceWindow").dialog("open");
	});
	$("#delete_device").click(function(){
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url : "/sys/deleteDeviceInfo",
				type : "POST",
				data:{"deviceId":id},
				async : false,
				success : function(data) {
					if (data == 1) {
						$('#jqgrid').jqGrid().trigger("reloadGrid");
						$.smartSuccess({
							content : "保存成功"
						});
					} else {
						$.smartFailure({
							content : "保存失败"
						});
					}
				},
				error : function(data) {
					$.smartFailure({
						content : "系统异常，请联系管理员"
					});
				}
			});
		} else{
			$.smartFailure({
				content: "请选择要删除的记录" 
			});
		}
	});
	$("#update_device").click(function(){
		editInitData();
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url: "/sys/getDeviceInfo",
				data:{"deviceId":id},
				type : "post",
				dataType : "json",
				async : false,
				success: function(data) {
					if(data){
						$("#deviceId").val(data.deviceId);
						$("#partnerId").val(data.partnerId);
						$("#imeiCard").val(data.imeiCard);
						$("#productModel").val(data.productModel);
						$("#outDate").val(data.outDate);
						$("#productNo").val(data.productNo);
						$("#randomCode").val(data.randomCode);
						$("#devicePwd").val(data.devicePwd);
						$("#isActivity").val(data.isActivity);
						$("#editDeviceWindow").dialog("open");
					}
				}
			});
		}else{
			alert("请选择修改的记录");
		}
	});
	$("#importDeviceBtn").click(function() {
		$("#importDeviceWindow").dialog("open");
	});
}
function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/sys/findDeviceListByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['设备id', '合作商', 'imei码','产品型号id', '产品序列号', '随机码','设备密码','是否激活'],
		colModel : [{
			name : 'deviceId',
			index : 'deviceId',
			key : true,
			hidden : true
		}, {
			name : 'partnerName',
			index : 'partnerName',
			width : 60
		}, {
			name : 'imeiCard',
			index : 'imeiCard',
			width : 60
		}, {
			name : 'productModel',
			index : 'productModel',
			width : 60
		}, {
			name : 'productNo',
			index : 'productNo',
			width : 60
		}, {
			name : 'randomCode',
			index : 'randomCode',
			width : 60
		}, {
			name : 'devicePwd',
			index : 'devicePwd',
			width : 60
		}, {
			name : 'isActivity',
			index : 'isActivity',
			width : 60,
			formatter: function(cellvalue) {
				if(cellvalue == 1) {
					return "激活";
				} else {
					return "未激活";
				}
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
		caption : '<i class="fa fa-user"></i>&nbsp;设备维护',
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
		id: 'delete_device',
		text: '删除设备',
		btnIcon: 'fa fa-times',
		btnCls: 'btn btn-sm btn-danger'
	},{
		id: 'update_device',
		text: '修改设备',
		btnIcon: 'fa fa-pencil',
		btnCls: 'btn btn-sm btn-primary'
	}, {
		id: 'add_device',
		text: '增加设备',
		btnIcon: 'fa fa-plus-circle',
		btnCls: 'btn btn-sm btn-primary'
	}];
	$.addGridBtn(btns);
	var params = [ {
		id: "refresh_jqgrid",
		cls: "fa fa-refresh"
	}];
	$.customBtnCls(params);
}