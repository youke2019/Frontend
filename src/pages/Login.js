import React, {Component} from 'react';
import {Button, View, Linking,Text} from 'react-native';
import axios from 'axios'

export default class Login extends Component {
  state = {
    user : undefined,
    access_token: undefined
  }

  click() {
    Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=EHuqrWEKvazXzTErwPmCX2m1&response_type=code&redirect_uri=http://10.0.2.2:8080/jaccount/login').catch((err) => console.error("linking error",err));
  }

  componentDidMount() {
    console.log('add')
    Linking.addEventListener('url',this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('get')
        this.handleOpenURL({url});
      }
    })
  }

  componentWillUnmount() {
    console.log('remove')
    Linking.removeEventListener('url', this.handleOpenURL);
  }


  handleOpenURL = ({url}) => {
    var [,access_token] = url.match(/\?access_token=(.*)/)
    console.log(url)

    axios.get('http://10.0.2.2:8080/jaccount/profile?access_token='+access_token).then((response) => {
      this.setState({
        user: response.data,
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const {user, access_token} = this.state;
    return (
      <View>
        <Button
          onPress={this.click}
          title="Login"
        />
        <Text>
        欢迎 {user === undefined? undefined:user.name}
        </Text>
      </View>
    )
  }
}