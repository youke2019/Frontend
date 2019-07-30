import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'
import Carousel from 'react-native-snap-carousel'
import { Divider } from 'react-native-elements'
import { ShadowedTitle } from '../components/ShadowedTitle'

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
        main_pictures = ["cover_1","cover_2","cover_3","cover_0"]
      } = this.state;

        return (
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
              </View>
              <View style={styles.hot_body}>
                <View style={styles.hot_item}>
                </View>
                <View style={styles.hot_item}>
                </View>
                <View style={styles.hot_item}>
                </View>
              </View>
              <View style={styles.hot_header}>
                <ShadowedTitle text={"推荐课程"} uri = {"home_recommend"}/>
              </View>
              <Text> 我还活着 </Text>
            </View>
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
    color:'black',
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
    height:200,
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
    justifyContent:'flex-start',
    width:'100%',
  },
  hot_body:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
  },
  hot_item: {
    width:'30%',
    height:120,
    shadowColor:'#FDD32A'
  },
  recommend_body:{

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