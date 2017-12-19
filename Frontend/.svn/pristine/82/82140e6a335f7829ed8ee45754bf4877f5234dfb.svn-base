jQuery.customBtnCls = function(params) {
	$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");
    
	$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
	
	$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
	
	$(".ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");	
	
	$(".ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
	
	$(".ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
  	
  	$(".ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
  	$("#pjqgrid_left").css("width", "20%");
  	$("#pjqgrid_center").css("width", "60%");
  	$("#pjqgrid_right").css("width", "20%");
	/* Add tooltips */
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	
	jQuery("#jqgrid").jqGrid('setGridWidth', $("#content").width());
	$(window).on('resize.jqGrid', function () {
		jQuery("#jqgrid").jqGrid('setGridWidth', $("#content").width());
	});
	if(params instanceof Array) {
		for(var i in params) {
			var obj = params[i];
			var el = obj.id;
			var cls = obj.cls;
			$("#" + el).find("span").removeClass().addClass(cls);
		}
	} else {
		alert("参数不是数组");
	}
};

jQuery.customGrid = function(params, container, gridContainer, footContainer) {
	$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");
    
	$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
	
	$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
	
	$(".ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");	
	
	$(".ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
	
	$(".ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
  	
  	$(".ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
  	if(footContainer) {
		$("#" + footContainer + "_left").css("width", "20%");
	  	$("#" + footContainer + "_center").css("width", "60%");
	  	$("#" + footContainer + "_right").css("width", "20%");
  	}
	/* Add tooltips */
	$('.navtable .ui-pg-button').tooltip({
		container : container
	});
	
	gridContainer.jqGrid('setGridWidth', container.width() - 30);
	$(window).on('resize.jqGrid', function () {
		gridContainer.jqGrid('setGridWidth', container.width() - 30);
	});
	if(params instanceof Array) {
		for(var i in params) {
			var obj = params[i];
			var el = obj.id;
			var cls = obj.cls;
			$("#" + el).find("span").removeClass().addClass(cls);
		}
	} else {
		alert("参数不是数组");
	}
};

/**
 * 初始化弹窗
 */
jQuery.customDialog = function(params) {
	if(params instanceof Object) {
		var id = params.id;
		var width = params.width;
		var height = params.height;
		var title = params.title;
		var btns = params.btns;
		
		$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
			_title : function(title) {
				if (!this.options.title) {
					title.html("&#160;");
				} else {
					title.html(this.options.title);
				}
			}
		}));
		$('#' + id).dialog({
			autoOpen : false,
			width : width,
			height: height,
			resizable : false,
			modal : true,
			title : "<div class='widget-header'><h4><i class='fa fa-edit'></i><span> " + title + "</span></h4></div>",
			buttons : btns
		});
	} else {
		alert("参数不是对象");
	}
};
/**
 * 更改dialog标题
 */
jQuery.chgDialogTitle = function(id, title) {
	$("div[aria-describedby='" + id + "']").find(".ui-dialog-titlebar").find("span.ui-dialog-title").find("h4").find("span").text(title);
};
/**
 * alert提示
 */
jQuery.smartAlert = function(params) {
	if(params instanceof Object) {
		var content = params.content;
		$.smallBox({
			title : "提示",
			content : content,
			color : "#296191",
			iconSmall : "fa fa-bell bounce animated",
			timeout : 4000
		});
	} else {
		alert("参数不是对象");
	}
};
/**
 * 成功提示
 */
jQuery.smartSuccess = function(params) {
	if(params instanceof Object) {
		var content = params.content;
		$.smallBox({
			title : "提示",
			content : content,
			color : "rgb(115, 158, 115)",
			iconSmall : "fa fa-check bounce animated",
			timeout : 4000
		});
	} else {
		alert("参数不是对象");
	}
};
/**
 * 失败提示
 */
jQuery.smartFailure = function(params) {
	if(params instanceof Object) {
		var content = params.content;
		$.smallBox({
			title : "提示",
			content : content,
			color : "rgb(196, 106, 105)",
			iconSmall : "fa fa-times bounce animated",
			timeout : 4000
		});
	} else {
		alert("参数不是对象");
	}
};
/**
 * 格式化时间
 */
jQuery.formatDate = function(date, format) {
	if(date) {
		tempDate = new Date(date);
	} else {
		tempDate = new Date();
	}
	var o = {   
		"M+" : tempDate.getMonth()+1,                 //月份   
		"d+" : tempDate.getDate(),                    //日   
		"h+" : tempDate.getHours(),                   //小时   
		"m+" : tempDate.getMinutes(),                 //分   
		"s+" : tempDate.getSeconds(),                 //秒   
		"q+" : Math.floor((tempDate.getMonth()+3)/3), //季度   
		"S"  : tempDate.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(format))   
		format = format.replace(RegExp.$1, (tempDate.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format))   
			format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	}
	return format;
};



/**
 * 请求远程页面的弹窗
 */
jQuery.remoteDialog = function(params) {
	if(params instanceof Object) {
		var width = params.width;
		var height = params.height;
		var title = params.title;
		var url = params.url;
		$.ajax({
			url: url,
			type: "get",
			dataType: "html",
			async: false,
			success: function(html){
				$(html).dialog({
					autoOpen : true,
					width : width,
					height: height,
					resizable : false,
					modal : true
				});
				$(html).dialog("open");
			}
		});
	} else {
		alert("参数不是对象");
	}
};

jQuery.buildFilter = function(formEl) {
	var form = $("#" + formEl);
	var obj = {};
	if(form) {
		obj.groupOp = form.attr("groupOp");
		var rules = new Array();
		form.find(".searchFilter").each(function(){
			var $this = $(this);
			if($.trim($this.val()) != '') {
				var suffix = "";
				if($this.hasClass("date-picker")) {
					if($this.datepicker("getType") == "month") {
						suffix = "-01";
					}
				} 
				rules.push({
					field : $this.attr("field"),
					op : $this.attr("op"),
					data : $this.val() + suffix
				});
			}
		});
		obj.rules = rules;
	}
	return JSON.stringify(obj);
};

jQuery.smartGridCls = function(params) {
	$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");
    
	$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
	
	$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
	
	$(".ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");	
	
	$(".ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
	$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");
	
	$(".ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");
  	
  	$(".ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
  	$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
  	
	/* Add tooltips */
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	
	jQuery("#" + params.jqgridEl).jqGrid('setGridWidth', $("#content").width());
	
	$(window).on('resize.jqGrid', function () {
		jQuery("#" + params.jqgridEl).jqGrid('setGridWidth', $("#content").width());
	});
	
	if(params.btns instanceof Array) {
		for(var i in params.btns) {
			var obj = params.btns[i];
			var el = obj.id;
			var cls = obj.cls;
			$("#" + el).find("span").removeClass().addClass(cls);
		}
	} else {
		alert("参数不是数组");
	}
};

jQuery.addGridBtn = function(params) {
	if(params instanceof Array) {
		$("#pjqgrid_left").find("tr").prepend('<td class="ui-pg-button ui-state-disabled" style="width:4px;" data-original-title="" title=""><span class="ui-separator"></span></td>');
		for(var i in params) {
			var obj = params[i];
			var el = obj.id;
			var btnIcon = obj.btnIcon;
			var txt = obj.text;
			var btnCls = obj.btnCls;
			$("#pjqgrid_left").find("tr").prepend('<td class="ui-pg-button ui-corner-all" title="" id="' + el + '" data-original-title="' + txt + '"><div class="' + btnCls + '"><span class="' + btnIcon + '"></span></div></td>');
		}
	} else {
		alert("参数不是数组");
	}
};

jQuery.addCustomGridBtn = function(gridFooter, params) {
	if(params instanceof Array) {
		$("#" + gridFooter + "_left").find("tr").prepend('<td class="ui-pg-button ui-state-disabled" style="width:4px;" data-original-title="" title=""><span class="ui-separator"></span></td>');
		for(var i in params) {
			var obj = params[i];
			var el = obj.id;
			var btnIcon = obj.btnIcon;
			var txt = obj.text;
			var btnCls = obj.btnCls;
			$("#" + gridFooter + "_left").find("tr").prepend('<td class="ui-pg-button ui-corner-all" title="" id="' + el + '" data-original-title="' + txt + '"><div class="' + btnCls + '"><span class="' + btnIcon + '"></span></div></td>');
		}
	} else {
		alert("参数不是数组");
	}
};

jQuery.customGridBtn = function(params) {
	if(params.btn instanceof Array) {
		$("#" + params.gridFooter).find("tr").prepend('<td class="ui-pg-button ui-state-disabled" style="width:4px;" data-original-title="" title=""><span class="ui-separator"></span></td>');
		for(var i in params.btn) {
			var obj = params.btn[i];
			var el = obj.id;
			var btnIcon = obj.btnIcon;
			var txt = obj.text;
			var btnCls = obj.btnCls;
			$("#" + params.gridFooter).find("tr").prepend('<td class="ui-pg-button ui-corner-all" title="" id="' + el + '" data-original-title="' + txt + '"><div class="' + btnCls + '"><span class="' + btnIcon + '"></span></div></td>');
		}
	} else {
		alert("参数不是数组");
	}
};

jQuery.clearForm = function(formId) {
	$("#" + formId).find("input[type='text']").each(function() {
		$(this).val("");
	});
	$("#" + formId).find("input[type='hidden']").each(function() {
		$(this).val("");
	});
	$("#" + formId).find("input[type='password']").each(function() {
		$(this).val("");
	});
	$("#" + formId).find("select").each(function() {
		$(this).find("option").eq(0).attr("selected", true);
	});
	$("#" + formId).find("input[type='radio']").each(function() {
		$(this).eq(0).attr("checked", "checked");
	});
	
};
