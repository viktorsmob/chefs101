import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,InteractionManager,
    View, Image, Alert, TextInput,TouchableHighlight,ScrollView
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
var buttons_own = ['Cancel', 'Delete','Edit', 'Share Item','Copy Share URL','Email Item']

export default class Profile_items_detail_view extends Component{
  
  static defaultProps = {
        following: true,
        followers: 0,
        items: 0,
        route: {itemID: 0}
    };

  constructor(props)
  {
      super(props);
      this.state={
        following: props.following,
        followers: props.followers,
        items: props.items,
        itemID: props.route.itemID,
        datas: props.route.array
      }

      this.array = this.props.route.array;
  }

    gotoCommentView = (index)=>
    { 
        this.props.navigator.push({index:"commentView",comments: this.state.datas[index].comments, imgID: this.state.datas[index].id})
    }
   
    componentDidMount()
    {
          var itemHeight = 160 + deviceWidth;
          InteractionManager.runAfterInteractions(() => {
         this.scrView.scrollTo({x:0,y:this.state.itemID*itemHeight})
          })   
    }
  ///////////
  reportInappropriate = ()=>
    {
        Alert.alert('Report InApopropriate');
    }

    shareItem = ()=> 
    {
        Alert.alert('Share Item');
    }

    copyShareURL = ()=>
    {
        Alert.alert('CopyShareURL');
    }
    emailItem = () =>
    {
        Alert.alert('EmailItem');
    }

    editPost = () =>
    {
        Alert.alert('EditPost'); 
    }
    deletePost = () =>
    {
        Alert.alert('DeletePost');
    }
    
    _handleActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.reportInappropriate();
                break;
            case 2:
                this.shareItem();
                break;
            case 3:
                this.copyShareURL();
                break;
            case 4:
                this.emailItem();
                break;
            }
    }
    _handleMyActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.deletePost();
                break;
            case 2:
                this.editPost()
                break;
            case 3:
                this.shareItem();
                break;
            case 4:
                this.copyShareURL();
                break;
            case 5:
                this.emailItem();
                break;
            }
    }

    onAction = (rowIndex)=>{
        if(this.state.datas[rowIndex].image_owner != 'yes')
            this.otherActionSheet.show();
        else
            this.myActionSheet.show();
    }

    //On Contact
    Chat = ()=>
    {
        Alert.alert('Chat');
    }

    Call = ()=> 
    {
        Alert.alert('Call');
    }

    SMS = ()=>
    {
        Alert.alert('SMS');
    }

    WhatsApp = () =>
    {
        Alert.alert('WhatsApp');
    }
    
    Email=()=>
    {
        Alert.alert('Email');
    }
    ReportCategory = ()=>
    {
      Alert.alert('Report Category');
    }

    _handleReportActionSheetPress(index)
    {
      if(index == 1)
      {
        this.ReportCategory();
      }
    }

    _handleContactActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.Chat();
                break;
            case 2:
                this.Call();
                break;
            case 3:
                this.SMS();
                break;
            case 4:
                this.WhatsApp();
                break;
            case 5:
                this.Email();
                break;
            }
    }
 

    onContact = (info)=>{this.contactActionSheet.show();}
 

  render() { 
    var followImg;
    if (this.state.following==true)
    {
        followImg = require('./img/followingbtn.png')
    }   
    else
    {
        followImg = require('./img/followbtn.png')
    }
    var content=[]
    for(var i = 0; i < this.array.length ; i ++)
    {
        content[i] = (<Home_tableview_cell  route={this.props.route} navigator={this.props.navigator} key={i} offset={i} data={this.state.datas[i]}  onContact={this.onContact} onAction={this.onAction} onClick={this.gotoCommentView}/>); 
    }

    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    { }
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button> 
          </View> 
          <ScrollView ref={(scr)=>{this.scrView = scr;}}style={{height: deviceHeight/15, backgroundColor: 'rgb(255,255,255)'}}> 
                 {content}
          </ScrollView>
          <ActionSheet
                            ref={(o) => this.myActionSheet = o}
                            title="Item Options"
                            options={buttons_own}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleMyActionSheetPress.bind(this)}
                />
          <ActionSheet 
                            ref={(o) => this.otherActionSheet = o}
                            title="Item Options"
                            options={buttons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleActionSheetPress.bind(this)}
                />
                <ActionSheet 
                            ref={(o) => this.contactActionSheet = o}
                            title="Contact Seller"
                            options={buttons_Contact}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleContactActionSheetPress.bind(this)}
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