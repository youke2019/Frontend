import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { ShadowedTitle } from './ShadowedTitle'
import QuestionCard from './QuestionCard'
import { getQAbyId } from '../utils/DataRequest'

class QAAbstractTitle extends React.Component {
  render () {
    return (
      <View style={styles.header_container}>
        <ShadowedTitle text={'问答'} uri={'wenda'}/>
      </View>
    )
  }
}

export default class QAAbstract extends React.Component {
  state = {
    questions: []
  }

  componentDidMount () {
    this.refresh()
  }
  componentWillReceiveProps (nextProps, nextContext) {
    this.refresh()
  }

  refresh = () => {
    getQAbyId({
      course_id:this.props.course_id,
      user_id:this.props.user_id
    }).then(res => {
      this.setState({
        questions: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    const firstQuest = this.state.questions.length > 0 ? this.state.questions[0] : null

    return (
      <View style={styles.container}>
        <QAAbstractTitle/>
        <View style={styles.first_qa}>
          {
            firstQuest != null ?
            <QuestionCard
              onAnswer={this.refresh}
              QandA={firstQuest}
              userId={this.props.user_id}
            />:
              <View
              style ={{width:340,height:100,flexDirection:'column',alignItems:'center',justifyContent:'center'}}
            >
              <Text style={styles.empty_msg}> 有什么想问的，问问上过课的同学吧😋</Text>
              </View>
          }
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={this.props.onGotoQuestionPage}
            style={styles.button_touchable}
            activeOpacity={0.3}
          >
            <Text
              style={styles.button_text}
            >全部问答</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  first_qa: {
    marginHorizontal: 20,
  },
  button_text: {
    color: '#ff812e',
    textAlign: 'center'
  },
  button_touchable: {
    borderRadius: 20,
    paddingHorizontal: 55,
    paddingVertical: 5,
    borderWidth:0.5,
    borderColor:'orange',
    backgroundColor: 'white'
  },
  button_container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tag_style: {
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  tag_text: {
    textAlign: 'center'
  },
  container: {
    borderTopWidth: 15,
    borderTopColor: 'whitesmoke',
    marginBottom: 10,
  }
})