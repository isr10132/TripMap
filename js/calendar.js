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
				console.log(eventsArray[i].title);
				console.log(eventsArray[i].start.format());
			}
		});

		// 更改 selected event 顏色
		$('.color-btn').click(function(){
			var tmpColor = $(this).css('background-color');
			$('#selected-event').css({'background-color': tmpColor, 'border-color': tmpColor});
		})

		// 使用者輸入完後 按下添加
		$('#add-new-event').click(addEvent);

		// 使用者輸入完後 按下 Enter 可視為執行添加
	$("#new-event").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        addEvent();
	    }
	});

	// 將使用者輸入的資訊弄成 event 並顯示在 selected event
	function addEvent(){
			$('#selected-event').text($('#new-event').val());
			$('#new-event').val('');
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
	            backgroundColor: $(this).css("background-color"),
	            borderColor: $(this).css("border-color"),
	            start: data.toISOString(),
	            allDay: !data.hasTime()
			}
			$('#calendar').fullCalendar('renderEvent', event, true);
        }
        
    }); // end fullCalendar
})

function addEvent(data)
{
	
}
