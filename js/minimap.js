var map;
var marker;
var latlng;
  
function initializeMiniMap() 
{
	//初始化地圖時的定位經緯度設定
	latlng = new google.maps.LatLng(25.1508552,121.77268630000003); //台灣緯度Latitude、經度Longitude：23.973875,120.982024
	//初始化地圖options設定
	var mapOptions = {
		zoom: 16,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	//初始化地圖
	map = new google.maps.Map(document.getElementById("small-map"),mapOptions);
	//加入標記點
	marker = new google.maps.Marker({
		draggable:true,
		position: latlng,
		title:"台灣 Taiwan",
		map:map
	}); 
	//增加標記點的mouseup事件
	google.maps.event.addListener(marker, 'mouseup', function() {
		LatLng = marker.getPosition();
		console.log('緯度：" '+ LatLng.lat() +' "經度：" '+ LatLng.lng());
		// $("#NowLatLng").html("【移動標記點後的位置】緯度：" + LatLng.lat() + "經度：" + LatLng.lng());
	});
 	
}
 
function GetAddressMarker()
{//重新定位地圖位置與標記點位置
	address = $("#new-event-position").val();
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address':address
	},function (results,status) {
		if(status==google.maps.GeocoderStatus.OK) 
		{
			//console.log(results[0].geometry.location);
			LatLng = results[0].geometry.location;
			map.setCenter(LatLng);  //將地圖中心定位到查詢結果
			marker.setPosition(LatLng); //將標記點定位到查詢結果
			marker.setTitle(address); //重新設定標記點的title
			console.log('緯度：" '+ LatLng.lat() +' "經度：" '+ LatLng.lng());
			// $("#SearchLatLng").html("【您輸入的地址位置】緯度：" + LatLng.lat() + "經度：" + LatLng.lng());
		}
	}
); 
}