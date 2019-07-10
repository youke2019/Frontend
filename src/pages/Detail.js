import React from "react";
import {View, Text, FlatList, Alert,StyleSheet} from "react-native";
import axios from "axios";

class Title extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> {this.props.title} </Text>
                <Text> {this.props.content}</Text>
                 {/*父子组件间传值*/}
            </View>
        )
    }
}

class Time extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 上课时间 </Text>
                <Text> {this.props.bw} 至 {this.props.ew} 周 {this.props.eo}周 周{this.props.date} 第 {this.props.bs}至{this.props.es} 节</Text>
               {/*父子组件间传值*/}
            </View>
        )
    }
}
class CourseInfo extends React.Component{
    changeDate = (data) =>{
        let res = "";
        switch (data){
            case 1 :
             res = "一";
             break;
            case 2 :
             res = "二";
             break;
            case 3 :
             res = "三";
             break;
            case 4 :
             res = "四";
             break;
            case 5 :
             res = "五";
             break;
            case 6 :
             res = "六";
             break;
            default:
             res = "日";
        }
        return res;
    }

    changeWeek = (data) =>{
            let res = "";
           if( data === "o")  res = "单周";
           if( data === "e") res = "双周";
           if( data === "b") res = "单双周";
            return res;
        }

    render(){
      console.log(this)
        return(
        <View style = { styles.container}>
            <Title title = {"课程"} content = { this.props.course.course_name}/>
            <View style ={styles.box} >
                <Title title ={ "课程号"} content = {this.props.course.course_id}/>
                <Title title ={"学分" } content = {this.props.course.course_credits}/>
                <Title title = {"是否为通识"} content ={this.props.course.general? "是":"否"}/>
                <Title title = {"通识类型"} content = {this.props.course.general_type}/>
                <Title title = {"选课备注"} content = {""}/>
                <Text> 教学班信息</Text>
                <FlatList
                     data={this.props.course.classes}
                     keyExtractor={(item) => item.course_id}
                     renderItem={({item}) =>
                         <View>
                             <Title title={"教学班"} content={item.classname}/>
                             <Title title={"任课老师"} content={item.teacher_name}/>
                             <FlatList data={item.classSegments}
                                       renderItem={({item}) =>
                                           <View>
                                               <Title title={"上课地点"} content={item.courseroom}/>
                                               <Text>上课时间</Text>
                                               <Time bw = {item.begin_week} ew = {item.end_week} eo = {this.changeWeek(item.oddOrEven)} date = {this.changeDate(item.week)} bs = {item.begin_sec} es = {item.end_sec}/>
                                           </View>
                                       }
                                       keyExtractor={(item) => item.class_sec_id}
                             />
                         </View>
                     }
                />
            </View>
        </View>
        )
    }
}
/*
Class CommentTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 评论 <Text>
                <Text> {this.props.tag}</Text>
            </View>
        )
    }
}
Class QuestionTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 问答区 <Text>
            </View>
        )
    }
}
Class EvaluateTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 评测 <Text>
            </View>
        )
    }
}
*/
class Detail extends React.Component {
    state = {
        courseInfo :"",
    }

    static navigationOptions = ({navigation}) => ({
        title : 'details for course ${navigation.state.params.course_id}'
    })
    //标题

    setCourse = (data) =>{
        this.setState({
            courseInfo:data
        })
    }

    //what's beneath is the function that will execute once the component is created
    componentWillMount() {
        const courseId = this.props.navigation.state.params.course_id;
        let params = {
            course_id: courseId
        }
        axios.get(baseUrl + '/courses/specific', {
          params:params
        }).then((response) => {
            this.setCourse(response.data)
        }).catch((error) => {
            Alert.alert(
                '错误',
                '获取课程信息时发生了错误',
                [
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            console.log(error)
        })
    }

    render() {
        //const otherParam = navigation.getParam('otherParam', 'some default value');
        //下方存疑
        return (
            <View>
                <CourseInfo course ={this.state.courseInfo} />
            </View>
        )
    }
}

export default Detail


const styles = StyleSheet.create({
  Title: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box:{
    borderStyle: 'dashed',
    borderWidth : 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top : 50
  },
  instructions: {
    top : 50
  },
  button:{
    height:40,
    width:70,
    borderRadius:20,
    overflow:'hidden'
  }
});
