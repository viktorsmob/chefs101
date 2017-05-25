'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    ScrollView,
    Alert
} from 'react-native';
import React, {Component} from 'react'
import Swipeable from 'react-native-swipeable'
import Button from 'apsl-react-native-button'



const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

export default class Home_comments_list_cell extends Component {          
 


    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        defaultPage: React.PropTypes.number,
        user: React.PropTypes.string,
        img: React.PropTypes.number,
        time: React.PropTypes.string,
        comment: React.PropTypes.string
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
        this.setState({data: props.data})
    }
    getTimeDiff(strTime)
    { 
        strTime = strTime.substr(0, 10) + 'T' + strTime.substr(10 + 1) + 'Z'; 
        var datetime = new Date( strTime ).getTime();
        var now = new Date().getTime(); 
        var diff = now - datetime; 
        diff /= 1000;
        if (diff<60) {
            return Math.round(diff).toString() + 's';
        }else if(diff/60<60){
            return Math.round(diff/60).toString() + 'm';  
        }else if(diff/3600<24){
            return Math.round(diff/3600).toString() + 'h';   
        }else if(diff/(3600*24)<31){
            return Math.round(diff/(3600*24)).toString() + 'd';  
        }else if(diff/(3600*24*30)<12){
            return Math.round(diff/(3600*24*30)).toString() + 'M';  
        }else{
            return Math.round(diff/(3600*24*30*12)).toString() + 'y';  
        }
    }
    render() {
        const rightButtons = [
           
          <TouchableHighlight style={styles.swipeBtn} onPress={()=>this.props.onSwipeBtn('reply', this.props.offset)}>
            <View style={[styles.swipeBtn,{backgroundColor: 'grey'}]} >
                <Image style={styles.swipeImg} source={require('./img/comments-actions-icon-reply.png')}/>
            </View>
          </TouchableHighlight>,
          <TouchableHighlight style={styles.swipeBtn} onPress={()=>this.props.onSwipeBtn('delete', this.props.offset)}>
            <View style={[styles.swipeBtn,{backgroundColor: 'red'}]} >
                <Image style={styles.swipeImg} source={require('./img/comments-actions-icon-delete.png')}/>
            </View>
          </TouchableHighlight>,
          <TouchableHighlight style={styles.swipeBtn} onPress={()=>this.props.onSwipeBtn('abusive', this.props.offset)}>
            <View style={[styles.swipeBtn,{backgroundColor: 'grey'}]} >
                <Image style={styles.swipeImg} source={require('./img/Abusive.png')}/>
            </View>
          </TouchableHighlight>,
          <TouchableHighlight style={styles.swipeBtn} onPress={()=>this.props.onSwipeBtn('spam', this.props.offset)}>
            <View style={[styles.swipeBtn,{backgroundColor: 'grey'}]} >
                <Image style={styles.swipeImg} source={require('./img/spam.png')}/>
            </View>
          </TouchableHighlight>

        ]; 
        var content=(
                <View style={styles.topBar}>
                    <Image onPress={() => Alert.alert("IMAGE")} style ={styles.topImage}  source={{uri: this.state.data.image}}/>
                    
                    <View style={styles.topTextArea}>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text onPress={() => this.props.navigator.push({index: 'Profile_other'})} style={{backgroundColor: 'transparent',borderWidth: 0,fontWeight: 'bold', fontSize: 20, color: 'blue', flex:5}}>
                                    {this.state.data.username}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                             <Text onPress={() => this.props.navigator.push({index: 'Profile_other'})} style={{backgroundColor: 'transparent',borderWidth: 0, fontSize: 15, color: 'black', flex:5}}>
                                    {this.state.data.comment_desc}
                            </Text>
                        </View>
                    </View>
                     
                    <View style={styles.timeIconView}>
                        <Image style={{width: window.width * 4 /15,  height:30}} source={require('./img/Lebal BG.png')} resizeMode={Image.resizeMode.contain}>
                            <Text style={{position: 'absolute', top: 4,right: window.width*1/15, backgroundColor: 'transparent',borderWidth: 0, fontSize: 13, color: 'white'}}>
                                    {this.getTimeDiff(this.state.data.datecreated)} 
                            </Text>
                        </Image>
                    </View>
                </View>);
        return (
                <Swipeable  rightButtonWidth = {50} rightButtons={rightButtons}>
                  {content}
                </Swipeable>                
        );
    }
}

const styles = StyleSheet.create({
    swipeBtn:{
        height:50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swipeImg:
    {
        resizeMode: 'stretch',
        width:45,
        height:45,
    },
    button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#272822',
    width: 200,
    height: 50,
    color: 'white'
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
        
        left: 10,
        resizeMode: 'stretch',
        width: window.width/15,
        height: window.width/15
    },
    topTextArea:
    {
        flex:5,
        marginLeft: 20, 
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topGap:
    {
        flex: 5,
    },
    timeIconView:
    {
        flex: 2,
        margin:10,
        marginRight: 20
    }
});
