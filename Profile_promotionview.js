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
  StyleSheet,
  Alert,
  Text,
  View,
} from 'react-native';

import GridView from './GridView' 

export default class Profile_promotionview extends Component {
  showDetail = (index)=>{
    console.log("ID from GRID=" + index);
    this.props.navigator.push({index: 'Profile_items_detail_view', itemID: index})
  }

  render() { 
      var imgList=[require('./img/BG.png'), require('./img/test1.png'), require('./img/person.png'),
                    require('./img/test.png'), require('./img/ProfilePic.png'), require('./img/person.png')]

      return (
        <GridView showDetail={this.showDetail} rowCount={4} aryImg={imgList}> 
        </GridView>
    );
  }


}
 