var React = require('react-native');
var {
  AsyncStorage,
} = React;


var LISTING_WIP_KEY = 'listing-wip';
var USER_WIP_KEY = 'user-wip';
var TEST_DRIVE_WIP_KEY = 'test-drive-wip';

var _removeOnClear = [
  LISTING_WIP_KEY
];

function _setObject(key, object) {
  return AsyncStorage.setItem(key, JSON.stringify(object))
    .then(() => {
      return object;
    });
}

function _clear(key) {
  return AsyncStorage.removeItem(key)
    .then(() => {
      return {};
    });
}

function _getObject(key) {
  return AsyncStorage.getItem(key)
    .then((item) => {
      return item ? JSON.parse(item) : null;
    });
}

// build work-in-progress module for specified key
function buildWIP(key) {
  return {
    upsert: function(options) {
      var self = this;
      return this.get()
        .then(function(object) {
          if (object) {
            return self.update(options);
          } else {
            return _setObject(key, options);
          }
        });
    },
    update: function(options) {
      return _getObject(key)
        .then((object) => {
          object = Object.assign(object, options);
          return _setObject(key, object);
        });
    },
    get: function() {
      return _getObject(key);
    },
    clear: function() {
      return _clear(key);
    },
  };
}

exports.wip = {
  listing: buildWIP(LISTING_WIP_KEY),
  user: buildWIP(USER_WIP_KEY),
  test_drive: buildWIP(TEST_DRIVE_WIP_KEY),
};

exports.setObject = function(key, object, removeOnClear) {
  if (removeOnClear) {
    _removeOnClear.push(key);
  }
  return _setObject(key, object);
};

exports.getObject = function(key) {
  return _getObject(key);
};

exports.set = async function(key, str, removeOnClear) {
  if (removeOnClear) {
    _removeOnClear.push(key);
  }
  return AsyncStorage.setItem(key, str);
};

exports.get = function(key) {
 return AsyncStorage.getItem(key); 

};

exports.clear = function(key) {
  if (!key) {
    return AsyncStorage.multiRemove(_removeOnClear);
  } else {
    return AsyncStorage.removeItem(key);
  }
};