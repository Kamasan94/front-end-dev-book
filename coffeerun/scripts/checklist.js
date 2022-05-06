(function (window) {
  'use strict';

  var App = window.App || {}
  var $ = window.jQuery;

  var prevent = false;
  var timer = 0;
  var delay = 200;

  function CheckList(selector) {

    if (!selector) {
        throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if(this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function Row(coffeeOrder, backgroundColor) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox',
      'style': 'background-color:' + backgroundColor
    });

    var $label = $('<label></label');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += '[' + coffeeOrder.strength + 'x]';
    description += coffeeOrder.coffee
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;

  }

  CheckList.prototype.addRow = function (coffeeOrder) {
    //Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);
    var backgroundColor;
    //Select a backgroundcolor based on flavorShot
    switch (coffeeOrder.flavor) {
      case 'caramel':
        backgroundColor = 'orange';
        break;
      case 'almond':
        backgroundColor = 'brown';
        break;
      case 'mocha':
        backgroundColor = 'yellow';
        break;
      default:
        backgroundColor = 'white';

    }

    //Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder, backgroundColor);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  CheckList.prototype.addDbClickhandler = function (fn) {
    this.$element.on('dblclick', 'input', function(event) {
      clearTimeout(timer);
      prevent = true;
      var email = event.target.value;
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function(event) {
        timer = setTimeout(function() {
          if(!prevent){
            var email = event.target.value;

            this.$element
              .find('[value="' + email + '"]')
              .closest('[data-coffee-order="checkbox"]')
              .css({
                'background-color': 'grey',
                'text-decoration': 'overline'
              });

            setTimeout(function() {
              this.removeRow(email);
              fn(email);
            }.bind(this),2000);
          }
          else{
            event.preventDefault();
          }
          prevent = false;
        }.bind(this), delay)
    }.bind(this));
  }


  App.CheckList = CheckList;
  window.App = App;
})(window);
