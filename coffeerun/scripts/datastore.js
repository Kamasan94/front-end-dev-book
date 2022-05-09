(function (window) {
  'use strict';
  var App = window.App || {};

  //Promise variable for native Promise
  var Prmise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  //helper function for promise
  function promiseResolvedWith(value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(value);
    });
    return promise;
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
    return promiseResolvedWith(null);
  }

  DataStore.prototype.get = function (key) {
    return promiseResolvedWith(this.data[key]);
  }

  DataStore.prototype.getAll = function () {
    return promiseResolvedWith(this.data);
  }

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolvedWith(null);
  }

  App.DataStore = DataStore;
  window.App = App;
})(window);
