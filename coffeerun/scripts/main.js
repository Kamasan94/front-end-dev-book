(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;

  var myTruck = new Truck('KITT', new DataStore());
  window.myTruck = myTruck;

  var formhandler = new FormHandler(FORM_SELECTOR);

  formhandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formhandler);

  $('.strengthValue').text

})(window);
