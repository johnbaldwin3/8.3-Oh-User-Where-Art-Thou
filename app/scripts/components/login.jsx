var React = require('react');

var User = require('../models/user.js').User;
var setupAjax = require('../ajax_utility').setupAjax;


var RegistrationContainer = React.createClass({
  getInitialState: function() {
    var userA = new User();
    setupAjax();
    return {
      userA
    }
  },
  onSubmitNew: function(user, pass) {
    setupAjax();
    User.signup({username: user, password: pass});
  },
  onSubmit: function(user, pass) {
    setupAjax();
    User.login({username: user, password: pass}, function(user){
      console.log(user);
      User.store(user);
      setupAjax(user);
    });

  },
  render: function(){

    return (
      <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Please Login</h1>
              <ExistingUser
                onSubmit={this.onSubmit} />
            </div>
            <div className="col-md-6">
              <h1>No Account? Sign Up Now!</h1>
              <NewUser onSubmitNew={this.onSubmitNew}
                       userA={this.state.userA}/>
            </div>
          </div>
        </div>
    )
  }

});

var ExistingUser = React.createClass({
  getPass: function(event) {
    this.setState({'password': event.target.value});
    //console.log('pass-state', this.state);
  },
  getUser: function(event) {
    this.setState({'username': event.target.value});
    //console.log('user-state', this.state);
  },
  render: function() {
    var self = this;
    return(
      <form onSubmit={(e) => {e.preventDefault(); this.props.onSubmit(this.state.username, this.state.password);}}
        id="login">
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input onChange={this.getUser} className="form-control" name="email" id="email-login" type="email" placeholder="Email" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input onChange={this.getPass} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>

        <input className="btn btn-warning col-md-12" type="submit" value="Let's Chat" />
      </form>
    )
  }
});

var NewUser = React.createClass({
  getInitialState: function() {
      var userB = new User();
      setupAjax();
      var self = this;
      userB.fetch().done(function(){
        self.setState({userB: userB});
        self.forceUpdate();
      });
    return {
      userB
    }
  },
  getPass: function(event) {
    this.setState({'password': event.target.value});
    //console.log('pass-state', this.state);
  },
  getUser: function(event) {
    this.setState({'username': event.target.value});
    //console.log('user-state', this.state);
  },
  render: function() {

    return(
      <form onSubmit={(e) => {e.preventDefault(); this.props.onSubmitNew(this.state.username, this.state.password);}} id="signup">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input onChange={this.getUser} id="signup-email" className="form-control" type="text" name="email" placeholder="Enter Email Adress"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.getPass} id="signup-password" className="form-control" type="password" name="password" placeholder="Don't share this!"/>
        </div>

        <input type="submit" className="btn btn-danger col-md-12" value="Sign Up"/>

      </form>
    )
  }
});

module.exports = {
  RegistrationContainer
}
