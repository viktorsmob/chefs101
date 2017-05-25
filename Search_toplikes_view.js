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
import Search_image_swipe_view from './Search_image_swipe_view'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class Search_toplikes_view extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        like: false,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
       
    };

    constructor(props) {
        super(props);
        this.visibles = [];
    }
    
    
    render() { 
       var imgList = [require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png'),
                        require('./img/person.png'), require('./img/test.png')];
        return (
            <View style={[styles.container,this.props.style]}>
                <View style={{flex:1}}>
                    <Search_image_swipe_view route={this.props.route} navigator={this.props.navigator} aryImg={[require('./img/person.png'), require('./img/test.png'),
                        require('./img/test1.png')]}/> 
                </View>
                <View style={{flex:2,alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize: 30,margin:20,textAlign:'center',color:'black'}} >No new items with likes for today</Text>
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
    bottomBar:
    {
        width: Dimensions.get('window').width,                 
        backgroundColor: 'rgb(255,255,255)',
        color: 'red',
        textAlign:'center',
        padding: 20,
        fontSize: 20,
        position: 'absolute',
        bottom: 0, 
        alignItems: 'center' 
    }
});