import React from "react";
import {Button} from "react-native-elements";
import {Image, StyleSheet, Text, View} from "react-native";
import {clearUserInfo} from "../redux/actions";
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
        }
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
            this.props.navigation.navigate('Login')
            this.props.clearUserInfo()
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

