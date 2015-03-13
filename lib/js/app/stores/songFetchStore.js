var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

 var CHANGE_EVENT = 'change';

var _store = {
  songs: []
};

var addItem = function(item){
  _store.songs.push(item)
};

var removeItem = function(index){
  _store.songs.splice(index, 1);
};

var songFetchStore= objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getSongs: function(){
    return _store.songs
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      songFetchStore.emit(CHANGE_EVENT);
    break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      console.log("heehhrehr");
      songFetchStore.emit(CHANGE_EVENT);
    break;
    default:
      return true
  }
});

module.exports = songFetchStore;
