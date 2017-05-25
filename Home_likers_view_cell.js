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

export default class Home_likers_view_cell extends Component {          
    
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
            data: props.data,
        }
    }
    
    render() {  
        return (
            <View style={[styles.container,this.props.style]}>
                <TouchableHighlight onPress={() => this.props.navigator.push({index: 'Profile_other', user_id: this.state.data.uid})}  underlayColor={'transparent'}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={{marginLeft: 15}} underlayColor={'transparent'} activeOpacity={0.5}>
                            <Avatar size={60} borderRadius={30} image={<Image source={{uri: this.state.data.user_image}}/>} />    
                        </TouchableOpacity>
                        <View style={{marginLeft: 20, flex: 1, flexDirection: 'column'}} >
                            <View style={{flex: 1, justifyContent: 'center' }}>
                                 <Text style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 20, color: 'blue'}}>
                                        {this.state.data.name}
                                </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center' }}>
                                <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'blue'}}>
                                        {this.state.data.username}
                                </Text>
                            </View>
                        </View> 
                    </View>
                </TouchableHighlight>  
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
        borderBottomColor: 'rgb(255,71,73)',
        borderBottomWidth: 1 ,  
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
    },  
});