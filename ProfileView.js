'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    Navigator
} from 'react-native';
import React, {Component} from 'react'
import Home_tableview_cell from './Home_tableview_cell'
import { StackNavigator } from 'react-navigation';

import Home_comments_list_viewcontroller from './Home_comments_list_viewcontroller'
import Home_likers_view from './Home_likers_view'
import ProfileViewContent from './ProfileViewContent'
import Profile_setting_view from './Profile_setting_view'
import Profile_request_view from './Profile_request_view'
import Profile_followers_view from './Profile_followers_view'
import Profile_followings_view from './Profile_followings_view'
import Profile_categories_view from './Profile_categories_view'
import Profile_category_add_view from './Profile_category_add_view'
import Profile_individual_category_view from './Profile_individual_category_view'
import Profile_chat_view from './Profile_chat_view'
import Profile_items_detail_view from './Profile_items_detail_view'
import Profile_web_view from './Profile_web_view'
import Profile_notification_setting from './Profile_notification_setting'
import Profile_write_review_view from './Profile_write_review_view'
import Profile_edit_view from './Profile_edit_view'
import Profile_category_edit_view from './Profile_category_edit_view'

export default class ProfileView extends Component {

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
        navFontSize: React.PropTypes.number,
        navTextColor: React.PropTypes.string,
        navTextColorSelected: React.PropTypes.string,
        onItemSelected: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.visibles = [];
        this.state = {
            selectedIndex: 0,
        }
    }
 
    render() {
        const routes = [
            
            {index: "profileView"},
            {index: "Profile_setting_view"},
            {index: "Profile_request_view"},
            {index: "Profile_followers_view"},
            {index: "Profile_followings_view"},
            {index: "Profile_items_view"},
            {index: "Profile_categories_view"},
            {index: "Profile_other"},
            {index: 'Profile_category_add_view'},
            {index: 'Profile_individual_category_view'},
            {index: 'Profile_chat_view'},
            {index: 'Profile_items_detail_view'},
            {index: "homeView"},
            {index: "commentView"},
            {index: 'Profile_web_view'},
            {index: 'Profile_notification_setting'},
            {index: 'Profile_write_review_view'},
            {index: 'Profile_edit_view'}
 
        ];
        return (
            <Navigator
            initialRoute={routes[0]} 
            configureScene={(route, routeStack) =>
                {
                    switch(route.index)
                    {
                        case "commentView":
                           return Navigator.SceneConfigs.FloatFromBottom 

                    }
                    return Navigator.SceneConfigs.FloatFromLeft;
                }
                }
            renderScene={(route, navigator) =>
                {
                    switch(route.index){
                        case "commentView":
                            return (<Home_comments_list_viewcontroller route={route} navigator={navigator}/>);
                        case "Home_likers_view":
                            return (<Home_likers_view route={route} navigator={navigator}/>)
                        case "profileView":
                            return(<ProfileViewContent route={route} navigator={navigator}/>);
                        case "Profile_setting_view":
                            return (<Profile_setting_view route={route} navigator={navigator}/>);
                        case "Profile_request_view":
                            return (<Profile_request_view route={route} navigator={navigator}/>);
                        case "Profile_followers_view":
                            return (<Profile_followers_view route={route} navigator={navigator}/>);
                        case "Profile_followings_view":
                            return (<Profile_followings_view route={route} navigator={navigator}/>);
                        case "Profile_categories_view":
                            return (<Profile_categories_view route={route} navigator={navigator}/>);
                        case "Profile_other":
                            return (<ProfileViewContent myProfile={false} route={route} navigator={navigator}/>);
                        case 'Profile_category_add_view':
                            return (<Profile_category_add_view route={route} navigator={navigator}/>);
                        case 'Profile_category_edit_view':
                            return (<Profile_category_edit_view route={route} navigator={navigator}/>);
                        case 'Profile_individual_category_view':
                            return (<Profile_individual_category_view route={route} navigator={navigator}/>);
                        case 'Profile_chat_view':
                            return (<Profile_chat_view route={route} navigator={navigator}/>);
                        case 'Profile_items_detail_view':
                            return( <Profile_items_detail_view route={route} navigator={navigator}/>);
                        case 'Profile_web_view':
                            return (<Profile_web_view route={route} navigator = {navigator}/>);
                        case 'Profile_notification_setting':
                            return (<Profile_notification_setting route={route} navigator={navigator}/>);
                        case 'Profile_write_review_view':
                            return(<Profile_write_review_view route={route} navigator={navigator}/>);
                        case 'Profile_edit_view':
                            return (<Profile_edit_view route={route} navigator={navigator}/>);
                    }
                }
            }
            />
 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,     
        overflow: 'hidden',
    },
    topBar:
    {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(178,61,76)',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'     
    }, 
    topText: {
        alignSelf: 'center',
        fontSize: 41,
        color: '#ffffff',
    },
    scrollView:{
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width
    }
});
