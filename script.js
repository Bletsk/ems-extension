// console.log("Script is injected!");

var userMedia;

function getScreenShare(){
	console.log("Inside getScreenShare");

  var pending_request_id = chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], onAccessApproved);

	return navigator.webkitGetUserMedia({
		audio: false,
    video: {
      mandatory: {
      	chromeMediaSource: 'desktop',
      	chromeMediaSourceId: 'irrelevant',
    	  maxWidth: 1280,
       	maxHeight: 720,
    	},
    	optional: []
   	}
	});
}

function getAspectRatio(w, h) {
  function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
  }
  var r = gcd (w, h);
  return (w/r) / (h/r);
}