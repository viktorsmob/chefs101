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
export default class register_viewcontroller extends Component { 
  state = {
    trueSwitchIsOn: true,
    falseSwitchIsOn: false,
  };
  render() {
    const {goBack} = this.props.navigation
    const {navigate} = this.props.navigation
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Register
              </Text>
               <Button onPress={() => goBack()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
              <Button onPress={onDone} style={[{backgroundColor: 'transparent', height: windowHeight/20,  borderColor: 'white', borderWidth: 1},{position:'absolute',right:20, top: windowHeight * 3 / 80}]} textStyle={{fontSize: windowWidth/27, color: 'white'}}>
                     Done 
              </Button>
          </View>
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(223,201,222)'}}>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                        ACCOUNT DETAILS
                  </Text>
              </View>
              <View style={{paddingLeft: 20, flexDirection: 'row', flex: 1, height: windowHeight / 6,  borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 5,alignItems: 'center', justifyContent: 'center'}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/6,backgroundColor: 'transparent'}} source={require('./img/btn_add_photo.png')} resizeMode={Image.resizeMode.contain}/>
                    <View style={{flexDirection: 'column', flex: 3, height: windowHeight / 6}}>
                      <View style={{flexDirection: 'row', flex:1}}>
                        <Image style ={{left:0, flex:1,height: windowHeight/12,backgroundColor: 'transparent'}} source={require('./img/User Icon.png')} resizeMode={Image.resizeMode.contain}/>
                        <TextInput style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}   onChangeText={(txt) => { _username = txt;}} placeholder="Choose Username"/>
                      </View>
                      <View style={{flexDirection: 'row', flex:1}}>
                        <Image style ={{left:0, flex:1,height: windowHeight/12,backgroundColor: 'transparent'}} source={require('./img/change_password_icon.png')} resizeMode={Image.resizeMode.contain}/>
                        <TextInput style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}   onChangeText={(txt) => { _username = txt;}} placeholder="Choose Password"/>
                      </View>
                    </View>
              </View>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                        PROFILE DETAILS
                  </Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/epusername_icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <TextInput style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}   onChangeText={(txt) => { _username = txt;}} placeholder="Display Name"/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/6}}>
                    <Image source={require('./img/epusername_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Bio" multiline = {true} style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/email_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Email" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/phone_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Country Code" style={[{paddingLeft: 5, flex: 3, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
                    <TextInput placeholder="Phone (Optional)" style={[{paddingLeft: 5, flex: 5, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Facebook.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="www.facebook.com/" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Twitter.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="www.twitter.com/" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Pinterest.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="www.pinterest.com/" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Google_Plus.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="plus.google.com" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>  
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Instagram.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="www.instagram.com/" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Social_Youtube.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="www.youtube.com/" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>  
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 13 / 120 ,alignItems: 'center'}}>
                 <Text style={[{position: 'absolute',top: windowHeight *13/240 - windowHeight/72, left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                        STORE INFORMATION
                  </Text>
                  <Switch style={{position: 'absolute', top: windowHeight *13/240 - windowHeight/72, right: 5, height: windowHeight /36}}
                        onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                        value={this.state.trueSwitchIsOn} />
              </View>

              <View style={{paddingLeft: 20, flexDirection: 'row', flex: 1,  borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2,alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[{margin: 5, backgroundColor: 'transparent',borderWidth: 0, color: 'blue', fontSize: windowHeight/50}]}>
                          <Text style={{color:'red'}}>
                            NOTE:
                          </Text>
                          <Text style={{color:'black'}}>
                            By enabling STORE INFORMATION other users will be able to see your email, phone number and store location.
                          </Text>
                    </Text>                             
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/website_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Website" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View> 
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/email_icon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Store Email" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/phone.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Country Code" style={[{paddingLeft: 5, flex: 3, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
                    <TextInput placeholder="Store Phone (Public)" style={[{paddingLeft: 5, flex: 5, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Delivery_Time.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Delivery Time" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Working_Hours.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Working Hours" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/Shipping_Fee.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Shipping Fee" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image source={require('./img/locationicon.png')} style={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}}  resizeMode={Image.resizeMode.contain}/>
                    <TextInput placeholder="Choose Location" style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _username = txt;}}/>
              </View>              
              <View style={{height: windowHeight/4, backgroundColor: 'white'}}/>
              <Text style={{marginTop: 10, backgroundColor: 'transparent', flex: 1, height: windowHeight/18, fontSize: windowHeight/40, textAlign: 'center'}}>By clicking Done you are indicating that you</Text>
              <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',flex: 1, height: windowHeight/18}}>
                    <Text style={{backgroundColor: 'transparent',fontSize: windowHeight/40}}>
                      have read and agree to the
                    </Text>
                    <View >
                    <Text  style={{backgroundColor: 'transparent',borderWidth: 0, borderBottomWidth:1, borderBottomColor:'blue' , fontSize: windowHeight/40, marginLeft: 5, color: 'blue'}} >
                      Privacy Policy
                    </Text>
                    </View>
              </View>
               <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',flex: 1, height: windowHeight/18}}>
                    <Text style={{backgroundColor: 'transparent',fontSize: windowHeight/40}}>
                      and
                    </Text>
                    <View >
                    <Text  style={{backgroundColor: 'transparent',borderWidth: 0, borderBottomWidth:1, borderBottomColor:'blue' , fontSize: windowHeight/40, marginLeft: 5, color: 'blue'}} >
                      Copyrights
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