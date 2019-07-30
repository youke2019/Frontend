import React from "react";
import {Image, Text, View, FlatList, StyleSheet} from "react-native";
import axios from  'axios'
import { connect } from 'react-redux'
import {Avatar, Icon, Input, ListItem, Overlay} from 'react-native-elements'
import { EmitError } from '../utils/ErrorAlert'
import {  updateUserInfo } from '../redux/actions'
import StackNavBar from "../components/StackNavBar";
import ImagePicker from "react-native-image-crop-picker"
import {sendAvatarImg, sendHighlightImg} from "../utils/DataRequest";


const mapStateToProps = state => {
  return{
  user_info: state.user_info,
}}

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: data => {
      dispatch(updateUserInfo(data))
    },
  }
}

class ProfileSetting extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      user_info: props.user_info,
    };
  }

  requestForProfile = ()=>{
    const {user_info} = this.state;
    return axios({
      method: 'get',
      url: baseUrl + '/users/specific',
      params:{
        id : user_info.id,
      }
    })
  }
  componentDidMount () {
    this.requestForProfile().then(response => {
      this.setState({
        user_info: response.data,
      })
    })
  }

  pressNickname =()=>{
    this.props.navigation.navigate('Edit',{
      onComfirm:this.updateNickname,
      hint: '昵称是用户在互动场景下的称谓',
      user: this.props.user_info
    })
  }

  updateNickname = (text) => {
    let new_user_info = this.state.user_info;
    new_user_info.nickname = text;
    axios({
      method: 'post',
      url: baseUrl + "/users/update",
      data: new_user_info
    }).then((response)=> {
      if (response.data.success) {
        this.props.updateUserInfo(new_user_info);
      }else{
        if(response.data.error_msg === "Duplicate Nickname"){
          EmitError({error_msg: "名字重复了哦!"})
        }else console.log(response.data.error_msg);
      }
    }).catch(err=>console.log(err))
  }

  modifyAvatar = () => {
    ImagePicker.openPicker({
      cropping: true
    }).then((raw_file) => {
      const file = {
        uri: raw_file.path,
        type: 'multipart/form-data',
        name: "image.jpg",
      }
      sendHighlightImg(file).then(response =>{
        let new_user_info = this.state.user_info
        new_user_info.avatar_url = response.data
        console.log(new_user_info)

        axios({
          method: 'post',
          url: baseUrl + "/users/update",
          data: new_user_info
        }).then((response)=> {
          console.log(response)
          if (response.data.success)
            this.props.updateUserInfo(new_user_info)
        }).catch(err=>console.log(err))
        console.log(response.data)
      }).catch(err=>console.log(err))
    }).catch(err => console.log(err))
  }

  render() {
    const {user_info} = this.props;
    return (
      <View style={styles.container}>
        <ListItem
            title = "头像"
            bottomDivider={true}
            rightAvatar={<Avatar
                size="medium"
                rounded
                source={{uri: user_info.avatar_url}}
            />}
            rightIcon={<Image
                source={{uri:'right_arrow'}}
                style={styles.arrow_image}
            />}
            onPress={this.modifyAvatar}
        />
        <ListItem
          title = "昵称"
          rightSubtitle={user_info.nickname}
          onPress = {this.pressNickname}
          bottomDivider={true}
          rightSubtitleStyle={styles.right_text}
          rightIcon={<Image
              source={{uri:'right_arrow'}}
              style={styles.arrow_image}
          />}
        />
        <ListItem
            title = "姓名"
            rightSubtitle={user_info.name}
            bottomDivider={true}
            rightSubtitleStyle={styles.right_text}
        />
        <ListItem
            title = "学院"
            rightSubtitle={user_info.department}
            bottomDivider={true}
            rightSubtitleStyle={styles.right_text}
        />
        <ListItem
            title = "专业"
            rightSubtitle={user_info.major}
            bottomDivider={true}
            rightSubtitleStyle={styles.right_text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  right_text:{
    textAlign: 'right'
  },
  arrow_image:{
    width:20,
    height:20,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSetting)