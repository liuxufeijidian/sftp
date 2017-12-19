 var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("zepto/touch.js");
$(function() {
	init();
});
function init(){

			
			 $(".shopping-list input").on("click",function(){
				 
				  var total_price=0;
				  var parent_wrapper=$(this).parents(".shopping-list");
				  parent_wrapper.find("input:checked").each(function(index, element) {
                    var price=parseFloat($(element).parent().find(".price").text());
					total_price+=price;
                  });
				 $(".total").text(total_price.toFixed(2))
				 })
	
	
}
