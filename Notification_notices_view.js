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

export default class Notification_news_view extends Component {          
    
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
       
        return (
            <View style={[styles.container,this.props.style]}>
                <Text style={styles.bottomBar}>
                    Notice View. What to display? Friend?
                </Text>
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