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
import StarRating from './StarRating';
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
const deviceWidth = window.width;
const deviceHeight = window.height;

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5')

var _review;
export default class Profile_write_review_view extends Component { 
  state = {
    rating: 0
  };
  render() {
    
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    {this.props.route.username}
              </Text>
              <Button onPress={() => 
                {this.props.navigator.pop();
                this.props.route.loadProfile();
                }} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
          </View>
          <View style={{flexDirection: 'column', flex:1, backgroundColor: 'white', alignItems: 'center'}}>
              <Text style={{marginTop:30, marginBottom:15, fontSize: deviceHeight/30}} >User Rating</Text>
              <StarRating 
                    style={{flex:2, marginRight:20}}
                    starColor='green'
                    disabled={false}
                    maxStars={5}
                    starSize={40}
                    rating={this.state.rating}   
                    selectedStar={(rating) => this.setState({rating: rating})}
              />
              <View style={{width: deviceWidth, marginTop: 30,height: deviceHeight/24}}>
                <Text style={{left: 20, fontSize: deviceHeight/30}} >User Review:</Text>
              </View>
              <TextInput multiline={true} placeholder="" style={[{width: window.width, height: window.height/5,backgroundColor: 'rgb(242,242,242)',borderWidth: 0, fontSize: windowHeight/35}]}  onChangeText={(txt) => { _review = txt;}}/>
              <Button style={{ marginTop: 30,alignSelf: 'center',width: deviceWidth/2,  margin:10, marginRight: 20, backgroundColor: 'rgb(144,5,53)'}} textStyle={{fontSize:windowHeight/30, color: 'white'}} 
                  onPress={() => Util.postReview(_review,this.props.route.user_id, this.state.rating) }>
                        Submit
              </Button>
          </View>
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
   
});
 