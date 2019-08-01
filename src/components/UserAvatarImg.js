import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { getUserById } from '../utils/DataRequest'

export class UserAvatarImg extends React.Component {
  state = {
    url: null
  }

  componentDidMount () {
    getUserById(this.props.user_id)
      .then(response => {
          this.setState({
            url: response.data.avatar_url
          })})
      .catch(err=>console.log(err))
  }

  render () {
    const source = this.state.url != null ? { uri: this.state.url } : {uri:"default_avatar_1"}
    return (
      <TouchableOpacity
        style={this.props.style}>
        <Image source={source} style={this.props.img_style}/>
      </TouchableOpacity>
    )
  }
}
