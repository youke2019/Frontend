import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import {Avatar} from 'react-native-elements'
import {connect} from "react-redux";
import ListItem from "../components/ListItem";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

class Profile extends React.Component {
    gotoProfileSetting = () =>{
        this.props.navigation.navigate("ProfileSetting");
    }

    gotoAbout = () =>{
        this.props.navigation.navigate("About");
    }

    render() {
        const {user} = this.props;

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
                                source={{uri: user.avatar_url}}
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
                            onPress={() => {this.props.navigation.navigate('Setting')}}
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
                            onPress={()=>{this.props.navigation.navigate('About')}}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.info_container}
                    onPress={this.gotoAbout}
                >
                    <View>

                    </View>
                </TouchableOpacity>
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
})

export default connect(
    mapStateToProps,
)(Profile)