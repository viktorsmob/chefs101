import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

import Button from 'apsl-react-native-button'

var _username, _password;

const onBack = () => {
  Alert.alert('Back');
};
const onUsername = () => {
  Alert.alert('Username');
};
const onFacebook = () => {
  Alert.alert('FaceBook');
};
const onDone = () => {
  Alert.alert('Done');
};
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class Profile_request_view extends Component { 
  state = {
    trueSwitchPrivate: false,
    trueSwitchPhoto: true,
  };
  render() {
    
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Request
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
          </View>
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
               
          </ScrollView>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
  } 
});

AppRegistry.registerComponent('register_viewcontroller', () => register_viewcontroller);