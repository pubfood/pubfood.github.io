window.bidProviderOne = window.bidProviderOne || {};
window.bidProviderOne.cmd = window.bidProviderOne.cmd || [];
(function() {
  'use strict';
  var _availability = '';
  var _initializing = false;
  var _initialized = false;
  var _cmdQ = bidProviderOne.cmd;

  var drainQ = function(reasonToDrain) {
    var i;
    var len = _cmdQ.length;
    var stopEarly = false;
    // console.log('reasonToDrain', reasonToDrain);
    if (_initializing) {
      // console.log('currently initializing so preventing reasonToDrain', reasonToDrain);
      return;
    }
    for (i = 0; i < len; i++) {
      _cmdQ[i]();
      if (_initializing) {
        stopEarly = true;
        break;
      }
    }
    if (stopEarly) {
      _cmdQ = _cmdQ.slice(i + 1);
    } else {
      _cmdQ = [];
    }
  };
  bidProviderOne.init = function(queryParams) {
    if (_initializing || _initialized) {
      console.log('duplicate init call for bidProviderOne');
      return;
    }
    _initializing = true;
    var initURL = '/simulated-bid-provider/refresh-' + queryParams;
    // TODO consider window.document or just raw document instead
    var doc = window.document;
    // Note: currentScript is not generally available across browsers
    var cur = doc.currentScript;
    if ((bidProviderOne.useAsync || doc.readyState === 'complete' || doc.readyState === 'loaded' || cur && cur.async)) {
      // load async
      var script = doc.createElement('script');
      script.src = initURL;
      script.async = true;
      (doc.head || doc.body || doc.documentElement).appendChild(script);
      bidProviderOne._init_started = true;
    } else {
      // load sync
      var providerId = 'bidProviderOne-init-' + Math.random();
      try {
        doc.write('<script id="' + providerId + '" src="' + initURL + '">\x3c/script>');
      } catch (e) { }
      doc.getElementById(providerId) && (bidProviderOne._init_started = true);
    }
  };
  bidProviderOne.resume = function() {
    _initializing = false;
    _initialized = true;
    drainQ('resume drain');
  };
  bidProviderOne.setAvailable = function(availability) {
    _availability = availability;
  };
  bidProviderOne.getAvailable = function() {
    return _availability;
  };

  drainQ('initial drain');
  // allow pushing on more cmd callbacks
  bidProviderOne.cmd = {
    push: function() {
      _cmdQ = Array.prototype.slice.call(arguments);
      drainQ('cmd.push drain');
    }
  };
}());
