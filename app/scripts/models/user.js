var $ = require('jquery');
var Backbone = require('backbone');


var User = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username:'',
    password:''
  }

});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'https://tiny-parse-server.herokuapp.com/classes/Baldwin',
  initialize: function() {
    
  }
});


module.exports = {
  User,
  UserCollection
};
