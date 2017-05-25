import React, { Component ,PropTypes} from 'react';
import {Alert, AsyncStorage} from 'react-native';

var config = {
      api_host: "http://178.62.125.207/api/"
}

var MD5 = require('./md5') 
var MyStorage = require('./localStorage.service');

const SIGNSALTAPIKEY = 'tattoogram'
const SHOW_INTRO_STATUS = "show_intro_status"
const SHOW_SIGN_IN_FIRSTTIME = "show_sign_in_firsttime"
const USERNAME = "username"
const API_TOKEN = "api_token"
const USER_ID = "user_id"
const FB_LOGIN = "facebook_login"
const FACEBOOK_ACCESS_TOKEN = "facebook_accessToken"
const FACEBOOK_TIMELINE_POST = "facebook_timeline_post"               
const BY_FACEBOOK_LOGIN = "by_facebook_login"
const FACEBOOK_ID = "facebook_ID"
const USER_IMAGE = "user_image"
const USER_NAME = "user_name"
const USER_IS_LOGIN = "user_is_login"
const EMAIL = 'email'
const OFFSET = 'offset'
const PHOTOS_PRIVATE = "photos_private"
const PHOTOS_SAVE_LIBRARY = "photos_save_library"
const IS_HOME_PAGE_REFRESH = "is_home_page_refresh"
const FOLLOWINGS = 'followings'
const USERINFO = 'userinfo'
const STORE_ACTIVATED = "store_activated"

const FEED_DATA = 'feed_data';

function url(path) {
  return config.api_host + path;
}
function makeRequest()
{
  var ret = '';
  for (var i = 0 ; i < (arguments.length / 2); i ++)
    ret = ret + arguments[i * 2] + '=' + arguments[i * 2 + 1] + '&'
  ret = ret.substr(0, ret.length - 1)
  return ret;
}

