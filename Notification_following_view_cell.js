'use strict'

import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,  
    TouchableOpacity,
    ScrollView,
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

export default class Home_table_view_cell extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        like: false,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',
        txtVerb: 'liked',
        txtObject: 'category',
        txtSubject: 'Mahalkum',
        txtPronoun: 'Mishary87',
        txtTime: '29 days ago',
        txtCategory: 'Miscellaneous',
        imgAry: []
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
            like: props.like
        }
    }
    
    
    render() { 
        var rightImgSrc=null, rightImgSize = 0,bGrid=0;
        {
            if (this.props.imgAry.length ==1)
            {
                rightImgSrc = this.props.imgAry[0];
                rightImgSize = 50;
            }    
            if(this.props.imgAry.length > 1)
            {
                bGrid = 1;
            }
        }
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={{margin: 5}} underlayColor={'transparent'} activeOpacity={0.5} onPress={() => Alert.alert("Avatar")}>
                        <Avatar size={50} borderRadius={25} image={<Image source={this.props.imgAvatar}/>}/>    
                    </TouchableOpacity>
                    <View style={styles.topTextArea}>
                             <Text onPress={() => Alert.alert("Subject")} style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'blue'}}>
                                    {this.props.txtSubject}{' '}
                                    <Text  style={{ backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black'}}>
                                        {this.props.txtVerb}{' '}
                                    </Text>
                                    <Text onPress={() => Alert.alert("Pronoun")} style={{backgroundColor: 'transparent', borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'blue'}}>
                                        {this.props.txtPronoun}{' '}       
                                    </Text>
                                    <Text  style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black'}}>
                                        {this.props.txtObject}{' '}
                                    </Text>
                            </Text>
                            <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black'}}>
                                    {this.props.txtCategory}{' '}
                            </Text>
                            <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'blue', flex:4}}>
                                    {this.props.txtTime}
                            </Text>
                    </View>
                     
                    <TouchableHighlight style={{flex:1,position: 'absolute', right: 10,top: 10}} underlayColor={'transparent'} activeOpacity={0.5} onPress={() => Alert.alert("ImgClicked")}>
                        <Image style ={{width:rightImgSize, height: rightImgSize}} source={rightImgSrc}/>
                    </TouchableHighlight> 
                </View> 
                { 
                   (bGrid ==1 ) && (<GridView bScroll={false} rowCount={4} aryImg={this.props.imgAry}/>)
                }

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
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        flexDirection: 'row',      
        height: 70,
    }, 
    topImage: {
        flex: 1,
        left: 10,
        resizeMode: 'contain'
    },
    topTextArea:
    {
        marginLeft: 5,    
        flexDirection: 'column',
        justifyContent: 'space-between',
         
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