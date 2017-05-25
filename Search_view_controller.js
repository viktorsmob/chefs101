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
import Search_about_view from './Search_about_view'
import Search_follow_view from './Search_follow_view'
import Search_contact_view from './Search_contact_view'
import Search_user_hashtag_view from './Search_user_hashtag_view'
import ProfileViewContent from './ProfileViewContent'
import SearchViewContent from './SearchViewContent'
import Profile_followers_view from './Profile_followers_view'
import Profile_followings_view from './Profile_followings_view'
import Profile_categories_view from './Profile_categories_view'
import Profile_category_add_view from './Profile_category_add_view'
import Profile_individual_category_view from './Profile_individual_category_view'
import Profile_chat_view from './Profile_chat_view'
import Profile_items_detail_view from './Profile_items_detail_view'
import Profile_write_review_view from './Profile_write_review_view'

export default class Search_view_controller extends Component {

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
            {index: "SearchViewContent"},
            {index: "Search_about_view"},
            {index: "Search_follow_view"},
            {index: "Search_contact_view"},
            {index: "profileView"},
            {index: "Search_user_hashtag_view"},
            {index: 'Profile_other'},
            {index: "Profile_categories_view"},
            {index: "Profile_followers_view"},
            {index: "Profile_followings_view"},
            {index: "Profile_items_view"},
            {index: "Profile_categories_view"},
             {index: 'Profile_chat_view'},
            {index: 'Profile_items_detail_view'},
            {index: 'Profile_write_review_view'}
        ];
        
        return (
            <Navigator
            initialRoute={routes[0]} 
            configureScene={(route, routeStack) =>
                {
                    switch(route.index)
                    { 
                        case "Search_user_hashtag_view":
                            return Navigator.SceneConfigs.FadeAndroid; ;                                            
                    }
                    return Navigator.SceneConfigs.FloatFromLeft;
                }
                }
            renderScene={(route, navigator) =>
                {
                    switch(route.index){
                        case "SearchViewContent":
                            return(<SearchViewContent route={route} navigator={navigator}/>);
                        case "Search_about_view":
                            return (<Search_about_view route={route} navigator={navigator}/>);
                        case "Search_follow_view":
                            return(<Search_follow_view route={route} navigator={navigator}/>);
                        case "Search_contact_view":
                            return (<Search_contact_view route={route} navigator={navigator}/>);
                        case "Search_user_hashtag_view":
                            return (<Search_user_hashtag_view route={route} navigator={navigator}/>);
                        case "Profile_other":
                            return (<ProfileViewContent myProfile={false} route={route} navigator={navigator}/>);
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
                        case 'Profile_individual_category_view':
                            return (<Profile_individual_category_view route={route} navigator={navigator}/>);
                        case 'Profile_chat_view':
                            return (<Profile_chat_view route={route} navigator={navigator}/>);
                        case 'Profile_items_detail_view':
                            return( <Profile_items_detail_view route={route} navigator={navigator}/>);
                        case 'Profile_write_review_view':
                            return(<Profile_write_review_view route={route} navigator={navigator}/>);
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
