// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var Apple = {};
var ipad = "false";
Apple.UA = navigator.userAgent;
Apple.Device = false;
Apple.Types = ["iPhone", "iPod", "iPad", "other"];
for (var d = 0; d < Apple.Types.length; d++) {
	var t = Apple.Types[d];
	Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
	Apple.Device = Apple.Device || Apple[t];
}
var right_lock = 0;
var dir = 0;
var old_dir = 0;
var old_page = 1;
var html = "";
var left_lock = 0;
var oldleft_lock = 0;
var oldright_lock = 0;
var ResetAll = "true";
var O = 0;
var LeftRight = 0;
var UpDown = 0;
var landscape;
var portrait;
var page = 1;
var up = 0;
var down = 0;
var x = 0;
var y = 0;
var z = 0;

function init() {
	help(36);
	var dataContainerOrientation = document.getElementById('dataContainerOrientation');
	var dataContainerMotion = document.getElementById('dataContainerMotion');

	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', function (event) {

			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;

			if (alpha != null || beta != null || gamma != null)
				dataContainerOrientation.innerHTML = '<strong>Orientation</strong><br />alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
		}, false);
	}
}

if (window.DeviceMotionEvent) {
help(54);

	window.addEventListener('devicemotion', function (event) {

		if (event.accelerationIncludingGravity) {
			x = event.accelerationIncludingGravity.x;
			y = event.accelerationIncludingGravity.y;
			z = event.accelerationIncludingGravity.z;
		} else if (event.acceleration) {
			x = event.acceleration.x;
			y = event.acceleration.y;
			z = event.acceleration.z;
		}
		z = z * -1;
		if (x == null) {
			x = 0
		}
		if (y == null) {
			y = 0
		}
		if (z == null) {
			z = 0
		}
		x = x.toFixed();
		y = y.toFixed();
		z = z.toFixed();
		var r = event.rotationRate;
		//         var html = '<strong>Acceleration</strong><br />';

		//keep left=left when orientation changes
		window.addEventListener("orientationchange", function () {
			O = window.orientation;
		}, false);

		UpDown = z;
		/* up and down */
		//html = 'x: ' + x + '<br />y: ' + y + '<br/>z: ' + z + '<br />' + ' left_lock ' + left_lock + ' right_lock ' + right_lock + '<br />' + ' oldleft_lock ' + oldleft_lock + ' oldright_lock ' + oldright_lock + ' ResetAll ' + ResetAll + '<br />' + ' ScUpDown direction up' + scUpDown_up + ' ScUpDown direction down' + scUpDown_down + '<br />' + 'old_up= ' + old_up + ' old_down = ' + old_down + ' middle = ' + middle + ' page = ' + page + '<br />' + 'up= ' + up + ' down = ' + down + '<br /> UpDown= ' + UpDown + ' LeftRight = ' + LeftRight;


		if (O == 0) {
			LeftRight = x;
			//Portrait;
			landscape = false;
			portrait = true;
		}


		//LANDSCAPE
		if ((O == 90) || (O == -90)) {
			LeftRight = y;
			landscape = true;
			portrait = false;
		}

		if (LeftRight < -4) {
			$('div.tiltIndicatorLeft').attr("style", "background-color:#0f0; opacity:0.8;");
			setleft_lock();
		}

		if (LeftRight > 4) {
			$('div.tiltIndicatorRight').attr("style", "background-color:#0f0; opacity:0.8;");
			setright_lock();
		}

		if ((LeftRight < 2) && (LeftRight > -2)) {
			setResetAll()
		}

		function setleft_lock() {
			left();
			left_lock = 1;
		}

		function setright_lock() {
			right();
			right_lock = 1;
		}


		if (UpDown < 2) {
			$('div.tiltIndicatorBottom').attr("style", "background-color:#0f0; opacity:0.8;");
			dir = -1;
			help(136);
		}

		if (UpDown > 7) {
			$('div.tiltIndicatorTop').attr("style", "background-color:#0f0; opacity:0.8;");
			dir = 1;
			help(141);
		}

		if ((UpDown > 2) && (UpDown < 7)) {
			up = 0;
			down = 0;
			scroll(dir);
			help(148);
			//alert("line 150 Dir = " + dir);
			ResetBars();
			dir=0;

		}
	});
}

function scroll(dir){
	page = page + dir;
	if (page >4){page=4;
		//$('div.tiltIndicatorBottom').attr("style", "background-color:#00f; opacity:0.8;");
		//navigator.notification.vibrate(200); promise();
		//$('div.tiltIndicatorBottom').attr("style", "background-color:#f00; opacity:0.8;");
		dir=0;
		return dir;
	}

	if (page <1){page=1;
		//$('div.tiltIndicatorTop').attr("style", "background-color:#00f; opacity:0.8;");
		//window.na//vigator.vibrate(200); promise();
		//$('div.tiltIndicatorTop').attr("style", "background-color:#f00; opacity:0.8;");
		dir=0;
		return dir;
	}
	//old_page=page;
	if(dir !=0) {
		$('html, body').animate({
			scrollTop: $("#page-" + page).offset().top
		}, 2000);
		help(179);
		console.log("#page-" + page);
		//alert(dir);
	}
	return dir;
}

