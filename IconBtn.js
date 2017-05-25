'use strict';

import {
    StyleSheet,
    TouchableHighlight,
    View,
    Image,
    Text,
} from 'react-native';
import React, {Component} from 'react';

export default class IconBtn extends Component{
  render() {

    var icon    = (typeof this.props.icon === "undefined" ? (<View style={{marginLeft: -10}}></View>) : (<Image style={[styles.icon, {height: this.props.iconSize, width: this.props.iconSize}]} source={this.props.icon}/>));
    var text    = (typeof this.props.text === "undefined" ? (<View></View>) : (<Text style={[styles.text, {color: this.props.color}]}>{this.props.text}</Text>));
    var underlay  = (typeof this.props.underlayColor === "undefined" ? 'transparent' : this.props.underlayColor);
    var style     = (typeof this.props.style === "undefined" ? styles.default : this.props.style);

    return (
      <TouchableHighlight underlayColor={underlay} onPress={this.props.onPress}>
        <View style={[styles.button, style]}>
          {icon}
          {text}
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  default: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    color: 'white'
  },

  icon: {
    flex: 0.5,
  },

  text: {
    marginLeft: 10,
    flex: 0.5,
  }

});

