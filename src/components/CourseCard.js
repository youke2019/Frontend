import React from "react";
import {View,Text} from "react-native";
import { Card,ListItem } from 'react-native-elements';


class CourseCard extends React.Component {
    render() {
        const courses = [
            {
                name: '文学与人生',
                teacher: '张蕴艳',
                location: '东中院4-302',
                time: '周四16：00~17:40',
            },
            {
                name: '中西乐理基础',
                teacher: '杜鹃',
                location: '东上院211',
                time: '周二16：00~17:40',
            },
        ]
        return (
            <View>
                {
                    courses.map((course, index) => {
                        return (
                            <Card
                                title={course.name}
                                key={index}
                            >
                                <Text>授课教师：{course.teacher}</Text>
                                <Text>上课地点：{course.location}</Text>
                                <Text>上课时间：{course.time}</Text>
                            </Card>
                        );
                    })
                }
            </View>
        )
    }
}

export default CourseCard