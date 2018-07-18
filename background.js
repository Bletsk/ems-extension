var data_sources = ['screen', 'window', 'tab'],
    desktopMediaRequestId = '';

chrome.runtime.onConnect.addListener(function(port) {
  // reloadTrainingTabs();

  port.onMessage.addListener(function (msg) {
    if(msg.type === 'SS_UI_REQUEST') {
      requestScreenSharing(port, msg);
    }

    if(msg.type === 'SS_UI_CANCEL') {
      cancelScreenSharing(msg);
    }
  });
});



chrome.runtime.onInstalled.addListener(function() {
  reloadTrainingTabs();
});

function requestScreenSharing(port, msg) {
  // https://developer.chrome.com/extensions/desktopCapture
  // params:
  //  - 'data_sources' Set of sources that should be shown to the user.
  //  - 'targetTab' Tab for which the stream is created.
  //  - 'streamId' String that can be passed to getUserMedia() API
  desktopMediaRequestId = chrome.desktopCapture.chooseDesktopMedia(data_sources, port.sender.tab, function(streamId) {
    if (streamId) {
      msg.type = 'SS_DIALOG_SUCCESS';
      msg.streamId = streamId;
    } else {
      msg.type = 'SS_DIALOG_CANCEL';
    }
    port.postMessage(msg);
  });
}

function cancelScreenSharing(msg) {
  if (desktopMediaRequestId) {
    chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId);
  }
}

function reloadTrainingTabs(){
  chrome.tabs.query({url: "http://localhost:4444/app/room/*"}, function(tab) {
    chrome.tabs.reload(tab[0].id) 
  });
  chrome.tabs.query({url: "http://127.0.0.1:4444/app/room/*"}, function(tab) {
    chrome.tabs.reload(tab[0].id) 
  });
  chrome.tabs.query({url: "https://trainingspace.oblakogroup.ru/app/room/*"}, function(tab) {
    chrome.tabs.reload(tab[0].id) 
  });
  chrome.tabs.query({url: "https://trainingspace.online/app/room/*"}, function(tab) {
    chrome.tabs.reload(tab[0].id) 
  });
}

