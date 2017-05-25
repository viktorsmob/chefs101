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

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class Search_verified_user_view_cell extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        like: false,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',
        username: 'Mahalkum',
        storename: 'Mahalkum',
        imgAry: [],
        avatarAry: [],
        numViewMore: 5,
        following: true
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
            following: props.following
        }
    }
    
    render() { 
        var followImg;
        {

            if (this.state.following==true)
            {
                followImg = require('./img/followingbtn.png')
            }   
            else
            {
                followImg = require('./img/followbtn.png')
            }
        }
        var children = this.props.imgAry;
        
        var cells =[], avatarCells = [];
        var i = 0;
        for(i = 0; i < children.length; i ++)
        {  
              cells[i] = (
                    <TouchableHighlight key={i} underlayColor={'transparent'}
                        onPress={() => {()=>Alert.alert(i)}}>  
                          <Image style={[styles.imgCell,{padding:5,top:5, width: Dimensions.get('window').width/4.5,
                            height: Dimensions.get('window').width/4.5}]} resizeMode={Image.resizeMode.contain} source={children[i]}/>
                    </TouchableHighlight>
                );
        }

        children = this.props.avatarAry;
        for(i = 0; i < children.length; i ++)
        {  
              avatarCells[i] = (
                    <TouchableOpacity key={i} style={{padding: 5}} underlayColor={'transparent'} activeOpacity={0.5} onPress={() => Alert.alert("Avatar")}>
                        <Avatar size={Dimensions.get('window').width/4.5} borderRadius={Dimensions.get('window').width/9} image={<Image source={children[i]}/>} />    
                    </TouchableOpacity>
                );
        }
            
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={{marginLeft: 15}} underlayColor={'transparent'} activeOpacity={0.5} onPress={() => Alert.alert("Avatar")}>
                        <Avatar size={40} borderRadius={20} image={<Image source={this.props.imgAvatar}/>} />    
                    </TouchableOpacity>
                    <View style={styles.topTextArea}>
                        <View style={{flexDirection: 'row'}}>
                             <Text style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'blue'}}>
                                    {this.props.username}
                            </Text>
                            <Image source={require('./img/verifiedUser.png')} style={{marginLeft:10, width:20, height: 20}} resizeMode={Image.resizeMode.contain}/>
                        </View>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'blue', flex:4}}>
                                    {this.props.storename} 
                            </Text>
                        </View>
                    </View> 
                    <TouchableHighlight onPress={() => this.setState({following: !this.state.following})} style={{flex:1,position: 'absolute', right: 10,top: 10}} underlayColor={'transparent'} activeOpacity={0.5} >
                        <Image source={followImg}/>
                    </TouchableHighlight>  
                </View>

                <ScrollView  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width/4.5 + 10, backgroundColor: 'rgb(209,180,182)'}} horizontal={true}>
                    {avatarCells}
                </ScrollView>

                <ScrollView  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width/4.5+10, backgroundColor: 'rgb(235,235,241)'}} horizontal={true}>
                    {cells}
                    {
                        <TouchableHighlight underlayColor={'transparent'} activeOpacity={1}  onPress={() => Alert.alert("View More")}>
                            <View style={{margin: 5, width:Dimensions.get('window').width/4.5+10, height: Dimensions.get('window').width/4.5+10, alignItems: 'center', flexDirection: 'column'}}>
                                <Image source={require('./img/View_Store.png')} style={{marginLeft:10, width:Dimensions.get('window').width/4.5 * 2 / 3, height: Dimensions.get('window').width/4.5 * 2 / 3}} resizeMode={Image.resizeMode.stretch}/>
                                <Text style={{color: 'rgb(101,0,3)'}}>View Store</Text>
                                <Text style={{color: 'rgb(101,0,3)'}}>{this.props.numViewMore}{' '}items</Text>
                            </View>
                        </TouchableHighlight>
                    } 
                </ScrollView>    
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