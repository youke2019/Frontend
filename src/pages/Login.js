import React from "react";
import {
    Linking,
    View,
    ImageBackground,
    StyleSheet,
    Text,
} from "react-native"
import Loading from '../components/Loading'
import {Button} from 'react-native-elements'
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
    state = {
        visible: false,
    }

    static navigationOptions = {
        header: null,  //隐藏顶部导航栏
    };

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url && this.props.ready) {
                this.handleOpenURL({url});
            }
        })
    }

    componentWillMount() {
        loadData({
            key:"user"
        }).then((data) => {
            this.props.loadUserInfo(data)
            this.props.navigation.navigate('Home')
        }).catch((err)=>{
            console.log(err)
        })
    }

    click = () => {
        this.props.readyToLogin();
        Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/authorize'+
            '?client_id=k8vX4aeVqZc0VCP1rSaG'+
            '&response_type=code'+
            '&redirect_uri='+baseUrl+'/jaccount/login').catch((err) => console.error("linking error",err));
    }

    handleOpenURL = ({url}) => {
        this.setState({
            visible: true
        })
        let [,access_token] = url.match(/\?access_token=(.*)/)

        axios.get('https://api.sjtu.edu.cn/v1/me/lessons?access_token='+access_token).then((response) => {
            console.log(response.data)
            saveData({
                key: 'lessons',
                data: response.data.entities
            }).then(() => {
                axios.get(baseUrl+'/jaccount/profile?access_token='+access_token).then((response) => {
                    this.props.updateUserInfo(response.data)
                    this.props.navigation.navigate('Home')
                })}).catch(error => {
                    console.log(error)
                    EmitError({ error_msg:"获取用户信息发生了错误" })
                }).catch(error => {
                    console.log(error)
                    EmitError({ error_msg:"获取用户信息发生错误" })
                })
        })
        this.props.doneLogin();
    }

    render() {
        return (
            <View
                style={{flex:1}}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>有课</Text>
                    <Text style={styles.content}>         一款旨在助力于课程信息流通，打通闭塞的课程信息，帮助同学们更好地选课的app。</Text>
                </View>
                <View style={styles.container}>
                    <Button
                        buttonStyle = {styles.button}
                        onPress={this.click}
                        title="用Jaccount登录"
                        titleStyle={styles.text}
                    />
                </View>
                <Loading visible={this.state.visible} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontFamily: '字魂95号-手刻宋',
        fontSize: 70,
        color: '#080808'
    },
    content:{
        paddingHorizontal: 30,
        paddingTop: 50,
        fontSize: 16,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#FDD32A',
        width: 210,
    },
    text:{
        fontSize: 18,
        lineHeight: 25,
        color: '#080808'
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)