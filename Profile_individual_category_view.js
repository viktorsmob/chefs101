import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';
import {
  Cell, 
  Section,
  CustomCell,
  TableView,
} from 'react-native-tableview-simple';

import GridView from './GridView'
import Button from 'apsl-react-native-button'
import ProfTabBar from './ProfTabBar'
import TabBar from './TabBar';
import Search_user_view from './Search_user_view'
import Search_hashtag_view from './Search_hashtag_view'
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

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5')  

export default class Profile_individual_category_view extends Component { 
  
  static defaultProps = {
        following: true,
        followers: 2,
        items: 6
    };

  constructor(props)
  {
      super(props);
      this.offset = this.props.route.offset;
      this.categoryArray = this.props.route.categoryArray;
      this.array_categories = this.props.route.array_categories;
      var array = this.categoryArray[this.array_categories[this.offset].id];
      
      if(array == undefined) array = [];
      
      this.array = array;
      
      var imgList =[], priceList = []
      for(var i = 0; i < array.length ; i ++)
      {
          imgList.push(array[i].image_path);
          if(array[i].price!='') 
            priceList.push(array[i].currency + array[i].price)
          else 
            priceList.push('')
      }
      console.log('IMAGELIST');
      console.log(imgList);
      this.state={
        categoryID: this.array_categories[this.offset].id,
        user_id: this.props.route.user_id,
        following: this.array_categories[this.offset].user_follower == 'yes'?true:false,
        followers: this.array_categories[this.offset].followers,
        items: array.length,
        imgList: imgList,
        priceList: priceList,
        caption: this.array_categories[this.offset].name,
        description: this.array_categories[this.offset].description,
        isMine: this.props.route.isMine,
        datas: this.array

      }
      console.log('FollowToggleRouteProp-')
      console.log(this.props.route.followToggle);
  }

