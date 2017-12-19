var $ = jquery = require("jquery/jquery-2.1.4.min.js");
require("jquery/jquery-2.1.4.min.js");
var Mask={
	wrap:function(){
      var wrapper='<div class="mask flex items-center flex-center border-box justify-center" style="background-color:rgba(0,0,0,0.5);width:100%;height:100%;position:fixed;left:0px;top:0px"><div style="text-align:center"><img class="block" style="margin:0 auto;margin-bottom:5px;width:30px" src="/modules/base/images/loading.gif">请稍候</div></div>';	
      $("body").append(wrapper);
      this.mask=$('.mask');
      this.mask.on("tap",function(e){
      e.stopPropagation();
      e.preventDefault();
      })		
	},
	unwrap:function(){
	  this.mask.remove(); 
	}
};
return Mask;
module.experts=Mask;