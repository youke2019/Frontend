import React from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Rating from '../components/Rating'
import axios from 'axios'
import Toast from 'react-native-easy-toast'
import StackNavBar from "../components/StackNavBar";
import {Image} from "react-native-elements";

class NewEvaluation extends React.Component {
    state = {
        post: {
            credit_point: null,
        },
        descriptions: [],
        count: 0
    }


    setData = (type, text) => {
        let data = {}
        data[type] = text
        this.setState({
            post: Object.assign({},this.state.post,data)
        })
    }

    setDescription = (text,index,type) => {
        let descriptions = this.state.descriptions
        let description = this.state.descriptions[index]

        if (type == 'title')
            description.title = text
        if (type == 'content')
            description.content = text

        descriptions[index] = description

        this.setState({
            descriptions: descriptions
        })
    }

    postEvaluation = () => {
        if (
            this.state.post.credit_point == null
            || this.state.post.授课教师 == null
            || this.state.post.老师评价 == null
            || this.state.post.考核形式及难度 == null
            || this.state.post.课程个人体验 == null
        ){
            this.refs.toast.show('请打分并填写必填部分')
        } else {
            let data={
                user_id: this.props.navigation.state.params.user_id,
                course_id: this.props.navigation.state.params.course_info.course_id
            }

            for (let description of this.state.descriptions)
                if (description.title != null && description.content != null)
                    data[description.title] = description.content

            data = Object.assign({}, data, this.state.post)

            axios.post(baseUrl+'/courses/evaluates/add', data).then(()=>{
                this.props.navigation.navigate("Evaluations")
            }).catch(err=>{
                console.log(err)
            })

            console.log(data)
        }
    }

    newDescription = () => {
        console.log(this.state.count)
        let descriptions = this.state.descriptions
        descriptions.push({
            title: null,
            content: null,
            count: this.state.count++
        })
        this.setState({
            descriptions: descriptions
        })
    }

    deleteDescription = (index) => {
        let descriptions = this.state.descriptions
        descriptions.splice(index,1)
        this.setState({
            descriptions: descriptions
        })
    }

    render() {
        const {
            descriptions
        } = this.state

        return (
            <View>
                <ScrollView>
                    <Toast ref="toast"/>
                    <StackNavBar
                        navigation={this.props.navigation}
                        title='发布评测'
                        buttonText='发布'
                        onPress={this.postEvaluation}
                    />
                    <View  style={styles.container}>
                        <View style={styles.star_container}>
                            <Text style={[styles.star_text,styles.title]}>请对课程进行评分</Text>
                            <Rating
                                selected={true}
                                onUpdate={(rating) => this.setData('credit_point',rating)}
                            />
                        </View>
                        <View style={[styles.card_container,styles.border]}>
                            <Text style={styles.title}>授课教师</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    placeholder={"输入授课教师(必填)"}
                                    multiline={true}
                                    style={styles.input}
                                    onChangeText={(text) => this.setData('授课教师',text)}
                                />
                            </View>
                        </View>
                        <View style={[styles.card_container,styles.border]}>
                            <Text style={styles.title}>老师评价</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    placeholder={"输入老师评价(必填)"}
                                    multiline={true}
                                    style={styles.input}
                                    onChangeText={(text) => this.setData('老师评价',text)}
                                />
                            </View>
                        </View>
                        <View style={[styles.card_container,styles.border]}>
                            <Text style={styles.title}>考核形式及难度</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    placeholder={"输入考核形式及难度(必填)"}
                                    multiline={true}
                                    style={styles.input}
                                    onChangeText={(text) => this.setData('考核形式及难度',text)}
                                />
                            </View>
                        </View>
                        <View style={[styles.card_container,styles.border,styles.bottom]}>
                            <Text style={styles.title}>课程个人体验</Text>
                            <View style={styles.input_container}>
                                <TextInput
                                    placeholder={"输入课程个人体验(必填)"}
                                    multiline={true}
                                    style={styles.input}
                                    onChangeText={(text) => this.setData('课程个人体验',text)}
                                />
                            </View>
                        </View>
                        {
                            descriptions.map((item,index) => {
                                return(
                                    <View
                                        style={styles.description}
                                        key={item.count}
                                    >
                                        <TouchableOpacity
                                            style={styles.delete}
                                            onPress={() => this.deleteDescription(index)}
                                        >
                                            <Image
                                                source={{uri:'close'}}
                                                style={styles.delete_icon}
                                            />
                                        </TouchableOpacity>
                                        <View
                                            style={[styles.card_container,styles.border]}
                                        >
                                            <TextInput
                                                style={styles.title}
                                                placeholder={"输入描述标题"}
                                                onChangeText={(text) => this.setDescription(text,index,'title')}
                                            />
                                            <View style={styles.input_container}>
                                                <TextInput
                                                    placeholder={"输入描述内容"}
                                                    multiline={true}
                                                    style={styles.input}
                                                    onChangeText={(text) => this.setDescription(text,index,'content')}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <View
                    style={styles.post_container}
                >
                    <TouchableOpacity
                        style={styles.post_button}
                        onPress={this.newDescription}
                    >
                        <Text style={styles.post_text}>添加新的描述</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFFFFA',
        paddingBottom: 120,
    },
    border:{
        margin: 25,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFFFFF',
    },
    star_container:{
        padding: 36,
    },
    star_text:{
        padding: 10,
    },
    card_container:{
        flex:1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    input_container:{

    },
    description:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    delete:{
        paddingLeft: 18,
    },
    delete_icon:{
        width: 25,
        height: 25,
    },
    title:{
        color: 'black',
        fontSize: 17,
    },
    input:{
        padding: 16,
        fontSize: 14,
    },
    post_container:{
        justifyContent: 'center',
        alignItems: 'center',
        top: -60,
        flex:1,
    },
    post_button:{
        backgroundColor: '#FDAF26',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
        height: 42,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    post_text:{
        fontSize: 16,
    },
})

export default NewEvaluation