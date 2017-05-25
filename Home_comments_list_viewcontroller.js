'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    ListView,
    TextInput,
    Alert,
    InteractionManager,
    ScrollView
} from 'react-native';
import React, {Component} from 'react'
import Home_comments_list_cell from './Home_comments_list_cell'

import Button from 'apsl-react-native-button'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');

var _chatText, aryData;
var _userID, newAry;

function addZero(val)
{
    if(val<10) 
        return '0' + val.toString();
    else
        return val.toString();
}

export default class Home_comments_list_viewcontroller extends Component { 
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',   
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        defaultPage: React.PropTypes.number,
        navFontSize: React.PropTypes.number,
        navTextColor: React.PropTypes.string,
        navTextColorSelected: React.PropTypes.string,
        onItemSelected: React.PropTypes.func,
    };
    async getUserID()
    {
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        } 
    }
    constructor(props) {
        super(props);
        this.visibles = [];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        this.state = {
            selectedIndex: 0,
            image_id: props.route.imgID, 
            comments: props.route.comments,
            dataSource: ds.cloneWithRows([]),
            chatText: ''
        }
        console.log('Comments When Constructor');
        console.log(props.route.comments);
        this.gotoProfileView = this.gotoProfileView.bind(this);
        this.onSwipeBtn = this.onSwipeBtn.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.getUserID();
    }

    onSwipeBtn(type='reply', offset)
    {
        console.log('Offset of Data Swiped in commentItem');
        console.log(offset);
        var comment_item = this.state.comments[offset];
        switch(type)
        {
            case 'reply':
                this.setState({chatText: comment_item.username}); 
                this.textInput.focus(); 
                break;
            case 'delete':
                    
                if (comment_item.uid != _userID) 
                {
                    Alert.alert('Sorry!',"You can only delete your own comments.");
                    return;
                }
                Util.deleteComment(comment_item);
                aryData = this.state.comments.slice(); 
                aryData.splice(offset, 1);
                console.log('ARY_DATA');
                console.log(aryData);
                newAry = aryData.slice();
                //this.setState({comments: newAry, dataSource: ds.cloneWithRows(newAry)});       
                this.setState({comments: aryData});       
                break;
            case 'abusive':
                Alert.alert('Abusive',
                    Util.abusiveText,
                    [{text: 'OK', onPress: () => console.log('OK')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}],
                    { cancelable: false }
                )
                break;
            case 'spam':
                Alert.alert('Abusive', 
                    Util.spamText, 
                    [{text: 'OK', onPress: () => console.log('OK')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}],
                    { cancelable: false }
                )
                break;           
        } 
    }

    gotoProfileView(info)
    {
        this.props.navigator.push({index:"profileView", key: info}) 
    }
 
    async get_comments_list()
    {
        var salt =  Math.floor((Math.random() * 10000));
        var tempStr = Util.SIGNSALTAPIKEY + salt;
        var sig = Util.MD5.hex_md5(tempStr);
        var _userID, _offset;
        var postString =Util.makeRequest('salt',salt,'sign',sig,'id',this.state.image_id);

        var requestStr = Util.config.api_host + 'get_comments.php?' + postString;
        console.log('GetCommentList Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('GetCommentList Response');
        console.log(responseJson);
        var i = 0, j=0, recentComment;
        if(responseJson.success=='1')
        {
          aryData = this.state.comments; 
          recentComment = responseJson.data[0];
          recentComment.image = Util.decodeURI(recentComment.image);
          recentComment.comment_desc = Util.decodeURI(recentComment.comment_desc);
          recentComment.datecreated = Util.decodeURI(recentComment.datecreated); 
          aryData.push(recentComment);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
          console.log('ARY_DATA');
          console.log(aryData);
          //await this.setState({comments: aryData, dataSource: ds.cloneWithRows(aryData)});       
          await this.setState({comments: aryData});       
        }
        else
        {
            Alert.alert('Failed to get comments');
        } 
    }

    componentDidMount()
    {
        console.log('CommentsArray');
        console.log(this.state.comments); 
       
    }
    
    async onSend()
    {
        try{
            if(await Util.post_comments(this.state.image_id, this.state.chatText) == true)
            {
                this.get_comments_list(); 
                console.log('Post succeeded') 
            }
            else
            {
                Alert.alert('Post Failed');
            }
        }
        catch (err) {
            Alert.alert('fetch failed' + err);
        }
    }
    render() {
        var i = 0 ; 
        var content = [];
        for(i = 0; i < this.state.comments.length; i ++)
        {
            content[i]=(<Home_comments_list_cell key={i} offset={i} navigator={this.props.navigator} route={this.props.route} onSwipeBtn={this.onSwipeBtn} data={this.state.comments[i]}/>);
        }
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={styles.topBar}>
                    <Text style={styles.topText}>
                        COMMENTS
                    </Text>
                    <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                        ←
                    </Button>
                </View>
                <View style={{height:Dimensions.get('window').height - 120 - 80, backgroundColor: 'white'}}>
                    {/*<ListView
                        dataSource={this.ds.cloneWithRows(this.state.comments)}
                        renderRow={this._renderRow}
                        enableEmptySections = {true}
                    />*/}
                    <ScrollView style={{width: windowWidth, height: windowHeight/8, backgroundColor: 'rgb(255,255,255)'}}>
                        {content}
                    </ScrollView>
                    <View style={{width: window.width, flex:1, backgroundColor :'white'}}/>
                </View>
                <View style={styles.chatBox}>
                    <Image style ={{left:0, flex:1,height: 30,backgroundColor: 'white'}} source={require('./img/caption-cell.png')} resizeMode={Image.resizeMode.contain}/>
                    <TextInput value={this.state.chatText} ref={(input) => { this.textInput = input; }} style={[{paddingBottom: 0, paddingLeft: 5, height:30, flex: 8, backgroundColor: 'white',borderWidth: 0, fontSize: 20}]}   onChangeText={(txt) => this.setState({chatText: txt})}
                      placeholder="" underlineColorAndroid='transparent'/>
                    <Button style={{flex: 2, marginLeft: 5, height: 30, borderWidth: 0, backgroundColor: 'rgb(140, 193, 39)'}} textStyle={{fontSize:15, color: 'white'}} onPress={this.onSend.bind(this)}>
                        Send
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,     
        overflow: 'hidden',
    },
    topBar:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(178,61,76)',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
    topText: {
        alignSelf: 'center',
        fontSize: 41,
        color: '#ffffff',
    },
    scrollView:{
        height: Dimensions.get('window').height / 4, 
        width: Dimensions.get('window').width
    },
    chatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: 'rgb(185,185,185)',
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: 'rgb(232,232,232)',
        position: 'absolute',
        bottom: 0,
        padding: 6,
        left: 0
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
    },
});
