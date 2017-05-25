/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { Avatar } from 'react-native-material-design'; 
 
import Button from 'apsl-react-native-button'
import Profile_review_view_cell from './Profile_review_view_cell'
import StarRating from './StarRating';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

export default class Profile_review_view extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      reviewArray: props.reviewArray,
      total_rating: props.total_rating,
      total_amount: props.total_amount,
      isMine: props.isMine,
      user_id: props.user_id,
      username: props.username
    };

    }

  componentWillReceiveProps(props)
  {
    this.setState({
       reviewArray: props.reviewArray,
       total_rating: props.total_rating,
       total_amount: props.total_amount,
       isMine: props.isMine});
  } 
 
  render() 
  { 
      var _rating = this.state.total_rating;
      _rating = _rating.toString().substring(0,3)
      var content = [];
      for(var i =0; i < this.state.reviewArray.length; i++)
      {
          content[i] = <Profile_review_view_cell key={i} data={this.state.reviewArray[i]}/>
      }
      return(
          
            <View style={[styles.container,this.props.style]}>
                {!this.state.isMine &&
                  <View style={styles.topBar}>
                       
                    <Button style={{
                        flex: 1.3, alignSelf: 'center', margin:10,  marginRight: 20, borderWidth: 0, backgroundColor: 'rgb(23,175,66)'
                    }} textStyle={{fontSize:15, color: 'white'}} onPress={() => this.props.navigator.push({index:'Profile_write_review_view',loadProfile: this.props.loadProfile, user_id: this.state.user_id,  username: this.props.username})}>
                        Write Review
                    </Button> 
                    <View style={{flex: 1}}/>

                    <Text style={{flex: 1.5, alignSelf: 'center', backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15,color:'black'}}>
                                    {this.state.total_amount}{' '} Reviews
                    </Text>
    
                    <StarRating
                    style={{flex:1.5, marginRight:20}}
                        starColor='green'
                        disabled={true}
                        maxStars={5}
                        starSize={20}
                        rating={Number(this.state.total_rating)}
                        selectedStar={(rating) => {}}
                      /> 
                     <Text style={{flex: 0.5, backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', color:'black',fontSize: 15}}>
                                  ({_rating})
                     </Text>  
                  </View>
                }
                {this.state.reviewArray.length == 0 &&
                    <Text style={{textAlign: 'center', width: window.width}}>No reviews yet, be the first to review this user</Text>
                }
                  <ScrollView style={{width:window.width, height: window.height/4}}>
                    {content}
                  </ScrollView>
            </View>);
  }
}

const styles = StyleSheet.create({
    button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#272822',
    width: 200,
    height: 50,
    color: 'white'
  },
    container: {
        flex: 1,
        flexDirection: 'column',
        width: Dimensions.get('window').width, 
        overflow: 'hidden',
    },
    topBar:
    {
        borderTopWidth: 1,
        borderTopColor: 'rgb(233,237,238)',
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    }, 
  
    topReviewButton:
    {
        flex: 1.3,
        alignSelf: 'center',
        margin:10,
        marginRight: 20,
        borderWidth: 0, 
        backgroundColor: 'rgb(23,175,66)'
    },          
    topText: {
        alignSelf: 'center',
        fontSize: 41,
        color: '#ffffff',
    },
    mainImage: {
        width: Dimensions.get('window').width,
        height: windowWidth,
        flex: 1,
        resizeMode: 'stretch'
    },
    middleBar_1:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 25,
    },
    middleBar_2:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 50,
    },
    bottomBar:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    }
});