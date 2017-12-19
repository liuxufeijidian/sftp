var $ = require("jquery/jquery.js");
$(function(){
	var imgUrl = __inline("/modules/login/img/full-bg-1.jpg");
	$(".bg-image").css("background-image", "url(" + imgUrl + ")");
});
$(".submit-btn").on("click",function(event){
	login();
	event.stopPropagation();//阻止冒泡
	event.preventDefault();
});
$("#frmLogin").on("keypress",function(event){
	if(event.keyCode == "13"){
		login();
	};
});
var login = function(){
	var userName =  $(".userName").val();
	var userPwd  = $(".userPwd").val();
	if(userName != "" &&  userPwd != ""){
		$("#frmLogin").submit();
	}else{
		$(".error").text("用户名密码不能为空");
	}
};
