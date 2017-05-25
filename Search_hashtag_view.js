import React, { Component } from 'react'
import { Alert,View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { AppRegistry } from 'react-native'; 

import TabBar from './TabBar';
import HomeView from './HomeView'
import ProfTabBar from './ProfTabBar' 
import Profile_categoryview from './Profile_categoryview'
import Profile_promotionview from './Profile_promotionview'
import Profile_review_view from './Profile_review_view'
import Profile_sellerinfo_view from './Profile_sellerinfo_view'
import Search_verified_user_view_cell from './Search_verified_user_view_cell'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class Search_hashtag_view extends Component {
  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {

      selectedTab: 'home'
    }
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
 