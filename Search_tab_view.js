import {StyleSheet, View, Text,Dimensions} from 'react-native';
import React, {Component} from 'react';
import IndicatorViewPager from './Lib/IndicatorViewPager';
import PagerTitleIndicator from './Lib/PagerTitleIndicator';
import Search_news_view from './Search_news_view'
import Search_verified_user_view from './Search_verified_user_view'
import Search_toplikes_view from './Search_toplikes_view'


export default class Search_tab_view extends Component {
    render() {
        return (
            <View style={{flex:1, width: Dimensions.get('window').width}}>
                <IndicatorViewPager
                    style={{flex:1,  backgroundColor:'white'}}
                    indicator={this._renderTitleIndicator()}
                >   
                    <View>
                        <Search_news_view route={this.props.route} navigator={this.props.navigator}/>
                    </View>
                    
                    <View>
                        <Search_toplikes_view route={this.props.route} navigator={this.props.navigator}/> 
                    </View>
                 
                    <View>
                        <Search_verified_user_view route={this.props.route} navigator={this.props.navigator}/>
                    </View>
                </IndicatorViewPager> 
            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['News', 'Top likes', 'Verified Users']} />;
    }
 
} 