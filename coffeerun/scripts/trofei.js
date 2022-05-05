(function (window) {
  'use strict';
  var App = window.App || {};

  function Trofei() {
    this.emails = [];
  }

  Trofei.prototype.add = function(value) {
    this.emails.push(value);
  }

  App.Trofei = Trofei;
  window.App = App;

})(window);
