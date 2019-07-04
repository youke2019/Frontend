import React from "react";
import {Text, View} from "react-native";
import Login from "../components/Login";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        username: state.user_info.name
    }
}

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Login/>
                <Text>
                    欢迎 {this.props.username}
                </Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(Profile)