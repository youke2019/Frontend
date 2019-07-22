import React from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView, ImageBackground, TouchableOpacity,
} from "react-native";
import Rating from '../components/Rating'
import Toast from 'react-native-root-toast'
import axios from 'axios'
import StackNavBar from "../components/StackNavBar";

class PostEvaluation extends React.Component {
    state = {
        post: {
            credit_point: null,
            课程简述: null,
        }
    }

    setData = (type, text) => {
        let data = {}
        data[type] = text
        this.setState({
            post: Object.assign({},this.state.post,data)
        })
    }

    postEvaluation = () => {
        if (this.state.post.credit_point == null || this.state.post.课程简述 == null){
            Toast.show('请至少打分并填写课程简述', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            })
        } else {
            let data={
                user_id: this.props.navigation.state.params.user_id,
                course_id: this.props.navigation.state.params.course_info.course_id
            }
            data = Object.assign({}, data, this.state.post)
            console.log(data)
            axios.post(baseUrl+'/courses/evaluates/add', data).then(()=>{
                this.props.navigation.navigate("Evaluations")
            }).catch(err=>{
                console.log(err)
            })

        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1}}>
                <StackNavBar
                    navigation={this.props.navigation}
                />
                <View style={{padding:40}}>
                    <Rating
                        selected={true}
                        onUpdate={(rating) => this.setData('credit_point',rating)}
                    />
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>课程简述</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                            onChangeText={(text) => this.setData('课程简述',text)}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>考核形式</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                            onChangeText={(text) => this.setData('考核形式',text)}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>上课自由程度</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                            onChangeText={(text) => this.setData('上课自由程度',text)}
                        />
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Text style={{color: 'black'}}>课程个人体验</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            placeholder={"输入内容"}
                            multiline={true}
                            style={styles.input}
                            onChangeText={(text) => this.setData('课程个人体验',text)}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.post_container}
                    onPress={this.postEvaluation}
                >
                    <View style={styles.post_button}>
                        <Text style={styles.post_text}>发布我的评测</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card_container:{
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    input_container:{

    },
    input:{
        padding:10,
    },
    post_container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    post_button:{
        backgroundColor: '#FDAF26',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
    },
    post_text:{}
})

export default PostEvaluation