import React from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
} from "react-native";

class QuestionCard extends React.Component {
    render(){
        return (
            <ImageBackground
                style={styles.container}
                imageStyle={{resizeMode: 'stretch'}}
                source={{uri:'course_card'}}
            >
                <View style={styles.content_container}>
                    <View style={styles.question_container}>
                        <View style={styles.question_mark}>
                            <Text style={styles.question_mark_text}>问题</Text>
                            <Image
                                style={styles.question_icon}
                                source={{uri:'question_mark'}}
                            />
                        </View>
                        <Text style={styles.question_text}>
                            老师上课点名多吗
                        </Text>
                    </View>
                    <View style={styles.answers_container}>
                        <View style={styles.answer_container}>
                            <View style={styles.answer_mark}>
                                <Text style={styles.answer_mark_text}>回答</Text>
                                <Image
                                    style={styles.answer_icon}
                                    source={{uri:'answer_mark'}}
                                />
                            </View>
                            <Text style={styles.answer_text}>
                                点的不多
                            </Text>
                        </View>
                        <View style={styles.answer_container}>
                            <View style={styles.answer_mark}>
                                <Text style={styles.answer_mark_text}>回答</Text>
                                <Image
                                    style={styles.answer_icon}
                                    source={{uri:'answer_mark'}}
                                />
                            </View>
                            <Text style={styles.answer_text}>
                                一学期一两次左右啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                            </Text>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content_container:{
        paddingLeft: 27,
        paddingVertical: 30,
        alignItems: 'flex-start',
    },
    question_container:{
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
    },
    question_mark:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12,
    },
    question_mark_text:{
        fontSize: 14,
    },
    question_icon:{
        width: 20,
        height: 20,
    },
    question_text:{
        fontWeight: '500',
        fontSize: 14
    },
    answers_container:{
        paddingVertical: 8,
    },
    answer_container:{
        flexDirection: 'row',
        paddingVertical: 5,
        paddingLeft: 8,
        width: 180,
        alignItems: 'center',
    },
    answer_mark:{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer_mark_text:{
        fontSize: 12,
    },
    answer_icon:{
        width: 20,
        height: 20,
    },
    answer_text:{
    },
});

export default QuestionCard