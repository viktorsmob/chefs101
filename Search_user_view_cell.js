'use strict'

import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableHighlight,  
    TouchableOpacity, 
    Alert
} from 'react-native';
import React, {Component} from 'react'
import Button from 'apsl-react-native-button'
import { StackNavigator } from 'react-navigation';
import Home_comments_list_viewcontroller from './Home_comments_list_viewcontroller'
import { Avatar } from 'react-native-material-design';
import GridView from './GridView'
import MyAvatar from './Lib/myAvatar'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5')  
const onContact = () => {
  Alert.alert('Contact');
};

export default class Search_user_view_cell extends Component {           
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        like: false,
        
        numViewMore: 5,
        following: false
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
        style: View.propTypes.style,
        img: React.PropTypes.number, 
    };

    constructor(props) {
        super(props);
        this.visibles = [];

        this.state = {
            selectedIndex: 0,
            img: props.img,
            like: props.like,
            data: props.data,
            following: props.following,
            showCategory: false
        }
        this.loadUserID();
        this.array_categories = [];   
        this.categoryArray = [];
    }

    async loadUserID()
    {
        var _userID, _offset; 
        
        try {
        _userID = await MyStorage.get('user_id');
        this.setState({userID: _userID})
        } catch (error) {
        Alert.alert(error.toString());
        }
        
    }

    collapse()
    {
        this.setState({showCategory: false});
    }
    async followUser(bFollow)
    {
                try {   
            var salt = Math.floor((Math.random() * 10000));
            var tempStr = Util.SIGNSALTAPIKEY + salt;
            var sig = MD5.hex_md5(tempStr); 
                    
            var _userID, userInfo;
            try {
                _userID= await MyStorage.get('user_id');
            } catch (error) {
                Alert.alert(error);
            }
            
            var requestString = Util.makeRequest('salt', salt, 'sign',sig,'uid',_userID,'following_id',this.state.data.id);
            var strRequst = Util.config.api_host + (bFollow==true?'post_user_following.php?':'post_user_unfollow.php?') + requestString;
            console.log('Follow/Unfollow Request');
            console.log(strRequst);
            let response = await fetch(strRequst); 
            let responseJson = await response.json();
            console.log('Follow/Unfollow Response');
            console.log(responseJson);
            if(responseJson.success == '1')
                {
                    this.array_categories = await Util.get_categories_list(this.state.data.id);
                    this.categoryArray = await Util.get_following_news_feeds(this.state.data.id);
                    this.setState({array_categories: this.array_categories, categoryArray: this.categoryArray});
                    return true;
                }
            else
                {
                    return false;
                }
            }
            catch(error) {
            console.error(error);
            }
    } 
    onAvatarClick(bFollow, offset)
    {
        //previous bFollow Value, offset: index of category
        Util.followToggle(this.state.data.id,this.state.array_categories[offset].id,bFollow);   
        
    }
    
    onRightClick()
    {
        //this.props.onRightClick(this.props.offset,true);
        var _dat = Object.assign({},this.state.data);
        if(this.state.data.is_private == '0')
        {
            if(this.state.data.user_following=='no')
            {
               this.followUser(true);
               this.setState({showCategory: true, data: Object.assign(_dat, {user_following: 'yes'})});
                
            }
            if(this.state.data.user_following=='yes')
            {
                this.followUser(false);
                this.setState({ showCategory: true,data: Object.assign(_dat, {user_following: 'no'})});
                 
            }
        }
        else
        {
            if(this.state.data.user_friend == 'request not sent')
            {
                Util.sendRequest(this.state.data.id)
                this.setState({data: Object.assign(_dat, {user_friend: 'request sent'})});
                 
            }
            if(this.state.data.user_friend == 'request sent')
            {
                Util.cancelRequest(this.state.data.id)
                this.setState({data: Object.assign(_dat, {user_friend: 'request not sent'})});  
            }
        } 
    }
    
    render() {
        var followImg, verifyWidth = 20,rightImg;
        if(this.state.data.verify == '0')
                verifyWidth = 0;
        if(this.state.data.is_private == '0')
        {
            if(this.state.data.user_following=='no')
                rightImg = require('./img/followbtn.png')
            else
                rightImg = require('./img/followingbtn.png')
        }
        else
        {
            if(this.state.data.user_friend == 'request not sent')
                rightImg = require('./img/RequestBtn.png')
            else
                rightImg = require('./img/RequestSentBtn.png')
        }

        if(this.state.data.id == this.state.userID) rightImg=undefined;

        var cells =[], avatarCells = [];
        var i = 0;
         
        if(this.state.showCategory == true)
        {
            if(this.state.array_categories != undefined)
            {
                for(i = 0; i < this.state.array_categories.length; i ++)
                {  
                    var _cate = this.state.array_categories[i];
                    console.log('_cate');
                    console.log(_cate);
                    var _bFollow = _cate.user_follower == 'yes' ? true: false;
                    if(this.state.categoryArray==undefined || this.state.categoryArray[_cate.id] == undefined)
                        avatarCells[i] = (<MyAvatar key={i} offset={i} onPress={this.onAvatarClick.bind(this)} 
                        size={Dimensions.get('window').width/4.5}  bFollow={_bFollow}  /> 
                            );
                    else
                        avatarCells[i] = (<MyAvatar key={i} offset={i} onPress={this.onAvatarClick.bind(this)} 
                        size={Dimensions.get('window').width/4.5}   bFollow={_bFollow} 
                        caption={_cate.name} img={{uri: this.state.categoryArray[_cate.id][0].image_path}}/>
                            );
                }
            }
        }

        var scrollHeight = 0;
        /*if(this.categories.children.length != 0)*/
            scrollHeight = Dimensions.get('window').width/4.5 + 30
        
        return (
            <View style={[styles.container,this.props.style]}>
                <TouchableHighlight onPress={() => this.props.navigator.push({index: 'Profile_other', user_id: this.state.data.id})}  underlayColor={'transparent'}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={{marginLeft: 15}} underlayColor={'transparent'} activeOpacity={0.5}>
                            <Avatar size={40} borderRadius={20} image={<Image source={{uri: this.state.data.image}}/>}/>
                        </TouchableOpacity>
                        <View style={styles.topTextArea} onPress={() => Alert.alert("S")}>
                            <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                                 <Text style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'blue'}}>
                                        {this.state.data.username}
                                </Text>
                                <Image source={require('./img/verifiedUser.png')} style={{marginLeft:10, width:verifyWidth, height: verifyWidth}} resizeMode={Image.resizeMode.contain}/>
                            </View>
                            <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                                <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'blue'}}>
                                        {this.state.data.name}
                                </Text>
                            </View>
                        </View> 
                        <TouchableHighlight onPress={() => this.onRightClick()} style={{position: 'absolute', right: 10,top: 10}} underlayColor={'transparent'} activeOpacity={0.5} >
                            <Image source={rightImg}/>
                        </TouchableHighlight>  
                    </View>
                </TouchableHighlight>
                {this.state.showCategory == true &&
                (<ScrollView  style={{width: Dimensions.get('window').width, height: scrollHeight, backgroundColor: 'rgb(209,180,182)'}} horizontal={true}>
                    {avatarCells}
                </ScrollView>)}
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
    topBar:
    {
        borderTopWidth: 1,
        borderTopColor: 'rgb(233,237,238)',
        width: Dimensions.get('window').width,                    
        backgroundColor: 'rgb(255,255,255)',
        borderBottomColor: 'rgb(233,237,238)',
        borderBottomWidth: 1 ,
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    },
    topImage: {
        
        marginLeft: 20,
        resizeMode: 'contain'
    },
    topTextArea:
    {
        marginLeft: 20,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topGap:
    {
        flex: 6,
    },
    topContactButton:
    {
        flex: 4,
        alignSelf: 'center',
        margin:10,
        marginRight: 20,
        backgroundColor: 'rgb(178,61,76)'
    },
    topText: {
        alignSelf: 'center',
        fontSize: 41,
        color: '#ffffff',
    },
    mainImage: {
        width: Dimensions.get('window').width,
        height: windowWidth,
        flex: 1,
        resizeMode: 'stretch'
    },
    middleBar_1:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 25,
    },
    middleBar_2:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 50,
    },
    bottomBar:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    }
});