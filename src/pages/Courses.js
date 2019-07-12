import React from "react";
import {View, Button} from "react-native";
import Drawer from '../components/Drawer'
import SearchBox from '../components/SearchBox'
import CourseList from '../components/CourseList'
import axios from "axios";
import {searchCourses} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {return{}}

const mapDispatchToProps = dispatch => {
    return {
        searchCourses: (data) => {
            dispatch(searchCourses(data))
        }
    }
}

class Courses extends React.Component {
    state = {
        filterVisible:false,
        filterList: {
            学分:[],
            通识类型:[],
            上课时间:[],
        },
    }

    filterNotEmpty = () => {
        for (let item in this.state.filterList)
            if (this.state.filterList[item].length > 0)
                return true

        return false
    }

    search = (keyword) => {
        if (keyword != '' || this.filterNotEmpty()) {

            let data = {
                course_name:keyword,
                course_credits:[],
                general_types:[],
                weekdays:[],
            }
            for (let item of this.state.filterList['学分'])
                data.course_credits.push(item)
            if (data.course_credits.length == 0)
                delete data.course_credits

            for (let item of this.state.filterList['通识类型'])
                data.general_types.push(item)
            if (data.general_types.length == 0)
                delete data.general_types

            for (let item of this.state.filterList['上课时间'])
                data.weekdays.push(item)
            if (data.weekdays.length == 0)
                delete data.weekdays

            console.log(data)

            axios.post(baseUrl+'/courses/search',data).then((response) => {
                this.props.searchCourses(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    updateFilter = (filter) => {
        this.setState({
            filterList: Object.assign({}, this.state.filterList, filter)
        })
    }


    showFilter = () => {
        this.setState({
            filterVisible:true
        })
    }

    onBackdropPress = () => {
        this.setState({
            filterVisible:false
        })
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.showFilter}
                    title="筛选"
                />
                <SearchBox
                    onPress={(keyword) => this.search(keyword)}
                />
                <CourseList navigation = {this.props.navigation}/>
                <Drawer
                    visible={this.state.filterVisible}
                    onBackdropPress = {this.onBackdropPress}
                    updateFilter={(filter) => this.updateFilter(filter)}
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses)