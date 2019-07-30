import React from "react";
import {Image, StatusBar, Text, View} from "react-native";
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'
import ListItem from "../components/ListItem";

class About extends React.Component {
    componentDidMount () {
        loadData({ key:'sortlist', })
            .then(sortlist=>{this.props.loadSortlist(sortlist)})
            .catch(err=>console.log(err))
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>About us</Text>
                    <Text>  19年5月，初夏，我们拿到了动态主题课程项目。适逢暑期学期降至，脑海中逐渐泛起每次被交大选课系统支配的恐惧，回想起每次选课时左右为难的纠结。做个选课功能助手吧，也算为后来人谋点福利</Text>

                    <Text>我们的团队 —— Yoke 有课</Text>
                    <Text>柳正威、赵旭阳、郭志、朱朝阳</Text>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        sortlist:state.sortlist,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSortlist: (data)=>{
            dispatch(loadSortlist(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About)