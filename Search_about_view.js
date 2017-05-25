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
const deviceWidth = window.width
const deviceHeight = window.height
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class Search_about_view extends Component { 

  render() {
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: deviceHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30, color: 'white'}]}>
                    About-Mahalkum
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
          </View>
          <ScrollView style={{width: window.width, height: deviceHeight/5, backgroundColor: 'rgb(255,255,255)'}}>
               <View style={{borderBottomWidth:1, borderBottomColor:'rgb(250, 250, 250)', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: deviceHeight/5}}>
                    <Image source={require('./img/AppIcon.png')} style={{width: deviceHeight/15, height: deviceHeight /15 }} resizeMode={Image.resizeMode.contain}/>                  
                    <Text  style={{backgroundColor: 'transparent',borderWidth: 0,   fontSize: deviceHeight/15, marginLeft: 5, color: 'black'}} >
                      mahalkum     
                    </Text> 
              </View>

              <View style={{margin: 20, borderBottomWidth:1, borderBottomColor:'rgb(250, 250, 250)',  flexDirection: 'column',  height: deviceHeight/5}}>
                    <Text style={{backgroundColor: 'transparent',color: 'red', fontSize: deviceHeight/30}}>
                      What is Mahalkum?
                    </Text>
                    <Text style={{backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                      Mahalkum is a social market app. Open your shop online and did we mention it's FREE.
                    </Text>
              </View>
              
              <View style={{margin: 20, borderBottomWidth:1, borderBottomColor:'rgb(250, 250, 250)',  flexDirection: 'column', height: deviceHeight/5}}>
                    <Text style={{backgroundColor: 'transparent',color: 'red', fontSize: deviceHeight/30}}>
                      How to use Mahalkum(Walk throw): 
                    </Text>
                    <Text style={{backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                      "Coming Soon" a complete walk throw on how to use Mahalkum app.
                    </Text>
              </View>

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

AppRegistry.registerComponent('register_viewcontroller', () => register_viewcontroller);