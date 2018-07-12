var port = chrome.runtime.connect(chrome.runtime.id);

port.onMessage.addListener(function(msg) {
	window.postMessage(msg, '*');
});

window.addEventListener('message', function(event) {
  // console.log('inject.js: ', event.data);
	// We only accept messages from ourselves
	if (event.source != window || !event.data.type) return;

  switch(event.data.type){
    case 'WINDOW_READY':
      // console.log('inject');
      window.postMessage({ type: 'SS_PING', text: 'start' }, '*');
      break;
    case 'SS_UI_REQUEST':
    case 'SS_UI_CANCEL':
      port.postMessage(event.data);
      break;
  }
}, false);

