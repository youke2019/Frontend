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
import ListItem from "../components/ListItem"
import axios from "axios";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

class Profile extends React.Component {
    constructor (props){
        super(props);
        console.log(props)
        this.state = {
            user: props.user,
        };
    }

    gotoProfileSetting = () =>{
        this.props.navigation.navigate("ProfileSetting")
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            data => {
                this.setState({
                    user: this.props.user
                })
                willFocusSubscription.remove()
            }
        );
    }

    gotoAbout = () =>{
        this.props.navigation.navigate("About")
    }

    gotoSetting = () =>{
        this.props.navigation.navigate("Setting")
    }

    editFeedback = () => {
        this.props.navigation.navigate('Edit',{
            onConfirm:this.postFeedback,
            hint: '给我们反馈能够更好地完善您的体验噢',
            user: this.props.user,
            title: '反馈投诉',
            returnText: '提交反馈'
        })
    }

    postFeedback = (content) => {
        axios.post(baseUrl+ "/users/feedback/add",{
            user_id: this.props.user.id,
            content: content
        }).then((response)=> {
            if (response.data.success != true)
                console.log(err)
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        const {user} = this.state

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
                            <View style={styles.user_name_container}>
                                <Text>{user == null ? null : user.nickname}</Text>
                                <View style={styles.info}>
                                    <Image
                                        source={{uri: user.sex == 'M' ? 'male' : 'female'}}
                                        style={styles.gender}
                                    />
                                    <Image
                                        source={{uri:'insignia'}}
                                        style={styles.insignia}
                                    />
                                </View>
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
                            onPress={this.gotoSetting}
                        />
                        <ListItem
                            text='反馈投诉'
                            image='feedback'
                            onPress={this.editFeedback}
                        />
                        {/*<ListItem*/}
                        {/*    text='推荐给好友'*/}
                        {/*    image='recommend'*/}
                        {/*/>*/}
                        <ListItem
                            text='关于'
                            image='about'
                            onPress={this.gotoAbout}
                        />
                    </View>
                </View>
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
        paddingRight: 10,
        paddingLeft:  20,
    },
    info_content:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    user_name_container:{
        width: 200,
        marginHorizontal: 20,
    },
    info:{
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gender:{
        width: 13,
        height: 13,
    },
    insignia:{
        marginLeft: 10,
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