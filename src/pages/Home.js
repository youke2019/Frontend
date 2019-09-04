import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { loadSortlist } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'
import Carousel from 'react-native-snap-carousel'
import { Divider } from 'react-native-elements'
import { ShadowedTitle } from '../components/ShadowedTitle'
import { BoxShadow } from 'react-native-shadow'
import { getCommentById, getHottest, getNotices, getRecommend } from '../utils/DataRequest'
import Modal from 'react-native-modal'

const MaxPatchNum = 30
const HottestNum = 3
const shadowOpt = {
  width: 130,
  height: 160,
  color: '#FDD32A',
  border: 5,
  radius: 3,
  opacity: 0.1,
  x: -1,
  y: 3,
  style: { width: '31%', marginVertical: 5, marginHorizontal: 2 }
}

class Home extends React.Component {
  state = {
    patchNum: 0,
    notice_visible: false,
    guide_visible:false,
    open_notice: {
      image_url: null,
      time: null,
      content: null,
      admin_id: null
    }
  }

  componentDidMount () {
    /* TODO: load sortlist data from local storage, maybe remove to loading page later */
    loadData({ key: 'sortlist' })
      .then(sortlist => {this.props.loadSortlist(sortlist)})
      .catch(err => console.log(err))
    /*  load Recommend when loading */
    getRecommend(this.props.user_info.id, MaxPatchNum)
      .then(response => {
        console.log(response)
        this.setState({
          all_recommends: response.data.map((item, index) => {
            item.uri = 'recommend_' + (index % 8)
            return item
          })
        })
      })
      .catch(err => console.log(err))
    /* load Hottest when loading*/
    getHottest(this.props.user_info.id, HottestNum)
      .then(response => {
        this.setState(({
          hots: response.data
        }))
        console.log(response)
      })
      .catch(err => console.log(err))
    /* load 10 recent notices when loading*/
    getNotices(10)
      .then(response => {
        console.log(response.data)
        this.setState({
          notices: response.data
        })
      })
      .catch(err => console.log(err))
  }

