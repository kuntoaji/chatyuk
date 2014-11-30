/**
 * Component strucutre is
 *
 * - Chatbox
 *  - MessagePane
 *  - MassageForm
 * - Avatar
 *   - LoginForm/LoggedInBox
 */

var LoggedInBox = React.createClass({
  render: function() {
    return (
      <span> Logged in as {this.props.username} in {this.props.room} <input type="button" value="Logout" /> </span>
    );
  }
});

var LoginForm = React.createClass({
  doLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var room = this.refs.room.getDOMNode().value.trim();
    this.props.loggedInAs(username, room)
  },
  render: function() {
      return (<form  onSubmit={this.doLogin}>
        <label htmlFor='username'>Username:</label>
        <input type='text' ref='username' defaultValue={this.props.username}/>
        <label htmlFor='room'>Room:</label>
        <input type='text' ref='room' defaultValue={this.props.room}/>
        <input type='submit' value='Join!'/>
      </form> )
  }
});

var Avatar = React.createClass({
  getInitialState: function() {
	  return {
      loggedIn: this.props.comms.isConnected(),
      username: this.props.comms.username,
      room: this.props.comms.room
    };
  },

  loggedInAs: function(username, room) {
    this.props.comms.connect(username, '', room);
    this.setState({loggedIn: true, username: username, room: room})
  },

  render: function() {
    if(this.state.loggedIn) {
     return ( <LoggedInBox username={this.state.username} room={this.state.room} /> )
    } else {
     return ( <LoginForm loggedInAs={this.loggedInAs} username="test" room="testroom" /> )
    }
  }
});

var comms = Object.create(XmppComms);

React.render(
  <Avatar comms={comms} />,
  document.getElementById('content')
);
