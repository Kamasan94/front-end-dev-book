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

  FormHandler.prototype.addInputHandler = function (fn) {
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      }
      else {
        message = emailAddress + ' is not authorized email address!'
        event.target.setCustomValidity(message);
      }
      console.log(fn(emailAddress));
    });


  };

  FormHandler.prototype.addInputHandler2 = function (fn) {

    this.$formElement.on('input', '[name="coffee"]', function(event) {
      console.log($('[name="coffee"]')[0].value);
      console.log($('[name="strength"]')[0].value);
      console.log(fn($('[name="coffee"]')[0].value,$('[name="strength"]')[0].value));
    });

    this.$formElement.on('input', '[name="strength"]', function(event) {
      console.log($('[name="coffee"]')[0].value);
      console.log($('[name="strength"]')[0].value);
      console.log(fn($('[name="coffee"]')[0].value,$('[name="strength"]')[0].value));
    });
  };

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
      fn(data)
        .then(function () {
          this.reset();
          this.elements[0].focus();
        }.bind(this));

      if(data['strength']>75 && data['size'] == 'zilla' && data['flavor'] != '')
        $('#achievementModal').modal('toggle');

      $('#achievementAccepted').on('click', function (event) {
        event.preventDefault();
        myTrofei.add(data['emailAddress'])
        console.log(myTrofei);
      });

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
          color = 'orange';
          break;
        case strength > 75:
          color = 'red';
          break;
      }
      $('.strengthValue').css('color', color);
      $('.strengthValue').text($(this).serializeArray()[4].value);

      myTrofei.emails.forEach( function(item) {
        if (item == $('#emailInput')[0].value) {
          $('#powerContainer').removeClass('invisible');
        }
      });

    })

    this.$formElement.on('reset', function (event) {
        $('.strengthValue').text(38);
      });


  }

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
