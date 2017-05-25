'use strict';

import React, { Component ,PropTypes} from 'react';
import {
  StyleSheet,TouchableOpacity, 
  View, Image, Alert, Text,
} from 'react-native';
import { Avatar } from 'react-native-material-design';

export default class MyAvatar extends Component{

	static defaultProps = {
					bFollow: true,
					size: 40,
					img: require('../img/background.png'),
					badge1: require('../img/plusround_small.png'),
					badge2: require('../img/checkround_small.png'),
					caption: 'Miscellaneous'
    	};
	componentWillReceiveProps(props)
	{
		this.setState({
					img: props.img,
					bFollow: props.bFollow,
					size: props.size,
					caption: props.caption
			});
	}
	constructor(props)
	{
		super(props);
		this.state={
					img: props.img,
					badge1: props.badge1,
					badge2: props.badge2,
					bFollow: props.bFollow,
					size: props.size,
					caption: props.caption
			}
	}
	onPress=()=>
	{

		this.props.onPress(!this.state.bFollow, this.props.offset);
		this.setState({ bFollow: !this.state.bFollow})
	}

	render() {
		var imgBadge = this.state.badge1;
		if(this.state.bFollow == true) 
			imgBadge = this.state.badge2; 
		return(
			<View style={{flexDirection:'column', padding: 5}}>
				<View style={{width: this.state.size, height:this.state.size}}>
					<TouchableOpacity style={{width: this.state.size, height:this.state.size, flex:1}} underlayColor={'transparent'} activeOpacity={0.5} onPress={this.onPress.bind(this)}>
						<View style={{width: this.state.size, height:this.state.size}}>
							<Avatar size={this.state.size} style={{width:this.state.size, height: this.state.size, position:'absolute', left:0, top:0}}
							borderRadius={this.state.size / 2} image={<Image source={this.state.img}/>}>
							</Avatar>
							<View style={{width: this.state.size/4, height: this.state.size/4, position: 'absolute', bottom:0, right:0}}>
								<Avatar size={this.state.size/4} style={{width: this.state.size/4, height: this.state.size/4, position: 'absolute', bottom:0, right:0}}
								borderRadius={this.state.size / 8} image={<Image source={imgBadge}/>}/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{width: this.state.size, height:this.state.size/4}}>
					<Text style={{color:'rgb(123,0,0)',textAlign:'center'}} >{this.state.caption}</Text>
				</View>
			</View>
		 );
	}
}

var styles = StyleSheet.create({
});