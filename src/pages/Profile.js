import React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import {Avatar, Button, Divider} from 'react-native-elements'
import {connect} from "react-redux";
import {clearUserInfo} from "../redux/actions";
import ListItem from "../components/ListItem";

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
        }).then(() => {
            this.props.clearUserInfo()
            this.props.navigation.navigate('Login')
        }).catch((err) => {
            console.log(err)
        })
    }

    gotoProfileSetting = () =>{
        this.props.navigation.navigate("ProfileSetting");
    }

    render() {
        const {user} = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.info_container}>
                        <Avatar
                            size="large"
                            rounded
                            source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                        />
                        <View style={styles.info}>
                            <Text>{user == null ? null : user.nickname}</Text>
                            <Text>{user == null? null:user.name}</Text>
                            <Text>{user == null? null:user.department}</Text>
                            <Text>{user == null? null:user.major}</Text>
                        </View>
                    </View>
                    <View style={styles.list_container}>
                        <ListItem
                            text='编辑'
                            image='edit'
                            onPress={this.gotoProfileSetting}
                        />
                        <Divider style={styles.divider} />
                        <ListItem
                            text='关于'
                            image='about'
                        />
                        <Divider style={styles.divider} />
                    </View>
                </View>
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
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingTop: 25,
    },
    info_container:{
        flexDirection: 'row',
        paddingTop: 40,
        paddingLeft: 20,
    },
    info:{
        paddingLeft: 20,
    },
    list_container:{
        paddingTop:20,
        flexDirection: 'column',
    },
    divider:{
        height:1,
        backgroundColor: '#F5F5F5',
    },
    logout_container:{
        padding:5,
    },
    logout: {
        backgroundColor: '#FDAF26'
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)