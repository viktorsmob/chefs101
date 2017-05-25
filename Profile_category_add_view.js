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

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5') 

var _category_name='', _category_desc='';
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
export default class register_viewcontroller extends Component { 
  _onDone = async ()=>
  {
    await Util.addCategory(_category_name, _category_desc);
    this.props.route.updateCategories();
    this.props.navigator.pop(); 
  }
  onDone = ()=>{
    if(_category_name == '' || _category_desc == '')
    {
      Alert.alert('Sorry!', 'You must fill all fields.');
      return;
    }
    this._onDone();
  }
  render() { 
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Add Category
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
              <Button onPress={this.onDone} style={[{backgroundColor: 'transparent', height: windowHeight/20,  borderColor: 'white', borderWidth: 0},{position:'absolute',right:20, top: windowHeight * 3 / 80}]} textStyle={{fontSize: window.height/35, color: 'white'}}>
                     Done 
              </Button>
          </View>
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
               <View style={{height:window.height/20}}/>
               <TextInput placeholder="Category Name" style={[{width: window.width, height: window.height/15,backgroundColor: 'rgb(242,242,242)',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _category_name = txt;}}/>
               <View style={{height:window.height/20}}/>
               <TextInput multiline={true} placeholder="" style={[{width: window.width, height: window.height/5,backgroundColor: 'rgb(242,242,242)',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _category_desc = txt;}}/>
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
