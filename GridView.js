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

import ImageProgress from './Lib/ImageProgress';
import ProgressBar from './Lib/Progress/Bar';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const onContact = () => {
  Alert.alert('Contact');
};

export default class GridView extends Component {          
    
    static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: 'black',
        items: 0,
        followers: 0,
        title: "Update",
        navTextColorSelected: '#FF9100',
        check: true,
        bScroll: true,
        showDetail: ()=>{}
    };

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func,
        style: View.propTypes.style
    };

    constructor(props) {
        super(props);
        this.visibles = [];

        this.state = {
            selectedIndex: 0,
        
        }
    }
    
    
    render() {
        let children = this.props.aryImg;
        let rows = [];
        let cells =[];
        let rowCount = this.props.rowCount;
        let prices = this.props.priceList;
        
        var i = 0; 
        for(i = 0; i < children.length; i ++)
        { 
             let curInd = i;
              cells[i%rowCount] = (
                    <TouchableHighlight key={i} underlayColor={'transparent'} 
                        onPress={() => {this.props.showDetail(curInd)}}>  
                          <ImageProgress indicator={ProgressBar}  style={[styles.imgCell,{ width: Dimensions.get('window').width/rowCount,
                            height: Dimensions.get('window').width/rowCount}]} source={{uri: children[i]}}>
                            {
                                prices[i]!='' &&

                                (<Text style={{textAlign: 'center', alignItems:'center', position: 'absolute', bottom: 0, left: 0, width: Dimensions.get('window').width/rowCount/1.5, height:Dimensions.get('window').width/rowCount/4, backgroundColor: 'rgba(0,0,0,0.5)',color:'white',fontSize:Dimensions.get('window').width/rowCount/8}} >
                                    {prices[i]}
                                </Text>)
                            }
                          </ImageProgress>
                    </TouchableHighlight>
                );
          
          if(i%rowCount==rowCount-1 || i==(children.length-1))
          {         
              rows[parseInt(i/rowCount,10)]=(
                <View key={i} style={{flex:1, flexDirection: 'row', width: Dimensions.get('window').width,height:Dimensions.get('window').width/{rowCount}}}>
                  {cells}
                </View>
                ); 
              cells = [];
          } 
        } 
        var retVal; 
       if( this.props.bScroll )
            retVal = (<ScrollView style={styles.scrollView}>{rows}</ScrollView>);
        else
            retVal = (<View style={styles.container}>{rows}</View>);  

       return (            
             retVal
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
    imgCell:{

      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      borderWidth:1,
      borderColor: 'white',
      resizeMode: 'stretch'
    },
    scrollView:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});