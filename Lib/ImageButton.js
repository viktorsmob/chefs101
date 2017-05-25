'use strict';

import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

export default class ImageButton extends Component{

	render() {

		var icon 		= (typeof this.props.icon === "undefined" ? (<View style={{marginLeft: -10}}></View>) : (<Image resizeMode={Image.resizeMode.stretch} style={[styles.icon, {height: this.props.iconSize, width: this.props.iconSize}]} source={this.props.icon}/>));
		var text 		= (typeof this.props.text === "undefined" ? (<View></View>) : (<Text style={[styles.text, {fontSize: this.props.fontSize, color: this.props.color}]}>{this.props.text}</Text>));
		var underlay 	= (typeof this.props.underlayColor === "undefined" ? 'transparent' : this.props.underlayColor);
		var style 		= (typeof this.props.style === "undefined" ? styles.default : this.props.style);

		return (
			<TouchableHighlight style={style} underlayColor={underlay} onPress={this.props.onPress}>
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
		backgroundColor: '#272822',
		color: 'white'
	},

	icon: {
		 

	},

	text: {
		marginLeft: 10,
		 
	}

});
