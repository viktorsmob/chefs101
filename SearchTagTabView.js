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
import Search_user_view from './Search_user_view'
import Search_hashtag_view from './Search_hashtag_view'

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

export default class SearchTagTabView extends Component {
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
        <ProfTabBar
            tabType='Search'
            style={styles.content}
            onItemSelected={(index) => {console.log(`current item's index is ${index}`);}}
        >
            <TabBar.Item>
                <Search_user_view route={this.props.route} navigator={this.props.navigator}/>
            </TabBar.Item>

            <TabBar.Item>
                <Search_hashtag_view route={this.props.route} navigator={this.props.navigator}/>
            </TabBar.Item>
        </ProfTabBar>
      </View>
    );
  }
}
 