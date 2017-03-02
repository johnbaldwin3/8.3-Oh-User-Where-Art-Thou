var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var setupAjax = require('./ajax_utility.js').setupAjax;
var RegistrationContainer = require('./components/login.jsx').RegistrationContainer;
var ChatroomContainer = require('./components/messages.jsx').ChatroomContainer;
var urlAPI = 'https://tiny-parse-server.herokuapp.com'
var urlUser = urlAPI + '/users';
var urlBaldwin = urlAPI + '/classes/Baldwin/'


//console.log('ajax', setupAjax);
var ChatAppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'loggedIn': 'loggedIn'
  },
  initialize: function() {
    setupAjax();

  },
  index: function(){
    var loggedInUser = localStorage.getItem('user');

  if(loggedInUser){
    loggedInUser = JSON.parse(loggedInUser);
    loggedInUser.sessionToken;
    setupAjax(loggedInUser);

    $.get(urlAPI + '/users/me').then(function(data){
    console.log('user', data);
  })
}


    ReactDOM.render(
      React.createElement(ChatroomContainer),
      document.getElementById('app')
    );
  },
  loggedIn: function() {

    ReactDOM.render(
      React.createElement(RegistrationContainer),
      document.getElementById('app')
    );
  }

});


var chatAppRouter = new ChatAppRouter();

module.exports = chatAppRouter;
