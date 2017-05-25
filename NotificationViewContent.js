import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import IndicatorViewPager from './Lib/IndicatorViewPager';
import PagerTitleIndicator from './Lib/PagerTitleIndicator';
import Notification_news_view from './Notification_news_view'
import Notification_notices_view from './Notification_notices_view'
import Notification_following_view from './Notification_following_view'


export default class NotificationViewContent extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{flex:1,  backgroundColor:'white'}}
                    indicator={this._renderTitleIndicator()}
                >   
                    <View>
                        <Notification_news_view/>
                    </View>
                    
                    <View>
                        <Notification_following_view/>
                    </View>
                
                    <View>
                        <Notification_notices_view/>
                    </View>
                </IndicatorViewPager> 
            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['News', 'Following', 'Notices']} />;
    }

 
   

}