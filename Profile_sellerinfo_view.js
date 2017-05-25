import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';
import {
  Cell, 
  Section,
  CustomCell,
  TableView,
} from 'react-native-tableview-simple';

import Button from 'apsl-react-native-button'
import MapView from 'react-native-maps';

var _username, _password;

const onBack = () => {
  Alert.alert('Back');
};
const onUsername = () => {
  Alert.alert('Username');
};
const onSocial = () => {
  Alert.alert('Social Clicked');
};
const onDone = () => {
  Alert.alert('Done');
};


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class Profile_sellerinfo_view extends Component { 
  state = {
    trueSwitchIsOn: true,
    falseSwitchIsOn: false,
  };
  render() {
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>

          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                       About
                  </Text>
              </View>
              <View style={{backgroundColor: 'transparent',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'black'}]}>
                       Mahalkum official account
                  </Text>
              </View>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                       Contact and location
                  </Text>
              </View>

              <View style={{ margin: 5, justifyContent: 'space-around', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0,  height: windowHeight/12}}>
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}} onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Facebook.png')} style={{left:0, flex:1,alignSelf: 'center',backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}} onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Instagram.png')} style={{left:0, alignSelf: 'center',flex:1,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight> 
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}}onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Twitter.png')} style={{left:0, alignSelf: 'center',flex:1,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight> 
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}} onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Pinterest.png')} style={{left:0, alignSelf: 'center',flex:1,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight> 
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}} onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Youtube.png')} style={{left:0,alignSelf: 'center', flex:1,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight> 
                  <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} style={{flex:1,height: windowHeight/18}} onPress={() => onSocial()}>
                    <Image source={require('./img/Social_Google_Plus.png')} style={{left:0, alignSelf: 'center',flex:1,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                  </TouchableHighlight>           
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1, flexDirection: 'column'}}>
                  <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, height: windowHeight/15}}>
                        <Image source={require('./img/phone.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                        <Text style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Call</Text>
                  </View>
                  <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0,   height: windowHeight/15}}>
                        <Image source={require('./img/email_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                        <Text style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Email</Text>
                  </View>
                  <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0,   height: windowHeight/15}}>
                        <Image source={require('./img/web.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                        <Text style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Visit Website</Text>
                  </View>
                </View>
                <View style={{flex:1, backgroundColor:'grey'}}>
                    <MapView
                      style={{flex: 1}}
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    />
                </View>
              </View>


              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                       Store Policy
                  </Text>
              </View>
              
            
              <View style={{flex:1, flexDirection: 'column'}}>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, height: windowHeight/15}}>
                      <Image source={require('./img/phone.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                      <Text style={[{paddingLeft: 5, flex: 17, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Delivery Time</Text>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0}}>
                      <View style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}/>
                      <Text style={[{paddingLeft: 5, flex: 17, color: 'rgb(0,109,179)', backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>
                        Local: 3 to 24 hours, International: 7 to 15 days
                      </Text>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, height: windowHeight/15}}>
                      <Image source={require('./img/phone.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                      <Text style={[{paddingLeft: 5, flex: 17, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Working hours</Text>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row',  borderBottomColor: 'rgb(162,27,70)',borderWidth:0}}>
                      <View style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}/>
                      <Text style={[{paddingLeft: 5, flex: 17, color: 'rgb(0,109,179)', backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>
                        Saturday - Wednesday: 9:00am - 8:00pm, Tuesday: 9:00am - 10:00pm, Friday: Closed
                      </Text>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', borderBottomColor: 'rgb(162,27,70)',borderWidth:0, height: windowHeight/15}}>
                      <Image source={require('./img/phone.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                      <Text style={[{paddingLeft: 5, flex: 17, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Shipping fee</Text>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', borderBottomColor: 'rgb(162,27,70)',borderWidth:0}}>
                      <View style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}/>
                      <Text style={[{paddingLeft: 5, flex: 17, color: 'rgb(0,109,179)', backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>
                        Local: 1 KWD, International:  from 10 to 30 USD
                      </Text>
                </View>
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