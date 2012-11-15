// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm',
  'views/apis/details',
  'views/browse/page',
  'views/home/forgot_password',
  'views/apis/details',
  'views/apis/edit',
  'views/methods/edit',
  'views/profile/page'
], function (require, $, _, Backbone, Vm,ApiDetailsView,BrowseView,ForgotView,ApiDetailsView,EditApiView,EditMethodView,ProfilePage) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      'apis/edit/:id': 'editApi',
      'apis/edit': 'editApi',
      'apis/:id': 'showApi',
      'apis/:id/method/:method_id': 'showApi',
      'apis/:id/methods/edit': 'editMethod',
      'login': 'login',
      'browse': 'browse',
      'members': 'members',
      'forgot_password/*token': 'forgot_password',
      'forgot_password': 'forgot_password',
      'register': 'register',
      'features': 'features',
      'pricing': 'pricing',
      '': 'home',
      ':username/:apiname/version/:version/resource/:resource/:method': 'apiPage',
      ':username/:apiname/version/:version/resource/:resource': 'apiPage',
      ':username/:apiname/version/:version': 'apiPage',
      ':username/settings/:page': 'settingsTab',
      ':username': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);
    Backbone.router = router;
    router.on('route:apiPage', function (username, apiname, version, resourceId, method) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {username: username, apiname: apiname, version: version, resourceId: resourceId, method: method});
        apiDetailsView.render();
    });
    /*
    router.on('route:login', function (apiId) {
        var loginView = Vm.create(appView, 'LoginView', LoginView, {});
        loginView.render();
    });
*/
    router.on('route:browse', function () {
        var browseView = Vm.create(appView, 'BrowseView', BrowseView, {});
        browseView.render();
    });
    /*
    router.on('route:members', function () {
        var membersView = Vm.create(appView, 'MembersView', MembersView, {});
        membersView.render();
    });
    */ 
    router.on('route:forgot_password', function (token) {
        var forgotView = Vm.create(appView, 'ForgotView', ForgotView, {token: token});
        forgotView.render();
    }); 
    /*
    router.on('route:register', function (apiId) {
        var registerView = Vm.create(appView, 'RegisterView', RegisterView, {});
        registerView.render();
    });
    */      
    router.on('route:showApi', function (apiId, methodId) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {apiId: apiId, methodId: methodId});
        apiDetailsView.render();
    });

    router.on('route:editApi', function (actions) {
        var editApiView = Vm.create(appView, 'EditApiView', EditMethodViewitApiView);
        editApiView.render();
    });
    router.on('route:editMethod', function (apiId) {
        var editMethodView = Vm.create(appView, 'EditMethodView', EditMethodView, {apiId: apiId});
        editMethodView.render();
    });
    router.on('route:home', function () {
      console.log('home');
      require(['views/home/page'], function (HomeView) {
        var homeView = Vm.create(appView, 'HomeView', HomeView, {});
        homeView.render();
      });
    });
    router.on('route:features', function () {
      require(['views/home/features'], function (Features) {
        var features = Vm.create(appView, 'Features', Features, {});
        features.render();
      });
    });
    router.on('route:pricing', function () {
      require(['views/home/pricing'], function (Pricing) {
        var pricing = Vm.create(appView, 'Pricing', Pricing, {});
        pricing.render();
      });
    });        
		router.on('route:defaultAction', function (username) {
        var profilePage = Vm.create(appView, 'ProfilePage', ProfilePage, {username: username});
        profilePage.render();
		});

    router.on('route:settingsTab', function (username, page) {
        var profilePage = Vm.create(appView, 'ProfilePage', ProfilePage, {username: username, tab: 'settings', setting: page});
        profilePage.render();
    });
   
  };
  return {
    initialize: initialize
  };
});
