import React from "react";
import { Image, StatusBar, StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native'
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'
import Carousel from 'react-native-snap-carousel'
import { Divider } from 'react-native-elements'
import { ShadowedTitle } from '../components/ShadowedTitle'
import {BoxShadow} from 'react-native-shadow'

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

    }
    componentDidMount () {
      /* TODO: load sortlist data from local storage, maybe remove to loading page latter */
      loadData({ key:'sortlist', })
        .then(sortlist=>{this.props.loadSortlist(sortlist)})
        .catch(err=>console.log(err))
    }

    render() {
      const {
        main_pictures = ["cover_1","cover_2","cover_3","cover_0"],
        hots=[{
          uri:"course",
          course_name:"国际商务英语",
          course_id:"123",
        }],
        recommends=[{
          uri:"recommend_1",
          course_name:"软件工程导论",
          course_id:"123"
        },{
          uri:"recommend_2",
          course_name: "计算机系统基础(1)",
          course_id:"890"
        }, {
            uri:"recommend_3",
          course_name:"桥牌与博弈论",
          course_id:'567'
        }]
      } = this.state;

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
                >
                  <Image source={{uri:"home_goto"}} style={{width:25,height:25,marginRight:25}}/>
                </TouchableOpacity>
              </View>
              {
                recommends.map((item,index)=>{
                  return <View key = {index} style={styles.recommend_body}>
                    <Image source={{uri:item.uri}} style={styles.recommend_img}/>
                    <Text style={styles.recommend_text}>{item.course_name}</Text>
                  </View>
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