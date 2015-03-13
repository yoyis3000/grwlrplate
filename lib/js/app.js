var React = require('react');
var Test = require('./app/components/Test');
var ListContainer = require('./app/components/ListContainer');


var App = React.createClass({
  render() {
    return (
      <ListContainer/>
      );
  }
});

React.render(<App/>, document.getElementById('app'));
