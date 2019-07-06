import React from "react";
import {View,Text} from "react-native";
import { Card } from 'react-native-elements';
import {connect} from "react-redux";

const mapStateToProps = state => {
    if (state.course_list != null)
        console.log(state.course_list.constructor == Array)
    return {
        course_list: state.course_list
    }
}


class CourseCard extends React.Component {
    render() {
        return (
            <View>
                {
                    this.props.course_list == null ? null:
                    this.props.course_list.map((course, index) => {
                        return (
                            <Card
                                title={course.course_name}
                                key={index}
                            >
                                <Text>课程编号：{course.course_id}</Text>
                                <Text>学分：{course.course_credits}</Text>
                                <Text>是否通识：{course.general}</Text>
                            </Card>
                        );
                    })
                }
            </View>
        )
    }
}

export default connect(
    mapStateToProps
)(CourseCard)