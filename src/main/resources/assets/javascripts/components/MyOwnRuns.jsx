var React   = require('react');

/* Components */
var RunsTable = require('./RunsTable.jsx');

/* Stores */
var UserStore = require('../stores/UserStore');

function getStateFromStore() {
  return {
    user: UserStore.getCurrentUser(),
  };
}

var MyOwnRuns = React.createClass({
  displayName: 'MyOwnRuns',

  getInitialState() {
    return getStateFromStore();
  },

  componentDidMount() {
    UserStore.listen(this._onChange);
  },

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  },

  render() {
    var user = this.state.user;
    if (user.name === 'unknown') {
      // Still loading user...
      return <span className="glyphicon glyphicon-repeat indicator-spinner"></span>;
    } else {
      return <RunsTable user={user.name} />;
    }
  },

  _onChange() {
    this.setState(getStateFromStore());
  },
});

module.exports = MyOwnRuns;
