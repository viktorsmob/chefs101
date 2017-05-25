'use strict'

import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import React, {Component} from 'react'
import Button from 'apsl-react-native-button'
import { StackNavigator } from 'react-navigation'; 
import Home_comments_list_viewcontroller from './Home_comments_list_viewcontroller'
import StarRating from './StarRating';
import { Avatar } from 'react-native-material-design'; 

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class Profile_review_view_cell extends Component {          
    
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
        style: View.propTypes.style,
        img: React.PropTypes.number,
         
    };

    constructor(props) {
        super(props);
        this.visibles = [];

        this.state = {
            data: props.data
        }
    }
    
    componentWillReceiveProps(props)
    {
        this.setState({
        data: props.data});
    } 
    
    render() { 
 
        return (
            <View style={[styles.container,this.props.style]}>
                  <View style={styles.topBar}>
                    <TouchableOpacity underlayColor={'transparent'} activeOpacity={0.5} style={{marginLeft: 10, flex:1}} onPress={()=>Alert.alert("Avatar")}>
                        <Avatar size={40} borderRadius={20} image={<Image source={{uri: this.state.data.image}}/>}/>
                    </TouchableOpacity>
                    <View style={styles.topTextArea}>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                             <Text style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                                    {this.state.data.name}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                             <Text style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'rgb(170,170,170)'}}>
                                    {this.state.data.datacreated}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:3, marginRight: 20}}>
                        <StarRating
                             
                            starColor='green' 
                                maxStars={5}
                                starSize={20}
                                disabled={true}
                                rating={Number(this.state.data.rating)}   
                                selectedStar={(rating) => Alert.alert(rating)}
                            /> 
                   </View>
                </View>
                <View style={{width: Dimensions.get('window').width}}>
                    <Text style={{margin: 5, backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'rgb(170,170,170)', flex:1}}>
                        {this.state.data.descs}
                    </Text>
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
        width: 40,
        height: 40, 
        left: 10,
        resizeMode: 'stretch'
    },
    topTextArea:
    {
        flex: 6,
        marginLeft: 15,
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