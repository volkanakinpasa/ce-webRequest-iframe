chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (details.initiator.indexOf('dashboard.lablab.app') > -1) {
      for (var j = 0; j < details.responseHeaders.length; ++j) {
        if (
          details.responseHeaders[j].name.toLowerCase() == 'x-frame-options'
        ) {
          details.responseHeaders.splice(j, 1);
          return {
            responseHeaders: details.responseHeaders,
          };
        }
      }
    }
  },
  {
    urls: ['<all_urls>'],
    types: ['sub_frame'],
  },
  ['blocking', 'responseHeaders']
);
