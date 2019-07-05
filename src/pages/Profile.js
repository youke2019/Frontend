import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Login from "../components/Login";
import {Button}from 'react-native-elements'
import {connect} from "react-redux";
import Global from "../Global"
import {clearUserInfo} from "../redux/actions";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearUserInfo: () => {
            dispatch(clearUserInfo())
        }
    }
}

class Profile extends React.Component {
    logout = () => {
        storage.remove({
            key:'user'
        }).then((data) => {
            this.props.clearUserInfo()
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Login/>
                <Text>
                    欢迎
                </Text>
                <Text>
                    {this.props.user == null? null:this.props.user.name}
                </Text>
                <Text>
                    {this.props.user == null? null:this.props.user.department}
                </Text>
                <Text>
                    {this.props.user == null? null:this.props.user.major}
                </Text>
                <Button
                    title="登出"
                    onPress={this.logout}
                    buttonStyle={styles.logout}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logout: {
        backgroundColor: 'crimson'
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)