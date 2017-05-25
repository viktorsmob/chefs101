import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text, Picker,
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Button from 'apsl-react-native-button'

var _contact_name, _contact_subject, _contact_email,_contact_mobile, _contact_message;

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

var radio_props = [
  {label: 'General', value: 0 },
  {label: 'Sales', value: 1 },
  {label: 'Report a problem', value: 2 },
  {label: 'feedback', value: 3 }
];

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const deviceWidth = window.width
const deviceHeight = window.height
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class Search_contact_view extends Component { 
  constructor(props)
  {
    super(props);
    this.state={subject: 'General'};
  }
  onValueChange = (key: string, value: string) => {
    this.setState({subject: value});
     
  };
  render() {
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: deviceHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30, color: 'white'}]}>
                    Contact Us - Mahalkum
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

                <View style={{margin: 20, borderBottomWidth:1, borderBottomColor:'rgb(250, 250, 250)',  flexDirection: 'column'}}>
                  
                  <View style={{marginBottom: 10, flex:1,flexDirection: 'column', width: deviceWidth, height: deviceHeight/4}}>
                    
                    <Text style={{backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                      Subject
                    </Text>
                    
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      style={{margin:30}}
                      onPress={(value) => {this.setState({subject:value})}}
                    />
                  
                  </View>

                    <View style={{marginBottom: 10, flex:1,flexDirection: 'column', width: deviceWidth, height: deviceHeight/10}}>
                      <Text style={{flex:1, backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                       Your Name(required)
                      </Text>
                      <TextInput placeholder="Enter your name" style={{ flex:1, paddingLeft: 5,backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30 - 5}}   onChangeText={(txt) => { _contact_name = txt;}}/>
                    </View>
                    
                    <View style={{marginBottom: 10,flex:1,flexDirection: 'column',width: deviceWidth, height: deviceHeight/10}}>
                      <Text style={{flex:1, backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                      Your Email(required)
                      </Text>
                      <TextInput placeholder="Enter your email" style={[{flex:1,paddingLeft: 5,  backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30 - 5}]}   onChangeText={(txt) => { _contact_email = txt;}}/>
                    </View>

                    <View style={{flex:1,marginBottom: 10,flexDirection: 'column',width: deviceWidth, height: deviceHeight/10}}>
                      <Text style={{flex:1, backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                        Your Mobile
                      </Text>
                      <TextInput placeholder="Enter your mobile number" style={[{flex:1, paddingLeft: 5,  backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30 - 5}]}   onChangeText={(txt) => { _contact_mobile = txt;}}/>
                   </View>

                    <View style={{marginBottom: 10,flex:1,flexDirection: 'column', width: deviceWidth, height: deviceHeight/3}}>
                      <Text style={{flex:1, backgroundColor: 'transparent',color: 'black', fontSize: deviceHeight/30}}>
                        Your Message(required)
                      </Text>
                      <TextInput placeholder="Enter your message" multiline={true} style={[{flex:6, paddingLeft: 5,  backgroundColor: 'transparent',borderWidth: 0, fontSize: deviceHeight/30 - 5}]}   onChangeText={(txt) => { _contact_message = txt;}}/>
                    </View>
                    
                    <Button onPress={()=>{}} style={{backgroundColor: 'transparent', height: deviceHeight/20, borderColor: 'red', borderWidth: 3}} textStyle={{fontSize: deviceHeight/30+5, color: 'red'}}>
                    Send
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