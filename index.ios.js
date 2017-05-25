 

import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,Text,   
  StatusBar, 
  View, Image, Alert, TextInput,TouchableHighlight
} from 'react-native';
import Button from 'apsl-react-native-button'
import forgotPassword from './forgotPassword'
import forgotPassword_username from './forgotPassword_username'
import forgotPassword_throw_email from './forgotPassword_throw_email'
import register_viewcontroller from './register_viewcontroller'
import { StackNavigator } from 'react-navigation';
import HomeViewController from './HomeViewController'
var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
 

var _username, _password;

const onForgetPassword = () => {
  Alert.alert('FORGET');
};
const onFBLogin = () => {
  Alert.alert('FBLOGIN');
};
const onSignUp = () => {
  Alert.alert('Signup');
};


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;

export default class AwesomeProject extends Component {
  static navigationOptions = {
    headerMode: 'none'
    };

  async logIn()
  {
       if(await Util.logIn(_username, _password) == true)
       {
          this.props.navigation.navigate('HomeScreen');
       }
      else
       Alert.alert('Wrong Information'); 
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')}>
          <StatusBar hidden={true} />
          <View style={{flex: 1,   flexDirection: 'row', alignItems: 'center',
          justifyContent: 'center'}}>
              <Image style ={styles.logo} resizeMode={Image.resizeMode.contain} source={require('./img/logobackground1.png')}></Image>
          </View>
          
          <View style={{flex: 2,  alignItems: 'center', justifyContent: 'center'}}>
              <Image style ={[styles.icons, {position:'absolute', top: windowWidth/20}]}  source={require('./img/epusername_icon.png')}></Image>
              <TextInput style={[styles.textfields, {position: 'absolute', top: windowWidth/20}]}   onChangeText={(txt) => { _username = txt;}}
                  placeholder="Username"/>

              <Image style ={[styles.icons, {position:'absolute', top: windowWidth/5  }]}  source={require('./img/change_password_icon.png')}></Image>
              <TextInput style={[styles.textfields, {position: 'absolute', top: windowWidth/5}]}   onChangeText={(txt) => { _password = txt;}}
                  placeholder="Password"/>
              <View style={styles.signInView}>
                  <Button onPress={() => 
                    this.logIn()} style={{backgroundColor: '#841584', borderColor: '#841584',borderWidth: 1}} textStyle={{fontSize: windowWidth/20, color: 'white'}}>
                    Sign In
                  </Button>
              </View>

              <View style={[styles.forgotPasswordView,{backgroundColor: 'transparent'}]}>
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1}} onPress={() => 
                    navigate('ForgotPassword')}>
                  <Image style={{flex:1, width:null, height:null}} resizeMode={Image.resizeMode.contain} source={require('./img/forgotpasswordbtn.png')}/>
                </TouchableHighlight>
              </View>

              <View style={[styles.fbLoginView,{backgroundColor: 'transparent'}]}>
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1}} onPress={onForgetPassword}>
                  <Image style={{flex:1, width:null, height:null}} resizeMode={Image.resizeMode.contain} source={require('./img/signinwithfacebookbtn.png')}/>
                </TouchableHighlight>
              </View>
 
              <View style={[styles.signupView,{flexDirection: 'row', flex:1}]}>
                <Text style={{flex: 4, textAlign: 'center', backgroundColor: 'transparent',borderWidth: 0, fontSize: windowWidth/30, color: 'white'}}>
                    Don't you have an account?
                </Text>
                <View style={{flex:3}}>
                  <Button onPress={() => 
                    navigate('Register_ViewController')} style={{backgroundColor: 'transparent', borderWidth: 0}} textStyle={{fontSize: windowWidth/20, color: 'white'}}>
                      Sign Up
                  </Button>
                </View>
              </View>
          </View>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
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

const Mahalkum = StackNavigator({
  Home: { screen: AwesomeProject },
  ForgotPassword: { screen: forgotPassword },
  ForgotPassword_Username: {screen: forgotPassword_username},
  ForgotPassword_Throw_Email: {screen: forgotPassword_throw_email},
  Register_ViewController: {screen: register_viewcontroller},
  HomeScreen: {screen: HomeViewController}
},AwesomeProject.navigationOptions);

AppRegistry.registerComponent('AwesomeProject', () => Mahalkum);

