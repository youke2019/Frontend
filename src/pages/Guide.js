import React from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native'
import ViewPager from '@react-native-community/viewpager'
class Guide extends React.Component {
  state = {
    keyword: ''
  }


  render () {
    const {
    } = this.props
    const guides = [{
      title:"搜索课程",
      uri:["guide_search"]
    },{
      title:"课程信息分享",
      uri:["guide_info"]
    },{
      title:"智能排课",
      uri:["guide_sort_1","guide_sort_2"]
    }]
    return (
      <View style={styles.container}>
      <ViewPager
        style={styles.viewPager}
        initialPage={0}
      >
        {
          guides.map((item,index)=>{
           return  (<View key={index.toString()} >
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.back}
                onPress={()=>{
                  console.log(this.props.navigation)
                  this.props.navigation.navigate("Home")}}
              >
                <Text style={styles.back_font}> 跳过</Text>
              </TouchableOpacity>
              <ScrollView style={{width:'100%',height:'auto'}}>
                <View style={{width:'100%'}}>
                  {
                    item.uri.map((uri,index) => <Image style={styles.image} source={{uri:uri}} key = {index.toString()}/>)
                  }
                </View>
              </ScrollView>
            </View>)
          })
        }
      </ViewPager>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:25,
  },
  viewPager:{
    flex:1,
  },
  title:{
    position:'absolute',
    zIndex:1000,
    top:5,
    width:'100%',
    textAlign: "center",
    fontSize:25,
    fontFamily: '字魂107号-萌趣欢乐体',
  },
  image:{
    width:'100%',
    height:800,
    flex:1
  },
  back:{
    position:'absolute',
    zIndex:1000,
    right:20,
    top:5,
    borderRadius:5,
    borderWidth:0.5,
    borderColor:"whitesmoke"
  },
  back_font:{
    textAlign: "center",
    fontSize:20,
  }

})

export default Guide