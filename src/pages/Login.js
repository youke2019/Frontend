import React from "react";
import {Button, Linking, View, Alert} from "react-native"
import {connect} from "react-redux";
import axios from "axios";
import {loadUserInfo, updateUserInfo} from "../redux/actions";

const mapStateToProps = state => {return{}}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: data => {
            dispatch(updateUserInfo(data))
        },
        loadUserInfo: data => {
            dispatch(loadUserInfo(data))
        }
    }
}



class Login extends React.Component {
    click() {
        Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize'+
        '?client_id=k8vX4aeVqZc0VCP1rSaG'+
        '&response_type=code'+
        '&redirect_uri='+baseUrl+'/jaccount/login').catch((err) => console.error("linking error",err));
    }

    componentDidMount() {
        Linking.addEventListener('url',this.handleOpenURL);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({url});
            }
        })
    }

    componentWillMount() {
        storage.load({
            key:'user',
            autoSync: false,
            syncInBackground: false,
        }).then((data) => {
            this.props.loadUserInfo(data)
            this.props.navigation.navigate('Home')
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }


    handleOpenURL = ({url}) => {
        var [,access_token] = url.match(/\?access_token=(.*)/)

        axios.get(baseUrl+'/jaccount/profile?access_token='+access_token).then((response) => {
            this.props.updateUserInfo(response.data)
            this.props.navigation.navigate('Home')
        }).catch((error) => {
            Alert.alert(
                '错误',
                '登录时发生了错误',
                [
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            console.log(error)
        })

        axios.get('https://api.sjtu.edu.cn/v1/me/lessons?access_token='+access_token).then((response) => {
            storage.save({
                key: 'lessons',
                data: response.data.entities
            })
            console.log(response.data)
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