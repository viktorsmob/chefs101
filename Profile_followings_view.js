import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

import Search_user_view_cell from './Search_user_view_cell'
import Button from 'apsl-react-native-button'

var _username, _password;
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
const SIGNSALTAPIKEY = 'tattoogram'

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5') 

export default class Profile_followings_view extends Component {
  state = {
    trueSwitchPrivate: false,
    trueSwitchPhoto: true,
  };
  async loadData()
  {
    var salt =  Math.floor((Math.random() * 10000));
    var tempStr = Util.SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, userInfo;

    try {
        _userID= await MyStorage.get('user_id');
    } catch (error) {
        Alert.alert(error);
    }

    if(this.profile_handle == -1) this.profile_handle = _userID
    var postString =Util.makeRequest('salt',salt,'sign',sig,'profile_handle',this.profile_handle, 'uid', _userID);
    var requestStr = Util.config.api_host + 'get_user_following.php?' + postString;
    console.log('GetFollowings Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('GetFollowings Response');
    console.log(responseJson);
    if(responseJson.success=='1')
    {
      this.followings = Object.assign([], responseJson.data);
      for(var i =0; i< this.followings.length; i++)
      {
        let keys = Object.keys( this.followings[i]);
        for(var j = 0; j < keys.length; j++)
        this.followings[i][keys[j]] = Util.decodeURI(this.followings[i][keys[j]])
      } 
    }
    else
    {
        Alert.alert('Failed to get FollowingInfo');
    }     
    this.setState({datas: this.followings});
  }

  constructor(props)
  {
    super(props);
    this.profile_handle = this.props.route.profile_handle; 
    this.state={datas: []}
    this.cellArray=[];
    this.loadData();
    this.prevOffset = -1;
  }
   
  onRightClick()
  {

  }
  render() {
    var content = [];
   {content = this.state.datas.map((value, i) => (
                     <Search_user_view_cell key={i} offset={i} ref={(input)=>this.cellArray[i] = input}
                    onRightClick={this.onRightClick.bind(this)} data={value} route={this.props.route} navigator={this.props.navigator}/>
                 ))}
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Followings
              </Text>
              <Button onPress={() => {this.props.navigator.pop(); this.props.route.loadProfile()}} 
                 style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
          </View>
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
              {content}
              
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