var $ = jQuery = require("jquery/jquery");
require("jquery-ui/jquery-ui-1.10.3.min");
require("bootstrap/js/bootstrap.min");
require("icharts/ichart.1.2.min");

require("/components/angular/angular");
require("/components/angular-cookies/angular-cookies");
require("/components/ui-router/angular-ui-router");


drawChart();

function drawChart(){
		var pv=[],ip=[],t;
		for(var i=0;i<7;i++){
			t = Math.floor(Math.random()*(30+((i%12)*5)))+10;
			pv.push(t);
			t = Math.floor(t*0.5);
			t = t-Math.floor((Math.random()*t)/2);
			ip.push(t);
		}
		
		var data = [
		         	{
		         		name : '全量',
		         		value:pv,
		         		color:'#0d8ecf',
		         		line_width:2
		         	},
		         	{
		         		name : '增量',
		         		value:ip,
		         		color:'#ef7707',
		         		line_width:2
		         	}
		         ];
	     
		var labels = ["2016-02-23","2012-02-24","2012-02-25","2012-02-26","2012-02-27","2012-02-28"];
		var line = new iChart.LineBasic2D({
			render : 'canvasDiv',
			data: data,
			align:'center',
			title : '设备最近7天数量趋势',
			subtitle : '量单位：万',
			footnote : '数据来源：模拟数据',
			width : 800,
			height : 400,
			tip:{
				enable:true,
				shadow:true
			},
			legend : {
				enable : true,
				row:1,//设置在一行上显示，与column配合使用
				column : 'max',
				valign:'top',
				sign:'bar',
				background_color:null,//设置透明背景
				offsetx:-80,//设置x轴偏移，满足位置需要
				border : true
			},
			crosshair:{
				enable:true,
				line_color:'#62bce9'
			},
			sub_option : {
				label:false,
				point_hollow : false
			},
			coordinate:{
				width:640,
				height:240,
				axis:{
					color:'#9f9f9f',
					width:[0,0,2,2]
				},
				grids:{
					vertical:{
						way:'share_alike',
				 		value:5
					}
				},
				scale:[{
					 position:'left',	
					 start_scale:0,
					 end_scale:100,
					 scale_space:10,
					 scale_size:2,
					 scale_color:'#9f9f9f'
				},{
					 position:'bottom',	
					 labels:labels
				}]
			}
		});
	
	//开始画图
	line.draw();
}

