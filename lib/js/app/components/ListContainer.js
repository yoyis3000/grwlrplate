var React = require('react');
var SingleInput= require('./SingleInput');
var List = require('./List');
var songFetchStore = require('../stores/songFetchStore');
var songFetchActions = require('../actions/songFetchActions');
var request = require('superagent');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: songFetchStore.getSongs() 
    }
  },

  componentDidMount: function(){
    songFetchStore.addChangeListener(this._onChange);
  },
 
  componentWillUnmount: function() {
    songFetchStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    songFetchActions.addItem(newItem);
    this.formatURL(newItem);
  },

  handleRemoveItem: function(index){
    songFetchActions.removeItem(index);
    console.log("am I even here");
  },

  formatURL: function(item){
    /* the link is going to look something like this 
     * var url = "https://api.spotify.com/v1/search?q=track:bound+2%10artist:kanye+west&type=track" */
    var formatSearch =  item.split(' - ');
    var formatedIndices = formatSearch.map(function(index){
      return index.replace(" ", "+");
    });
    var artistName = formatedIndices[0];
    var songName = formatedIndices[1];

    var url = "https://api.spotify.com/v1/search?q=track:" +songName+"&limit=1&artist:"+ artistName+"&type=track"; 
    console.log(url);
  },
  _onChange: function(index){
    this.setState({list: songFetchStore.getSongs()});
  },

  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <SingleInput add={this.handleAddItem}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>

    )
  }
});

module.exports = ListContainer;
