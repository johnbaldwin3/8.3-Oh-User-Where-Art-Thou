var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var setupAjax = require('./ajax_utility.js').setupAjax;
var LoginContainer = require('./components/login.jsx').LoginContainer;

console.log('ajax', setupAjax);
var ChatAppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function() {
    setupAjax();

  },
  index: function() {

    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  }

});


var chatAppRouter = new ChatAppRouter();

module.exports = chatAppRouter;
