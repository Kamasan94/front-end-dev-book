(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Trofei = App.Trofei;
  var CheckList = App.CheckList;
  var Validation = App.Validation;
  var Decaf = App.Decaf;
  var RemoteDataStore = App.RemoteDataStore;
  var webshim = window.webshim;

  var myTrofei = new Trofei();
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var remoteDS = new RemoteDataStore(SERVER_URL);
  
  window.myTrofei = myTrofei;

  var myTruck = new Truck('KITT', new DataStore());
  window.myTruck = myTruck;

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  checkList.addDbClickhandler(myTruck.loadForm.bind(myTruck));

  var formhandler = new FormHandler(FORM_SELECTOR);

  //formhandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  formhandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck,data);
    checkList.addRow.call(checkList,data);
  });

  formhandler.addInputHandler(Validation.isCompanyEmail);
  formhandler.addInputHandler2(Decaf.isDecaf);

  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true});

})(window);
