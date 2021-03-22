(function (w, o) {
  // SmartLing Flag control - true/false
  var smartLingEnabledFlag = true;

  if (smartLingEnabledFlag
    && window.location.host.indexOf('www.fedex.com') !== 0
    && window.location.host.indexOf('wwwtest.fedex.com') !== 0
    && window.location.host.indexOf('localhost') !== 0) {
    try {
      var body = document.querySelector('body');
      body.classList.add('sl-override-context');
      var h = document.getElementsByTagName('head')[0];
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = 1;
      s.crossorigin = 'anonymous';
      s.src = '//d2c7xlmseob604.cloudfront.net/tracker.min.js';
      s.onload = function () {
        w.SmartlingContextTracker.init({orgId: o, snapshotSizeLimitBytes: 2000000});
      };
      h.insertBefore(s, h.firstChild);
    } catch (ex) {
    }
  }
  // }
})(window, 'RaHNtA1tWOk4dMiZCJP1aw');
