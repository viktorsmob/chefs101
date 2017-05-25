 import {
    Dimensions,
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    StatusBar
} from 'react-native';

import React, {Component} from 'react';
import IndicatorViewPager from './Lib/IndicatorViewPager';
import PagerTitleIndicator from './Lib/PagerTitleIndicator';
import Notification_news_view from './Notification_news_view'
import Notification_notices_view from './Notification_notices_view'
import Notification_following_view from './Notification_following_view'
import SearchHeaderComponent from './Lib/Search-header/Search-header-component';
import Search_tab_view from './Search_tab_view' 
import SearchTagTabView from './SearchTagTabView'

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const SearchHeader = SearchHeaderComponent(); 
var searchView;
export default class SearchViewContent extends Component {
     constructor ( props ) {
        super(props);
        this.visibles = [];
        this.state = {
            selectedIndex: 0,
            showSearch: false, 
        }
        this.gotoAboutView = this.gotoAboutView.bind(this);
    }

    gotoAboutView() 
    {
        this.props.navigator.push({index:"Search_about_view"})
    }

    render () { 
        
        return (
            <View style = { styles.container }>
                    <View style = { styles.header }>
                        <Text style = { styles.label } onPress={() => {this.props.navigator.push({index: "Search_user_hashtag_view"})}}>Search</Text>
                    </View>
                    
                    <Search_tab_view route={this.props.route} navigator={this.props.navigator}/>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        backgroundColor: '#f5fcff'
    },
    status: {
        zIndex: 10,
        elevation: 2,
        width: DEVICE_WIDTH,
        height: 21,
        backgroundColor: '#0097a7'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 0,
        backgroundColor: 'rgb(137,29,46)'
    },
    label: {
        flexGrow: 1,
        fontSize: 25,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#ffffff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});