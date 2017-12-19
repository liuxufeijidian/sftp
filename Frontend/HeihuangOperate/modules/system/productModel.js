var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");
//配置类依赖
var base = require("modules/base/js/systemConfig");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");


var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");

initData();
initDialog();
initGrid();
initMethod();

function initData() {
	var productModelForm = angular.module('productModelForm', ['ui.router', 'ngCookies']);
	productModelForm.controller('partnerList', function($scope, $http, $cookieStore) {
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
	
	angular.element(document).ready(function() {
		angular.bootstrap(document.getElementById('addProductModelWindow'), ['productModelForm']);
		angular.bootstrap(document.getElementById('editProductModelWindow'), ['productModelForm']);
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
	
	$("#addProductModelWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建产品类型信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addProductModelForm").parsley();
				$("#addProductModelForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addProductModel",
						type : "POST",
						data : $("#addProductModelForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addProductModelWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addProductModelWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$.clearForm("addProductModelForm");
					$("#addProductModelForm").find("input").each(function() {
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
	
	$("#editProductModelWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 更新产品类型信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 更新",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editProductModelForm").parsley();
				$("#editProductModelForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/editProductModel",
						type : "POST",
						data : $("#editProductModelForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "更新成功"
								});
								$("#editProductModelWindow").dialog("close");
							} else {
								$.smartFailure({
									content : "更新失败"
								});
								$("#editProductModelWindow").dialog("close");
							}
						},
						error : function(data) {
							$.smartFailure({
								content : "系统异常，请联系管理员"
							});
						}
					});
					$.clearForm("editProductModelForm");
					$("#editProductModelForm").find("input").each(function() {
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
		url : '/sys/findProductModelListByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['id', '产品类型名称','所属合作商'],
		colModel : [{
			name : 'id',
			index : 'id',
			key : true,
			hidden : true
		}, {
			name : 'productModel',
			index : 'productModel',
			width : 60
		}, {
			name : 'partnerId',
			index : 'partnerId',
			formatter: getPartnerNameById,
			width : 60
		}],
		rowNum : 10,
		rowList : [10, 20, 30],
		pager : '#pjqgrid',
		sortname : 'partnerId',
		toolbarfilter : true,
		viewrecords : true,
		sortorder : "desc",
		gridComplete : function() {
		},
		caption : '<i class="fa fa-productModel"></i>&nbsp;产品类型维护',
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
		id : 'delete_productModel',
		text : '删除产品类型',
		btnIcon : 'fa fa-times',
		btnCls : 'btn btn-sm btn-danger'
	}, {
		id : 'update_productModel',
		text : '修改产品类型',
		btnIcon : 'fa fa-pencil',
		btnCls : 'btn btn-sm btn-primary'
	}, {
		id : 'add_productModel',
		text : '增加产品类型',
		btnIcon : 'fa fa-plus-circle',
		btnCls : 'btn btn-sm btn-primary'
	}];
	$.addGridBtn(btns);
	var params = [{
		id : "refresh_jqgrid",
		cls : "fa fa-refresh"
	}];
	$.customBtnCls(params);
	
	
	function getPartnerNameById(cellValue, options, rowObject){
		var partnerName;
		$.ajax({
			url: "/sys/getPartnerInfo?partnerId=" + cellValue,
			async: false,
			type:"POST",
			success: function(info){
				partnerName = info.partnerName;
			},
			error: function(e){
		 		alert(e);
		 	}
		});
		return partnerName;
	}
	
}

function initMethod() {
	$("#add_productModel").click(function() {
		$("#addProductModelWindow").dialog("open");
	});
	
	$("#update_productModel").click(function() {
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url: "/sys/getProductModel",
				data:{"productModelId":id},
				type : "post",
				dataType : "json",
				async : false,
				success: function(data) {
					if(data){
						$("#id").val(data.id);
						$("#productModel").val(data.productModel);
						$("#partnerId").val(data.partnerId);
						$("#editProductModelWindow").dialog("open");
					}
				}
			});
		}else{
			$.smartFailure({
				content : "请选择修改的记录"
			});
		}
	});
	
	$("#delete_productModel").click(function(){
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url : "/sys/deleteProductModel",
				type : "POST",
				data:{"productModelId":id},
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
		}
	});
}