  gotoDetail = (course_id) => {
    this.props.navigation.navigate('Detail', {
      course_id: course_id
    })
  }
  changePatch = () => {
    const { patchNum } = this.state
    this.setState({
      patchNum: patchNum < (MaxPatchNum / 3 - 1) ? patchNum + 1 : 0
    })
  }
  render () {
    const {
      hots = [{
        uri: 'course',
        course_name: '',
        course_id: ''
      }, {
        uri: 'course',
        course_name: '',
        course_id: ''
      }, {
        uri: 'course',
        course_name: '',
        course_id: ''
      }],
      all_recommends = [],
      patchNum,
      notice_visible,
      guide_visible,
      notices = [],
      open_notice
    } = this.state
    const recommends = all_recommends.slice(patchNum * 3, patchNum * 3 + 3)
    return (
      <ScrollView>
        <View style={styles.center_container}>
          <Modal
            isVisible={guide_visible}
            backdropOpacity={1}
            backdropColor={"white  n"}
          >
            <View style={{ flex: 1, backgroundColor:'white'}}>
              <Text>Hello!</Text>
            </View>
          </Modal>
          <Modal
            isVisible={notice_visible}
            onBackdropPress={() => { this.setState({ notice_visible: false })}}
            onBackButtonPress={() => { this.setState({ notice_visible: false })}}
            onSwipeComplete={() => { this.setState({ notice_visible: false })}}
            backdropOpacity={0}
            swipeThreshold={100}
            swipeDirection={['up', 'down']}
          >
            <View style={{
              flex: 0.8,
              backgroundColor: 'white',
              elevation: 2,
              alignItems: 'center',
              borderRadius: 10
            }}>
              <ScrollView style={{ width: '100%' }}>
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <Image source={{ uri: open_notice.image_url, width: '100%', height: 200 }}/>
                  <Text
                    style={{ paddingTop: 20, fontSize: 20, fontWeight: 'bold', fontFamily: '字魂107号-萌趣欢乐体' }}>公告</Text>
                  <Text style={{ width: '80%' }}> {open_notice.content}</Text>
                  <Text style={{ width: '80%', textAlign: 'right' }}>管理员{open_notice.admin_id}</Text>
                  <Text style={{ width: '80%', textAlign: 'right' }}>{open_notice.time}</Text>
                </View>
              </ScrollView>
            </View>
          </Modal>
          <View style={styles.main_header_container}>
            <Text style={styles.main_header}> Yoke 有课 </Text>
            <Text style={styles.main_subheader}> 上海交通大学课程分享平台</Text>
            <TouchableOpacity
              style={{ position:'absolute', right:30,top:10,}}
              onPress={()=>{
                this.setState({
                  guide_visible:true,
                })
              }}
            >
              <Image source={{uri:'question_mark'}} style={{width:30,height:30}}/>
            </TouchableOpacity>
          </View>
          <Divider style={styles.main_header_divider}/>
          <View
            style={styles.slider_container}
          >
            {
              notices.length > 0 ?
                <Carousel
                  ref={(c) => { this._carousel = c }}
                  data={notices}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.95}
                        onPress={() => {
                          this.setState({
                            notice_visible: true,
                            open_notice: item
                          })
                        }}
                      >
                        <Image source={{ uri: item.image_url }} style={styles.slider_pic}/>
                      </TouchableOpacity>)
                  }}
                  sliderWidth={350}
                  itemWidth={300}
                /> : null
            }
          </View>
          <View style={styles.hot_header}>
            <ShadowedTitle text={'热门课程'} uri={'home_hot'}/>
            <TouchableOpacity>
              <Image source={{ uri: 'home_goto' }} style={{ width: 0, height: 0, marginRight: 25 }}/>
            </TouchableOpacity>
          </View>
          <View style={styles.hot_body}>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity
                style={styles.hot_item}
                activeOpacity={1}
                onPress={() => {this.gotoDetail(hots[0].course_id)}}
              >
                <Image style={styles.hot_img} source={{ uri: 'course' }}/>
                <Text style={styles.hot_text}> {hots[0].course_name}</Text>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity
                style={styles.hot_item}
                activeOpacity={1}
                onPress={() => {if (hots[1]) this.gotoDetail(hots[1].course_id)}}
              >
                <Image style={styles.hot_img} source={{ uri: 'course' }}/>
                <Text style={styles.hot_text}> {hots[1] ? hots[1].course_name : ''}</Text>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity
                style={styles.hot_item}
                activeOpacity={1}
                onPress={() => {if (hots[2]) this.gotoDetail(hots[2].course_id)}}
              >
                <Image style={styles.hot_img} source={{ uri: 'course' }}/>
                <Text style={styles.hot_text}> {hots[2] ? hots[2].course_name : ''}</Text>
              </TouchableOpacity>
            </BoxShadow>
          </View>
          <View style={styles.hot_header}>
            <ShadowedTitle text={'推荐课程'} uri={'home_recommend'}/>
            <TouchableOpacity
              onPress={this.changePatch}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <Text>换一批</Text>
              <Image source={{ uri: 'home_change_0' }} style={{ width: 25, height: 25, marginRight: 25 }}/>
            </TouchableOpacity>
          </View>
          <Text style={{ width: '100%', paddingLeft: 50, fontSize: 12 }}>评测、打分越多，推荐越准哦</Text>
          {
            recommends.map((item, index) => {
              return <TouchableOpacity
                key={index}
                className={'recommend_' + index}
                style={styles.recommend_body}
                onPress={() => this.gotoDetail(item.course_id)}
                activeOpacity={0.85}
              >
                <Image source={{ uri: item.uri }} style={styles.recommend_img}/>
                <Text style={styles.recommend_text}>{item.course_name}</Text>
              </TouchableOpacity>
            })
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

  center_container: {
    paddingTop: 30,
    paddingBottom: 50,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main_header_container: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_header: {
    textAlign: 'center',
    fontFamily: '字魂107号-萌趣欢乐体',
    fontSize: 30,
    marginBottom: -7
  },
  main_subheader: {
    textAlign: 'center'
  },
  main_header_divider: {
    marginBottom: 10,
    height: 1,
    width: '80%',
    backgroundColor: 'whitesmoke'
  },
  slider_container: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slider_pic: {
    width: 300,
    height: 160,
    borderRadius: 20
  },
  hot_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  hot_body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  hot_item: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  hot_img: {
    width: '85%',
    height: '72%',
    borderRadius: 10
  },
  hot_text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 3,
    fontSize: 14,
    fontWeight: 'bold'
  },
  recommend_body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  recommend_img: {
    width: '100%',
    borderRadius: 10,
    height: 150
  },
  recommend_text: {
    width: '90%',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 20
  }
})

const mapStateToProps = state => {
  return {
    sortlist: state.sortlist,
    user_info: state.user_info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSortlist: (data) => {
      dispatch(loadSortlist(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)