function right() {

	if (portrait) {
		$(div.left_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");
		$(div.right_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");
		$(div.left_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");
		$(div.right_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");

		$(div.left_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.right_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.left_info).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.right_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.right_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");
	}

	if (landscape) {
		$(div.left_side).attr("style", " margin-left:-25vw; transition: margin-left 2s;");
		$(div.right_side).attr("style", " margin-left:75vw; transition: margin-left 2s;");
		$(div.left_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.right_text).attr("style", "opacity: 0; transition: opacity 2s;");
	}
}

function left() {

	if (portrait) {
		$(div.left_side).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
		$(div.right_side).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
		$(div.right_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.left_text).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.right_info).attr("style", "opacity: 1; transition: opacity 2s;");
		$(div.left_info).attr("style", "opacity: 1; transition: opacity 2s;");
		//$(div.eft_side).attr("style", " margin-left:-50vw; transition: margin-left 2s;");
	}

	if (landscape) {
		$(div.left_side).attr("style", " margin-left:-75vw; transition: margin-left 2s;");
		$(div.right_side).attr("style", " margin-left:25vw; transition: margin-left 2s;");
		$(div.left_text).attr("style", "opacity: 0; transition: opacity 2s;");
		$(div.right_text).attr("style", "opacity: 1; transition: opacity 2s;");

	}
}


function screen_reset() {
	$(div.eft_text).attr("style", "opacity: 0; transition: opacity 2s;");
	$(div.ight_text).attr("style", "opacity: 0; transition: opacity 2s;");

	$(div.ight_info).attr("style", "opacity: 1; transition: opacity 2s;");
	$(div.eft_info).attr("style", "opacity: 1; transition: opacity 2s;");

	if (portrait) {
		$(div.ight_side).attr("style", " margin-left:0vw; transition: margin-left 2s;");
		$(div.eft_side).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
	}

	if (landscape) {
		$(div.ight_side).attr("style", " margin-left:50vw; transition: margin-left 2s;");
		$(div.eft_side).attr("style", " margin-left:-50vw; transition: margin-left 2s;");
	}
	alert("reset");
}

function setResetAll() {

	if (left_lock > 0) {
		if (oldleft_lock == 1) {
			left_lock = 0;
			oldleft_lock = 0;
			oldright_lock = 0;
			screen_reset();
		}
	}

	if (right_lock > 0) {
		if (oldright_lock == 1) {
			right_lock = 0;
			oldright_lock = 0;
			oldleft_lock = 0;
			screen_reset();
		}
	}


	if (left_lock > 0) {
		oldleft_lock = 1;
		left();
		left_lock = 0;
	}

	if (right_lock > 0) {
		oldright_lock = 1;
		right();
		right_lock = 0;
	}
}

function ResetBars(){
	$('div.tiltIndicatorTop').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorRight').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorBottom').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorLeft').attr("style", "background-color:#f00; opacity:0.8;");
	if (page==1){$('div.tiltIndicatorTop').attr("style", "background-color:#00f; opacity:0.8;");}
	if(page==4){$('div.tiltIndicatorBottom').attr("style", "background-color:#00f; opacity:0.8;");}
}

$(document).ready(function () {
	$("div.right_fade").hover(function () {
		$("div.left_fade h2").attr("style", "opacity:0; transition: opacity 2s;  ");
	}, function () {
		$("div.left_fade h2").attr("style", "opacity:1; transition: opacity 2s;  ");
	});


	$("div.left_fade").hover(function () {
		$("div.right_fade h2").attr("style", "opacity:0; transition: opacity 2s;  ");
	}, function () {
		$("div.right_fade h2").attr("style", "opacity:1; transition: opacity 2s;  ");
	});
});

function help(num) {

	html = 'line number  = ' +num + '<br>x: ' + x + '<br />y: ' + y + '<br/>z: ' + z + '<br />' + ' left_lock ' + left_lock + ' right_lock ' + right_lock + '<br />' + ' oldleft_lock ' + oldleft_lock + ' oldright_lock ' + oldright_lock + ' ResetAll ' + ResetAll + '<br />' + ' ScUpDown direction up ' + up + ' <br>ScUpDown direction down ' + down + '<br />  UpDown= ' + UpDown + ' LeftRight = ' + LeftRight + '<br /> Page = ' + page + '<br /> old_dir = ' + old_dir + ' dir = ' + dir + '<br /> old_page = ' + old_page + ' page = ' + page;

	$("div#dataContainerMotion").html(html);
	console.log(html);
}