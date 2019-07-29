import React from "react";
import {Image, Text, View,FlatList} from "react-native";
import axios from  'axios'
import { connect } from 'react-redux'
import { Input, ListItem, Overlay } from 'react-native-elements'
import { EmitError } from '../utils/ErrorAlert'
import {  updateUserInfo } from '../redux/actions'
import StackNavBar from "../components/StackNavBar";

const mapStateToProps = state => {return{
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
  static navigationOptions =  ({ navigation }) => ({
    header: () => {
      console.log(this)
      return (
      <StackNavBar
          navigation={navigation}
          title={'个人信息'}
      />
      )
    }
  })

  constructor (props){
    super(props);
    this.state = {
      user_info: this.props.user_info,
      visible: {
        nickname: false,
      }
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
    this.setState({
      visible: Object.assign({},this.state.visible,{
        nickname:true,
      })
    })
  }
  closeNickname = () =>{
    this.setState({
      visible: Object.assign({},this.state.visible,{
        nickname:false,
      })
    })
  }
  updateNickname =(event)=>{
    const new_user_info = this.state.user_info;
    new_user_info.nickname = event.nativeEvent.text;
    axios({
      method: 'post',
      url: baseUrl + "/users/update",
      data: new_user_info
    }).then((response)=> {
      if (response.data.success) {
        this.setState({
          user_info: new_user_info,
        });
        this.props.updateUserInfo(new_user_info);
        this.closeNickname();
      }else{
        if(response.data.error_msg === "Duplicate Nickname"){
          EmitError({error_msg: "名字重复了哦!"})
        }else console.log(response.data.error_msg);
      }
    })
  }
  render() {
    console.log(this.state)
    const {user_info,visible} = this.state;
    return (
      <View >
        <ListItem
          title = "昵称"
          rightSubtitle={user_info.nickname}
          onPress = {this.pressNickname}
        />
        {
          visible.nickname &&
            <Overlay
              isVisible
              height={100}
              onBackdropPress={this.closeNickname}
            >
              <Input
                label={"取个昵称"}
                placeholder='叫什么呢'
                autoFocus = {true}
                onSubmitEditing = {this.updateNickname}
              />
            </Overlay>
        }
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSetting)