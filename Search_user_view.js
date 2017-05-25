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
import Search_user_view_cell from './Search_user_view_cell'
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

export default class Search_user_view extends Component {
  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {

      selectedTab: 'home'
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
                  <Search_user_view_cell imgAvatar={require('./img/person.png')} username='Mahalkum'
                    storename='Mahalkum' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/test.png')} username='David'
                    storename='David' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/test1.png')} username='Petis'
                    storename='Jenis' avatarAry = {[require('./img/test.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/person.png')} username='Wang'
                    storename='Gkos' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/heart.png')} username='Ronaldo'
                    storename='Wang' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/love.png')} username='Jin'
                    storename='Ping' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/BG.png')} username='Ted'
                    storename='Lopez' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/Ribbon.png')} username='Lopez'
                    storename='Tel' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/person.png')} username='David'
                    storename='Del' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/person.png')} username='Jess'
                    storename='Trs' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/love.png')} username='Jin'
                    storename='Ping' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/BG.png')} username='Ted'
                    storename='Lopez' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/Ribbon.png')} username='Lopez'
                    storename='Tel' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/person.png')} username='David'
                    storename='Del' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
                    <Search_user_view_cell imgAvatar={require('./img/person.png')} username='Jess'
                    storename='Trs' avatarAry = {[require('./img/person.png')]}
                    route={this.props.route} navigator={this.props.navigator}/>
      </ScrollView>
    );
  }
}
 