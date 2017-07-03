window.onload = function() {
	var positionCity = "北京市";
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 8);
	//不显示线路图
	map.setMapStyle({
		styleJson: [{
			"featureType": "highway",
			"elementType": "all",
			"stylers": {
				"visibility": "off"
			}
		}]
	});
	function myFun(result) {
		positionCity = result.name;
		map.setCenter(positionCity);
		alert("当前定位城市:" + positionCity);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
	// 复杂的自定义覆盖物
	function ComplexCustomOverlay(point, cityNames, counts, img1, img2) {
		this._point = point;
		this._cityNames = cityNames;
		this._counts = counts;
		this._img1 = img1;
		if(!img2 == "" || !img2 == undefined) {
			this._img2 = img2;
		}
	}
	ComplexCustomOverlay.prototype = new BMap.Overlay();
	ComplexCustomOverlay.prototype.initialize = function(map) {
		this._map = map;
		var div = this._div = document.createElement("div");
		div.className = "bq";
		div.setAttribute("cityNames", this._cityNames);
		div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
		var span = this._span = document.createElement("span");
		var img = document.createElement("img");
		img.src = this._img1;
		if(!this._img2 == "" || !this._img2 == undefined) {
			var img2 = document.createElement("img");
			img2.src = this._img2;
			div.appendChild(img2);
		}
		img.style.borderRadius = "50%";
		div.appendChild(img);
		div.appendChild(span);
		span.appendChild(document.createTextNode(this._counts));
		var that = this;
		var arrow = this._arrow = document.createElement("div");
		arrow.style.position = "absolute";
		arrow.style.width = "0";
		arrow.style.height = "0";
		arrow.style.top = ".3rem";
		arrow.style.border = ".06rem solid transparent";
		arrow.style.borderTopColor = "rgba(255, 255, 255, 0.9)";
		arrow.style.left = "45%";
		arrow.style.overflow = "hidden";
		div.appendChild(arrow);
		var dots = this._dots = document.createElement("div");
		dots.style.position = "absolute";
		dots.style.width = ".08rem";
		dots.style.height = ".08rem";
		dots.style.top = ".4rem";
		dots.style.border = "2px solid #FFFFFF";
		dots.style.borderRadius = "50%";
		dots.style.backgroundColor = "#FF3535";
		dots.style.left = "44%";
		dots.style.overflow = "hidden";
		div.appendChild(dots);
		map.getPanes().labelPane.appendChild(div);
		//根据定位得到的城市名给当前所在城市添加样式
		var aDiv = getElementByAttr('div', 'cityNames', positionCity); //返回cityNames为定位城市名的div集合
		for(var i = 0; i < aDiv.length; i++) {
			console.log(aDiv[i].innerHTML);
			aDiv[i].style.backgroundColor = '#FF3535';
			aDiv[i].style.color = '#FFFFFF';
			aDiv[i].getElementsByTagName("div")[0].style.borderTopColor = '#FF3535';　　
		}

		//点击事件
		div.addEventListener('touchstart', function() {
			window.location.href = "volunteerList.html"
		});
		return div;
	}

	ComplexCustomOverlay.prototype.draw = function() {
		var map = this._map;
		var pixel = map.pointToOverlayPixel(this._point);
		this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
		this._div.style.top = pixel.y - 45 + "px";
	}

	//描多个点
	var json_data = [
		["北京市", "2百人", "static/images/tm.jpg", "static/images/headPic.png"],
		["石家庄", "3千人", "static/images/headPic.png"],
		["济南", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
		["张家口", "2百人", "static/images/tm.jpg", "static/images/headPic.png"],
		["大同市", "3千人", "static/images/headPic.png"],
		["天津", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
		["赤峰", "2百人", "static/images/tm.jpg", "static/images/headPic.png"],
		["承德", "3千人", "static/images/headPic.png"],
		["朔州", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
		["太原", "2百人", "static/images/tm.jpg", "static/images/headPic.png"],
		["郑州", "3千人", "static/images/headPic.png"],
		["上海", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
		["杭州", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
		["西安", "2百人", "static/images/tm.jpg", "static/images/headPic.png"],
		["重庆", "3千人", "static/images/headPic.png"],
		["贵阳", "4万人", "static/images/tm.jpg", "static/images/headPic.png"],
	];
	var pointArray = new Array();
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	for(var i = 0; i < json_data.length; i++) {
		var cityName = json_data[i][0];
		var counts = json_data[i][1];
		var img1 = json_data[i][2];
		var img2 = json_data[i][3];
		miaodian(cityName, counts, img1, img2, i);
	}

	function miaodian(cityName, counts, img1, img2, i) {
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(cityName, function(point) {
			if(point) {
				map.centerAndZoom(point, 8);
				var myCompOverlay = new ComplexCustomOverlay(point, cityName, counts, img1, img2); // 创建点
				map.addOverlay(myCompOverlay); //增加点
				pointArray[i] = new BMap.Point(point);
			} else {
				//promptBox("该地址没有解析到结果!");
			}
		}, "北京市");
	}
	//查找指定标签下指定属性的元素
	function getElementByAttr(tag, attr, value) {
		var aElements = document.getElementsByTagName(tag);
		var aEle = [];
		for(var i = 0; i < aElements.length; i++) {
			if(aElements[i].getAttribute(attr) == value)
				aEle.push(aElements[i]);
		}
		return aEle;
	}
}