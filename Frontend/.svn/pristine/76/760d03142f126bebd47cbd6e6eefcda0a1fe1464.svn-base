var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
require("sweetalert/sweetalert.min.js");
require("sweetalert/swal-forms.js");
var parkArea = new Array();
$(function() {
	initData();
	init();
});
function initData() {
	$.ajax({
		url : "/weixin/getConstValueByTypeId",
		type : "POST",
		async : false,
		data : {
			"typeId" : $("#villeageId").val()
		},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				parkArea.push({
					value : data[i].id,
					text : data[i].constDesc
				});
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}

function init() {

	$(".add-car").on("click", function() {
		swal.withForm({
			title : '',
			text : '填写车辆信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'plate',
				placeholder : '请填写车牌号'
			}, {
				id : 'parkArea',
				type : 'select',
				options : parkArea
			}, {
				id : 'carType',
				type : 'select',
				options : [{
					value : '轿车',
					text : '轿车'
				}, {
					value : 'SUV',
					text : 'SUV'
				}]
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if (this.swalForm.plate == "") {
					alert("车牌号必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/saveUserCar',
					type : 'POST',
					data : {
						plate : _this.plate,
						parkArea : _this.parkArea,
						carType : _this.carType,
						userId : $("#userId").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("添加失败，请稍后再试");
						} else {
							alert("添加成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("添加失败，请稍后再试");
					}
				});
			}
		});
	});

	$(".add-pet").on("click", function() {
		swal.withForm({
			title : '',
			text : '填写宠物信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'petName',
				placeholder : '请填写宠物名'
			}, {
				id : 'petAge',
				type : 'number'
			}, {
				id : 'petType',
				placeholder : '请填写宠物类型'
			}, {
				id : 'isAttack',
				type : 'select',
				options : [{
					value : '1',
					text : '是'
				}, {
					value : '0',
					text : '否'
				}]
			}, {
				id : 'petCondition',
				placeholder : '请填写宠物身体状况'
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if (this.swalForm.plate == "") {
					alert("车牌号必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/savePetAll',
					type : 'POST',
					data : {
						petName : _this.petName,
						petAge : _this.petAge,
						petType : _this.petType,
						isAttack : _this.isAttack,
						petCondition : _this.petCondition,
						userId : $("#userId").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("添加失败，请稍后再试");
						} else {
							alert("添加成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("添加失败，请稍后再试");
					}
				});
			}
		});
	});

	$(".modify-car").click(function() {
		var carInfo = $(this).closest(".car-info");
		swal.withForm({
			title : '',
			text : '更新车辆信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'plate',
				placeholder : '请填写车牌号',
				value : carInfo.find("input[name='plate']").val()
			}, {
				id : 'parkArea',
				type : 'select',
				options : parkArea
			}, {
				id : 'carType',
				type : 'select',
				options : [{
					value : '轿车',
					text : '轿车'
				}, {
					value : 'SUV',
					text : 'SUV'
				}]
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if (this.swalForm.plate == "") {
					alert("车牌号必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/updateUserCar',
					type : 'POST',
					data : {
						plate : _this.plate,
						parkArea : _this.parkArea,
						carType : _this.carType,
						userId : $("#userId").val(),
						id : carInfo.find("input[name='carId']").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("更新失败，请稍后再试");
						} else {
							alert("更新成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("更新失败，请稍后再试");
					}
				});
			}
		});
	});

	$(".delete-car").click(function() {
		var carInfo = $(this).closest(".car-info");
		swal({
			title : "",
			text : "是否删除该车辆",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/deleteUserCar',
					type : 'POST',
					data : {
						carId : carInfo.find("input[name='carId']").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("删除失败，请稍后再试");
						} else {
							alert("删除成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("更新失败，请稍后再试");
					}
				});
			}
		});
	});
	$(".modify-pet").click(function() {
		var petInfo = $(this).closest(".pet-info");
		swal.withForm({
			title : '',
			text : '更新宠物信息',
			showCancelButton : true,
			confirmButtonColor : '#DD6B55',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			formFields : [{
				id : 'petName',
				placeholder : '请填写宠物名',
				value : petInfo.find("input[name='petName']").val()
			}, {
				id : 'petAge',
				type : 'number',
				value : petInfo.find("input[name='petAge']").val()
			}, {
				id : 'petType',
				placeholder : '请填写宠物类型',
				value : petInfo.find("input[name='petType']").val()
			}, {
				id : 'isAttack',
				type : 'select',
				options : [{
					value : '1',
					text : '是'
				}, {
					value : '0',
					text : '否'
				}]
			}, {
				id : 'petCondition',
				placeholder : '请填写宠物身体状况',
				value : petInfo.find("input[name='petCondition']").val()
			}]
		}, function(isConfirm) {
			if (isConfirm) {
				var _this = this.swalForm;
				console.log(this.swalForm);
				if (this.swalForm.plate == "") {
					alert("车牌号必须填写");
					return;
				}
				$.ajax({
					url : '/weixin/updatePet',
					type : 'POST',
					data : {
						petName : _this.petName,
						petAge : _this.petAge,
						petType : _this.petType,
						isAttack : _this.isAttack,
						petCondition : _this.petCondition,
						id : petInfo.find("input[name='petId']").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("更新失败，请稍后再试");
						} else {
							alert("更新成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("删除失败，请稍后再试");
					}
				});
			}
		});
	});
	$(".delete-pet").click(function() {
		var petInfo = $(this).closest(".pet-info");
		swal({
			title : "",
			text : "是否删除该宠物",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					url : '/weixin/deletePet',
					type : 'POST',
					data : {
						petId : petInfo.find("input[name='petId']").val()
					},
					success : function(data) {
						if (data == -1) {
							alert("删除失败，请稍后再试");
						} else {
							alert("删除成功");
							location.reload();
						}
					},
					error : function(data) {
						alert("删除失败，请稍后再试");
					}
				});
			}
		});
	});
}
