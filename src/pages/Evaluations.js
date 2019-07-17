import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    ScrollView,
} from "react-native";
import QuestionCard from '../components/QuestionCard'

class Evaluations extends React.Component {
    state={
        questions:[
            {
                question: '老师上课点名多吗',
                praise_point: 20,
                praised: false,
                answers: [
                    {
                        content: '点的不多',
                        praise_point: 2,
                        praised: false,
                    },
                    {
                        content: '一学期一两次左右啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        praise_point: 10,
                        praised: true,
                    }
                ]
            },
            {
                question: '老师给分高吗',
                praise_point: 22,
                praised: false,
                answers: [
                    {
                        content: '给分很高',
                        praise_point: 3,
                        praised: false,
                    },
                    {
                        content: '均分90+',
                        praise_point: 20,
                        praised: true,
                    }
                ]
            },
            {
                question: '老师上课有趣吗',
                praise_point: 10,
                praised: true,
                answers: [
                    {
                        content: '蛮无聊的',
                        praise_point: 6,
                        praised: false,
                    },
                    {
                        content: '上课经常想睡觉',
                        praise_point: 6,
                        praised: false,
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ImageBackground
                    style={styles.header_container}
                    imageStyle={{resizeMode:'stretch'}}
                    source={{uri:'questions_bg'}}
                >
                    <View style={styles.title_container}>
                        <Text style={styles.title}>解疑</Text>
                        <View style={styles.subtitle_container}>
                            <Image
                                style={styles.subtitle_icon}
                                source={{uri:'qanda'}}
                            />
                            <Text style={styles.subtitle}>Q&A</Text>
                        </View>
                    </View>
                    <View style={styles.option_container}>
                        <View style={styles.new_question_container}>
                            <ImageBackground
                                imageStyle={{resizeMode:'stretch'}}
                                style={styles.new_question}
                                source={{uri:'black_rectangle'}}
                            >
                                <Image
                                    style={styles.new_question_icon}
                                    source={{uri:'new_question'}}
                                />
                                <Text style={styles.new_question_text}>新的问题</Text>
                            </ImageBackground>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.questions_container}>
                    {
                        this.state.questions.map((item,index) =>
                            <QuestionCard
                                QandA = {item}
                                key={index}
                            />
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header_container:{
        flexDirection: 'row',
        height:200,
    },
    title_container:{
        flex:1,
        paddingLeft: 12,
        paddingTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title:{
        color: '#000000',
        fontSize: 50,
        fontFamily: '字魂95号-手刻宋'
    },
    subtitle_container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle_icon:{
        width: 30,
        height: 30,
    },
    subtitle:{
        padding: 8,
        color: '#000000',
        fontSize: 12,
    },
    option_container:{
        flex:2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    new_question_container:{
        paddingBottom: 56,
    },
    new_question:{
        flexDirection: 'row',
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    new_question_icon:{
        width: 24,
        height: 24,
    },
    new_question_text:{
        paddingTop: 3,
        paddingHorizontal: 3,
        color: '#FFFFFF',
        letterSpacing: 3,
        fontSize: 15,
        fontFamily: '字魂95号-手刻宋',
        lineHeight: 20,
    },
    questions_container:{
        paddingHorizontal:25,
    },
})

export default Evaluations