    gotoCommentView= (index)=>
    { 
        this.props.navigator.push({index:"commentView",comments: this.state.datas[index].comments, imgID: this.state.datas[index].id})
    }

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
    showActionSheet() {
        this.ActionSheet.show();
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

    onDelete = async ()=>
    {
        await Util.deleteCategory(this.state.user_id, this.state.categoryID)
        if(this.props.route.updateRight!=false) 
            this.props.route.loadProfile(); 
        else
            this.props.route.updateCategories();
        this.props.navigator.pop();
    }

    DeleteCategory = ()=>
    {
        Alert.alert(
            'Warning',
            'If you delete this category all the posts inside the category will be moved to the Miscellaneous Category.',
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'Delete', onPress: this.onDelete}  
            ],
            { cancelable: false }
        )
    }

    EditCategory = ()=>
    {
        this.props.navigator.push({index: 'Profile_category_edit_view', 
        category_id: this.state.categoryID, user_id: this.state.user_id,
        caption: this.state.caption, description: this.state.description})
    }

    _handleCategoryActionSheetPress(index)
    {
      if(index == 1)
      {
        this.DeleteCategory();
      }
      if(index == 2)
      {
          this.EditCategory();
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
    showContactActionSheet() {
        this.contactActionSheet.show();
    }

    onContact = (info)=>{this.showContactActionSheet();}

    showReportActionSheet() {
        this.reportActionSheet.show();
    }

    showCategoryActionSheet() {
        this.categoryActionSheet.show();
    }

  showDetail = (index)=>{ 
    this.props.navigator.push({index: 'Profile_items_detail_view', array: this.array, itemID: index})
  }

  render() { 
    var followImg,followSize = 0;
    if(this.props.route.isMine == false)
    {
        followSize = deviceHeight/25;
    }
    if (this.state.following==true)
    {
        followImg = require('./img/followingbtn.png')
    }   
    else
    {
        followImg = require('./img/followbtn.png')
    }
    var imgList=[require('./img/BG.png'), require('./img/test1.png'), require('./img/person.png'),
                    require('./img/test.png'), require('./img/ProfilePic.png'), require('./img/person.png')]
    var content = [];
    for(var i = 0; i < this.array.length ; i ++)
    {
        content[i] = (<Home_tableview_cell  route={this.props.route} navigator={this.props.navigator} key={i} offset={i} data={this.state.datas[i]}  onContact={this.onContact} onAction={this.onAction} onClick={this.gotoCommentView}/>); 
    } 
          
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    {this.state.caption}
              </Text>
               <Button onPress={() => 
                   {if(this.props.route.updateRight!=false) 
                        this.props.route.loadProfile(); 
                    else
                        this.props.route.updateCategories();
                    this.props.navigator.pop();
                   }} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
              <Button onPress={()=>{
                  if(this.props.route.isMine == true && this.state.categoryID!='1')
                    this.showCategoryActionSheet()
                  else
                    this.showReportActionSheet()}} style={[{backgroundColor: 'transparent', height: windowHeight/20,  borderColor: 'white', borderWidth: 0},{position:'absolute',right:20, top: windowHeight * 2 / 80}]} textStyle={{fontSize: window.height/25, color: 'white'}}>
                     . . .
              </Button>
          </View>       
          <View style={{flex:1, backgroundColor: 'white'}}>
               <Text style={styles.topText}>{this.state.description}</Text>
               <View flexDirection='row' style={styles.middleBar}>
                  <View style={{flex:1,   justifyContent: 'center'}}>
                        <TouchableHighlight style={{left: 10}} underlayColor={'transparent'} activeOpacity={0.5} onPress={()=>
                            {if(this.state.following == true)
                            {
                                this.setState({followers : parseInt(this.state.followers) - 1})
                                this.props.route.followToggle(false, this.offset);
                            }
                            else
                            {
                                 this.setState({followers : parseInt(this.state.followers) + 1})
                                 this.props.route.followToggle(true, this.offset);
                            }
                            this.setState({following: !this.state.following});}
                          }>
                        <Image style={{width:deviceWidth/5, height: followSize, resizeMode: 'stretch'}} source={followImg} />
                        </TouchableHighlight> 
                  </View>
                  <View style={{flex:1,   justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}> 
                        <Text style={styles.middleText}>{this.state.followers}</Text>  
                        <Text style={styles.middleText}>Followers</Text>
                  </View>
                  <View style={{flex:1,  justifyContent: 'center',alignItems: 'center'}}>
                      <Text style={styles.middleText}>{this.state.items}</Text>
                      <Text style={styles.middleText}>Items</Text>
                  </View>
               </View>
               <View style={{flex:1}}>
               <ProfTabBar
                  tabType='CategoryDetail'
                  style={styles.content}
                  onItemSelected={(index) => {console.log(`current item's index is ${index}`);}}
                >
                    <TabBar.Item>
                        <GridView showDetail={this.showDetail} rowCount={4} priceList={this.state.priceList} aryImg={this.state.imgList}>
                        </GridView>
                    </TabBar.Item>

                    <TabBar.Item>
                         <ScrollView ref={(scr)=>{this.scrView = scr;}}style={{height: deviceHeight/15, backgroundColor: 'rgb(255,255,255)'}}>
                             {content}
                         </ScrollView>
                    </TabBar.Item>

                </ProfTabBar>
                </View>
                
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

                <ActionSheet 
                            ref={(o) => this.reportActionSheet = o}
                            title=""
                            options={['Cancel', 'Report Category']}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleReportActionSheetPress.bind(this)}
                />    
                
                <ActionSheet 
                            ref={(o) => this.categoryActionSheet = o}
                            title=""
                            options={['Cancel', 'Delete Category','Edit Category']}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleCategoryActionSheetPress.bind(this)}
                />    
          </View>
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
  {
    height:window.height/15,
    color: 'black',
    left: 10,
    fontSize: windowHeight/40, 
    
  },
  middleBar:
  {
    width: deviceWidth,  
    height: deviceHeight/10, 
  },
  middleText:
  {
    fontSize: deviceHeight/30, color: 'black'
  }
});   