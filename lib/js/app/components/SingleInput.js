var React = require('react');

var SingleInput = React.createClass({
  getInitialState: function(){
    return {
      newItem: ''
    }
  },
  handleChange: function(e){
    this.setState({
      newItem: e.target.value
    })
  },
  handleSubmit: function(e){
    if(e.keyCode === 13){
      console.log("this works woo");
      this.props.add(this.state.newItem);
      this.setState({
        newItem: ''
      });
    }
  },
  render: function(){
    return (
      <div>
        <input type="text"  value={this.state.newItem} placeholder="New Item" onKeyDown={this.handleSubmit} onChange={this.handleChange} />
      </div>
    )
  }
});

module.exports = SingleInput;
