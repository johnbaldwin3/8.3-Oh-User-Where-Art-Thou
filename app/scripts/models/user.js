var $ = require('jquery');
var Backbone = require('backbone');


var urlAPI = 'https://tiny-parse-server.herokuapp.com'
var urlUser = urlAPI + '/users';
var urlBaldwin = urlAPI + 'classes/Baldwin/'

var User = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username:'',
    password:''
  },
  urlRoot: urlUser

},{
  login: function(credentials, callback) {
    var url = urlAPI + '/login?' + $.param(credentials);
    $.get(url).then(data => {
      callback(new User(data));
    });
  },
  signup: function(user, pass) {
    var newUser = new User(user, pass);
    newUser.save();
    return newUser;
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  currentUser: function(){
    var user = localStorage.getItem('user');
    //if user null --> escape
    if(!user){
      return false;
    }

    return new User(JSON.parse(user));
  }
});

//var User - backbone.model.extend({}, {
//
// login: function(creds, callback) {
//   var url = credsstuff;
//   $(get...).function(data){
//     callback(new User(data))
//   }
// }
// })
//
// User.login --->
// signup: function(creds) {
//   var newUser = new USER(creds);
//   newUser.save();
//   return newUser
// }
//
// localStorage: function......
//
//
// jquery param



module.exports = {
  User
};
