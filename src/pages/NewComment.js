import React from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import StackNavBar from '../components/StackNavBar'
class NewComment extends React.Component {
  state={
    content:"",
  }
  static navigationOptions =  ({ navigation }) => ({
    header: () => {
      return (
        <StackNavBar
          navigation={navigation}
          title={navigation.state.params.course_info.course_name}
          buttonText={"发布"}
        />
      )
    }
  })
  updateContent=(content)=>{
    this.setState({
      content:content,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text_area}>
          <TextInput
            autoFocus
            maxLength={200}
            multiline
            style={styles.text_input}
            placeholder={'这门课怎么样...'}
            value={this.state.content}
            onChangeText={this.updateContent}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 15
  },
  text_area: {
    minHeight: 200
  },
  text_input: {
    lineHeight: 30,
    fontSize: 16
  },
})
const mapStateToProps = state => {
  return {
    sortlist:state.sortlist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSortlist: (data)=>{
      dispatch(loadSortlist(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)