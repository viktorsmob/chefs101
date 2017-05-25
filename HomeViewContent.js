'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    Alert,
    ListView,
    Navigator
} from 'react-native';
import React, {Component} from 'react'
import Home_tableview_cell from './Home_tableview_cell'
import { StackNavigator } from 'react-navigation';
import Home_comments_list_viewcontroller from './Home_comments_list_viewcontroller'
import ActionSheet from 'react-native-actionsheet';

var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
var buttons = ['Cancel', 'Report Inappropriate', 'Share Item', 'Copy Share URL', 'Email Item'];
var buttons_Contact = ['Cancel', 'Chat','Call', 'SMS','WhatsApp','Email']
var buttons_own = ['Cancel', 'Delete','Edit', 'Share Item','Copy Share URL','Email Item']
var content = []; 
export default class HomeViewContent extends Component {

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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        
        this.state = {
            selectedIndex: 0,
            showActionSheet: false,
            datas: [],
            dataSource: ds.cloneWithRows([]),
        }
        this.gotoCommentView = this.gotoCommentView.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.getMoreImages = this.getMoreImages.bind(this);

       
    }

    gotoCommentView(index)
    {
        {/*this.props.navigator.push({index:"commentView", key: index, imgID: this.state.datas[index].id})*/}
        this.props.navigator.push({index:"commentView",comments: this.state.datas[index].comments, imgID: this.state.datas[index].id})
    }
    reportInappropriate = ()=>
    {
        Alert.alert('Report InApopropriate');
    }

    shareItem = ()=> 
    {
        Alert.alert('Share Item');
    }

    copyShareURL = ()=>
    {
        Alert.alert('CopyShareURL');
    }
    emailItem = () =>
    {
        Alert.alert('EmailItem');
    }
    editPost = () =>
    {
        Alert.alert('EditPost');
    }
    deletePost = () =>
    {
        Alert.alert('DeletePost');
    }

    _handleOtherActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.reportInappropriate();
                break;
            case 2:
                this.shareItem();
                break;
            case 3:
                this.copyShareURL();
                break;
            case 4:
                this.emailItem();
                break;
            }
    }

    _handleMyActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.deletePost();
                break;
            case 2:
                this.editPost()
                break;
            case 3:
                this.shareItem();
                break;
            case 4:
                this.copyShareURL();
                break;
            case 5:
                this.emailItem();
                break;
            }
    }

    onAction = (rowIndex)=>{
        if(this.state.datas[rowIndex].image_owner != 'yes')
            this.otherActionSheet.show();
        else
            this.myActionSheet.show();
    }

    //On Contact
    Chat = ()=>
    {
        Alert.alert('Chat');
    }

    Call = ()=> 
    {
        Alert.alert('Call');
    }

    SMS = ()=>
    {
        Alert.alert('SMS');
    }
    WhatsApp = () =>
    {
        Alert.alert('WhatsApp');
    }
    Email=()=>
    {
        Alert.alert('Email');
    }
    
    _handleContactActionSheetPress(index) { 
        switch(index)
        {
            case 1:
                this.Chat();
                break;
            case 2:
                this.Call();
                break;
            case 3:
                this.SMS();
                break;
            case 4:
                this.WhatsApp();
                break;
            case 5:
                this.Email();
                break;
            }
    }
    showContactActionSheet() {
        this.contactActionSheet.show();
    }
    onContact = (info)=>{this.showContactActionSheet();}
    //

    async LoadImage()
    {
         try {
           var _data = await MyStorage.getObject('feed_data');
           console.log('_ImageDatasInStorage');
           console.log(_data);
          if (_data.length != 0 ){
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
            this.setState({datas: _data, dataSource: ds.cloneWithRows(_data)});
          } else {

          }
        } catch (error) {
          console.log(error)
        }
    }
    componentDidMount()
    {
       this.LoadImage();
    }
    _renderRow(rowData,sectionID, rowID)
    { 
        console.log('RowID__________');
        console.log(rowID);
        console.log(rowData);
        return (<Home_tableview_cell  navigator={this.props.navigator} route={this.props.route} key={rowID} offset={rowID} data={rowData}  onContact={this.onContact} onAction={this.onAction} onClick={this.gotoCommentView}/>);
    }
    async getMoreImages()
    {
        await Util.getNewsFeed();
        this.LoadImage();
    }
    render() {

        var i = 0 ;  
       
        return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.topBar}>
                    <Text style={styles.topText}>        
                        Mahalkum
                    </Text>
                </View> 

                <ListView
                    onEndReached = {this.getMoreImages}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections = {true}
                />
                <ActionSheet
                            ref={(o) => this.myActionSheet = o}
                            title="Item Options"
                            options={buttons_own}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleMyActionSheetPress.bind(this)}
                />
                <ActionSheet 
                            ref={(o) => this.otherActionSheet = o}
                            title="Item Options"
                            options={buttons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleOtherActionSheetPress.bind(this)}
                />
                <ActionSheet
                            ref={(o) => this.contactActionSheet = o}
                            title="Contact Seller"
                            options={buttons_Contact}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handleContactActionSheetPress.bind(this)}
                />
            </View>
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
