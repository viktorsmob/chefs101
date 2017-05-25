import React, { Component } from 'react'
import { Alert,View, Text, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { AppRegistry } from 'react-native'; 

import TabBar from './TabBar';
import HomeView from './HomeView'
import ProfTabBar from './ProfTabBar' 
import Profile_categoryview from './Profile_categoryview'
import Profile_promotionview from './Profile_promotionview'
import Profile_review_view from './Profile_review_view'
import Profile_sellerinfo_view from './Profile_sellerinfo_view'
import Search_verified_user_view_cell from './Search_verified_user_view_cell'
import SearchHeaderComponent from './Lib/Search-header/Search-header-component';
import SearchTagTabView from './SearchTagTabView'

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const SearchHeader = SearchHeaderComponent(); 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        backgroundColor: '#f5fcff'
    },
    status: {
        zIndex: 10,
        elevation: 2,
        width: DEVICE_WIDTH,
        height: 21,
        backgroundColor: '#0097a7'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 0,
        backgroundColor: 'rgb(137,29,46)'
    },
    label: {
        flexGrow: 1,
        fontSize: 25,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#ffffff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

export default class Search_user_hashtag_view extends Component {
  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {

      selectedTab: 'home'
    }
  }
  componentDidMount()
  {
    if(this.searchHeader!=null &&  this.searchHeader.isHidden() == true) this.searchHeader.show(); 
  }
  render() {
    
    return (
      <View style = { styles.container }>
                      <View style = { styles.header }>
                          
                      </View> 
                  
                      <SearchHeader
                          ref = {(searchHeader) => {
                              this.searchHeader = searchHeader; }}
                          statusHeightOffet = { 0 } 
                          visibleInitially={true}
                          onHidden={() => {this.props.navigator.pop();}}/> 

                 <SearchTagTabView route={this.props.route} navigator={this.props.navigator}/>
      </View>
    );
  }
}
 