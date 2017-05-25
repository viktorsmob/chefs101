import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight
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
const onSignUp = () => {
  Alert.alert('Signup');
};

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class forgotPassword extends Component {
  render() {
    const {goBack} = this.props.navigation
    const {navigate} = this.props.navigation
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{flex: 1.5,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Reset Password
              </Text>
               <Button onPress={() => goBack()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
          </View>
          
          <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',alignItems: 'center', flex: 0.7}}>
             <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                    Forgot Password?
              </Text>
          </View>
          <View style={{paddingLeft: 20, flexDirection: 'row',backgroundColor: 'white', flex: 1,  borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 5,alignItems: 'center', justifyContent: 'center'}}>
                <Image style ={{left:0, height: windowHeight/12,flex:1,backgroundColor: 'transparent'}} source={require('./img/User Icon.png')} resizeMode={Image.resizeMode.contain}/>
                <Text onPress={() => 
                    navigate('ForgotPassword_Username')} style={[{paddingLeft:5, flex: 7, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/27}]}>
                    Username or Email
                </Text>  
                <Text onPress={() => 
                    navigate('ForgotPassword_Username')} style={[{flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/27}]}>
                    →
                </Text>                   
          </View>
          <View style={{paddingLeft: 20, flexDirection: 'row',backgroundColor: 'white', flex: 1,  borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 5,alignItems: 'center', justifyContent: 'center'}}>
                <Image style ={{left:0, flex:1,height: windowHeight/12,backgroundColor: 'transparent'}} source={require('./img/Facebook Icon.png')} resizeMode={Image.resizeMode.contain}/>
                <Text onPress={onFacebook} style={[{paddingLeft: 5, flex: 7, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/27}]}>
                    Reset using Facebook
                </Text>  
                <Text onPress={onFacebook} style={[{flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/27}]}>
                    →
                </Text>                   
          </View>
          <View style={{backgroundColor: 'white', flex: 7.8,  alignItems: 'center', justifyContent: 'center'}}/>
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

AppRegistry.registerComponent('forgotPassword', () => forgotPassword);