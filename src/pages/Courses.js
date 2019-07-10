import React from "react";
import {View} from "react-native";
import SearchBox from '../components/SearchBox'
import CourseList from '../components/CourseList'

class Courses extends React.Component {
    render() {
        return (
            <View>
                <SearchBox/>
                <CourseList navigation = {this.props.navigation}/>
            </View>
        )
    }
}

export default Courses