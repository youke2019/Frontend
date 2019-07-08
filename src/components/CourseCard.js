import React from "react";
import {View,Text,FlatList} from "react-native";
import { Card } from 'react-native-elements';
import {connect} from "react-redux";
import Detail from "../pages/Detail";
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
                        <View>
                            <Card
                                title={item.course_name}
                            >
                                <Text>课程编号：{item.course_id}</Text>
                                <Text>学分：{item.course_credits}</Text>
                                <Text>是否通识：{item.general?'是':'否'}</Text>
                            </Card>

                                // This place is the button ahead to the details page
                            <Button
                                title={"Go to Details"}
                                onPress = { () =>
                                        // 1. Navigate to the Details route with params
                                        this.props.navigation.navigate('Detail', {
                                          course_id: item.course_id
                                        })
                                      }
                                    />
                        </View>
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