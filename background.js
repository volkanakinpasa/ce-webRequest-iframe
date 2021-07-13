chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (
      details.initiator.indexOf('dashboard.lablab.app') > -1 ||
      details.initiator.indexOf('localhost') > -1
    ) {
      for (var j = 0; j < details.responseHeaders.length; ++j) {
        if (
          details.responseHeaders[j].name.toLowerCase() === 'x-frame-options' ||
          details.responseHeaders[j].name.toLowerCase() ===
            'content-security-policy'
        ) {
          details.responseHeaders.splice(j, 1);
        }
        // if (details.responseHeaders[j].value.indexOf('frame-ancestors') > -1) {
        //   const pattern = /(^|;)[\s]*frame-ancestors[\s][^;]*/i;
        //   details.responseHeaders[j].value = details.responseHeaders[
        //     j
        //   ].value.replace(pattern, '; ');
        // }
      }
      return {
        responseHeaders: details.responseHeaders,
      };
    }
  },
  {
    urls: ['<all_urls>'],
    types: ['sub_frame'],
  },
  ['blocking', 'extraHeaders', 'responseHeaders']
);
