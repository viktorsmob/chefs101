'use strict';

import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import React, {Component} from 'react'
import Button from 'apsl-react-native-button' 

import ViewPager from './Lib/Image_viewpager/ViewPager';
 
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class Search_image_swipe_view extends Component {     
    constructor(props) {
        super(props);
         this.onImageClick = this.onImageClick.bind(this);
          var dataSource = new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2, 
         });
         this.state=
         {
          dataSource: dataSource.cloneWithPages(this.props.aryImg),
         }
         this.onImageClick = this.onImageClick.bind(this);
         this._renderPage = this._renderPage.bind(this);
    }

    onImageClick(num)
    { 
        Alert.alert(num);
        switch(num)
        {
          case '0': 
            this.props.navigator.push({index:"Search_about_view"})
            break;
          case '1':
            this.props.navigator.push({index:"Search_contact_view"})
            break;
          case '2':
            this.props.navigator.push({index:"Search_follow_view"})
        }
    }
 
  render() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
         
        isLoop={true}
        autoPlay={true}/> 
    );
  }

  _renderPage(
    data: Object,
    pageID: number | string,) {
    return ( 
      <TouchableHighlight underlayColor={'transparent'} activeOpacity={1}  onPress={() => this.onImageClick(pageID)}>
      <Image
        source={data}
        style={styles.page} />
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
    height: deviceHeight/4,
    resizeMode: 'stretch'
  },
});
 