//toast提示框
var toast_showing = false;

function promptBox(message) {
	if(toast_showing) {
		return;
	}
	toast_showing = true;
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "newD");
	newDiv.className = "promptBox";
	newDiv.innerHTML = message;
	document.body.appendChild(newDiv);
	//shadow
	var shadowDiv = document.createElement("div");
	shadowDiv.setAttribute("id", "shadowId");
	shadowDiv.className = "shadowClass";
	document.body.appendChild(shadowDiv);

	newDiv.style.display = "block";
	setTimeout(function() {
		toast_showing = false;
		var promptDiv = document.getElementById('newD');
		document.body.removeChild(promptDiv);
		var shadowDiv = document.getElementById('shadowId');
		document.body.removeChild(shadowDiv);
	}, 1500);
	var clientWidth = document.body.clientWidth;
	var divWidth = $('#newD').width() + 30;
	var leftMuch = (clientWidth - divWidth) / 2;
	$('#newD').css('left', leftMuch);
}

//TextArea字数规则限制
var nums;

function words_nums(obj, nums) {
	var curLength = $(obj).val().length;
	if(curLength > nums) {
		var num = $(obj).val().substr(0, nums);
		$(obj).siblings("span").text(nums + "/" + nums);
		$(obj).val(num);
		promptBox("最多只能输入" + nums + "个字！");
	} else {
		$(obj).siblings("span").text($(obj).val().length + "/" + nums);
	}
	TextAreas = $(obj).val();
}