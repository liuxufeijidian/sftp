var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
var parsley = require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("parsley/parsley.js");
require("parsley/zh_cn.js");
require("bootstrap/js/bootstrap.min");
require("jqgrid/jquery.jqGrid.min");
require("jqgrid/grid.locale-cn");
require("modules/base/js/plugin");

initDialog();
initGrid();
initMethod();

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
	$("#addPtnerWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 新建合作商信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#addPtnerForm").parsley();
				$("#addPtnerForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addPartnerInfo",
						type : "POST",
						data : $("#addPtnerForm").serialize(),
						async : false,
						success : function(data) {
							if (data == 1) {
								$.smartSuccess({
									content : "保存成功"
								});
								$("#addPtnerWindow").dialog("close");
								$('#jqgrid').jqGrid().trigger("reloadGrid");
							} else {
								$.smartFailure({
									content : "保存失败"
								});
								$("#addPtnerWindow").dialog("close");
							}
							$.clearForm("addPtnerForm");
							$("#addPtnerForm").find("input").each(function() {
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
	$("#editPtnerWindow").dialog({
		autoOpen : false,
		width : 450,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4><i class='fa fa-tachometer'></i> 修改合作商信息</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check-square'></i>&nbsp; 保存",
			"class" : "btn btn-success",
			click : function() {
				var formId = parsley("#editPtnerForm").parsley();
				$("#editPtnerForm").find("input").each(function() {
					parsley(this).parsley().on("field:error", function() {
						$(this).addClass("parsley-error");
					});
				});
				formId.validate();
				if(formId.isValid()) {
					$.ajax({
						url : "/sys/addPartnerInfo",
						type : "POST",
						data : $("#editPtnerForm").serialize(),
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
							$("#editPtnerWindow").dialog("close");
							$.clearForm("editPtnerForm");
							$("#editPtnerForm").find("input").each(function() {
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
}
function initMethod() {
	$("#add_partner").click(function() {
		$("#addPtnerWindow").dialog("open");
	});
	$("#delete_partner").click(function(){
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url : "/sys/deletePartnerInfo",
				type : "POST",
				data:{"partnerId":id},
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
		}else{
			$.smartFailure({
				content: "请选择要删除的记录" 
			});
		}
	});
	$("#update_partner").click(function(){
		var id = $('#jqgrid').jqGrid('getGridParam','selrow');
		if(id != null){
			$.ajax({
				url: "/sys/getPartnerInfo",
				data:{"partnerId":id},
				type : "post",
				dataType : "json",
				async : false,
				success: function(data) {
					if(data){
						$("#partnerId").val(data.partnerId);
						$("#partnerName").val(data.partnerName);
						$("#partnerCode").val(data.partnerCode);
						$("#areaCode").val(data.areaCode);
						$("#contact").val(data.contact);
						$("#telephone").val(data.telephone);
						$("#email").val(data.email);
						$("#editPtnerWindow").dialog("open");
					}
				}
			});
		}else{
			alert("请选择修改的记录");
		}
	});
}
function initGrid() {
	$('#jqgrid').jqGrid({
		url : '/sys/findPartnerListByParam',
		datatype : 'json',
		mtype : 'POST',
		height : '370',
		colNames : ['合作商id', '合作商名称', '合作商code','地域code', '合作商类型', '联系人', '联系电话','邮件','备注','状态'],
		colModel : [{
			name : 'partnerId',
			index : 'partnerId',
			key : true,
			hidden : true
		}, {
			name : 'partnerName',
			index : 'partnerName',
			width : 60
		}, {
			name : 'partnerCode',
			index : 'partnerCode',
			width : 60
		}, {
			name : 'areaCode',
			index : 'areaCode',
			width : 60
		}, {
			name : 'partnerType',
			index : 'partnerType',
			width : 60,
			hidden : true
		}, {
			name : 'contact',
			index : 'contact',
			width : 60
		}, {
			name : 'telephone',
			index : 'telephone',
			width : 60
		}, {
			name : 'email',
			index : 'email',
			width : 60
		}, {
			name : 'remark',
			index : 'remark',
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
		caption : '<i class="fa fa-user"></i>&nbsp;合作商维护',
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
		id: 'delete_partner',
		text: '删除合作商',
		btnIcon: 'fa fa-times',
		btnCls: 'btn btn-sm btn-danger'
	},{
		id: 'update_partner',
		text: '修改合作商',
		btnIcon: 'fa fa-pencil',
		btnCls: 'btn btn-sm btn-primary'
	}, {
		id: 'add_partner',
		text: '增加合作商',
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

