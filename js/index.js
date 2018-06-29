$(document).ready(function(){
	initCalendar();
})

// 切換到 Calendar 頁面
$(document).on('click', '#calendar-tab', function(){
	// 每次重新繪圖一次
	$('#calendar-main').html('<div id="calendar"></div>')
	initCalendar();
	initializeMiniMap();
	$('#calendar').fullCalendar('addEventSource', eventsArray);
})

// 切換到 Map 頁面
$(document).on('click', '#map-tab', function(){
	// 每次重新繪圖一次
	$('#output').html('<tr class="table-title"><td class="ta1">標題</td><td class="ta2">開始</td><td class="ta2">結束</td><td class="ta3">內容</td><td class="ta4">地點</td></tr>');
	for (var i = 0; i < eventsArray.length; i++)
	{
		$('#output').append(
				'<tr class="table-content" style="background-color: ' + eventsArray[i].backgroundColor + '">' +
				'<td>' + eventsArray[i].title + '</td>' +
				'<td>' + toChineseTimeFormat(eventsArray[i].start.format(), eventsArray[i].allDay) + '</td>' +
				'<td>' + toChineseTimeFormat(eventsArray[i].end.format(), eventsArray[i].allDay) + '</td>' +
				'<td>' + eventsArray[i].description + '</td>' +
				'<td><a href="javascript:void(0)" onclick="moveToLocation('+i+')">' + eventsArray[i].position + '</a></td>' +
				'</tr>'
		);
	}
	initMap();
})