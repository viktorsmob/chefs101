'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text, 
    TouchableHighlight,
    Dimensions,
    ScrollView,
    Alert,
    Navigator
} from 'react-native';

import React, {Component} from 'react'  
import Button from 'apsl-react-native-button'
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
     
import ActionSheet from 'react-native-actionsheet';

 
import { GiftedChat } from 'react-native-gifted-chat';

export default class Example extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
            <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    {this.props.route.chatName}
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
            </View>
           
           <Image style ={styles.container}
            source={require('./img/ChatBack.png')} resizeMode={Image.resizeMode.stretch}>
              <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                  _id: 1,
                }}
              /> 
           </Image>
      </Image>
    );
  }
}    
const styles = StyleSheet.create({  
    container: {
        flex: 1,
        flexDirection: 'column',
        width: Dimensions.get('window').width,     
        overflow: 'hidden',
    },
    topArea:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(178,61,76)',
        flex:1,     
    }, 
    topImg:
    {
        flex:1,   
        width:Dimensions.get('window').width, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerImg:
    {
        flex:1,  
        backgroundColor: 'blue'
    },
    tabViewArea:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(178,61,76)',
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    topText: {
        alignSelf: 'center',
        fontSize: 41,
        color: '#ffffff',
    },
    scrollView:{
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width
    }
});
