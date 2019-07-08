import React from "react";
import {View,Text,FlatList} from "react-native";
import { Card } from 'react-native-elements';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        course_list: state.course_list
    }
}


class CourseCard extends React.Component {
    render() {
        return (
            <View>
                <FlatList
                    data={this.props.course_list}
                    renderItem={({item}) =>
                        <Card
                            title={item.course_name}
                        >
                            <Text>课程编号：{item.course_id}</Text>
                            <Text>学分：{item.course_credits}</Text>
                            <Text>是否通识：{item.general?'是':'否'}</Text>
                        </Card>
                    }
                    keyExtractor={(item) => item.course_id}
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps
)(CourseCard)