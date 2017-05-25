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
import { StackNavigator } from 'react-navigation'; 
import ProfileTabView from './ProfileTabView'
import { Avatar } from 'react-native-material-design'; 

var config = {
      api_host: "http://178.62.125.207/api/"
}
const SIGNSALTAPIKEY = 'tattoogram'
var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5') 

const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
     
import ActionSheet from 'react-native-actionsheet';

var buttons = ['Cancel', 'Block User', 'Report Inappropriate', 'Copy Profile URL'];
var _buttons = ['Cancel', 'Unblock User', 'Report Inappropriate', 'Copy Profile URL'];

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

export default class ProfileViewContent extends Component {
    
    static defaultProps = {
        myProfile: true,
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
    };

    constructor(props) {
        super(props); 
        this.newsArray = [];
        this.promotionArray = [];
        this.categoryArray = [];
        this.array_categories = [];
        this.newsOffset = 0;
        this.promotionOffset = 0;
        this.reviewArray = [];
        this.totalRating = 0;
        this.total_amount = 0;
        
        this.isMine = false;
        this.state = {  
            showActionSheet: false,
            blockUser: true,
            user: {},
            _unreadMsgs: 0,
            user_id: this.props.route.user_id == null? -1 : this.props.route.user_id
        };
        this.loadProfile();
    }

    _handleActionSheetPress(index) {
        switch(index)
        {
            case 1:
                this.onBlockUser();
                break;
            case 2:
                this.onReport();
                break;
            case 3:
                this.onCopyURL();
                break;
        }
    }
 
    showActionSheet() {
        this.ActionSheet.show();
    }
    onRequest=()=>
    {
        var usr = Object.assign({}, this.state.user)
        if(usr.user_friend == 'request sent')
            usr.user_friend = 'request not sent'
        else
            usr.user_friend = 'request sent'
        this.setState({user: usr});
    }
    openChat = ()=>{
        this.props.navigator.push({index: 'Profile_chat_view', chatName: 'DAVID_LOPEZ'})
    }
    onBlockUser = () => {
        this.setState({blockUser: !this.state.blockUser}) 
    }
    onOpen = () => {
        this.showActionSheet();
    }
    onReport = ()=> {  Alert.alert("Report");}
    onCopyURL = ()=>{  Alert.alert("COPY URL")}
 
    async get_categories_list(user_id)
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset; 
        
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
        
