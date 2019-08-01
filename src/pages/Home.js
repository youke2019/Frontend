import React from "react";
import { Image, StatusBar, StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native'
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'
import Carousel from 'react-native-snap-carousel'
import { Divider } from 'react-native-elements'
import { ShadowedTitle } from '../components/ShadowedTitle'
import {BoxShadow} from 'react-native-shadow'
import { getCommentById, getRecommend } from '../utils/DataRequest'

const MaxPatchNum = 30;
const shadowOpt= {
  width: 130,
  height: 160,
  color: "#FDD32A",
  border: 8,
  radius: 3,
  opacity: 0.1,
  x: 0,
  y: 3,
  style: { width:'31%', marginVertical: 5 ,marginHorizontal:2,}
}
class Home extends React.Component {
    state={
      patchNum:0,
    }
    componentDidMount () {
      /* TODO: load sortlist data from local storage, maybe remove to loading page later */
      loadData({ key:'sortlist', })
        .then(sortlist=>{this.props.loadSortlist(sortlist)})
        .catch(err=>console.log(err))
      /*  load Recommend when loading */
      getRecommend(this.props.user_info.id,MaxPatchNum)
        .then(response=>{
          this.setState({
            all_recommends:response.data.map((item,index)=>{item.uri="recommend_"+(index%3 + 1); return item})
          })
        })
        .catch(err=>console.log(err))
    }
    gotoDetail = (course_id)=>{
      this.props.navigation.navigate("Detail",{
        course_id: course_id
      })
    }
    changePatch=()=>{
      const {patchNum} = this.state
      this.setState({
        patchNum: patchNum < (MaxPatchNum/3 - 1) ? patchNum + 1 : 0,
      })
    }
    render() {
      const {
        main_pictures = ["cover_1","cover_2","cover_3","cover_0"],
        hots=[{
          uri:"course",
          course_name:"国际商务英语",
          course_id:"123",
        }],
        all_recommends=[],
        patchNum
      } = this.state;
      const recommends = all_recommends.slice(patchNum*3,patchNum*3+3)

        return (
          <ScrollView>
            <View style={styles.center_container}>
              <View style={styles.main_header_container}>
                <Text style={styles.main_header}> Yoke 有课 </Text>
                <Text style={styles.main_subheader}> 上海交通大学课程分享平台</Text>
              </View>
              <Divider style={styles.main_header_divider}/>
              <View
                style={styles.slider_container}
              >
                {
                  main_pictures.length &&
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={main_pictures}
                      renderItem={({item,index})=>{
                        return <Image key={index} source={{uri:item}} style={styles.slider_pic}/>
                      }}
                      sliderWidth={350}
                      itemWidth={300}
                    />
                }
              </View>
              <View style={styles.hot_header}>
                <ShadowedTitle text={"热门课程"} uri = {"home_hot"} />
                <TouchableOpacity

                >
                  <Image source={{uri:"home_goto"}} style={{width:25,height:25,marginRight:25}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.hot_body}>
                <BoxShadow setting={shadowOpt}>
                  <View style={styles.hot_item}>
                    <Image style={styles.hot_img} source={{uri:hots[0].uri}}/>
                    <Text style={styles.hot_text}> {hots[0].course_name}</Text>
                  </View>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                  <View style={styles.hot_item}>
                    <Image style={styles.hot_img} source={{uri:hots[0].uri}}/>
                    <Text style={styles.hot_text}> {hots[0].course_name}</Text>
                  </View>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                <View style={styles.hot_item}>
                  <Image style={styles.hot_img} source={{uri:hots[0].uri}}/>
                  <Text style={styles.hot_text}> {hots[0].course_name}</Text>
                </View>
              </BoxShadow>
              </View>
              <View style={styles.hot_header}>
                <ShadowedTitle text={"推荐课程"} uri = {"home_recommend"}/>
                <TouchableOpacity
                  onPress={this.changePatch}
                  style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}
                >
                  <Text>换一批</Text>
                  <Image source={{uri:"home_change_0"}} style={{width:25,height:25,marginRight:25}}/>
                </TouchableOpacity>
              </View>
              <Text style={{width:'100%',paddingLeft:50,fontSize:12,}}>评测、打分越多，推荐越准哦</Text>
              {
                recommends.map((item,index)=>{
                  return <TouchableOpacity
                    key = {index}
                    className={'recommend_'+index}
                    style={styles.recommend_body}
                    onPress={()=>this.gotoDetail(item.course_id)}
                    activeOpacity={0.85}
                  >
                    <Image source={{uri:item.uri}} style={styles.recommend_img}/>
                    <Text style={styles.recommend_text}>{item.course_name}</Text>
                  </TouchableOpacity>
                })
              }
            </View>
          </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

  center_container:{
    paddingTop:30,
    paddingBottom:50,
    height:'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_header_container:{
    justifyContent:'center',
    alignItems:'center',
  },
  main_header:{
    textAlign:'center',
    fontFamily:'字魂107号-萌趣欢乐体',
    fontSize:30,
    marginBottom: -7,
  },
  main_subheader:{
    textAlign:'center',
  },
  main_header_divider:{
    marginBottom:10,
    height:1,
    width:'80%',
    backgroundColor:'whitesmoke'
  },
  slider_container:{
    height:160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider_pic:{
    width:300,
    height:160,
    borderRadius:20,
  },
  hot_header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
  },
  hot_body:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
  },
  hot_item: {
    height:'100%',
    width:'100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop: 10,
  },
  hot_img:{
    width:'85%',
    height:'72%',
    borderRadius:10,
  },
  hot_text:{
    textAlign:'center',
    textAlignVertical:'center',
    marginVertical:3,
    fontSize:14,
    fontWeight:'bold'
  },
  recommend_body:{
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingHorizontal: 20,
  },
  recommend_img:{
    width:"100%",
    borderRadius:10,
    height: 150,
  },
  recommend_text:{
    width:'90%',
    textAlign:'left',
    fontSize:15,
    fontWeight:'bold',
    marginTop:4,
    marginBottom:20,
  }
});

const mapStateToProps = state => {
  return {
    sortlist:state.sortlist,
    user_info:state.user_info
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
)(Home)