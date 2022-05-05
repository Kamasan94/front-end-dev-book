(function (window) {
  'use strict';

  var App = window.App || {}
  var $ = window.JQuery;

  function CheckList(selector) {
    if (!selector) {
        throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if($this.$element.lenth === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
