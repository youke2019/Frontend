import React from "react";
import {View, TextInput} from "react-native";
import SearchBox from '../components/SearchBox'
import CourseCard from '../components/CourseCard'

class Course extends React.Component {
    render() {
        return (
            <View>
                <SearchBox/>
                <CourseCard/>
            </View>
        )
    }
}

export default Course