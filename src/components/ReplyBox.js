import React from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native'
import { Input, Text } from 'react-native-elements'

class ReplyBox extends React.Component {
  state = {
    keyword: ''
  }


  updateKeyword = keyword => {
    this.setState({ keyword })
  }

  render () {
    const {
      onBackdropPress = () => {},
      onReplyDone = () => {},
      visible = false
    } = this.props

    return (
      <Modal
        visible={visible}
        transparent
        style={styles.outer}
        animationType='slide'
      >
        <TouchableWithoutFeedback
          onPress={onBackdropPress}
        >
          <View style={{ width: '100%', height: '100%' }}/>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <ScrollView
            style={{contentSize:0}}
            keyboardShouldPersistTaps={'always'}>
            <View style = {styles.inside_container}>
              <View style={styles.search_container}>
                <TextInput
                  autoFocus={true}
                  placeholder={'点击输入回复'}
                  style={styles.search_text}
                  onChangeText={this.updateKeyword}
                  value={this.state.keyword}
                  onSubmitEditing={() => {
                    this.setState({ keyword: '' })
                    onReplyDone(this.state.keyword)
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ keyword: '' })
                  onReplyDone(this.state.keyword)
                }}
                activeOpacity={0.3}
                style={styles.button_touchable}
              >
                <View style={styles.button_container}>
                  <Text
                    style={styles.button_text}
                  > 发送</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderTopWidth: 0.2,
    borderColor: 'lightgrey',
  },
  search_container: {
    flex: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  search_text: {
    textAlign: 'left',
    width: '100%',
    fontSize: 15,
    padding: 2
  },
  button_container: {
    borderRadius: 8,
    marginHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FDD326',
    height: 'auto'
  },
  button_touchable: {
    flex: 1.5,
    marginVertical: 0
  },
  button_text: {
    lineHeight: 15,
    color: 'white',
    fontSize: 15,
    fontFamily: '字魂70号-灵悦黑体'
  },
  inside_container:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  }

})

export default ReplyBox