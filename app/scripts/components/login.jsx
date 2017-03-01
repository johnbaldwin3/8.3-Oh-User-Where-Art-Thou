var React = require('react');

var UserCollection = require('../models/user.js').UserCollection;
var setupAjax = require('../ajax_utility').setupAjax;


var LoginContainer = React.createClass({
  getInitialState: function() {
    var userCollection = new UserCollection();
    setupAjax();
    userCollection.fetch();
    return {
      userCollection
    }
  },
  render: function(){

    return (
      <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Please Login</h1>
              <ExistingUser userCollection={this.state.userCollection}/>
            </div>
            <div className="col-md-6">
              <h1>No Account? Sign Up Now!</h1>
              <NewUser />
            </div>
          </div>
        </div>
    )
}

});

var ExistingUser = React.createClass({

  render: function() {

    return(
      <form id="login">
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>

        <input className="btn btn-warning col-md-12" type="submit" value="Let's Chat" />
      </form>
    )
  }
});

var NewUser = React.createClass({
  getInitialState: function() {

    return {}
  },
  render: function() {

    return(
      <form id="signup">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input id="signup-email" className="form-control" type="text" name="email" placeholder="Enter Email Adress"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="signup-password" className="form-control" type="password" name="password" placeholder="Don't share this!"/>
        </div>

        <input type="submit" className="btn btn-danger col-md-12" value="Sign Up"/>

      </form>
    )
  }
});

module.exports = {
  LoginContainer
}
