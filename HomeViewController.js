import React, { Component } from 'react'
import { Alert,View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { AppRegistry } from 'react-native'; 

import TabBar from './TabBar';
import HomeView from './HomeView'
import ProfTabBar from './ProfTabBar'
import ProfileView from './ProfileView'
import NotificationViewContent from './NotificationViewContent'
import Search_view_controller from './Search_view_controller'
import CameraViewContent from './CameraViewContent'

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

export default class App extends Component {
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
        <TabBar
            style={styles.content}
            onItemSelected={(index) => {console.log(`current item's index is ${index}`);}}
        >
            <TabBar.Item
                icon={require('./img/homedeselected.png')}
                selectedIcon={require('./img/home.png')}>
                <HomeView/>
            </TabBar.Item>

            <TabBar.Item
                icon={require('./img/searchdeselected.png')}
                selectedIcon={require('./img/search.png')}
                >
                <Search_view_controller/>
            </TabBar.Item>

            <TabBar.Item
                icon={require('./img/Camera.png')}
                selectedIcon={require('./img/Camera.png')}>
                <View>
                     <CameraViewContent/>
                </View>
            </TabBar.Item>

            <TabBar.Item 
                icon={require('./img/notificationsdeselected.png')}
                selectedIcon={require('./img/notifications.png')}>
                <View style={{flex:1}}>
                    <NotificationViewContent/>
                </View>
            </TabBar.Item>

            <TabBar.Item
                icon={require('./img/profiledeselected.png')}
                selectedIcon={require('./img/profile.png')}>
                <ProfileView/>
            </TabBar.Item>
        </TabBar>
      </View>
    );
  }
} 