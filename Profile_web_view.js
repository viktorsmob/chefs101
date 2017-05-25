import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,InteractionManager,
    View, Image, Alert, TextInput,TouchableHighlight,ScrollView, WebView
} from 'react-native';
import {
  Cell, 
  Section,
  CustomCell,
  TableView,
} from 'react-native-tableview-simple';

import Button from 'apsl-react-native-button'
import Home_tableview_cell from './Home_tableview_cell'
var _category_name, _category_desc;
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
const deviceWidth = window.width
const deviceHeight = window.height

import ActionSheet from 'react-native-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
var buttons = ['Cancel', 'Report Inappropriate', 'Share Item', 'Copy Share URL', 'Email Item'];
var buttons_Contact = ['Cancel', 'Chat','Call', 'SMS','WhatsApp','Email']

export default class Profile_web_view extends Component{ 
  
  static defaultProps = {
         url: 'http://mahalkum.com/blog/?page_id=45'
    };

  constructor(props)
  {
      super(props);
      this.state={
        url: props.route.url 
      } 
  }
        
    
    componentDidMount()
    {
          
    }
  
    onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
    return true;
    };

    onNavigationStateChange = (navState) => {
      this.setState({
        backButtonEnabled: navState.canGoBack,
        forwardButtonEnabled: navState.canGoForward,
        url: navState.url,
        status: navState.title,
        loading: navState.loading,
        scalesPageToFit: true
      });
    };

  render() {  
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: deviceHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: deviceHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: deviceWidth/10, color: 'white'}}>
                    ←
              </Button>
   
              <TouchableHighlight style={{position: 'absolute',  left: deviceWidth/2 - deviceHeight*1/64, top:deviceHeight*3/64}}  underlayColor={'transparent'} activeOpacity={0.5} onPress={() => {this.webView.reload();}}>
                    <Image style={{width: deviceHeight/32, height: deviceHeight/32,resizeMode: 'stretch' }} source={require("./img/refresharrow.png")}/>
              </TouchableHighlight> 
              <TouchableHighlight style={{position: 'absolute',  left: deviceWidth*2/6 - deviceHeight*1/64, top:deviceHeight*3/64}}  underlayColor={'transparent'} activeOpacity={0.5} onPress={() => {this.webView.goBack();}}>
                    <Image style={{width: deviceHeight/32, height: deviceHeight/32,resizeMode: 'stretch' }} source={require("./img/left_btn_arrow.png")}/>
              </TouchableHighlight>
              <TouchableHighlight style={{position: 'absolute',  left: deviceWidth*4/6 - deviceHeight*1/64, top:deviceHeight*3/64}}  underlayColor={'transparent'} activeOpacity={0.5} onPress={() => {this.webView.goForward();}}>
                    <Image style={{width: deviceHeight/32, height: deviceHeight/32,resizeMode: 'stretch' }} source={require("./img/right_btn_arrow.png")}/>
              </TouchableHighlight>
          </View> 
          <WebView
          ref={(o)=> this.webView = o}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}     
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}     
          scalesPageToFit={true} 
        />
 
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
  topText:
  {height:window.height/20,
    color: 'black',
    left: 10,
  fontSize: windowHeight/35,
  marginBottom: windowHeight/25},
  middleBar:
  {
    width: deviceWidth,  
    height: deviceHeight/10
  },
  middleText:
  {
    fontSize: deviceHeight/30, color: 'black'
  } 
});
 