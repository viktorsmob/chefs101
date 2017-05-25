import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight
} from 'react-native';

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

var ImagePicker = require('react-native-image-picker');

export default class CameraViewContent extends Component {

  constructor(props)
  {
    super(props)
    this.state={
      avatarSource: require('./img/background.png')
    }
  }

  showGallery = ()=>
  {
     ImagePicker.launchImageLibrary(options, (response)  => {
        console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({avatarSource: source});
      }
    });
  }

  showCamera = ()=>
  {
     ImagePicker.launchCamera(options, (response)  => {
        console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({avatarSource: source});
      }
    });
  }
  render() {
    return (
        <View style ={styles.container}>
           <Text style={{width:100, height: 50, fontSize: 50}} onPress={this.showGallery}>Gallery</Text>
           <Text style={{width:100, height: 50, fontSize: 20}} onPress={this.showCamera}>Camera</Text>
           <Image style={{width:200, height:200}} source={this.state.avatarSource}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
  },

  logo:
  {
    position: 'absolute',
    left: windowWidth / 4,
    width: windowWidth/2,
  },

  icons:
    {position: 'absolute', left: windowWidth/10,
    width: windowWidth/10, height: windowWidth/10,
    resizeMode: Image.resizeMode.contain},

  textfields:
  {
    position: 'absolute',
    fontSize: windowWidth/20,
    top: 0,
    left: windowWidth/5,
    height: windowWidth/10 + 5,
    borderWidth: 0,
    borderColor: 'gray',
    width: windowWidth * 7 / 10
  },

  signInView:{
    position: 'absolute',
    width: windowWidth * 6 / 7,
    height: windowWidth/10 + 5,
    left: windowWidth / 14,
    top: windowWidth * 17 / 50
  },

  forgotPasswordView:{
    position: 'absolute',
    width: windowWidth / 3,
    height: windowWidth/10,
    left: windowWidth / 3,
    top: windowWidth * 23 / 50
  },

  fbLoginView:{
    position: 'absolute',
    width: windowWidth *2 / 3,
    height: windowWidth/10,
    left: windowWidth / 6,
    top: windowWidth * 30 / 50
  },
  signupView:{
    position: 'absolute',
    width: windowWidth / 2,
    height: windowWidth/10,
    left: windowWidth / 4,
    top: windowWidth * 40 / 50
  },
  welcome: {
    backgroundColor: 'blue',
    flex: 2,
    fontSize: 50,
    textAlign: 'center',
  },
  
  instructions: {
    marginBottom: 5,
  },
});