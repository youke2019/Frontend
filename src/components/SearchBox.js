import React from "react";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import {searchCourses} from "../redux/actions";
import {connect} from "react-redux";
import axios from "axios";

const mapStateToProps = state => {return{}}

const mapDispatchToProps = dispatch => {
    return {
        searchCourses: (data) => {
            dispatch(searchCourses(data))
        }
    }
}


class SearchBox extends React.Component {
    search(){
        axios.post(baseUrl+'/courses/search',{course_name:"文学"}).then((response) => {
            this.props.searchCourses(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <View>
                <Input
                    placeholder="请输入课程名"
                    leftIcon={<Icon
                        name='search'
                        size={20}
                        color='blue'
                    />}
                />
                <Button
                    title='搜索'
                    type='clear'
                    onPress={this.search.bind(this)}
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox)