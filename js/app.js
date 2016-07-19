// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
var Apple = {};
var ipad = "false";
Apple.UA = navigator.userAgent;
Apple.Device = false;
Apple.Types = ["iPhone", "iPod", "iPad", "other"];
for (var d = false; d < Apple.Types.length; d++) {
	var t = Apple.Types[d];
	Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
	Apple.Device = Apple.Device || Apple[t];
}
var start = new Date().getTime();
var running_for = 0;
var dir = 0;
var RL = false;
var LL = false;
var ML = true;
var del = 0;
var old_dir = 0;
var old_page = 1;
var html = "";
var L = 0;
var R = 0;
var right_lock = false;
var oldright_lock = false;
var left_lock = false;
var ResetAll = "true";
var O = 0;
var shake = 0;
var LeftRight = 0;
var LeftRightV = 0;
var UpDown = 0;
var landscape;
var portrait;
var page = 1;
var up = 0;
var down = 0;
var x = 0;
var xx = 0;
var avX = [];
var y = 0;
var z = 0;
var oldx = 0;
var oldy = 0;
var oldz = 0;
var timeStill = 0;
var stillStart = 0;
var still = 0;
var refx = 0;
var refy = 0;
var refz = 0;
var refLR = 0;
var LRoffset = 3;
var settleTime = 1000;
var wait = 1000;



// register a shake event
	//window.removeEventListener('shake', shakeEventDidOccur, false);
	window.addEventListener('shake', function(){shake = 1;}, false);

//shake event callback



	/**************END SHAKE***********************/


	if (window.DeviceOrientationEvent) {
		window.removeEventListener('deviceorientation', function (event) {
		});
		window.addEventListener('deviceorientation', function (event) {

			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;

			if (alpha != null || beta != null || gamma != null)
				dataContainerOrientation.innerHTML = '<strong>Orientation</strong><br />alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
		}, false);
	}


if (window.DeviceMotionEvent) {


	window.removeEventListener('devicemotion', function (event) {
	});
	window.addEventListener('devicemotion', function (event) {

		//help('110 LL ' + LL + ' Left ' + L);

		oldx = Math.round(x);
		oldy = Math.round(y);
		oldz = Math.round(z);

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
		x = Math.round(x);
		y = Math.round(y);
		z = Math.round(z);
		// When its still. stillStart=(new Date().getTime()). still=true
		timeStill = new Date().getTime() - stillStart;

		if (timeStill > settleTime) {
			refx = oldx;
			refy = oldy;
			refz = oldz;
			still = 1;
			still_func();
		}
		else {
			still = 0;
		}
	//	help('line 157: ' + timeStill);
		//keeps left =to left when orientation changes
		window.addEventListener("orientationchange", function () {
			O = window.orientation;
			scroll_func(-1, 1);
		}, false);
		UpDown = z;

		// PORTRAIT
		if (O == 0) {
			LeftRightV = x;
			refLR = refx;
			//Portrait;
			landscape = false;
			portrait = true;
		}

		//LANDSCAPE
		if ((O == 90) || (O == -90)) {
			LeftRightV = y;
			refLR = refy;
			landscape = true;
			portrait = false;
		}

		//if (timeStill > settleTime) {
			LeftRight = LeftRightV
		//}


		if ((UpDown < 2) && (shake == 1)) {//scroll down

			//$('div.tiltIndicatorBottom').attr("style", "background-color:#0f0; opacity:0.8;");

			dir = -1;
			//help('up-138');
			middle();
			scroll_func(dir, shake);
			dir = 0;
			middle();
			shake = 0;
			still = 0;
		}

		if ((UpDown > 7) && (shake == 1)) {//scroll up

			//$('div.tiltIndicatorTop').attr("style", "background-color:#0f0; opacity:0.8;");

			middle();
			dir = 1;
			//help('down-141');
			scroll_func(dir, shake);
			dir = 0;
			middle();
			shake = 0;
			still = 0;
		}

		/*********************** START TILT ***************************************************/
		/*********************** TILT LEFT ***************************************************/
		/*********************** TILT LEFT TRIGGER ***************************************************/

		/*if (LeftRight < (refLR - LRoffset)) {*/ // LEFT TILT DETECTED
		if (LeftRight < LRoffset-4) {
			$('div.tiltIndicatorLeft').attr("style", "background-color:#0f0; opacity:0.8;");
			//help('LL ' + LL + ' Left ' + L);
			setleft_lock();
		}
		else {
			$('div.tiltIndicatorLeft').attr("style", "background-color:#f00; opacity:0.8;");
		}
		/***********************TILT RIGHT***************************************************/
		/***********************TILT RIGHT TRIGGER ***************************************************/
		/*if (LeftRight > (refLR + LRoffset)) {*/
		if (LeftRight > LRoffset+1) {
			$('div.tiltIndicatorRight').attr("style", "background-color:#0f0; opacity:0.8;");
			setright_lock();
		}
		else {
			$('div.tiltIndicatorRight').attr("style", "background-color:#f00; opacity:0.8;");
		}
		/********************************************************************************************/
		/*********************** MIDDLE STATE ***************************************************/

		if ((LeftRight < (refLR - LRoffset / 2)) && (LeftRight > (refLR + LRoffset / 2))) {
			setResetAll();
			LL = true;
		}
	});

	/*
	 ==========================================================================================
	 */


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

	function init() {
		var dataContainerOrientation = document.getElementById('dataContainerOrientation');
		var dataContainerMotion = document.getElementById('dataContainerMotion');

		var myShakeEvent = new Shake({
			threshold: 5
		});

		myShakeEvent.start();
	}


	function shakeEventDidOccur() {
		shake = 1;
	}


	function setleft_lock() {

		if (LL==false){
			left();
			LL=true;
		}
			else
		{
			middle();
			LL=false;
		}

		if (RL==true){
			left();
			RL=false;
		}

		//help("ll=:"+LL);
	}

	function left() {
		//help('LEFT SCROLL LL ' +LL +' Left ' +L);
		$('div.left_side').attr("style", " margin-left:0vw; transition: margin-left 2s;");
		$('div.right_side').attr("style", " margin-left:100vw; transition: margin-left 2s;");
		$('div.middle').attr("style", "opacity: 0; transition: opacity 2s;");
		$('div.left_text').attr("style", "opacity: 1; transition: opacity 2s;");
		$('div.right_text').attr("style", "opacity: 0; transition: opacity 2s;");
		$('div.left_info').attr("style", "opacity: 1; transition: opacity 2s;");
	}


	function setright_lock() {
		if (RL == false) {
			right();
			RL=true;
		}
			else
		{
			middle();
			RL=false;
		}
		if (LL==true){
			right();
			LL=false;
		}
		//help("RL=:"+RL);
	}


	function right() {

		$('div.left_side').attr("style", " margin-left:-100vw; transition: margin-left 2s;");
		$('div.right_side').attr("style", " margin-left:-100vw; transition: margin-left 2s;");
		$('div.right_text').attr("style", "opacity: 1; transition: opacity 2s;");
		$('div.left_text').attr("style", "opacity: 0; transition: opacity 2s;");
		$('div.right_info').attr("style", "opacity: 1; transition: opacity 2s;");
		$('div.left_info').attr("style", "opacity: 0; transition: opacity 2s;");
		$('div.middle').attr("style", "opacity: 0; transition: opacity 2s;");
	}



	function middle() {
		$('div.middle').attr("style", "opacity: 1; transition: opacity 2s;");
		$('div.left_side').attr("style", " margin-left:-100vw; transition: margin-left 2s;");
		$('div.right_side').attr("style", " margin-left:100vw; transition: margin-left 2s;");
		LL=false;
		RL=false;

		//setResetAll();
	}

	/********************************************************************************************/
	/*****************END TILT**********************************************************/
}


