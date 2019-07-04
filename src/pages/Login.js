import React, {Component} from 'react';
import {Button, View, Linking,Text} from 'react-native';

export default class Login extends Component {
  state = {
  user : undefined,
  }

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
    console.log(url)
    this.setState({
      user: url
    })
  }
  render() {
    const {user} = this.state;
    return (
      <View>
        <Button
          onPress={this.click}
          title="Login"
        />
        <Text>
        Welcome {user}
        </Text>
      </View>
    )
  }
}