        var uid = user_id;
        if(user_id == -1)
            uid = _userID;   
        var postString =Util.makeRequest('salt',salt,'sign',sig,'uid',uid,'login_id',_userID);
        var requestStr = config.api_host + 'get_category_followers.php?' + postString;
        console.log('GetCategoriesList Request');
        console.log(requestStr);                    
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('GetCategoriesList Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].categoryId  = Util.decodeURI(aryData[i].id);
                aryData[i].categoryName = Util.decodeURI(aryData[i].name);
                aryData[i].categoryDescs = Util.decodeURI(aryData[i].description);
                aryData[i].categoryFollowers = Util.decodeURI(aryData[i].followers);
                aryData[i].categoryUserFollower = Util.decodeURI(aryData[i].user_follower);
            }
            this.array_categories = aryData;   
        }
    }
    async get_reviews(user_id)
    { 
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset; 
        
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
        
        var uid = user_id;
        if(user_id == -1)
            uid = _userID;
        
        var postString =Util.makeRequest('salt',salt,'sign',sig,'uid',uid);
        var requestStr = config.api_host + 'get_reviews.php?' + postString;
        console.log('ReviewList Request');
        console.log(requestStr);                    
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('ReviewList Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].image = Util.decodeURI(aryData[i].image);
                aryData[i].descs = Util.decodeURI(aryData[i].descs);
                aryData[i].datecreated = Util.decodeURI(aryData[i].datecreated);
                aryData[i].name = Util.decodeURI(aryData[i].name);
                aryData[i].username = Util.decodeURI(aryData[i].username);
            }
            this.reviewArray = aryData;   
            this.totalRating = responseJson.total_rating;
            this.total_amount = responseJson.total_amount;
        }
    }

    async get_promotion_list(user_id)
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset; 
        
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
        
        var uid = user_id;
        if(user_id == -1)
            uid = _userID;
        
        var postString =Util.makeRequest('salt',salt,'sign',sig,'uid',uid,'flag',1,'off', this.promotionOffset, 'login_id', _userID);
        var requestStr = config.api_host + 'get_promotion_images.php?' + postString;
        console.log('PromotionList Request');
        console.log(requestStr);                    
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('PromotionList Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
        var aryData = Object.assign([],responseJson.data);
        for(i = 0; i < responseJson.data.length; i ++)
        {
            aryData[i].uimage = Util.decodeURI(aryData[i].uimage);
            aryData[i].image_path = Util.decodeURI(aryData[i].image_path);
             
            aryData[i].email = Util.decodeURI(aryData[i].email);
            aryData[i].description = Util.decodeURI(aryData[i].description);
            aryData[i].datecreated = Util.decodeURI(aryData[i].datecreated);
            aryData[i].daysago = Util.decodeURI(aryData[i].daysago);
            aryData[i].currency = Util.decodeURI(aryData[i].currency);
            for(j = 0; j < aryData[i].comments.length; j++)
            {
            aryData[i].comments[j].user_image = Util.decodeURI(aryData[i].comments[j].user_image);
            aryData[i].comments[j].image = Util.decodeURI(aryData[i].comments[j].image);
            aryData[i].comments[j].comment_desc = Util.decodeURI(aryData[i].comments[j].comment_desc);
            aryData[i].comments[j].datecreated = Util.decodeURI(aryData[i].comments[j].datecreated);
            aryData[i].comments[j].uid = Util.decodeURI(aryData[i].comments[j].uid);
            }
            for(j = 0; j < aryData[i].liked_by.length; j++)
            {
            aryData[i].liked_by[j].name = Util.decodeURI(aryData[i].liked_by[j].name);
            aryData[i].liked_by[j].email = Util.decodeURI(aryData[i].liked_by[j].email);
            aryData[i].liked_by[j].user_image = Util.decodeURI(aryData[i].liked_by[j].user_image);
            }
        }
            this.promotionArray = aryData;  
            this.promotionOffset = responseJson.offset.toString();
        } 
    }
    async  getMyNewsFeed(startInd)
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset;
        if(startInd == 0)
        {
            this.newsArray = []
        }

        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }

        var postString =Util.makeRequest('salt',salt,'sign',sig,'profile_handle',_userID,'off',this.newsOffset);
        var requestStr = config.api_host + 'get_user_images.php?' + postString;

        console.log('MyProfileNewsFeed Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('MyProfileNewsFeed Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].uimage = Util.decodeURI(aryData[i].uimage);
                aryData[i].image_path = Util.decodeURI(aryData[i].image_path);
                aryData[i].currency = Util.decodeURI(aryData[i].currency);
                aryData[i].email = Util.decodeURI(aryData[i].email);
                aryData[i].description = Util.decodeURI(aryData[i].description);
                aryData[i].datecreated = Util.decodeURI(aryData[i].datecreated);
                aryData[i].daysago = Util.decodeURI(aryData[i].daysago);
                aryData[i].currency = Util.decodeURI(aryData[i].currency);
                aryData[i].postkey = Util.decodeURI(aryData[i].postkey); 
                for(j = 0; j < aryData[i].comments.length; j++)
                {
                aryData[i].comments[j].user_image = Util.decodeURI(aryData[i].comments[j].user_image);
                aryData[i].comments[j].image = Util.decodeURI(aryData[i].comments[j].image);
                aryData[i].comments[j].comment_desc = Util.decodeURI(aryData[i].comments[j].comment_desc);
                aryData[i].comments[j].datecreated = Util.decodeURI(aryData[i].comments[j].datecreated);
                aryData[i].comments[j].uid = Util.decodeURI(aryData[i].comments[j].uid);
                }
                for(j = 0; j < aryData[i].liked_by.length; j++)
                {
                aryData[i].liked_by[j].name = Util.decodeURI(aryData[i].liked_by[j].name);
                aryData[i].liked_by[j].email = Util.decodeURI(aryData[i].liked_by[j].email);
                aryData[i].liked_by[j].user_image = Util.decodeURI(aryData[i].liked_by[j].user_image);
                }
                
                var catID =  aryData[i].category_id
                if( this.categoryArray[catID] == null)
                    this.categoryArray[catID] = [];
                this.categoryArray[catID].push(aryData[i])
            }
        
            if(this.newsArray.length != 0)
            {
                this.newsArray = this.array.concat(aryData);
            }
            else
            {
                this.newsArray = aryData;
            } 
            this.newsOffset = responseJson.off.toString();
        } 
        console.log('Category_Array');
        console.log(this.categoryArray);
    }
    async  getOtherNewsFeed(otherID)
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset;

        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }

        var postString =Util.makeRequest('salt',salt,'sign',sig,'profile_handle',otherID,'login_id',_userID);
        var requestStr = config.api_host + 'get_user_images.php?' + postString;
        console.log('OtherProfileNewsFeed Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('OtherProfileNewsFeed Response');
        console.log(responseJson);
        var i = 0, j=0;
        if(responseJson.success=='1')
        {
        var array = Object.assign([],responseJson.data);
        this.categoryArray = [];
        this.array_feeds = [];  
        for(i = 0; i < responseJson.data.length; i ++)
        {
            var postkey1 = Util.decodeURI(array[i].postkey);
            var breakflg = false;   
            if(postkey1 != '-1')
            {
                for(var j =0; j < this.array_feeds.length; j++)
                {
                    var tmpshareObj = this.array_feeds[j];
                    var strTmp = tmpshareObj.postkey;
                    var tmpObj ={};
                    if(strTmp == postkey1)
                    {
                        tmpObj.image_path = Util.decodeURI(array[i].image_path);
                        tmpObj.id = Util.decodeURI(array[i].id);
                        tmpshareObj.array_postimages.push(tmpObj);
                        breakflg = true;
                        break;
                    }
                }
                if(breakflg == true) continue;
            }

            array[i].uimage = Util.decodeURI(array[i].uimage);
            array[i].image_path = Util.decodeURI(array[i].image_path);
            array[i].currency = Util.decodeURI(array[i].currency);
            array[i].email = Util.decodeURI(array[i].email);
            array[i].description = Util.decodeURI(array[i].description);
            array[i].datecreated = Util.decodeURI(array[i].datecreated);
            array[i].daysago = Util.decodeURI(array[i].daysago);
            array[i].currency = Util.decodeURI(array[i].currency);
            array[i].postkey = Util.decodeURI(array[i].postkey);
            array[i].array_postimages =[];
            for(j = 0; j < array[i].comments.length; j++)
            {
            array[i].comments[j].user_image = Util.decodeURI(array[i].comments[j].user_image);
            array[i].comments[j].image = Util.decodeURI(array[i].comments[j].image);
            array[i].comments[j].comment_desc = Util.decodeURI(array[i].comments[j].comment_desc);
            array[i].comments[j].datecreated = Util.decodeURI(array[i].comments[j].datecreated);
            array[i].comments[j].uid = Util.decodeURI(array[i].comments[j].uid);
            }
            for(j = 0; j < array[i].liked_by.length; j++)
            {
            array[i].liked_by[j].name = Util.decodeURI(array[i].liked_by[j].name);
            array[i].liked_by[j].email = Util.decodeURI(array[i].liked_by[j].email);
            array[i].liked_by[j].user_image = Util.decodeURI(array[i].liked_by[j].user_image);
            } 
            this.array_feeds.push(array[i]);
        
            var catID =  array[i].category_id
            if( this.categoryArray[catID] == null)
                this.categoryArray[catID] = [];
            this.categoryArray[catID].push(array[i])
        }
            this.newsArray = array;  
            
            for (var i = 0; i < this.array_feeds.length; i++)
            {
                var tmpshareObj = this.array_feeds[i];
                var nCnt = tmpshareObj.array_postimages.length;
                var tmpPostImg = [];
                if (nCnt > 0)
                {
                    var tmpObj = {}
                    tmpObj.image_path = tmpshareObj.image_path;
                    tmpObj.id = tmpshareObj.id;
                    
                    tmpPostImg.unshift(tmpObj);
                    
                    for (var j = 0; j < nCnt; ++j)
                    {
                        var tmpSubObj = tmpshareObj.array_postimages[j];
                        var tmpObj1 = {};
                        tmpObj1.image_path = tmpSubObj.image_path;
                        tmpObj1.id = tmpSubObj.id;
                        tmpPostImg.unshift(tmpObj1); 
                    }
                    
                    tmpshareObj.array_postimages = [];
                    for (var k = 0; k < nCnt + 1; k++)
                    {
                        var tmpSubObj1 = tmpPostImg[k];
                        if (k == 0)
                        {
                            tmpshareObj.image_path = tmpSubObj1.image_path;
                            tmpshareObj.id = tmpSubObj1.id;
                        }else
                        {
                            var tmpObj2 = {}
                            tmpObj2.image_path = tmpSubObj1.image_path;
                            tmpObj2.id = tmpSubObj1.id;
                            tmpshareObj.array_postimages.push(tmpObj2);
                        }
                    }
                    this.array_feeds[i] = tmpshareObj;
                }
            }
            
        } 
        console.log('CategoryList');
        console.log(this.categoryArray);
    }
    _asyncFollowToggle = async function(bFollow, offset)
    {
        await Util.followToggle(this.props.route.user_id,this.array_categories[offset].id,bFollow);   
        this.loadProfile();   
    }
    
    followToggle=(bFollow, offset)=>
    {
         this._asyncFollowToggle(bFollow, offset);
    }

    async loadProfile()
    {
        var _userID, _offset; 
        console.log('LOAD_PROFILE_CALLED');
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
    
        this.newsArray = [];
        this.promotionArray = [];
        this.categoryArray = [];
        this.array_categories = [];
        this.user_id = this.props.route.user_id
        console.log(this.props.route.user_id);
        
        if(this.props.route.user_id==null || _userID == this.props.route.user_id)
        {
            
            this.isMine = true;
        }
        
        if(this.isMine == true)
        {
            await this.get_categories_list(-1);
            await this.getMyNewsFeed(0);
            await this.get_promotion_list(-1);
            await this.get_reviews(-1);
            let _unreadCount = await Util.get_own_unreadchat_info();
            let _usrInfo = await Util.get_user_info();
            this.setState({_unreadMsgs:_unreadCount, user: _usrInfo});
            
        }
        else
        {
        
            await this.get_categories_list(this.props.route.user_id);
            await this.getOtherNewsFeed(this.props.route.user_id);
            await this.get_promotion_list(this.props.route.user_id);
            await this.get_reviews(this.props.route.user_id);
            let _unreadCount = await Util.get_unreadchat_info(this.props.route.user_id);
            let _usrInfo = await Util.get_user_profile(this.props.route.user_id);
            this.setState({_unreadMsgs:_unreadCount, user: _usrInfo});
        }  
    }
    gotoFollowingsView()
    {
        if(this.isMine==true)
            this.props.navigator.push({index:'Profile_followings_view', loadProfile: this.loadProfile.bind(this),profile_handle: -1});
        else
            this.props.navigator.push({index:'Profile_followings_view',loadProfile: this.loadProfile.bind(this), profile_handle: this.props.route.user_id});
    }
    gotoFollowersView()
    {
        if(this.isMine==true)
            this.props.navigator.push({index:'Profile_followers_view',loadProfile: this.loadProfile.bind(this), profile_handle: -1});
        else
            this.props.navigator.push({index:'Profile_followers_view', loadProfile: this.loadProfile.bind(this),profile_handle: this.props.route.user_id});
    }
    
    gotoCategoriesView()
    { 
        if(this.isMine==true)
            this.props.navigator.push({index:'Profile_categories_view',categoryArray: this.categoryArray, array_categories:this.array_categories,shouldUpdate:true, loadProfile: this.loadProfile.bind(this),isMine: this.isMine, user_id: -1});
        else
            this.props.navigator.push({index:'Profile_categories_view',categoryArray: this.categoryArray, array_categories:this.array_categories,shouldUpdate:true, loadProfile: this.loadProfile.bind(this),isMine: this.isMine, user_id: this.props.route.user_id});
    }
    
    render() {
        var leftBtn, rightBtn,dataSource, reqImg;
        dataSource = {promotionArray: this.promotionArray,
                      categoryArray: this.categoryArray,
                      reviewArray: this.reviewArray,
                      array_categories: this.array_categories,
                      total_rating: this.totalRating,
                      total_amount: this.total_amount
                    }
                    
        var privateWidth = windowWidth/16;
        
        if(this.state.user.is_private == '0')
        {
            privateWidth = 0;
        }
        else
        {
           if(this.state.user.user_friend=='request sent')
            reqImg = require('./img/RequestSentBtn.png')
           if(this.state.user.user_friend=='request not sent')
            reqImg = require('./img/RequestBtn.png')
        }
        if(this.props.myProfile == true)
        {
            leftBtn = (<TouchableHighlight style={{position: 'absolute',  left:windowWidth*1/32, top:(windowHeight-40)*1/72, width: (windowHeight-40)*3/72, height: (windowHeight-40)*3/72, margin:10}}  underlayColor={'transparent'} activeOpacity={0.5} onPress={() => {this.props.navigator.push({index: "Profile_request_view"});}}>
                           <Image style={{width: (windowHeight-40)*3/72, height:(windowHeight-40)*3/72,  resizeMode: 'stretch' }} source={require("./img/friendsicon.png")}/>
                      </TouchableHighlight>);

            rightBtn = (<TouchableHighlight style={{position: 'absolute', right:windowWidth/32, top:(windowHeight-40)*1/72, width: (windowHeight-40)*3/72, height: (windowHeight-40)*3/72, margin:10}} underlayColor={'transparent'} activeOpacity={0.5} onPress={() => {this.props.navigator.push({index: "Profile_setting_view"}); console.log('Setting')}}>
                           <Image style={{width: (windowHeight-40)*3/72, height:(windowHeight-40)*3/72,  resizeMode: 'stretch' }} source={require("./img/setting_btn.png")}/>
                        </TouchableHighlight>);
        }
        else
        {
            leftBtn = (<TouchableHighlight style={{position: 'absolute', left:windowWidth/32, top:(windowHeight-40)*1/72,width: (windowHeight-40)*3/72, height: (windowHeight-40)*3/72, margin:10}}underlayColor={'transparent'} activeOpacity={0.5} onPress={() => this.props.navigator.pop()}>
                           <Image style={{width: (windowHeight-40)*3/72, height:(windowHeight-40)*3/72,  resizeMode: 'stretch' }} source={require("./img/backbtn.png")}/>
                      </TouchableHighlight>);

            rightBtn = (<TouchableHighlight style={{position: 'absolute', right:windowWidth/32, top:(windowHeight-40)*1/72,width: (windowHeight-40)*3/72, height: (windowHeight-40)*3/72, margin:10}}underlayColor={'transparent'} activeOpacity={0.5} onPress={this.onOpen}>
                            <Image style={{width: (windowHeight-40)*3/72, height:(windowHeight-40)*3/72,  resizeMode: 'stretch' }} source={require("./img/more.png")}/>
                        </TouchableHighlight>); 
        }
        return (
                <View style={[styles.container,this.props.style]}>
                   <View style={[styles.topArea]}>
                        <Image  style={[styles.topImg]} source={{uri: this.state.user.image}}>
                            <Image  style={[styles.topImg, {flexDirection: 'column'}]} source={require('./img/profile-ol.png')}>
                                <View style={{flex:4, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
                                    {leftBtn}
                                    {rightBtn}
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: ((windowHeight-40))/36, position: 'absolute', left:windowWidth/16, top:(windowHeight-40)*4/72}} onPress={()=>this.gotoFollowersView()}>{this.state.user.total_followers}</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', left:windowWidth/16, top:(windowHeight-40)*6/72}} onPress={()=>this.gotoFollowersView()}>Followers</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', left:windowWidth/16, top:(windowHeight-40)*13/72}}>{this.state.user.total_images}</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', left:windowWidth/16, top:(windowHeight-40)*15/72}}>Items</Text>
                                    <Avatar size={((Dimensions.get('window').height-40)/7)} borderRadius={Dimensions.get('window').height/14} image={<Image source={{uri: this.state.user.image}}/>} />
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: ((windowHeight-40))/36, position: 'absolute', right:windowWidth/16, top:(windowHeight-40)*4/72}} onPress={()=>this.gotoFollowingsView()}>{this.state.user.total_following}</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', right:windowWidth/16, top:(windowHeight-40)*6/72}} onPress={()=>this.gotoFollowingsView()}>Following</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', right:windowWidth/16, top:(windowHeight-40)*13/72}} onPress={()=>this.gotoCategoriesView()}>{this.state.user.total_categories}</Text>
                                    <Text style={{textAlign: 'center', backgroundColor: 'transparent', width:windowWidth/4,color: 'white', fontSize: (windowHeight-40)/36, position: 'absolute', right:windowWidth/16, top:(windowHeight-40)*15/72}} onPress={()=>this.gotoCategoriesView()}>Categories</Text>
                                    <TouchableHighlight style={{position: 'absolute', left: privateWidth, top:(windowHeight-40)*9.5/72}}underlayColor={'transparent'} activeOpacity={0.5} onPress={() =>
                                         this.onRequest()}> 
                                      <Image style={{height: (windowHeight-40)*3/72}} resizeMode={Image.resizeMode.contain} source={reqImg}/>
                                    </TouchableHighlight>    
                                    <TouchableHighlight style={{position: 'absolute', right:windowWidth/16, top:(windowHeight-40)*9.5/72}}underlayColor={'transparent'} activeOpacity={0.5} onPress={() => 
                                         this.openChat()}> 
                                      <Image style={{height: (windowHeight-40)*3/72}} resizeMode={Image.resizeMode.contain} source={require('./img/ChatBtn.png')}/>
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{marginBottom: 10, textAlign: 'center', backgroundColor: 'transparent', color: 'white', fontSize: (windowHeight-40)/18}}>{ this.state.user.username }</Text>
                                </View>
                             </Image>
                        </Image>
                    </View>
                        
                    <View style={styles.tabViewArea}>
                        <ProfileTabView ref={(input) => { this.pTab = input; }}  username= {this.state.user.username} user_id = {this.state.user_id} loadProfile={this.loadProfile.bind(this)} isMine={this.isMine} followToggle={this.followToggle.bind(this)} reloadFunc = {this.loadProfile.bind(this)} datasource = {dataSource} navigator={this.props.navigator} route={this.props.route}/> 
                        
                        <ActionSheet 
                            ref={(o) => this.ActionSheet = o}
                            title=""
                            options={this.state.blockUser?buttons:_buttons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleActionSheetPress.bind(this)}
                        />
                    </View>       
                </View>
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
