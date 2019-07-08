import React from "react";
import {View} from "react-native";
import SearchBox from '../components/SearchBox'
import CourseCard from '../components/CourseCard'

class Courses extends React.Component {
    render() {
        return (
            <View>
                <SearchBox/>
                {
                    <CourseCard/>
                }
            </View>
        )
    }
}

export default Courses