import React from "react";
import {Image, StatusBar, Text, View} from "react-native";
import { connect } from 'react-redux'

class Highlight extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Image source={{uri: 'search'}} style={{width: 40, height: 40}} />
      </View>
    );
  }
}

const mapStateToProps = (state) =>({
  user_info:state.user_info,
})

export default  connect(
  mapStateToProps,
)(Highlight)