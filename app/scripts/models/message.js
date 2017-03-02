var moment = require('moment');
var Backbone = require('backbone');

var urlAPI = 'https://tiny-parse-server.herokuapp.com'
var urlUser = urlAPI + '/users';
var urlBaldwin = urlAPI + '/classes/Baldwin/'

var ChatMessage = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    //username: localStorage.getItem('username'),
    message: ''
    // timestamp: ''

  },
  initialize: function(){
    // this.isNew() ? this.set('timestamp', moment().format('LTS')) : this.set('timestamp', this.get('timestamp'));
  }

});

var ChatMessageCollection = Backbone.Collection.extend({
  model: ChatMessage,
  comparator: -'timestamp',
  url: urlBaldwin
});

module.exports = {
  //User,
  ChatMessage,
  ChatMessageCollection
}