function myDecodeURI(str)
{ 
    var decodedWithPlus = decodeURIComponent(str);
    return decodedWithPlus.replace(new RegExp("\\+","g"),' '); 
   
}
function myEncodeURI(str)
{
  var encodeWithPlus = str.split(' ').join('+');
  return escape(encodeWithPlus)
}
exports.deleteComment = async function(data)
{ 
      try {  
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
      var requestString = makeRequest('salt', salt, 'sign',sig,'id',data.id,'uid',data.uid);
      var strRequest = config.api_host + 'post_delete_comment.php?' + requestString;
      console.log('DeleteComment Request');
      console.log(strRequest);
      let response = await fetch(strRequest);
      let responseJson = await response.json();
      console.log('DeleteComment Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;  
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
exports.cancelRequest = async function(user_id)
{
     try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
      
      var requestString = makeRequest('salt', salt, 'sign',sig,'from_id',_userID,'to_id',user_id,'flag',2);
      var strRequst = config.api_host + ('post_accept_request.php?') + requestString;

      console.log('CancelRequest Request');
      console.log(strRequst);
      let response = await fetch(strRequst);
      let responseJson = await response.text();
      console.log('CancelRequest Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}

exports.sendRequest = async function(user_id)
{
     try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
      
      var requestString = makeRequest('salt', salt, 'sign',sig,'from_id',_userID,'to_id',user_id);
      var strRequst = config.api_host + 'post_mutual_friend.php?' + requestString;

      console.log('SendRequest Request');
      console.log(strRequst);
      let response = await fetch(strRequst);
      console.log('SendRequest ResponseData');
      console.log(response);
      let responseJson = await response.text();
      console.log('SendRequest ResponseJson');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
exports.followToggle = async function(following_id,category_id,bFollow)       
{
  
    try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
      
      var requestString = makeRequest('salt', salt, 'sign',sig,'uid',_userID,'category_ids',category_id,'following_id',following_id);
      var strRequst = config.api_host + (bFollow==true?'post_user_following.php?':'post_user_unfollow.php?') + requestString;

      console.log('FollowToggle Request');
      console.log(strRequst);
      let response = await fetch(strRequst); 
      let responseJson = await response.json();
      console.log('FollowToggle Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
exports.get_following_news_feeds = async function(user_id)
{
 
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset;

        try {
        _userID= await MyStorage.get('user_id');
        } catch (error) {
        Alert.alert(error);
        }

        var postString =makeRequest('salt',salt,'sign',sig,'profile_handle',user_id, 'login_id', _userID);
        var requestStr = config.api_host + 'get_user_images.php?' + postString;

        console.log('FollowingNewsFeed Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('FollowingNewsFeed Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            var categoryArray = [];
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].uimage = myDecodeURI(aryData[i].uimage);
                aryData[i].image_path = myDecodeURI(aryData[i].image_path);
                aryData[i].currency = myDecodeURI(aryData[i].currency);
                aryData[i].email = myDecodeURI(aryData[i].email);
                aryData[i].description = myDecodeURI(aryData[i].description);
                aryData[i].datecreated = myDecodeURI(aryData[i].datecreated);
                aryData[i].daysago =myDecodeURI(aryData[i].daysago);
                aryData[i].currency = myDecodeURI(aryData[i].currency);
                aryData[i].postkey = myDecodeURI(aryData[i].postkey); 
                for(j = 0; j < aryData[i].comments.length; j++)
                {
                aryData[i].comments[j].user_image = myDecodeURI(aryData[i].comments[j].user_image);
                aryData[i].comments[j].image = myDecodeURI(aryData[i].comments[j].image);
                aryData[i].comments[j].comment_desc = myDecodeURI(aryData[i].comments[j].comment_desc);
                aryData[i].comments[j].datecreated = myDecodeURI(aryData[i].comments[j].datecreated);
                aryData[i].comments[j].uid = myDecodeURI(aryData[i].comments[j].uid);
                }
                for(j = 0; j < aryData[i].liked_by.length; j++)
                {
                aryData[i].liked_by[j].name = myDecodeURI(aryData[i].liked_by[j].name);
                aryData[i].liked_by[j].email = myDecodeURI(aryData[i].liked_by[j].email);
                aryData[i].liked_by[j].user_image = myDecodeURI(aryData[i].liked_by[j].user_image);
                }
                
                var catID =  aryData[i].category_id
                if( categoryArray[catID] == null)
                    categoryArray[catID] = [];
                categoryArray[catID].push(aryData[i])
            }
            return categoryArray;
        } 
        console.log('Category_Array');
        console.log(this.categoryArray);
 
}
exports.getMyNewsFeedForCategoriesView = async function() 
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset;
        var categoryArray = [];

        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }

        var postString =makeRequest('salt',salt,'sign',sig,'profile_handle',_userID,'off',0);
        var requestStr = config.api_host + 'get_user_images.php?' + postString;

        console.log('MyProfileNewsFeed Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('MyProfileNewsFeed Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].uimage = myDecodeURI(aryData[i].uimage);
                aryData[i].image_path = myDecodeURI(aryData[i].image_path);
                aryData[i].currency = myDecodeURI(aryData[i].currency);
                aryData[i].email = myDecodeURI(aryData[i].email);
                aryData[i].description = myDecodeURI(aryData[i].description);
                aryData[i].datecreated = myDecodeURI(aryData[i].datecreated);
                aryData[i].daysago = myDecodeURI(aryData[i].daysago);
                aryData[i].currency = myDecodeURI(aryData[i].currency);
                aryData[i].postkey = myDecodeURI(aryData[i].postkey); 
                for(j = 0; j < aryData[i].comments.length; j++)
                {
                aryData[i].comments[j].user_image = myDecodeURI(aryData[i].comments[j].user_image);
                aryData[i].comments[j].image = myDecodeURI(aryData[i].comments[j].image);
                aryData[i].comments[j].comment_desc = myDecodeURI(aryData[i].comments[j].comment_desc);
                aryData[i].comments[j].datecreated = myDecodeURI(aryData[i].comments[j].datecreated);
                aryData[i].comments[j].uid = myDecodeURI(aryData[i].comments[j].uid);
                }
                for(j = 0; j < aryData[i].liked_by.length; j++)
                {
                aryData[i].liked_by[j].name = myDecodeURI(aryData[i].liked_by[j].name);
                aryData[i].liked_by[j].email = myDecodeURI(aryData[i].liked_by[j].email);
                aryData[i].liked_by[j].user_image = myDecodeURI(aryData[i].liked_by[j].user_image);
                }
                
                var catID =  aryData[i].category_id
                if( categoryArray[catID] == null)
                    categoryArray[catID] = [];
                categoryArray[catID].push(aryData[i])
            }
            return categoryArray;
        } 
    }
exports.deleteCategory = async function(user_id, category_id)
{ 
     try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
      if(user_id == -1) user_id = _userID;
      var requestString = makeRequest('salt', salt, 'sign',sig,'uid',user_id,'id',category_id);
      var strRequst = config.api_host + 'post_delete_category.php?' + requestString;

      console.log('DeleteCategory Request');
      console.log(strRequst);
      let response = await fetch(strRequst); 
      let responseJson = await response.json();     
      console.log('DeleteCategory Response');
      console.log(responseJson); 
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}

exports.postReview = async function(desc, to_id, rating)
{ 
    try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      } 
      var requestString = makeRequest('salt', salt, 'sign',sig,'uid',_userID,'descs', desc, 'toid', to_id, 'rating', rating);
      var strRequst = config.api_host + 'post_reviews.php?' + requestString;

      console.log('PostReview Request');
      console.log(strRequst);
      let response = await fetch(strRequst); 
      let responseJson = await response.json();
      console.log('PostReview Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
exports.updateCategory = async function(cate_name, cate_desc, user_id, category_id)
{
    try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
      if(user_id == -1) user_id = _userID;
      var requestString = makeRequest('salt', salt, 'sign',sig,'uid',user_id,'id',category_id,
        'category', cate_name, 'category_description', cate_desc);
      var strRequst = config.api_host + 'post_update_category.php?' + requestString;

      console.log('UpdateCategory Request');
      console.log(strRequst);
      let response = await fetch(strRequst); 
      let responseJson = await response.json();
      console.log('UpdateCategory Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
exports.addCategory = async function(cate_name, cate_desc)
{
      try {   
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 
            
      var _userID, userInfo;
      try {
          _userID= await MyStorage.get(USER_ID);
      } catch (error) {
          Alert.alert(error);
      }
     
      var requestString = makeRequest('salt', salt, 'sign',sig,'uid',_userID,'category',cate_name,'category_description',cate_desc);
      var strRequst = config.api_host + 'post_category.php?' + requestString;

      console.log('AddCategory Request');
      console.log(strRequst);
      let response = await fetch(strRequst); 
      let responseJson = await response.json();
      console.log('AddCategory Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}

exports.getOtherNewsFeedForCategoriesView = async function(otherID)
{
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset;

        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }

        var postString =makeRequest('salt',salt,'sign',sig,'profile_handle',otherID,'login_id',_userID);
        var requestStr = config.api_host + 'get_user_images.php?' + postString;
        console.log('OtherProfileNewsFeed Request');
        console.log(requestStr);
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('OtherProfileNewsFeed Response');
        console.log(responseJson);
        var i = 0, j=0;
        var categoryArray = [], array_feeds= []
        if(responseJson.success=='1')
        {
        var array = Object.assign([],responseJson.data);
        categoryArray = [];
        array_feeds = [];  
        for(i = 0; i < responseJson.data.length; i ++)
        {
            var postkey1 = myDecodeURI(array[i].postkey);
            var breakflg = false;   
            if(postkey1 != '-1')
            {
                for(var j =0; j < array_feeds.length; j++)
                {
                    var tmpshareObj = array_feeds[j];
                    var strTmp = tmpshareObj.postkey;
                    var tmpObj ={};
                    if(strTmp == postkey1)
                    {
                        tmpObj.image_path = myDecodeURI(array[i].image_path);
                        tmpObj.id = myDecodeURI(array[i].id);
                        tmpshareObj.array_postimages.push(tmpObj);
                        breakflg = true;
                        break;
                    }
                }
                if(breakflg == true) continue;
            }

            array[i].uimage = myDecodeURI(array[i].uimage);
            array[i].image_path = myDecodeURI(array[i].image_path);
            array[i].currency = myDecodeURI(array[i].currency);
            array[i].email = myDecodeURI(array[i].email);
            array[i].description = myDecodeURI(array[i].description);
            array[i].datecreated = myDecodeURI(array[i].datecreated);
            array[i].daysago = myDecodeURI(array[i].daysago);
            array[i].currency = myDecodeURI(array[i].currency);
            array[i].postkey = myDecodeURI(array[i].postkey);
            array[i].array_postimages =[];
            for(j = 0; j < array[i].comments.length; j++)
            {
            array[i].comments[j].user_image = myDecodeURI(array[i].comments[j].user_image);
            array[i].comments[j].image = myDecodeURI(array[i].comments[j].image);
            array[i].comments[j].comment_desc = myDecodeURI(array[i].comments[j].comment_desc);
            array[i].comments[j].datecreated = myDecodeURI(array[i].comments[j].datecreated);
            array[i].comments[j].uid = myDecodeURI(array[i].comments[j].uid);
            }
            for(j = 0; j < array[i].liked_by.length; j++)
            {
            array[i].liked_by[j].name = myDecodeURI(array[i].liked_by[j].name);
            array[i].liked_by[j].email = myDecodeURI(array[i].liked_by[j].email);
            array[i].liked_by[j].user_image = myDecodeURI(array[i].liked_by[j].user_image);
            } 
            array_feeds.push(array[i]);
        
            var catID =  array[i].category_id
            if( categoryArray[catID] == null)
               categoryArray[catID] = [];
            categoryArray[catID].push(array[i])
        }
            
            for (var i = 0; i < array_feeds.length; i++)
            {
                var tmpshareObj = array_feeds[i];
                var nCnt = tmpshareObj.array_postimages.length;
                var tmpPostImg = [];
                if (nCnt > 0)
                {
                    var tmpObj = {}
                    tmpObj.image_path = tmpshareObj.image_path;
                    tmpObj.id = tmpshareObj.id;
                    
                    tmpPostImg.unshift(tmpObj);
                    
                    for (var j = 0; j < nCnt; ++j)
                    {
                        var tmpSubObj = tmpshareObj.array_postimages[j];
                        var tmpObj1 = {};
                        tmpObj1.image_path = tmpSubObj.image_path;
                        tmpObj1.id = tmpSubObj.id;
                        tmpPostImg.unshift(tmpObj1); 
                    }
                    
                    tmpshareObj.array_postimages = [];
                    for (var k = 0; k < nCnt + 1; k++)
                    {
                        var tmpSubObj1 = tmpPostImg[k];
                        if (k == 0)
                        {
                            tmpshareObj.image_path = tmpSubObj1.image_path;
                            tmpshareObj.id = tmpSubObj1.id;
                        }else
                        {
                            var tmpObj2 = {}
                            tmpObj2.image_path = tmpSubObj1.image_path;
                            tmpObj2.id = tmpSubObj1.id;
                            tmpshareObj.array_postimages.push(tmpObj2);
                        }
                    }
                    array_feeds[i] = tmpshareObj;
                }
            }
          return categoryArray;  
        } 
        console.log('CategoryList');
        console.log(categoryArray);
}

exports.get_category = async function(user_id)
{
    var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset; 
        
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
        
        var uid = user_id;
        if(user_id == -1)
            uid = _userID;   
        var postString = makeRequest('salt',salt,'sign',sig,'uid',uid);
        var requestStr = config.api_host + 'get_category.php?' + postString;
        console.log('GetCategory in CategoryView Request');
        console.log(requestStr);                    
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('GetCategory in CategoryView Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            return aryData;   
        }
}
exports.get_categories_list = async function(user_id)
    {
        var salt = Math.floor((Math.random() * 10000));
        var tempStr = SIGNSALTAPIKEY + salt;
        var sig = MD5.hex_md5(tempStr);
        var _userID, _offset; 
        
        try {
        _userID= await MyStorage.get('user_id'); 
        } catch (error) {
        Alert.alert(error);
        }
        
        var uid = user_id;
        if(user_id == -1)
            uid = _userID;   
        var postString = makeRequest('salt',salt,'sign',sig,'uid',uid,'login_id',_userID);
        var requestStr = config.api_host + 'get_category_followers.php?' + postString;
        console.log('GetCategoriesList Request');
        console.log(requestStr);                    
        let response = await fetch(requestStr);
        let responseJson = await response.json();
        console.log('GetCategoriesList Response');
        console.log(responseJson);   

        var i = 0, j=0;
        if(responseJson.success=='1')
        {
            var aryData = Object.assign([],responseJson.data);
            for(i = 0; i < responseJson.data.length; i ++)
            {
                aryData[i].categoryId  = myDecodeURI(aryData[i].id);
                aryData[i].categoryName = myDecodeURI(aryData[i].name);
                aryData[i].categoryDescs = myDecodeURI(aryData[i].description);
                aryData[i].categoryFollowers = myDecodeURI(aryData[i].followers);
                aryData[i].categoryUserFollower = myDecodeURI(aryData[i].user_follower);
            }
            return aryData;   
        }
    }
exports.logIn = async function(_user, _pass)       
{
  
    try {  
      var salt = Math.floor((Math.random() * 10000));
      var tempStr = SIGNSALTAPIKEY + salt;
      var sig = MD5.hex_md5(tempStr); 

      var requestString = makeRequest('salt', salt, 'sign',sig,'username',_user,'password',_pass,'device_token',MyStorage.get('GETDEVICETOKEN'));
      var logInRequest = config.api_host + 'get_login.php?' + requestString;
      console.log('LogIn Request');
      console.log(logInRequest);
      let response = await fetch(logInRequest);
      let responseJson = await response.json();
      console.log('LogIn Response');
      console.log(responseJson);
      if(responseJson.success == '1')
        {
            let data = responseJson.data;
            MyStorage.set(USER_ID, data.user_id);
            MyStorage.set(USERNAME, myDecodeURI(data.username));
            MyStorage.set(EMAIL, myDecodeURI(data.email));
            MyStorage.set(USER_NAME, myDecodeURI(data.name));
            MyStorage.set(USER_IMAGE, myDecodeURI(data.image));
            MyStorage.set(STORE_ACTIVATED, myDecodeURI(data.store_activated));
            MyStorage.set(PHOTOS_PRIVATE, myDecodeURI(data.is_private));
            MyStorage.set(USER_IS_LOGIN, '1');
            var i= 0;
            var followingArray = [];
            for(i=0; i < data.following_username.length; i++)
            { 
              followingArray.push(myDecodeURI(data.following_username.following_uname));
            }
            MyStorage.set(FOLLOWINGS, JSON.stringify(followingArray));
            await MyStorage.set(OFFSET, '0')
            await getNewsFeed(0);
            await get_user_info();
            return true;
        }
      else
        {
            return false;
        }
    }
    catch(error) {
      console.error(error);
    }
}
async function post_comments(imageID, _desc)
{
    var salt = Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, _offset;
    try {
      _userID= await MyStorage.get(USER_ID);
    } catch (error) {
      Alert.alert(error);
    } 
    var postString =makeRequest('sign',sig,'salt',salt,'uid',_userID, 'image_id', imageID,'comment_desc',myEncodeURI(_desc));
    var requestStr = config.api_host + 'post_comment.php?' + postString;
    console.log('PostCommentRequest');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('PostCommentResponse');
    console.log(responseJson);
    var i = 0, j=0;
    if(responseJson.success=='1')
    {
      return true;
    }
    return false; 
} 
async function get_user_info()
{
    var salt =  Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, userInfo;
    try {
        _userID= await MyStorage.get(USER_ID);
    } catch (error) {
        Alert.alert(error);
    } 
    var postString =makeRequest('salt',salt,'sign',sig,'profile_handle',_userID, 'login', _userID, 'flag', 1);
    var requestStr = config.api_host + 'get_user_profile.php?' + postString;
    console.log('GetUserInfo Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('GetUserInfo Response');
    console.log(responseJson);

    if(responseJson.success=='1')
    {
      userInfo = Object.assign({}, responseJson.data);
      let keys = Object.keys(userInfo); 
      for(var i = 0; i < keys.length; i++)
        userInfo[keys[i]] = myDecodeURI(userInfo[keys[i]]) 
      MyStorage.setObject(USERINFO, userInfo);
      return userInfo;
    }
    else
    {
        Alert.alert('Failed to get UserInfo');
    } 
}

async function get_user_profile(user_id)
{
   
    var salt =  Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, userInfo;
    try {
        _userID= await MyStorage.get(USER_ID);
    } catch (error) {
        Alert.alert(error);
    } 
    var postString =makeRequest('salt',salt,'sign',sig,'profile_handle',user_id, 'to_id', user_id,'login', _userID, 'flag', 1);
    var requestStr = config.api_host + 'get_user_profile.php?' + postString;
    console.log('Get Other Profile Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('Get Other Profile Response');
    console.log(responseJson);
    if(responseJson.success=='1')
    {
      userInfo = Object.assign({}, responseJson.data);
      let keys = Object.keys(userInfo); 
      for(var i = 0; i < keys.length; i++)
        userInfo[keys[i]] = myDecodeURI(userInfo[keys[i]])
      return userInfo;
    }
    else
    {
        Alert.alert('Failed to get UserInfo');
    } 
}
async function get_own_unreadchat_info()
{   
    var salt =  Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, userInfo;

    try {
        _userID= await MyStorage.get(USER_ID);
    } catch (error) {
        Alert.alert(error);
    } 
    var postString =makeRequest('salt',salt,'sign',sig,'uid',_userID, 'off', 0);
    var requestStr = config.api_host + 'get_messagetotalcount.php?' + postString;
    console.log('Get_Own_ChatCount_Info Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('Get_Own_ChatCount_Info Response');
    console.log(responseJson);
    if(responseJson.success=='1')
    {
      return responseJson.data.msgtotalcount;
    }
    else
    {
        Alert.alert('Failed to get UserInfo');
    } 
}
async function get_unreadchat_info(user_id) {
    var salt =  Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, userInfo;

    try {
        _userID= await MyStorage.get(USER_ID);
    } catch (error) {
        Alert.alert(error);
    } 
    var postString =makeRequest('salt',salt,'sign',sig,'uid',_userID, 'fromuid', user_id);
    var requestStr = config.api_host + 'get_messagesinglycount.php?' + postString;
    console.log('Get_Unreadchat_Info Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('Get_Unreadchat_Info Response');
    console.log(responseJson);
    if(responseJson.success=='1')
    {
      return responseJson.data.msgtotalcount;
    }
    else
    {
        Alert.alert('Failed to get UserInfo');
    } 
}

async function getNewsFeed(startInd)
{
    var salt = Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, _offset;
    if(startInd == 0)
    {
      await MyStorage.clear(FEED_DATA);
    }
    try {
      _userID= await MyStorage.get(USER_ID); 
      _offset = await MyStorage.get(OFFSET);
      if (_offset == null) _offset = 0;
    } catch (error) {
      Alert.alert(error);
    }

    var postString =makeRequest('salt',salt,'sign',sig,'uid',_userID,'off',_offset,'flag',1);
    var requestStr = config.api_host + 'get_images.php?' + postString;
    console.log('GetNewsFeed Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('GetNewsFeed Response');
    console.log(responseJson);   
    var i = 0, j=0;
    if(responseJson.success=='1')
    {
      var aryData = Object.assign([],responseJson.data);
      for(i = 0; i < responseJson.data.length; i ++)
      {
        aryData[i].uimage = myDecodeURI(aryData[i].uimage);
        aryData[i].image_path = myDecodeURI(aryData[i].image_path);
        aryData[i].currency = myDecodeURI(aryData[i].currency);
        aryData[i].email = myDecodeURI(aryData[i].email);
        aryData[i].description = myDecodeURI(aryData[i].description);
        aryData[i].datecreated = myDecodeURI(aryData[i].datecreated);
        aryData[i].daysago = myDecodeURI(aryData[i].daysago);
        aryData[i].currency = myDecodeURI(aryData[i].currency);
        for(j = 0; j < aryData[i].comments.length; j++)
        {
          aryData[i].comments[j].user_image = myDecodeURI(aryData[i].comments[j].user_image);
          aryData[i].comments[j].image = myDecodeURI(aryData[i].comments[j].image);
          aryData[i].comments[j].comment_desc = myDecodeURI(aryData[i].comments[j].comment_desc);
          aryData[i].comments[j].datecreated = myDecodeURI(aryData[i].comments[j].datecreated);
          aryData[i].comments[j].uid = myDecodeURI(aryData[i].comments[j].uid);
        }
        for(j = 0; j < aryData[i].liked_by.length; j++)
        {
          aryData[i].liked_by[j].name = myDecodeURI(aryData[i].liked_by[j].name);
          aryData[i].liked_by[j].email = myDecodeURI(aryData[i].liked_by[j].email);
          aryData[i].liked_by[j].user_image = myDecodeURI(aryData[i].liked_by[j].user_image);
        }
      }
      var prevAry = await MyStorage.getObject(FEED_DATA), newAry;
      console.log('PREV_ARRAY=');
      console.log(prevAry);
      if(prevAry != null)
      {
        newAry = prevAry.concat(aryData);
      }
      else
      {
        newAry = aryData;
      }
      MyStorage.setObject(FEED_DATA, newAry);
      MyStorage.set(OFFSET, responseJson.offset.toString());
    } 
}

async function likeToggle(likeString, image_id)     
{
    var salt = Math.floor((Math.random() * 10000));
    var tempStr = SIGNSALTAPIKEY + salt;
    var sig = MD5.hex_md5(tempStr);
    var _userID, _offset;
    try {
      _userID= await MyStorage.get(USER_ID);
      _offset = await MyStorage.get(OFFSET);
      if (_offset == null) _offset = 0;
    } catch (error) {
      Alert.alert(error);
    } 
    var postString =makeRequest('salt',salt,'sign',sig,'uid',_userID,'action',likeString,'id',image_id);
    var requestStr = config.api_host + 'post_like_unlike.php?' + postString;
    console.log('LikeToggle Request');
    console.log(requestStr);
    let response = await fetch(requestStr);
    let responseJson = await response.json();
    console.log('LikeToggleResponse Response');
    console.log(responseJson);   
    var i = 0, j=0;
    if(responseJson.success=='1')
    {
      return;
    } 
}


exports.likeToggle = likeToggle
exports.get_unreadchat_info = get_unreadchat_info
exports.get_own_unreadchat_info = get_own_unreadchat_info
exports.get_user_info = get_user_info
exports.get_user_profile = get_user_profile
exports.post_comments = post_comments
exports.getNewsFeed = getNewsFeed
exports.makeRequest = makeRequest

exports.decodeURI = myDecodeURI;
exports.encodeURI = myEncodeURI;
exports.SIGNSALTAPIKEY = SIGNSALTAPIKEY
exports.MD5 = MD5;
exports.makeRequest = makeRequest
exports.config = config
exports.abusiveText = 'Are you sure want to report this comment as Abusive Content?'
exports.spamText = 'Are you sure want to report this comment as SPAM?'
