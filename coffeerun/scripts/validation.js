(function (window) {
  'use strict';
  var App = window.App || {};
  var Validation = {
    isCompanyEmail: function(email) {
      return /.+@bignerdranch\.com$/.test(email);
    }
  };

  var Decaf = {
    isDecaf: function(cod, power) {
      return /.+decaf.+/.test(cod);
    }
  };

  App.Validation = Validation;
  App.Decaf = Decaf;
  window.App = App;
})(window);
