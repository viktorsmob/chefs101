import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,
  ListView,ScrollView
} from 'react-native';
import {
  Cell, 
  Section,
  CustomCell,
  TableView,
} from 'react-native-tableview-simple';

import Button from 'apsl-react-native-button'
 
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;

const _categoryName= ['Like Notifications','Comment Notifications','New Followers','Accepted Follow Requests',
                         'Contact Notifications','Image Upload Notification', 'Rating Notification']
const _notifySettings = {'Like Notifications': ['Off','From People I Follow','From Everyone'],
                         'Comment Notifications': ['Off', 'From People I Follow', 'From Everyone'],
                         'New Followers': ['Off', 'From Everyone'],
                         'Accepted Follow Requests': ['Off', 'From Everyone'],
                         'Contact Notifications': ['Off', 'All New Contacts'],
                         'Image Upload Notification': ['Off', 'From People I Follow'],
                         'Rating Notification': ['Off', 'From People I Follow']}
const checkArray = {'Like Notifications':[true, false, false], 
                    'Comment Notifications':[true, false, false], 
                    'New Followers':[true, false],
                    'Accepted Follow Requests':[true, false], 
                    'Contact Notifications':[true, false], 
                    'Image Upload Notification':[true, false], 
                    'Rating Notification': [true, false]}
const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
export default class Profile_notification_setting extends Component { 
 
  constructor(props)
  {
      super(props);
      this.state={
        dataSource: ds.cloneWithRowsAndSections(_notifySettings)
      }
  }
  
  renderRow(rowData, sectionID, rowID) {
    return (
        <TouchableHighlight underlayColor={'transparent'} activeOpacity={1}  onPress={()=>{
          for(var i =0; i < checkArray[sectionID].length; i ++)
            checkArray[sectionID][i] = false;
          checkArray[sectionID][rowID] = true;
          let newObj = Object.assign({}, _notifySettings);
          let newSource = ds.cloneWithRowsAndSections(newObj);

          this.setState({dataSource: newSource})
           }}
        >
          <View style={styles.rowView}>
            <Image style={[styles.imgCheck,{height: (checkArray[sectionID][rowID]==true?window.height/35:0)}]} source={require('./img/cheackmark.png')}/>
            <Text style={styles.rowText}>{rowData}</Text>
          </View>
        </TouchableHighlight>);
  }

 renderSectionHeader(sectionData, category) {
  return (<View style={styles.sectionView}>
            <Text style={styles.sectionText}>{category}</Text>
          </View>);
  }
  render() {
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{backgroundColor: 'transparent',borderWidth: 0, fontSize: windowHeight/24, color: 'white'}]}>
                    Notifications
              </Text>
               <Button onPress={() => this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
              <Button onPress={()=>this.props.navigator.pop()} style={[{backgroundColor: 'transparent', height: windowHeight/20,  borderColor: 'white', borderWidth: 1},{position:'absolute',right:20, top: windowHeight * 3 / 80}]} textStyle={{fontSize: windowWidth/27, color: 'white'}}>
                     Save
              </Button>
          </View>
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSectionHeader={this.renderSectionHeader.bind(this)}
            style={{  backgroundColor: 'rgb(223,201,222)'}}
            >
              
          </ListView>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
  },
  sectionText:
  {
    color: 'rgb(78,14,25)', 
    fontSize: window.height/32,
    marginLeft: 10,

  },
  sectionView:
  {
    justifyContent: 'center',
    width: window.width,
    height: window.height / 16,
    borderColor: 'rgb(78,14,25)',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  imgCheck:
  {
    marginLeft: 15, 
    width: window.height / 35,
    height: window.height / 35,
    resizeMode: 'stretch'
  },
  rowText:
  {
    color: 'rgb(85,85,85)',
    fontSize: window.height/35,
    marginLeft: 20,
  },
  rowView:
  {
    alignItems: 'center',
    flexDirection: 'row',
    width: window.width,
    height: window.height / 16,
    borderColor: 'rgb(85,85,85)',
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});

AppRegistry.registerComponent('register_viewcontroller', () => register_viewcontroller);