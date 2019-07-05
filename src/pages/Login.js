import React from "react";
import {Button, Linking, View} from "react-native"
import {connect} from "react-redux";
import axios from "axios";
import {updateUserInfo} from "../redux/actions";

const mapStateToProps = state => {return{}}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: data => {
            dispatch(updateUserInfo(data))
        }
    }
}


class Login extends React.Component {
    click() {
        Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=EHuqrWEKvazXzTErwPmCX2m1&response_type=code&redirect_uri=http://10.0.2.2:8080/jaccount/login').catch((err) => console.error("linking error",err));
    }

    componentDidMount() {
        Linking.addEventListener('url',this.handleOpenURL);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({url});
            }
        })
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }


    handleOpenURL = ({url}) => {
        var [,access_token] = url.match(/\?access_token=(.*)/)

        axios.get('http://10.0.2.2:8080/jaccount/profile?access_token='+access_token).then((response) => {
            this.props.updateUserInfo(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onPress={this.click}
                    title="Login"
                />
            </View>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)