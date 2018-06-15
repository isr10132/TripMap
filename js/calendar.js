// 記得用檔案引入js	
$(function(){

	// 外部事件可拖拉
	$('#selected-event').draggable({
        zIndex: 1070,
        revert: true, // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
	});

	// 取得所有 fc 上的 event
	$('#get-events-btn').click(function(){
		var eventsArray = $('#calendar').fullCalendar('clientEvents');
		for (var i = 0; i < eventsArray.length; i++)
		{
			console.log('index: ' + i);
			console.log(eventsArray[i]);
			console.log('title: ' + eventsArray[i].title);
			console.log('start: ' + eventsArray[i].start.format());
			console.log('end: ' + eventsArray[i].end.format());
			console.log('description: ' + eventsArray[i].description);
		}
	});

	// 更改 selected event 顏色
	$('.color-btn').click(function(){
		var tmpColor = $(this).css('background-color');
		$('#selected-event').css({'background-color': tmpColor, 'border-color': tmpColor});
	})

	// 自訂顏色
	$('#color-picker').change(function(){
		var tmpColor = $(this).val();
		$('#selected-event').css({'background-color': tmpColor, 'border-color': tmpColor});
    });

	// 使用者輸入完後 按下添加
	$('#add-new-event').click(addEvent);

	// 使用者輸入完後 按下 Enter 可視為執行添加
	$("#new-event-title").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        addEvent();
	    }
	});

	// 將使用者輸入的資訊弄成 event 並顯示在 selected event
	function addEvent(){
		$('#selected-event').text($('#new-event-title').val());
		$('#selected-event').data('description', $('#new-event-description').val());
		$('#new-event-title,#new-event-description').val('');
	}

	$('#calendar').fullCalendar({
		// 視圖的擺放
        header: {
          left: 'prev,next today',
          center:  'title',
          right: 'month,agendaWeek,agendaDay'
        },
        // 按鈕的文字
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '天'
        },
        // 日期格式
        timeFormat: 'hh:mm a',
        // 行事曆的操作
        editable: true,
        droppable: true,
        selectable: true,
        selectHelper: true,
        drop: function(data, allDay) {
			var event = {
				title: $(this).text(),
	            description: $(this).data('description'),
	            start: data.toISOString(),
	            allDay: !data.hasTime(),
	            backgroundColor: $(this).css('background-color'),
	            borderColor: $(this).css('border-color')
			}
			$('#calendar').fullCalendar('renderEvent', event, true);
        },
        select: function(start, end) {
      	    var selectedObject = {
  	      	    title: $('#selected-event').text(),
	            description: $('#selected-event').data('description'),
  	      	    start: start.format('YYYY-MM-DD HH:mm:ss'),
  	      	    end: end.format('YYYY-MM-DD HH:mm:ss'),
  	      	    allDay: !start.hasTime() && !end.hasTime(),
  	      	    backgroundColor: $('#selected-event').css('background-color'),
  	      	    borderColor:  $('#selected-event').css('border-color')
      	    }
      	    $('#calendar').fullCalendar('renderEvent', selectedObject, true);
      	    $('#calendar').fullCalendar('unselect');
      	},
    }); // end fullCalendar
})

function addEvent(data)
{
	
}
