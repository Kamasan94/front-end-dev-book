(function (window) {
  'use strict';
  //We assign the window app to a local variable, if it already exists, if not, empty object represented by {}
  var App = window.App || {};

  //Promise variable for native Promise
  var Prmise = window.Promise;

  //helper function for promise
  function promiseResolvedWith(value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(value);
    });
    return promise;
  }

   //Constructor
  function DataStore() {
    //Initialize empty data
    this.data = {};
  }

  //prototype property lets share the function add to all instances of DataStore
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

  //Attach the DataStore module to the App object
  App.DataStore = DataStore;
  
  //Reassign to the global App property
  window.App = App;
})(window);
