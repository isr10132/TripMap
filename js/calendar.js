var tA;
var tB;
var eventsArray = [];

function initCalendar()
{
	// 外部事件可拖拉
	$('#selected-event').draggable({
        zIndex: 1070,
        revert: true, // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
	});

	// 取得所有 fc 上的 event
	$('#get-events-btn').click(function(){
    	// 將 eventsArray 按照日期排序
		console.log(eventsArray);
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
	$("#new-event-title,#new-event-description,#new-event-position").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        addEvent();
	    }
	});

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
        drop: function(date) {
        	// console.log(date);
			var event = {
				title: $(this).text(),
	            description: $(this).data('description'),
	            position: $(this).data('position'),
				latitude: $(this).data('latitude'),
				longitude: $(this).data('longitude'),
	            start: date,
	            allDay: !date.hasTime(),
	            backgroundColor: $(this).css('background-color'),
	            borderColor: $(this).css('border-color')
			}
        	console.log(event);
    		if (event.allDay != true)
    		{
  	    		event.end = moment(event.start);
	    		event.end.hour(event.end.hour()+2);
    		}
    		else
    		{
  	    		event.end = moment(event.start);
  	    		event.end.day(event.end.day()+1);
    		}
			$('#calendar').fullCalendar('renderEvent', event, true);
        	setEventsArray();
        },
        select: function(start, end) {
      	    var selectedObject = {
  	      	    title: $('#selected-event').text(),
	            description: $('#selected-event').data('description'),
	            position: $('#selected-event').data('position'),
				latitude: $('#selected-event').data('latitude'),
				longitude: $('#selected-event').data('longitude'),
  	      	    start: start.format('YYYY-MM-DD HH:mm:ss'),
  	      	    end: end.format('YYYY-MM-DD HH:mm:ss'),
  	      	    allDay: !start.hasTime() && !end.hasTime(),
  	      	    backgroundColor: $('#selected-event').css('background-color'),
  	      	    borderColor:  $('#selected-event').css('border-color')
      	    }
      	    $('#calendar').fullCalendar('renderEvent', selectedObject, true);
      	    $('#calendar').fullCalendar('unselect');
        	setEventsArray();
      	},
      	eventDrop: function(event, delta, revertFunc) {
  	    	// 若沒有end且不是allday，預設為開始時間 +2 小時
  	    	if (event.end == null)
  	    	{
  	    		if (event.allDay != true)
  	    		{
      	    		event.end = moment(event.start);
      	    		event.end.hour(event.end.hour()+2);
  	    		}
  	    		else
  	    		{
      	    		event.end = moment(event.start);
      	    		event.end.day(event.end.day()+1);
  	    		}
  	    	}
  	        $('#calendar').fullCalendar('refetchEvents');
        	setEventsArray();
        }, // end eventDrop
        eventClick: function(event) {
        	console.log(event._id);
        	if (confirm(event.title + '\n\n' + event.description + '\n\n' + event.position + '\n\n\n要刪除嗎？'))
        		$('#calendar').fullCalendar('removeEvents', event._id);
        },
        eventResize: function(event){
        	setEventsArray();
        }
    }); // end fullCalendar

	//綁定地址輸入框的keyup事件以即時重新定位
	$("#new-event-position").bind("keyup",function(){ 
		GetAddressMarker();
	}); 
}

// 將使用者輸入的資訊弄成 event 並顯示在 selected event
function addEvent(){
	console.log($('#new-event-title').val());
	console.log($('#new-event-description').val());
	console.log($('#new-event-position').val());

	$('#selected-event').text($('#new-event-title').val());
	$('#selected-event').data('description', $('#new-event-description').val());
	$('#selected-event').data('position', $('#new-event-position').val());
	$('#selected-event').data('latitude', LatLng.lat());
	$('#selected-event').data('longitude', LatLng.lng());
	$('#new-event-title,#new-event-description,#new-event-position').val('');
}

// 輸入兩個 time, 若 timeA 較大則回傳 true，否則回傳 false
function timeCompare(timeA, timeB)
{
	var arrayA = typeof(timeA) == 'string' ? timeA.split(/-|:|T| |\./) : timeA;
	var arrayB = typeof(timeB) == 'string' ? timeB.split(/-|:|T| |\./) : timeB;
	for (var i = 0; i < 6; i++)
	{
		a = parseInt(arrayA[i] != undefined ? arrayA[i] : 0);
		b = parseInt(arrayB[i] != undefined ? arrayB[i] : 0);
		// console.log(a > b);
		if (a > b)
			return true;
		else if (a < b)
			return false;
	}
	return true;
}

//  2018-05-15 20:30:00.0 -> 2018 年 5 月 15 日 下午 8 點 30 分
function toChineseTimeFormat(time, allday)
{
	var array = time.split(/-|:|T| |\./);
	var format = array[0] + ' 年 ' + ~~array[1] + ' 月 ' + ~~array[2] + ' 日 ';		// ~~可去掉開頭0
	format += allday == true ? ' 整天' : (array[3] >= 12 ? '下午 ' + ~~(array[3]-12) : '上午 ' + ~~(array[3])) + ' 點' + (array[4] > 0 ? ' ' + ~~array[4] + ' 分' : ' 整');
	return format;
}

function setEventsArray()
{
	eventsArray = $('#calendar').fullCalendar('clientEvents');
	eventsArray = eventsArray.sort(function (a, b) {
		tA = a;
		tB = b;
    	return timeCompare(a.start.format!=undefined ? a.start.format() : a.start._i, b.start.format!=undefined ? b.start.format() : b.start._i) ? 1 : -1;
    });
}	