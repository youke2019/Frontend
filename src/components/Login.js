import React, {Component} from 'react';
import {Button, View, Linking,Text} from 'react-native';
import axios from 'axios'
import {updateUserInfo} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    visible : state.user_info == null? true:false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: data => {
      dispatch(updateUserInfo(data))
    }
  }
}

class Login extends Component {
  click() {
    Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=EHuqrWEKvazXzTErwPmCX2m1&response_type=code&redirect_uri=http://10.0.2.2:8080/jaccount/login').catch((err) => console.error("linking error",err));
  }

  componentDidMount() {
    Linking.addEventListener('url',this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({url});
      }
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }


  handleOpenURL = ({url}) => {
    var [,access_token] = url.match(/\?access_token=(.*)/)

    axios.get('http://10.0.2.2:8080/jaccount/profile?access_token='+access_token).then((response) => {
      this.props.updateUserInfo(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <View>
        { this.props.visible ?
            <Button
                onPress={this.click}
                title="Login"
            /> : null
        }
      </View>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)