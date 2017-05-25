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

export default class ProfileTabView extends Component {
  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {
      datasource: this.props.datasource,
      selectedTab: 'home'
    }
  }
  componentWillReceiveProps(props)
  {
    this.setState({
      datasource: props.datasource});
  }
 
  render() { 
    return (
      <View style={styles.container}>
        <ProfTabBar
            tabType='Profile'
            style={styles.content}
            onItemSelected={(index) => {console.log(`current item's index is ${index}`);}}
        >
            <TabBar.Item
                icon={require('./img/homedeselected.png')}
                selectedIcon={require('./img/home.png')}>
                <Profile_categoryview ref={(input) => { this.pTab = input; }} user_id={this.props.user_id} loadProfile={this.props.loadProfile} isMine={this.props.isMine} followToggle={this.props.followToggle} reloadFunc={this.props.reloadFunc} array_categories={this.state.datasource.array_categories} categoryArray={this.state.datasource.categoryArray} navigator={this.props.navigator} route={this.props.route}/>
            </TabBar.Item>
            
            <TabBar.Item
                icon={require('./img/searchdeselected.png')}
                selectedIcon={require('./img/search.png')}
                >
                <Profile_promotionview promotionArray={this.state.datasource.promotionArray} navigator={this.props.navigator} route={this.props.route}/>
            </TabBar.Item>

            <TabBar.Item
                icon={require('./img/Camera.png')}
                selectedIcon={require('./img/Camera.png')}>
                <Profile_review_view reviewArray={this.state.datasource.reviewArray} username={this.props.username} user_id={this.props.user_id} loadProfile={this.props.loadProfile} isMine={this.props.isMine} total_rating={this.state.datasource.total_rating} total_amount = {this.state.datasource.total_amount} navigator={this.props.navigator} route={this.props.route}/>
            </TabBar.Item>

            <TabBar.Item>
                <Profile_sellerinfo_view navigator={this.props.navigator} route={this.props.route}/>
            </TabBar.Item>
        </ProfTabBar>
      </View>
    );
  }
}