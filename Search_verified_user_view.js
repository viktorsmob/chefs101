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
import { Avatar } from 'react-native-material-design';
import Search_verified_user_view_cell from './Search_verified_user_view_cell'
import Search_image_swipe_view from './Search_image_swipe_view'

const Dimensions = require('Dimensions'); 
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class Search_verified_user_view extends Component {          
    
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
        var imgList = [require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png')];
        return(
            <View style={[styles.container,this.props.style]}>
                <View style={{flex:1}}>
                    <Search_image_swipe_view route={this.props.route} navigator={this.props.navigator} aryImg={[require('./img/person.png'), require('./img/test.png'),
                        require('./img/test1.png')]}/>
                </View>
                <View style={{flex:2,alignItems:'center', justifyContent:'center'}}>
                    <ScrollView style={styles.scrollView}>
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' 
                        avatarAry = {[require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png')]}
                        imgAry={[require('./img/person.png'), require('./img/test.png'),                
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png')]}/>
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/>
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' />
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[ require('./img/test.png')]}/>
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/>
                    <Search_verified_user_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/> 
                </ScrollView>                             

                </View> 
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
     scrollView:{
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width
    },
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        height: 70,
    }, 
    topImage: {
        flex: 1,
        left: 10,
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