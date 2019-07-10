import React from "react";
import {View,Text,FlatList,Button} from "react-native";
import { Card } from 'react-native-elements';
import {connect} from "react-redux";
import Detail from "../pages/Detail";

const mapStateToProps = state => {
    return {
        course_list: state.course_list
    }
}

class CourseList extends React.Component {
    onClick = (item) =>{
      /* 1. Navigate to the Details route with params*/
      console.log(item);
      this.props.navigation.navigate('Detail', {
        course_id: item.course_id
      })
    }
    render() {
      //console.log(JSON.stringify(this.props.course_list))
        return (
            <View>
                <FlatList
                    data={this.props.course_list}
                    renderItem={({item}) =>
                        <View>
                            <Card title={item.course_name}>
                                <Text>课程编号：{item.course_id}</Text>
                                <Text>学分：{item.course_credits}</Text>
                                <Text>是否通识：{item.general?'是':'否'}</Text>
                            </Card>
                          {/* This place is the button ahead to the details page*/}
                            <Button title={"Go to Details"} onPress = {()=> this.onClick(item)}/>
                        </View>
                    }
                    keyExtractor={(item) => item.course_id.toString()}
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps
)(CourseList)