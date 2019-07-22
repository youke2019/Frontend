import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
import { sendHighlightImg, sendNewHighlight } from '../utils/DataRequest'

class StackNavBar extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { backIconUri = 'navigate-return' } = this.props
    return (
      <View style={navStyles.container}>
        <TouchableOpacity
          style={{ flex: 0.7, height: 20 }}
          activeOpacity={0.3}
          onPress={this.goBack}>
          <Image
            style={navStyles.backImage}
            source={{ uri: backIconUri }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.onSend}
          style={navStyles.subNav}
        >
          <Image source={{ uri: 'paperplane' }} style={{ width: 30, height: 30 }}/>
          <Text style={{ textAlignVertical: 'center' }}>发表 </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const navStyles = StyleSheet.create({
  container: {
    marginTop: 35,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backImage: {
    marginLeft: 20,
    width: 25,
    height: 25
  },
  subNav: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

const megas = {
  maxPicNumber: 1
}
const options = {
  title: '选择图片添加',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
export default class NewHighlight extends Component {
  state = {
    content: '',
    avatarSources: [],
  }
  send = () => {
    if (this.state.content === '') return;
    let urls =[]
    this.state.avatarSources.map(source=>{
      sendHighlightImg(source).then(response => {
        urls.push(response.data)
        if(urls.length === this.state.avatarSources.length){
          sendNewHighlight({
            user_id: this.props.navigation.state.params.user_id,
            post_text: this.state.content,
            image_url: urls[0],
            video_type:'i',
          }).then(response => {
            console.log(response)
            this.props.navigation.state.params.callBack()
            this.props.navigation.goBack()
            console.log('send')
          }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err))
    })

  }
  uploadPic = () => {
    console.log('upload')
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      const file = {
        uri: image.path,
        type: 'multipart/form-data',
        name: 'image.jpg'
      }
      let oldSources = this.state.avatarSources;
      oldSources.push(file);
      this.setState({
        avatarSources:oldSources,
      })
    }).catch(err => console.log(err))
  }
  deleteImg = (index) => {
    Alert.alert(
      '提示',
      '是否删去图片?',
      [{
        text: '取消',
        onPress: () => {},
        style: 'cancel'
      }, {
        text: '确定',
        onPress: () => {this.delete(index)}
      }],
      { cancelable: true }
    )
  }
  delete = (index) => {
    let newSource = this.state.avatarSources
    newSource.splice(index, 1)
    this.setState({
      avatarSources: newSource
    })
  }
  updateContent = (content) => {
    this.setState({
      content: content
    })
  }

  render () {
    console.log(this.state)
    return (
      <View style={styles.base_container}>
        <StackNavBar
          navigation={this.props.navigation}
          onSend={this.send}
        />
        <Divider style={{ height: 5, backgroundColor: 'whitesmoke' }}/>
        <View style={styles.container}>
          <View style={styles.text_area}>
            <TextInput
              autoFocus
              maxLength={200}
              multiline
              style={styles.text_input}
              placeholder={'今天的课如何...'}
              value={this.state.content}
              onChangeText={this.updateContent}
            />
          </View>
          <View style={styles.pics}>
            {
              this.state.avatarSources.map((source, index) => {
                return (
                  <TouchableOpacity
                    onLongPress={() => {
                      this.deleteImg(index)
                    }}
                    key={index}
                    style={styles.img_button}>
                    <Image source={{ uri: source.uri }} style={styles.user_img}/>
                  </TouchableOpacity>
                )
              })
            }
            {
              this.state.avatarSources.length < megas.maxPicNumber &&
              <TouchableOpacity
                onPress={this.uploadPic}
                style={styles.img_button}>
                <Image source={{ uri: 'camera_yellow' }} style={styles.img}/>
                <Text style={styles.img_text}> 照片 / 视频</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }
}
//TODO :You will also need to add UsageDescription on iOS and some permissions on Android, refer to the Install doc. IMPORTANT!!!
const styles = StyleSheet.create({
  base_container: {},
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 15
  },
  text_area: {
    minHeight: 200
  },
  text_input: {
    lineHeight: 30,
    fontSize: 20
  },
  img_button: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: '30%',
    height: 120,
    backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  user_img: {
    width: '100%',
    height: '100%'
  },
  img: {
    width: 35,
    height: 30
  },
  img_text: {
    paddingTop: 10,
    fontSize: 18,
    letterSpacing: 1,
    color: 'grey'
  },
  pics: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})