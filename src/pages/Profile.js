import React from "react";
import {Text, View} from "react-native";
import Login from "../components/Login";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Login/>
                <Text>
                    欢迎
                </Text>
                <Text>
                    {this.props.user.name}
                </Text>
                <Text>
                    {this.props.user.major}
                </Text>
                <Text>
                    {this.props.user.department}
                </Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(Profile)