function scroll_func(dir, shake) {

	if (shake == 1) {
		page = page + dir;
	}
	if (page > 4) {
		page = 4;
		//$('div.tiltIndicatorBottom').attr("style", "background-color:#00f; opacity:0.8;");
		//$('div.tiltIndicatorBottom').attr("style", "background-color:#f00; opacity:0.8;");
		dir = 0;
		//help(225);
		shake = 0;
		return shake;
	}

	if (page < 1) {
		page = 1;
		//$('div.tiltIndicatorTop').attr("style", "background-color:#00f; opacity:0.8;");
		//$('div.tiltIndicatorTop').attr("style", "background-color:#f00; opacity:0.8;");
		dir = 0;
		//help(234);
		shake = 0;
		return shake;
	}
	//old_page=page;
	if (dir != 0) {
		$('html, body').animate({
			scrollTop: $("#page-" + page).offset().top
		}, 2000);
		//help("page-" + page);
		console.log("#page-" + page);
		//alert(dir);
	}
	shake = 0;
	//setTimeout(del_func,2000);
	return shake;
}


function screen_reset() {
	$('div.left_text').attr("style", "opacity: 0; transition: opacity 2s;");
	$('div.right_text').attr("style", "opacity: 0; transition: opacity 2s;");

	$('div.right_info').attr("style", "opacity: 1; transition: opacity 2s;");
	$('div.left_info').attr("style", "opacity: 1; transition: opacity 2s;");

	/*	if (portrait) {*/
	$('div.right_side').attr("style", " margin-left:0vw; transition: margin-left 2s;");
	$('div.left_side').attr("style", " margin-left:-100vw; transition: margin-left 2s;");
	/*	}

	 if (landscape) {
	 $('div.right_side').attr("style", " margin-left:50vw; transition: margin-left 2s;");
	 $('div.left_side').attr("style", " margin-left:-50vw; transition: margin-left 2s;");
	 }*/
	//alert("reset");
	$('div.middle').attr("style", "opacity: 1; transition: opacity 2s;");
}

