import React from 'react';
import { getUserById } from '../utils/DataRequest'
import { Text } from 'react-native-elements'
export class UserIdText extends React.Component{
  state={
    nickname:''
  }
  componentDidMount () {
    getUserById(this.props.user_id)
      .then(response=>{
      this.setState({
        nickname:response.data.nickname
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  componentWillUnmount () {
    this.setState = (state, callback) => {};
  }
  render(){
    return <Text style={this.props.style}> {this.state.nickname}</Text>
  }
}