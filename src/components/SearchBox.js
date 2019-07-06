import React from "react";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Button } from 'react-native-elements';
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
    search = () => {
        if (this.state.search != '') {
            axios.post(baseUrl+'/courses/search',{course_name:this.state.search}).then((response) => {
                this.props.searchCourses(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    state = {
        search: ''
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        return (
            <View>
                <SearchBar
                    placeholder="请输入课程名"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    platform='android'
                />
                <Button
                    title='搜索'
                    type='clear'
                    onPress={this.search}
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox)