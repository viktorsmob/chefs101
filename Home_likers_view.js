import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

import Util from './Lib/utils'
import Home_likers_view_cell from './Home_likers_view_cell'
import Button from 'apsl-react-native-button' 

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

var aryData ;
export default class Home_likers_view extends Component { 
  constructor(props) {
        super(props);
        
        this.state = {
            selectedIndex: 0,
            image_id: props.route.image_id, 
            likers: []
        } 
    }
  componentDidMount()
  {
    this.get_user_liker_list();
  }
  async get_user_liker_list()
    {
        var salt =  Math.floor((Math.random() * 10000));
        var tempStr = Util.SIGNSALTAPIKEY + salt;
        var sig = Util.MD5.hex_md5(tempStr);
        var _userID, _offset;
        var postString =Util.makeRequest('salt',salt,'sign',sig,'id',this.state.image_id);

        var requestStr = Util.config.api_host + 'get_image_likes.php?' + postString;
        console.log('GetUserLikerList');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        var i = 0, j=0;
        if(responseJson.success=='1')
        {
          aryData = Object.assign({},responseJson.data);
          aryData.length = responseJson.data.length;
          for(i = 0; i < aryData.length; i ++)
          { 
            aryData[i].username = Util.decodeURI(aryData[i].username);
            aryData[i].name = Util.decodeURI(aryData[i].name);
            aryData[i].user_image = Util.decodeURI(aryData[i].user_image);
            aryData[i].email = Util.decodeURI(aryData[i].email)
          } 
          this.setState({likers: aryData});
        }
        else
        {
            //Alert.alert('Failed to get comments');
        }
        console.log('LIker Response= ');
        console.log( responseJson);
    }

  render() {
    var i = 0 ;
        var content = []  
        for(i = 0 ;i < this.state.likers.length; i ++) 
        {          
            content[i]=(<Home_likers_view_cell key={i} navigator={this.props.navigator} route={this.props.route} data={this.state.likers[i]}/>);
        }      
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Likers
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
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
 