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
export default class Profile_setting_view extends Component { 
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
                    Options
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
          </View>
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/Find Friends icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>Alert.alert("ON")}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}> Find Friends</Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/Liked Photos icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>Alert.alert("ON")}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}> Items You've Liked</Text>
              </View>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                        ACCOUNT
                  </Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/User Icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>this.props.navigator.push({index: 'Profile_edit_view'})}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}> Edit Your Profile</Text>
              </View>
              <View style={{paddingLeft: 5,paddingRight: 5,  justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/Private Photos icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text style={[{paddingLeft: 5, flex: 7, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}> Items Are Private</Text>
                    <Switch style={{ flex:1}}
                        onValueChange={(value) => this.setState({trueSwitchPrivate: value})}
                        value={this.state.trueSwitchPrivate} />
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/Notification Settings icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>this.props.navigator.push({index: 'Profile_notification_setting'})}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Push Notification Settings</Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'column', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Text  style={[{paddingLeft: 5, flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/45}]}>Turns privacy ON to approve follow requests.</Text>
                    <Text  style={[{paddingLeft: 5, flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/45}]}>Your existing followers won't be affected.</Text>
              </View>
              <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                        SAVE TO LIBRARY
                  </Text>
              </View>
              <View style={{paddingLeft: 5,paddingRight: 5,  justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/Original Photos icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text style={[{paddingLeft: 5, flex: 7, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}> Original Photos</Text>
                    <Switch style={{ flex:1}}
                        onValueChange={(value) => this.setState({trueSwitchPhoto: value})}
                        value={this.state.trueSwitchPhoto} />
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'column', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Text  style={[{paddingLeft: 5, flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/45}]}>We save photos to your Camera Roll.</Text>
                    <Text  style={[{paddingLeft: 5, flex: 1, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/55}]}> </Text> 
              </View>
               <View style={{backgroundColor: 'rgb(162,27,70)',flexDirection: 'row',height: windowHeight * 7 / 120 ,alignItems: 'center'}}>
                 <Text style={[{left: 20, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/36, color: 'white'}]}>
                      About
                  </Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/TOC Icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>this.props.navigator.push({index: 'Profile_web_view', url: 'http://mahalkum.com/blog/?page_id=43'})}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Terms Of Service</Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Image style ={{left:0, flex:1,height: windowHeight/18,backgroundColor: 'transparent'}} source={require('./img/TOC Icon.png')} resizeMode={Image.resizeMode.contain}/>
                    <Text onPress={()=>this.props.navigator.push({index: 'Profile_web_view', url: 'http://mahalkum.com/blog/?page_id=45'})}style={[{paddingLeft: 5, flex: 8, backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/35}]}>Privacy Policy</Text>
              </View>
              <View style={{paddingLeft: 5, justifyContent: 'center', alignItems:'center',flexDirection: 'row', flex: 1, borderBottomColor: 'rgb(162,27,70)',borderWidth:0, borderBottomWidth: 2, height: windowHeight/12}}>
                    <Button style={{ alignSelf: 'center',flex:1,  margin:10, marginRight: 20, backgroundColor: 'rgb(144,5,53)'}} textStyle={{fontSize:windowHeight/30, color: 'white'}} onPress={() => Alert.alert("LOGOUT")}>
                        Log Out
                    </Button>
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
  } 
});

AppRegistry.registerComponent('register_viewcontroller', () => register_viewcontroller);