import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,ActivityIndicator, Switch, 
  StyleSheet,Text,    
  View, Image, Alert, TextInput,TouchableHighlight,ScrollView
} from 'react-native';

import Search_user_view_cell from './Search_user_view_cell'
import Button from 'apsl-react-native-button'

var _username, _password;

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const windowWidth = window.width > window.height? window.height:window.width;
const windowHeight = window.width < window.height? window.height:window.width;
var MyStorage = require('./Lib/localStorage.service');
var Util = require('./Lib/utils');
var MD5 = require('./Lib/md5')  
export default class Profile_categories_view extends Component {
  constructor(props)
  {
    super(props);
    this.state={
    user_id: props.route.user_id,
    aryCategory: [],
    array_categories: props.route.array_categories,
    categoryArray: props.route.categoryArray
    }
    //this.loadCategory();
  }

async loadCategory()
{
    console.log('user_id in categories_view = ' + this.props.route.user_id);
    this.aryCategory = await Util.get_category(this.props.route.user_id)
}
  async updateCategories()  //Generate categoryArray and array_categories from server
  {
    var array_categories = [], categoryArray = [];
    if(this.props.route.isMine == true)
    {
        array_categories = await Util.get_categories_list(-1)
        categoryArray = await Util.getMyNewsFeedForCategoriesView()
    }
    else
     {   array_categories = await Util.get_categories_list(this.props.route.user_id);
         categoryArray = await Util.getOtherNewsFeedForCategoriesView(this.props.route.user_id);
     }

     this.setState({array_categories: array_categories, categoryArray: categoryArray});
  }
   
  gotoIndividualCategory= (offset)=>
  {
    this.props.navigator.push({index: 'Profile_individual_category_view',updateRight: false, updateCategories: this.updateCategories.bind(this),
    isMine: this.props.route.isMine, followToggle: this.followToggle.bind(this), offset: offset, categoryArray: 
    this.state.categoryArray, array_categories: this.state.array_categories, user_id: this.props.route.user_id});       
  }   

 followToggle=(bFollow, offset)=>
  {
     Util.followToggle(this.props.route.user_id,this.state.array_categories[offset].id,bFollow);   
  }

  goBack = ()=>
  {
      this.props.route.loadProfile(); 
      this.props.navigator.pop();
  }
  
  render() { 
    var content = []
    
   /* for(var i = 0 ; i < this.state.aryCategory.length; i ++)
    { 
      let ind = i;
      content[ind] = (<Text style={styles.categoryName}  key={ind} onPress={()=>this.gotoIndividualCategory(ind)}>{this.state.aryCategory[ind].name}</Text> );
    }*/
    var ary = this.state.array_categories;
    for(var i = 0 ; i < ary.length; i ++)
    { 
      let ind = i;
      content[ind] = (<Text style={styles.categoryName}  key={ind} onPress={()=>this.gotoIndividualCategory(ind)}>{ary[ind].name}</Text> );
    }
    return (
        <Image style ={styles.container}
          source={require('./img/background.png')} resizeMode={Image.resizeMode.stretch}>
          <View style={{height: windowHeight/8,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Button onPress={()=>this.goBack()} style={[{backgroundColor: 'transparent', height: windowHeight/8, borderWidth: 0},{position:'absolute',left:20, top:0}]} textStyle={{fontSize: windowWidth/10, color: 'white'}}>
                    ←
              </Button>
              {(this.props.route.isMine == true) &&
              <Button onPress={()=>this.props.navigator.push({index: 'Profile_category_add_view', updateCategories: this.updateCategories.bind(this)})} style={[{backgroundColor: 'transparent', height: windowHeight/20,  borderColor: 'white', borderWidth: 0},{position:'absolute',right:20, top: windowHeight * 3 / 80}]} textStyle={{fontSize: windowWidth/20, color: 'white'}}>
                     Add 
              </Button> 
              } 
          </View> 
          <ScrollView style={{height: windowHeight/8, backgroundColor: 'rgb(244,207,222)'}}>
              {content}
          </ScrollView>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
    categoryName:{
        fontSize: window.width / 20,
        left: 30, 
        color: 'black',
        marginBottom: 20
    },
    container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
  }
});