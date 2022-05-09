(function (window) {
  'use strict';
  var App = window.App || {};

  var FORM_SELECTOR = '[data-coffee-order="form"]';

  function Truck(truckId, db, localdb) {
    this.truckId = truckId;
    this.db = db;
    this.localdb = localdb;
  }

  Truck.prototype.loadForm = function(customerId) {
    console.log('ciao');
    var order = this.db.get(customerId);
    var $formElement = $(FORM_SELECTOR);
    console.log($formElement);
    $formElement[0][0].value = order['coffee'];
    $formElement[0][1].value = order['emailAddress'];
    $formElement[0][6].value = order['flavor'];
    switch (order['size']) {
      case 'short':
          $formElement[0][2].checked = 'true';
          break;
      case 'tall':
          $formElement[0][3].checked = 'true';
          break;
      case 'grande':
          $formElement[0][4].checked = 'true';
          break;
      case 'zilla':
          $formElement[0][5].checked = 'true';
          break;
    }

    $formElement[0][7].value = order['strength'];
    $('.strengthValue').text(order['strength']);
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order)
      .then(function() {

      },
      function() {
        this.localdb.add(order.emailAddress, order);
      }.bind(this));
  }

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }

  Truck.prototype.printOrders = function (printFn) {
    var response = this.db.getAll();
    console.log(response);
    if (response.status_text = 'error'){
      return this.db.getAll()
        .then(function (orders) {
          var customerArray = Object.keys(orders);

          console.log('Truck #' + this.truckId + ' has pending orders:');
          customerArray.forEach(function (id) {
            console.log(orders[id]);
            if( printFn) {
              printFn(orders[id]);
            }
          }.bind(this));
        }.bind(this));
    }
    else {
      return this.localdb.getAll()
        .then(function (orders) {
          var customerArray = Object.keys(orders);

          console.log('Truck #' + this.truckId + ' has pending orders:');
          customerArray.forEach(function (id) {
            console.log(orders[id]);
            if( printFn) {
              printFn(orders[id]);
            }
          }.bind(this));
        }.bind(this));
  }
}

  App.Truck = Truck;
  window.App = App;
})(window);
