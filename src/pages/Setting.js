import React from "react";
import {Button} from "react-native-elements";
import {Image, Linking, StyleSheet, Text, View} from "react-native";
import {clearUserInfo, setLogin} from "../redux/actions";
import {connect} from "react-redux";
import StackNavBar from "../components/StackNavBar";


const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearUserInfo: () => {
            dispatch(clearUserInfo())
        },
        readyToLogin:()=>{
            dispatch(setLogin())
        },
    }
}

class Setting extends React.Component {
    static navigationOptions =  ({ navigation }) => ({
        header: () => {
            return (
                <StackNavBar
                    navigation={navigation}
                    title={'设置'}
                />
            )
        }
    })

    logout = () => {
        storage.remove({
            key:'user'
        }).then(() => {
            this.props.clearUserInfo()
            this.props.readyToLogin();
            Linking.openURL('https://jaccount.sjtu.edu.cn/oauth2/logout'+
                '?client_id=k8vX4aeVqZc0VCP1rSaG'+
                '&post_logout_redirect_uri=https://jaccount.sjtu.edu.cn/oauth2/authorize'+
                    '%3Fclient_id%3Dk8vX4aeVqZc0VCP1rSaG'+
                    '%26response_type%3Dcode'+ '%26redirect_uri%3D'
                    +baseUrl+'/jaccount/login').catch((err) => console.error("linking error",err))
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="登出"
                    onPress={this.logout}
                    buttonStyle={styles.logout}
                    containerStyle={styles.logout_container}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        padding: 5,
    },
    logout_container:{
        paddingHorizontal:20,
        paddingBottom: 20,
    },
    logout: {
        backgroundColor: '#FDAF26'
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)

