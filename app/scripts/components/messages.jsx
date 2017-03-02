var React = require('react');
var models = require('../models/message.js');
var User = require('../models/user.js').User;
var chatMessageCollection = new models.ChatMessageCollection();

var ChatroomContainer = React.createClass({
  componentWillMount: function () {
  //  window.setInterval(this.getChatMessages, 3000);
    //console.log('run run run');
  },
  getChatMessages: function() {
    var self = this;

  chatMessageCollection.fetch().done(function(){
      self.setState({chatMessageCollection: chatMessageCollection});

      self.forceUpdate();
      //console.log('ran fetch getchatmsg');
    });

  },
  getInitialState: function(){

    chatMessageCollection = new models.ChatMessageCollection();
    var self = this;

    chatMessageCollection.fetch().done(function(){
      self.setState({chatList: chatMessageCollection});

      self.forceUpdate();
    });
    return {
      chatList: chatMessageCollection,
      username: User.currentUser
    };
  },
  addChatMessage: function(chatMsg){
    var chatList = this.state.chatList;
    chatMsg.username = this.state.username;
    chatList.create(chatMsg);
    this.setState({chatList: chatList});
  },

  render: function(){

    return (
      <div className="wrapper">
        <div className="fluid-container">
          <header className="header-chat"><h1 className="chatter-head">ChatApp&nbsp;  <i className="fa fa-comments fa-2x" aria-hidden="true"></i></h1><h2 className="byJohn"> JB3 Industries</h2></header>
        </div>
      <div className="container">

          <div className="row">
          <div className="col-sm-8 col-sm-offset-2">

            <div className="chatroom">
              <h3 className="chatroom-title">TIY GVL Chat Room</h3>
              <div className="chatroom-messages">
                <ChatMessageList username={this.props.username} chatMessages={this.state.chatList}/>
              </div>

              <div className="row">
                <div className="user-input">
                  <ChatSubmitMessageForm router={this.props.router} username={this.props.username} addChatMessage = {this.addChatMessage}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    )
  }
});

var ChatSubmitMessageForm = React.createClass({
  getInitialState: function() {
    var msgs = {message: ''};
    return msgs;
  },
  handleMessageChange: function(event) {
    console.log();
    this.setState({message: event.target.value});
  },
  addChatMessage: function(event) {
    event.preventDefault();
    this.props.addChatMessage(this.state);
    this.setState({message: ''});
  },
  handleLogOut: function(event) {
    event.preventDefault();
    localStorage.removeItem('username');
    this.props.router.navigate('login', {trigger: true});

  },

  render: function(){
    console.log(this.state.message);
    return (
      <form onSubmit={this.addChatMessage}>
        <div className="form-group">
          <label id="message-labeller" htmlFor="message">Add to the Convo...</label>
          <input onChange={this.handleMessageChange} value={this.state.message} type="text" className="form-control input-bar" id="message" placeholder="Your Message..." />
        </div>
        <input id="sub-button" type="submit" className="btn btn-success" value="Send Msg"/>
        <input onClick={this.handleLogOut}id="sub-button-two" type="submit" className="btn btn-danger" value="Log Out"/>
      </form>
    )
  }
});

var ChatMessageList = React.createClass({

  render: function() {
      var messages = this.props.chatMessages.map(function(msgs){
          return (
            <li key={msgs.cid} className="messages"><span className="time">{msgs.get('timestamp')}::</span><span className="userid"> {msgs.get('username')} </span>  : {msgs.get('message')} </li>
          );

      })
    return (
      <ul className="chat-ul">
        {messages}
      </ul>
    );
  }
});

var AddUserForm = React.createClass({
  render: function(){
    return (<div></div>);
  }
});
module.exports = {
  ChatroomContainer
};
