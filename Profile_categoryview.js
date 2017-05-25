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
import Profile_categoryview_cell from './Profile_categoryview_cell'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
var Util = require('./Lib/utils');

const onContact = () => {
  Alert.alert('Contact'); 
};

export default class Profile_categoryview extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: 'black',
        navTextColorSelected: '#FF9100',
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
        style: View.propTypes.style,
        img: React.PropTypes.number
    };

    constructor(props) {
        super(props);
        this.visibles = [];

        this.state = {
            selectedIndex: 0,
            categoryArray: props.categoryArray,
            array_categories: props.array_categories                 
        }
    }

  componentWillReceiveProps(props)
  {
    this.setState({
       categoryArray: props.categoryArray,
            array_categories: props.array_categories});
  } 
    gotoIndividualCategory= (offset)=>
    {
        console.log('IsMineProperty');
        console.log(this.props.isMine);
        this.props.navigator.push({index: 'Profile_individual_category_view',user_id: this.props.user_id, loadProfile: this.props.loadProfile, isMine: this.props.isMine, followToggle: this.followToggle.bind(this), offset: offset, categoryArray: this.state.categoryArray, array_categories: this.state.array_categories});       
    }
 
    followToggle(bFollow, offset)
    {
        this.props.followToggle(bFollow, offset) 
    }
 
    render() {
        var categoryArray = this.state.categoryArray
        var array_categories = this.state.array_categories
        
         
        var content=[]
        
        for(var i = 0; i < array_categories.length; i++)
        {
            var _cate = array_categories[i];
            console.log('Cate');
            console.log(_cate);
            console.log('CategoryARRAY');
            console.log(categoryArray[_cate.id])
            if(categoryArray[_cate.id] != undefined)
            content[i] = <Profile_categoryview_cell  navigator={this.props.navigator} route={this.props.route} key={i} isMine={this.props.isMine} offset={i} followToggle={this.followToggle.bind(this)} check={_cate.user_follower=='yes'?true:false} followers={_cate.followers} items={categoryArray[_cate.id].length} title={_cate.name} onClick={this.gotoIndividualCategory} img={categoryArray[_cate.id][0].image_path}/>
            else
            content[i] = <Profile_categoryview_cell  navigator={this.props.navigator} route={this.props.route} key={i} isMine={this.props.isMine} offset={i} followToggle={this.followToggle.bind(this)} check={_cate.user_follower=='yes'?true:false} followers={_cate.followers} items={0} title={_cate.name} onClick={this.gotoIndividualCategory} img={require('./img/background.png')}/>   
        }
        
        return (
            <View style={[styles.container,this.props.style]}>
               <ScrollView style={styles.scrollView}>
                    {content}
                </ScrollView>     
            </View>
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