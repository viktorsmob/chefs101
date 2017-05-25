'use strict'

import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    ScrollView,
    Alert
} from 'react-native';
import React, {Component} from 'react'
import Button from 'apsl-react-native-button'                   
import { StackNavigator } from 'react-navigation';                 
import Home_comments_list_viewcontroller from './Home_comments_list_viewcontroller'      

import ImageProgress from './Lib/ImageProgress';
import ProgressBar from './Lib/Progress/Bar';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;                                       
const deviceWidth = window.width;
const deviceHeight = window.height;

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');

export default class Home_table_view_cell extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        img:  'http://loremflickr.com/640/480/dog',
        userImg: 'http://loremflickr.com/640/480/dog' 
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
        style: View.propTypes.style,
    };

    constructor(props) {
        super(props);
        this.visibles = [];

        this.state = {
            selectedIndex: 0,
            img: props.img,
            userImg: props.userImg,
            data: props.data,       
            like: props.data.user_liked=='yes'?true:false,
            numberLikes: parseInt(props.data.likes)
        }
    }
    likeToggle=()=>
    {
        var likeString;
        likeString = this.state.like == true? 'unlike': 'like';
        var numLike = this.state.numberLikes;
        numLike = numLike + (this.state.like==true? -1: 1);
        this.setState({like: !this.state.like, numberLikes: numLike});
        Util.likeToggle(likeString, this.state.data.id);
    }
    gotoProfile = ()=>
    {
        this.props.navigator.push({index: 'Profile_other', user_id: this.state.data.uid})
    }
    gotoLikers = ()=>
    {
        this.props.navigator.push({index: 'Home_likers_view', image_id: this.state.data.id});
    }
    render() { 
        var likeImgSrc, middleBar_1_height, verifyWidth = deviceWidth /15;
        {
            if(this.state.data.verify=='0')
                verifyWidth = 0;
            if (this.state.like == true)
            {
                likeImgSrc = require("./img/likedbtn.png");
                middleBar_1_height = 25;
            }    
            else
            {
                likeImgSrc = require("./img/likebtn.png");
                middleBar_1_height = 25;
            }
        }
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={styles.topBar}>
                    <Image style ={styles.topImage} source={{uri: this.state.data.uimage}}/>
                    <View style={styles.topTextArea}>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                             <Text onPress={()=>this.gotoProfile()}s tyle={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'blue'}}>
                                    {this.state.data.username}
                            </Text>
                            <Image source={require('./img/verifiedUser.png')} style={{width:verifyWidth, height:verifyWidth}} resizeMode={Image.resizeMode.contain}/>
                        </View>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                             <Image source={require('./img/thumbicon.png')} style={{flex: 1}} resizeMode={Image.resizeMode.contain}/>
                             <Text style={{flex: 4, backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'blue'}}>
                                    {this.state.data.category_name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.topGap}/>
                    <Button style={styles.topContactButton} textStyle={{fontSize:15, color: 'white'}} onPress={() => this.props.onContact("SSS")}>
                        Contact Seller
                    </Button>
                </View>
             
                <ImageProgress 
                  source={{ uri: this.state.data.image_path}} 
                  indicator={ProgressBar} 
                  style ={styles.mainImage} />
                <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onPress={this.gotoLikers} style={styles.middleBar_1}>
                    <View style={styles.middleBar_1}>
                            <Image style ={{height: middleBar_1_height, margin: 10}} resizeMode={Image.resizeMode.contain} source={require('./img/likes-cell.png')}/>
                            <Text style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                                {this.state.numberLikes.toString()}
                            </Text>
                            <Text style={{margin: 5, backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black'}}>
                                likes
                            </Text>                    
                    </View>
                </TouchableHighlight>

                <View style={styles.middleBar_2}>
                    <View style={{flexDirection: 'row',alignSelf: 'stretch',  flex:4}}>
                        <Image style ={{left: 10, alignSelf: 'center', resizeMode: 'contain'}} source={require('./img/caption-cell.png')}/>
                        <View style={{marginLeft: 20,   flexDirection: 'column', justifyContent: 'center'}}>
                                <Text style={{marginTop: 0,flex:1, backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black'}}>
                                    {this.state.data.description}
                                </Text>
                                <Text style={{marginBottom: 0,flex: 1,backgroundColor: 'transparent',borderWidth: 0, fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                                    {this.state.data.daysago}
                                </Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        {this.state.data.price!='' &&
                        (<Text style={{color: 'red'}}> {this.state.data.currency}{' ' + this.state.data.price}</Text>)}
                    </View> 
                </View>

                <View style={styles.bottomBar}>
                    <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5}  onPress={this.likeToggle}>
                        <Image style={{margin:10}} source={likeImgSrc}/>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5} onPress={() => this.props.onClick(this.props.offset)}>
                        <Image style={{width: 30, height:30, margin:10, resizeMode: 'contain'}} source={require("./img/caption-cell.png")}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={{width: 30, height:30, margin:10,   position: 'absolute', right:20, top: 0}}underlayColor={'transparent'} activeOpacity={0.5} onPress={() => this.props.onAction(this.props.offset)}>
                        <Image style={{width: 30, height:30,  resizeMode: 'contain', }} source={require("./img/circles.png")}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#272822',
    width: 200,
    height: 50,
    color: 'white'
  },
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 50,
    }, 
    topImage: {
        flex: 1,
        left: 10,
        resizeMode: 'stretch',
        width: deviceWidth /15,
        height: deviceWidth / 15
    },
    topTextArea:
    {
        flex:4,
        marginLeft: 20, 
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topGap:
    {
        flex: 1,
    },
    topContactButton:
    {
        flex: 3,
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