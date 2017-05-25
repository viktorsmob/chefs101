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
import Notification_following_view_cell from './Notification_following_view_cell'

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
        
        return ( 
                <ScrollView style={styles.scrollView}>
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' 
                        imgAry={[require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png')]}/>
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/>
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' />
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[ require('./img/test.png')]}/>
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/>
                    <Notification_following_view_cell imgAvatar={require('./img/person.png')} txtTime='3 months ago'
                        txtSubject='David' txtVerb='liked' txtObject='8 ads' imgAry={[require('./img/person.png'), require('./img/test.png')]}/> 
                </ScrollView>  
                
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