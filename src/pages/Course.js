import React from "react";
import {View} from "react-native";
import SearchBox from '../components/SearchBox'
import CourseCard from '../components/CourseCard'

class Course extends React.Component {
    state = {
        courselist : false
    }

    displayCourses(){
        this.setState({courselist:true})
    }

    render() {
        return (
            <View>
                <SearchBox displayCourses={this.displayCourses.bind(this)}/>
                {
                    this.state.courselist ?
                    <CourseCard/> : null
                }
            </View>
        )
    }
}

export default Course