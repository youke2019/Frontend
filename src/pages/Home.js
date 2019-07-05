import React from "react";
import {Text, View} from "react-native";
import {loadUserInfo} from "../redux/actions";
import {connect} from "react-redux";
import Global from '../Global'

const mapStateToProps = state => {
    return {
        user : state.user_info
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserInfo: data => {
            dispatch(loadUserInfo(data))
        }
    }
}

class Home extends React.Component {
    componentDidMount() {
        storage.load({
            key:'user',
            autoSync: false,
            syncInBackground: false,
        }).then((data) => {
            console.log(data)
            this.props.loadUserInfo(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)