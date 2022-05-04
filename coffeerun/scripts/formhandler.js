(function (window) {
  'use strict';
  var App = window.App || {};

  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with select: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();
      var data = {}
      $(this).serializeArray().forEach( function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value)
      });
      console.log(data);
      fn(data);
      
      $('#achievementModal').modal('toggle');

      this.reset();
      $('.strengthValue').text($(this).serializeArray()[4].value);
      this.elements[0].focus();
    });

    this.$formElement.change(function () {
      var array = $(this).serializeArray();
      var color;
      var strength = $(this).serializeArray()[4].value;

      switch (true) {
        case strength<=25:
          color = 'green';
          break;
        case strength>25 && strength<75:
          color = 'yellow';
          break;
        case strength > 75:
          color = 'red';
          break;
      }
      console.log($('.strengthValue'));
      $('.strengthValue').css('color', color);
      $('.strengthValue').text($(this).serializeArray()[4].value);
    })

    this.$formElement.on('reset', function (event) {
        $('.strengthValue').text(38);
      });
  }

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
