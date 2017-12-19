require("calendar/moment.min.js");
var $ = jquery = require("jquery/jquery-2.1.4.min.js");
var calendar = require("calendar/fullcalendar.min.js");
require("calendar/zh-cn.js");

$(function() {
	initCalendar();
});

function initCalendar() {
	$('#calendar').fullCalendar({
		header : {
			left : 'title',
			center : '',
			right : 'prev,next today'
		},
		defaultDate : '2016-06-12',
		businessHours : true, // display business hours
		editable : true,
		height: 400,
		events : [
		// areas where "Meeting" must be dropped
		{
			id : 'availableForMeeting',
			start : '2016-06-11T10:00:00',
			end : '2016-06-11T16:00:00',
			rendering : 'background'
		}, {
			id : 'availableForMeeting',
			start : '2016-06-13T10:00:00',
			end : '2016-06-13T16:00:00',
			rendering : 'background'
		},

		// red areas where no events can be dropped
		{
			start : '2016-06-24',
			end : '2016-06-28',
			overlap : false,
			rendering : 'background',
			color : '#ff9f89'
		}, {
			start : '2016-06-06',
			end : '2016-06-08',
			overlap : false,
			rendering : 'background',
			color : '#ff9f89'
		}]
	});

}
