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

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class Profile_categoryview_cell extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: 'black',
        items: 0,
        followers: 0,
        title: "Update",
        navTextColorSelected: '#FF9100',
        check: true
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
        style: View.propTypes.style,
        title: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.visibles = []; 
        this.state = {
            selectedIndex: 0,
            img: props.img,
            check: props.check,
            items: props.items,
            followers: props.followers
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            img: nextProps.img,
            check: nextProps.check,
            items: nextProps.items,
            followers: nextProps.followers
        }); 
    }
    render() { 
        var checkImgSrc,plusSize = 0;
        if(this.props.isMine == false)
        {
            plusSize = Dimensions.get('window').width/10;
        }
        if(this.state.check == true)
            checkImgSrc=require('./img/checkround.png');
        else
            checkImgSrc=require('./img/plusround.png');
        var srcImg = this.state.img;
        if(typeof(srcImg) != 'number') srcImg = {uri: srcImg}
        return (
            <TouchableHighlight underlayColor={'transparent'} activeOpacity={1}  onPress={() => this.props.onClick(this.props.offset)}>
            <Image style ={styles.container} source={srcImg}>   
                <Image  style={styles.container} source={require('./img/profile-ol.png')}>             
                <View style={{flex:2, flexDirection: 'column'}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:1,flexDirection: 'column'}}>
                        <View style={{flex:1,flexDirection: 'row', alignSelf:'center', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{  fontWeight: 'bold',alignItems: 'center', justifyContent: 'center', alignSelf: 'center',  fontSize: 17, color: 'white'}}>{this.state.items}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 17, alignSelf: 'center', color: 'white'}}>{this.state.followers}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection: 'row', alignSelf:'center', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{  fontWeight: 'bold',alignItems: 'center', justifyContent: 'center', alignSelf: 'center',  fontSize: 17, color: 'white'}}>Items</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 17, alignSelf: 'center', color: 'white'}}>Followers</Text>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, color: 'white'}}>{this.props.title}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:2}}>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.5}  onPress={() => {
                            if(this.state.check == true)
                            {
                                this.props.followToggle(false, this.props.offset);
                                this.setState({followers : parseInt(this.state.followers) - 1})
                            }
                            else
                            {
                                 this.props.followToggle(true, this.props.offset);
                                 this.setState({followers : parseInt(this.state.followers) + 1})
                            }
                            this.setState({check: !this.state.check});}
                        }>
                        <Image style={{margin:10, width: plusSize, height: plusSize}} source={checkImgSrc}/>
                    </TouchableHighlight>
                </View>
                </Image>
            </Image>
            </TouchableHighlight>
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
        flexDirection: 'row',
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height/5,
        resizeMode: 'cover',
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
        resizeMode: 'contain'
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