function setResetAll() {

	if (left_lock == true) {
		if (oldleft_lock == true) {
			left_lock = false;
			oldleft_lock = false;
			oldright_lock = false;
			screen_reset();
		}
	}

	if (right_lock == true) {
		if (oldright_lock == true) {
			right_lock = false;
			oldright_lock = false;
			oldleft_lock = false;
			screen_reset();
		}
	}


	if (left_lock = false) {
		oldleft_lock = true;
		left();
		left_lock = false;
	}

	if (right_lock = true) {
		oldright_lock = true;
		right();
		right_lock = false;
	}
}

function ResetBars() {
	$('div.tiltIndicatorTop').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorRight').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorBottom').attr("style", "background-color:#f00; opacity:0.8;");
	$('div.tiltIndicatorLeft').attr("style", "background-color:#f00; opacity:0.8;");
	if (page == 1) {
		$('div.tiltIndicatorTop').attr("style", "background-color:#00f; opacity:0.8;");
	}
	if (page == 4) {
		$('div.tiltIndicatorBottom').attr("style", "background-color:#00f; opacity:0.8;");
	}
}




//function alert_func(){ console.log("xxxxxxxxx");}

function still_func() {
	if ((x == oldx) && (stillStart == 0)) {
		stillStart = new Date().getTime();
	}

	/*	if (avX.length > 3) {
	 x = (avX[0] + avX[1] + avX[2] + avX[3]) / 4;
	 avx = [];
	 }*/

	if (x != oldx) {
		oldx = x;
		stillStart = 0;
		still = 0;
		oldy = y;
		oldz = z;
		timeStill = 0;
		//alert(still + 'running for '+ running_for);
	}

	running_for = Math.round((((new Date().getTime()) - start) / 1000));
	//console.log("running for = " + running_for+" still state " + still);

}


function del_func() {
	del = 2220;
	console.log('timer' + running_for);
	return del;
}

function help(num) {

	html = 'line number  = ' + num + '' +
		'<br> x: ' + x + ' refLR: ' + refLR +
		'<br> refx: ' + refx +
		'<br> LRoffset = ' + LRoffset +
		/*'<br />' + '&nbsp;&nbsp;&nbsp;left_lock ' + left_lock + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right_lock ' + right_lock + '' +*/
		/*'<br />' +  ' ResetAll ' + ResetAll + '' +
		 '<br />' + ' Sc up ' + up + ' Sc down ' + down + '<br />  UpDown= ' + UpDown + '' +*/
		//'<br> LeftRight = ' + LeftRight + '' +
		/*'<br> L = ' + L + '' + ' LL = ' + LL + '' +
		'<br> R = ' + L + '' + ' RL = ' + RL + '' +
		'<br> M = ' + L + '' + ' ML = ' + ML + '' +
		'<br /> Page = ' + page + ' shake = ' + shake + ' LRoffset = ' + LRoffset + '' +*/
		'<br /> 				oldx = 		' + oldx + ' x = ' + x + '' +
		/*
		 '<br /> old_page = ' + old_page + ' page = ' + page + ' shake = ' + shake + ' ' +
		 */
		'<br>stillNOW = ' + still + ' time-still = ' + timeStill + '' +
		'<br> del: ' + del + ' timeStill>settleTime 																																						?' + (timeStill > settleTime) +
		/*'<br>LeftRight < (refLR-LRoffset) ' + (LeftRight < (refLR - LRoffset)) +
		'<br>LeftRight <'+LeftRight +" (refLR  "+refLR+" -LRoffset "+LRoffset +'' +(LeftRight < (refLR - LRoffset))+
		'<br>'+LeftRight +"<"+(refLR - LRoffset)+" "+(LeftRight < (refLR - LRoffset))+*/
		'<br>LeftRight > (refLR-LRoffset) ' + (LeftRight > (refLR - LRoffset)) +
		 '<br>LeftRight >'+LeftRight +" (refLR  "+refLR+" -LRoffset "+LRoffset +'' +(LeftRight > (refLR - LRoffset))+
		 '<br>'+LeftRight +"<"+(refLR + LRoffset)+" "+(LeftRight < (refLR + LRoffset))+

		'<br>'+
		'<br>LeftRight > (refLR+LRoffset) ' + (LeftRight > (refLR + LRoffset)) +
		'<br>refLR-LRoffset ' + (refLR - LRoffset) + ' (refLR)+(LRoffset) ' + (refLR + LRoffset) +
		'<br>refLR ' + refLR + '<br> running for ' + running_for + ' secs';


	/*
	 html = 'line number  = ' +num + '<br> x: ' + x + '<br /> y: ' + y + '<br/>z: ' + z + '<br />' +
	 ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left_lock ' + left_lock + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right_lock ' + right_lock + '<br />' + ' ScUpDown direction up ' + up + ' <br>ScUpDown direction down ' + down + '<br />
	 */


	$("div#dataContainerMotion").html(html);
	//console.log(html);
}