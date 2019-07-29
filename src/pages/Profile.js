import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
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
            this.props.navigation.navigate('Login')
            this.props.clearUserInfo()
        }).catch((err) => {
            console.log(err)
        })
    }

    gotoProfileSetting = () =>{
        this.props.navigation.navigate("ProfileSetting");
    }

    render() {
        const {user} = this.props;
        console.log(user)

        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        style={styles.info_container}
                        onPress={this.gotoProfileSetting}
                    >
                        <View style={styles.info_content}>
                            <Avatar
                                size="medium"
                                rounded
                                source={{uri: 'default_avatar_2'}}
                            />
                            <View>
                                <View style={styles.info}>
                                    <Text>{user == null ? null : user.nickname}</Text>
                                    <Image
                                        source={{uri: user.sex == 'M' ? 'male' : 'female'}}
                                        style={styles.gender}
                                    />
                                </View>
                                <Image
                                    source={{uri:'insignia'}}
                                    style={styles.insignia}
                                />
                            </View>
                        </View>
                        <Image
                            source={{uri:'right_arrow'}}
                            style={styles.arrow_image}
                        />
                    </TouchableOpacity>
                    <View style={styles.list_container}>
                        <ListItem
                            text='设置'
                            image='setting'
                        />
                        <ListItem
                            text='反馈投诉'
                            image='feedback'
                        />
                        <ListItem
                            text='推荐给好友'
                            image='recommend'
                        />
                        <ListItem
                            text='关于'
                            image='about'
                        />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 36,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft:  20,
    },
    info_content:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    info:{
        paddingLeft: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gender:{
        margin: 5,
        width: 13,
        height: 13,
    },
    insignia:{
        marginLeft: 20,
        width: 13,
        height: 13,
    },
    arrow_image:{
        width:20,
        height:20,
    },
    list_container:{
        paddingTop:20,
        flexDirection: 'column',
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
)(Profile)