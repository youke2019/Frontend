import React from "react";
import {Button, Linking, View, Alert} from "react-native"
import {connect} from "react-redux";
import axios from "axios";
import { loadUserInfo, setLogin, unsetLogin, updateUserInfo } from '../redux/actions'
import { loadData, saveData } from '../utils/LocalStorage'
import { EmitError } from '../utils/ErrorAlert'

const mapStateToProps = state => {return{
    ready:state.login_ready,
}}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: data => {
            dispatch(updateUserInfo(data))
        },
        loadUserInfo: data => {
            dispatch(loadUserInfo(data))
        },
        readyToLogin:()=>{
            dispatch(setLogin())
        },
        doneLogin:()=>{
            dispatch(unsetLogin())
        }
    }
}



class Login extends React.Component {
    click = () => {
        this.props.readyToLogin();
        Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize'+
        '?client_id=k8vX4aeVqZc0VCP1rSaG'+
        '&response_type=code'+
        '&redirect_uri='+baseUrl+'/jaccount/login').catch((err) => console.error("linking error",err));
    }

    componentDidMount() {
        // Linking.addEventListener('url',this.handleOpenURL);

        Linking.getInitialURL().then((url) => {
            console.log(this.props.ready)
            if (url && this.props.ready) {
                this.handleOpenURL({url});
            }
        })
    }

    componentWillMount() {
        loadData({
            key:"user"
        }).then((data) => {
            //console.log(JSON.stringify(data))
            this.props.loadUserInfo(data)
            this.props.navigation.navigate('Home')
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleOpenURL = ({url}) => {
        let [,access_token] = url.match(/\?access_token=(.*)/)

        axios.get('https://api.sjtu.edu.cn/v1/me/lessons?access_token='+access_token).then((response) => {
            saveData({
                key: 'lessons',
                data: response.data.entities
            }).then(() => {
                axios.get(baseUrl+'/jaccount/profile?access_token='+access_token).then((response) => {
                    console.log(response)
                    this.props.updateUserInfo(response.data)
                    this.props.navigation.navigate('Home')
                })}).catch(error => {
                    console.log(error)
                    EmitError({ error_msg:"获取用户信息发生了错误" })
                }).catch(error => {
                    console.log(error)
                    EmitError({ error_msg:"获取用户信息发生错误" })
                })
            console.log(response.data)
        })
        console.log("remove")
        this.props.doneLogin();
        // Linking.removeEventListener('url', this.handleOpenURL);
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