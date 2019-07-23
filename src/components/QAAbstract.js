import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { ShadowedTitle } from './ShadowedTitle'
import CommentItem from './CommentItem'
import QuestionCard from './QuestionCard'

const Tag = (props) => {
  return (
    <ImageBackground
      style={styles.tag_style}
      imageStyle={{ resizeMode: 'stretch' }}
      source={{ uri: 'tag' }}
    >
      <Text> {props.text}</Text>
    </ImageBackground>
  )
}

class QAAbstractTitle extends React.Component {
  render () {
    const { tags = ['老师好看吗', '怎么考核啊'] } = this.props
    return (
      <View style={styles.header_container}>
        <ShadowedTitle text={'问答'} uri={'wenda'}/>
        {
          tags.map((tag, index) =>
            <Tag text={tag} key={index} style={styles.tag_text}/>)
        }
      </View>
    )
  }
}

export default class QAAbstract extends React.Component {
  state = {
    questions: []
  }

  componentDidMount () {
    this.flush()
  }
  componentWillReceiveProps (nextProps, nextContext) {
    this.flush()
  }

  flush = () => {
    axios.get(baseUrl + '/courses/questions/find', {
      params: {
        course_id: this.props.course_id,
        user_id: this.props.id,
      }
    }).then(res => {
      console.log(res.data)
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
        <View style={styles.first_comm}>
          {
            firstQuest != null ?
            <QuestionCard
              onAnswer={this.flush}
              QandA={firstQuest}
            />:
              <ImageBackground
              source={{uri:'more_button'}}
              style ={{width:340,height:100,flexDirection:'column',alignItems:'center',justifyContent:'center'}}
            >
              <Text style={styles.empty_msg}> 有什么想问的，问问上过课的同学吧😋</Text>
            </ImageBackground>
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
  first_comm: {
    marginLeft: 20
  },
  button_text: {
    color: '#ff812e',
    textAlign: 'center'
  },
  button_touchable: {
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: '#200948'
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
    marginHorizontal: 5
  },
  tag_text: {
    textAlign: 'center'
  },
  container: {
    borderTopWidth: 15,
    borderTopColor: 'whitesmoke',
    marginBottom: 10
  }
})