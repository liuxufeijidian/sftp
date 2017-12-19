var $ = jquery = require("jquery/jquery-2.1.4.min.js");

$(function() {
	initMethod();
});

function initMethod() {
	$("input[name='search']").on("keydown", function(e) {
		if (e.keyCode == 13) {
			$.ajax({
				url : "/weixin/getConstTypeByDesc",
				type : "POST",
				async : false,
				data : {
					"desc" : $("input[name='search']").val()
				},
				success : function(data) {
					$(".villeages").find("ul").empty();
					if(data && data.length > 0) {
						for(var i=0; i<data.length; i++) {
							$(".villeages").find("ul").append("<li><a class='full-width' href='/weixin/pageChannel?userId=" + $("#userId").val() + "&villeage=" + data[i].constTypeId + "'>" + data[i].constTypeDesc + "</a></li>");
						}
					}
				}
			});
		}
	});
	
	$(".other-villeage").click(function() {
		location.href = "/weixin/pageChannelOther?userId="  + $("#userId").val(); 
	});
}
