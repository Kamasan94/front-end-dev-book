(function (window) {
  'use strict';
  var App = window.App || {};

  var FORM_SELECTOR = '[data-coffee-order="form"]';

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.loadForm = function(customerId) {
    console.log('ciao');
    var order = this.db.get(customerId);
    var $formElement = $(FORM_SELECTOR);
    console.log($formElement);
    $formElement[0][0].value = order['coffee'];
    $formElement[0][1].value = order['emailAddress'];
    $formElement[0][2].value = order['flavor'];
    $formElement[0][3].value = order['power'];
    $formElement[0][4].value = order['size'];
    $formElement[0][5].value = order['strength'];
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  }

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  }

  Truck.prototype.printOrders = function () {
    var customerArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerArray.forEach(function (id) {
      console.log(this.db.get(id));
    }.bind(this));

  }

  App.Truck = Truck;
  window.App = App;
})(window);
