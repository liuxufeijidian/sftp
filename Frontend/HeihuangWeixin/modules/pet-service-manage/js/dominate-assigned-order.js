 var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
$(function() {
	init();
});
function init(){

   $(".nav>ul>li a").on("tap",function(){
   	$(this).parent().find("ul").removeClass("no-display")
   })
   $(".nav .hidden-ul li a").on("tap",function(){
   	
   	$(this).parent().parent().addClass("no-display");

   	
   })
   var open_box=$(".open-box");   
   var current_order;
   var order_total=$(".order-total");
   $(".order-list").delegate(".assign","tap",function(){
   	  open_box.removeClass("no-display");
   	  current_order=$(this).parent();
   })
   open_box.delegate("li","tap",function(){
   	  //将订单分配给师傅,ajax通知服务器
   	  var expert=$(this).text();
   	  var order_num=current_order.find(".order-num").text();
   	  open_box.addClass("no-display");
   	  order_total.text(parseFloat(order_total.text()).toFixed(2)-1);
   	  current_order.find(".expert span").text(expert);
   	  assign_order(order_num,expert);
   	
   })
   $(".cancel-order").on("tap",function(){
   	  var parent_wrapper=$(this).parents(".order");
   	  var order_num=parent_wrapper.find(".order-num").text();
   	  order_total.text(parseFloat(order_total.text()).toFixed(2)-1);
   	  cancel_order(order_num);
   	  parent_wrapper.parent().remove();
   	  
   })
   $(".finish-order").on("tap",function(){
   	 
   	  var parent_wrapper=$(this).parent();
   	  var expert=parent_wrapper.find(".expert span").text(expert);
   	  var order_num=parent_wrapper.find(".order-num").text();
   	  order_total.text(parseFloat(order_total.text()).toFixed(2)-1);
   	  cancel_order(order_num,expert);
   	  parent_wrapper.remove();
   	  
   })
   
   function assign_order(order_num,expert){
             $.ajax({
					url:"",
					data:{
						"order_num":order_num,
						"expert":expert
						}
					 
					})  	
   	
   }
   function cancel_order(order_num){
   	         $.ajax({
					url:"",
					data:{
						"order_num":order_num
						}
					 
					}) 
   	
   }
  function finish_order(order_num,expert){
  	
  	      $.ajax({
					url:"",
					data:{
						"order_num":order_num,
						"expert":expert
						}
					 
					}) 
  } 
	
}
